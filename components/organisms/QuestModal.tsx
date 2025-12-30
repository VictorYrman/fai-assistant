// Atoms Components
import HeadingAtom from "../atoms/HeadingAtom";
import ParagraphAtom from "../atoms/ParagraphAtom";
import ButtonAtom from "../atoms/ButtonAtom";
import MuscleIconAtom from "../atoms/MuscleIconAtom";

// Organisms Components
import MuscleModal from "./MuscleModal";
import QuestExecution from "./QuestExecution";

// External Dependencies
import { useState } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image } from "expo-image";

// Constants
import Colors from "@/constants/colors";
import { MuscleObject, QuestObject } from "@/constants/types";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import QuestModalStyles from "@/assets/styles/components/organisms/QuestModal";

type QuestModalProps = {
  quest: QuestObject;
  visible: boolean;
  onClose: () => void;
};

export default function QuestModal({
  quest,
  visible,
  onClose,
}: QuestModalProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleObject | null>(
    null
  );
  const [isStartingWorkout, setIsStartingWorkout] = useState(false);

  return (
    <>
      <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[
            GlobalStyles.container,
            GlobalStyles.section,
            GlobalStyles.contentVertical,
            QuestModalStyles.questModal,
          ]}
        >
          <Pressable onPress={onClose} style={QuestModalStyles.questModalClose}>
            <FontAwesome name={"close"} size={32} color={Colors.textDark} />
          </Pressable>

          <View
            style={[
              GlobalStyles.content,
              GlobalStyles.contentVertical,
              QuestModalStyles.questModalContent,
            ]}
          >
            <HeadingAtom level={"first"} style={[GlobalStyles.textPrimary]}>
              {quest?.title}
            </HeadingAtom>

            <Image
              source={require("@/assets/images/temp-gif.gif")}
              style={QuestModalStyles.questModalGif}
            />

            <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
              <HeadingAtom level={"second"}>Описание</HeadingAtom>
              <ParagraphAtom>{quest?.description}</ParagraphAtom>
            </View>

            <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
              <HeadingAtom level={"second"}>Техника выполнения</HeadingAtom>
              <ParagraphAtom>{quest?.technique}</ParagraphAtom>
            </View>

            <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
              <HeadingAtom level={"second"}>План выполнения</HeadingAtom>
              <ParagraphAtom>
                Выполняйте {quest?.sets} подхода по {quest?.reps} повторений,
                между подходами отдыхайте {quest?.rest} сек.. Для более удобного
                взаимодействия в тренировку встроен механизм таймера, поэтому вы
                с легкостью сможете отслеживать количество подходов и время
                отдыха!
              </ParagraphAtom>
            </View>

            <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
              <HeadingAtom level={"second"}>Затрагиваемые мышцы</HeadingAtom>
              <View
                style={[GlobalStyles.content, GlobalStyles.contentHorizontal]}
              >
                {quest?.muscleCategories.map((muscle) => (
                  <Pressable
                    key={muscle.id}
                    onPress={() => {
                      setSelectedMuscle(muscle);
                      setModalVisible(true);
                    }}
                  >
                    <MuscleIconAtom type={muscle.title} />
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
          <ButtonAtom
            title={"Начать выполнение"}
            type={"primary"}
            onPress={() => setIsStartingWorkout(true)}
          />
        </ScrollView>
      </Modal>

      <MuscleModal
        muscle={selectedMuscle}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <QuestExecution
        quest={quest}
        visible={isStartingWorkout}
        onClose={() => setIsStartingWorkout(false)}
      />
    </>
  );
}
