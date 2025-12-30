// Atoms Components
import ButtonAtom from "../atoms/ButtonAtom";
import HeadingAtom from "../atoms/HeadingAtom";
import ParagraphAtom from "../atoms/ParagraphAtom";

// External Dependencies
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Modal, Pressable, View } from "react-native";

// Hooks
import { useQuests } from "@/hooks/useQuests";
import { useStatistics } from "@/hooks/useStatistics";

// Constants
import Colors from "@/constants/colors";

// Assets
import QuestExecutionStyles from "@/assets/styles/components/organisms/QuestExecution";
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import InfoCard from "../molecules/InfoCard";

type Phase = "work" | "rest" | "finished";

type QuestExecutionScreenProps = {
  quest: any;
  visible: boolean;
  onClose: () => void;
};

export default function QuestExecution({
  quest,
  visible,
  onClose,
}: QuestExecutionScreenProps) {
  const { addCompletedQuests } = useStatistics();
  const { removeQuest } = useQuests();

  const [currentSet, setCurrentSet] = useState(1);
  const [phase, setPhase] = useState<Phase>("work");
  const [restTimeLeft, setRestTimeLeft] = useState(quest?.rest || 60);
  const [isPaused, setIsPaused] = useState(false);

  const totalSets = quest?.sets || 1;
  const restSeconds = quest?.rest || 60;

  if (!quest) {
    return null;
  }

  useEffect(() => {
    if (phase !== "rest" || !visible || isPaused) return;

    const timer = setInterval(() => {
      setRestTimeLeft((previous: any) => {
        if (previous <= 1) {
          clearInterval(timer);

          if (currentSet >= totalSets) {
            handleFinishWorkout();
            return 0;
          } else {
            setTimeout(() => {
              setCurrentSet((prev) => prev + 1);
              setPhase("work");
              setRestTimeLeft(restSeconds);
            }, 100);
            return restSeconds;
          }
        }
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, visible, currentSet, isPaused]);

  const handleCompleteSet = () => {
    if (currentSet >= totalSets) {
      handleFinishWorkout();
    } else {
      setPhase("rest");
    }
  };

  const handleFinishWorkout = async () => {
    try {
      await addCompletedQuests(quest);
      await removeQuest(quest);
    } catch (error) {
      console.error(error);
    }
  };

  const formatRestTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const handleClose = () => {
    setIsPaused(true);
    onClose();
  };

  useEffect(() => {
    if (visible && quest) {
      setCurrentSet(1);
      setPhase("work");
      setRestTimeLeft(restSeconds);
      setIsPaused(false);
    }
  }, [visible, quest]);

  return (
    <Modal
      animationType="slide"
      visible={visible && !!quest}
      onRequestClose={handleClose}
    >
      <View
        style={[
          GlobalStyles.container,
          GlobalStyles.section,
          GlobalStyles.sectionVertical,
          QuestExecutionStyles.questExecution,
        ]}
      >
        <Pressable
          onPress={handleClose}
          style={[QuestExecutionStyles.questExecutionClose]}
        >
          <FontAwesome name={"close"} size={32} color={Colors.textDark} />
        </Pressable>

        <HeadingAtom level="first" style={[GlobalStyles.textPrimary]}>
          {quest.title}
        </HeadingAtom>

        <Image
          source={require("@/assets/images/temp-gif.gif")}
          style={QuestExecutionStyles.questExecutionGif}
        />

        <InfoCard>
          <ParagraphAtom style={[GlobalStyles.fwSemiBold, GlobalStyles.textPrimary]}>
            Следите за техникой на видео сверху и повторяйте. Тогда вы получите больший положительный эффект от выполнения упражнения, потому что делаете это правильно!
          </ParagraphAtom>
        </InfoCard>

        <ParagraphAtom>
          Подход {currentSet} из {totalSets}
        </ParagraphAtom>

        {phase === "rest" ? (
          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
            <HeadingAtom level="second">Отдых</HeadingAtom>

            <InfoCard>
              <ParagraphAtom
                style={[
                  GlobalStyles.textPrimary,
                  GlobalStyles.fwBold,
                  QuestExecutionStyles.questExecutionTime,
                ]}
              >
                {formatRestTime(restTimeLeft)}
              </ParagraphAtom>
            </InfoCard>

            <ParagraphAtom>
              <ParagraphAtom style={[GlobalStyles.fwBold]}>
                Следующий подход:
              </ParagraphAtom>{" "}
              {currentSet + 1}/{totalSets}
            </ParagraphAtom>
          </View>
        ) : (
          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
            <ParagraphAtom>
              <ParagraphAtom style={[GlobalStyles.fwBold]}>
                Текущий подход:
              </ParagraphAtom>{" "}
              {currentSet}
            </ParagraphAtom>

            <ButtonAtom
              title="Завершил подход"
              type="primary"
              onPress={handleCompleteSet}
            />
          </View>
        )}
      </View>
    </Modal>
  );
}
