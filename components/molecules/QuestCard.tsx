// Atoms Components
import HeadingAtom from "../atoms/HeadingAtom";
import ParagraphAtom from "../atoms/ParagraphAtom";

// Organisms Components
import QuestModal from "../organisms/QuestModal";

// External Dependencies
import { useState } from "react";
import { Pressable, View } from "react-native";

// Constants
import { QuestObject } from "@/constants/types";

// Assets
import QuestCardStyles from "@/assets/styles/components/molecules/QuestCard";
import GlobalStyles from "@/assets/styles/global/GlobalStyles";

type QuestCardProps = {
  quest: QuestObject;
};

export default function QuestCard({ quest }: QuestCardProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <Pressable
        style={[
          GlobalStyles.content,
          GlobalStyles.contentVertical,
          QuestCardStyles.questCard,
        ]}
        onPress={() => setModalVisible(true)}
      >
        <HeadingAtom level={"third"} style={QuestCardStyles.questCardTitle}>
          {quest?.title}
        </HeadingAtom>
        <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
          <ParagraphAtom style={QuestCardStyles.questCardDescription}>
            {quest?.technique}
          </ParagraphAtom>
          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
            <View>
              <ParagraphAtom>
                <ParagraphAtom style={GlobalStyles.fwBold}>
                  Подходы:
                </ParagraphAtom>{" "}
                {quest?.sets}
              </ParagraphAtom>
              <ParagraphAtom>
                <ParagraphAtom style={GlobalStyles.fwBold}>
                  Повторения:
                </ParagraphAtom>{" "}
                {quest?.reps}
              </ParagraphAtom>
              <ParagraphAtom>
                <ParagraphAtom style={GlobalStyles.fwBold}>
                  Отдых:
                </ParagraphAtom>{" "}
                {quest?.rest} сек.
              </ParagraphAtom>
            </View>
          </View>
        </View>
      </Pressable>

      <QuestModal
        quest={quest}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}
