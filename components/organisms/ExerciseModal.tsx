// Atoms Components
import ButtonAtom from "../atoms/ButtonAtom";
import HeadingAtom from "../atoms/HeadingAtom";
import MuscleIconAtom from "../atoms/MuscleIconAtom";
import ParagraphAtom from "../atoms/ParagraphAtom";

// External Dependencies
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image } from "expo-image";
import { useState } from "react";
import { Modal, Pressable, View } from "react-native";

// Constants
import Colors from "@/constants/colors";

// Assets
import ExerciseModalStyles from "@/assets/styles/components/organisms/ExerciseModal";
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import MuscleModal from "./MuscleModal";

type CategoryObject = {
  id: number;
  title: string;
};

type MuscleObject = {
  id: number;
  title: string;
};

type ExerciseObject = {
  id: number;
  title: string;
  exerciseCategory: CategoryObject;
  muscleCategories: MuscleObject[];
  description: string;
  technique: string;
};

type ExerciseModalProps = {
  exercise: ExerciseObject;
  visible: boolean;
  onClose: () => void;
};

export default function ExerciseModal({
  exercise,
  visible,
  onClose,
}: ExerciseModalProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleObject | null>(
    null
  );

  return (
    <>
      <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
        <View
          style={[
            GlobalStyles.container,
            GlobalStyles.section,
            GlobalStyles.sectionVertical,
            ExerciseModalStyles.exerciseModal,
          ]}
        >
          <Pressable
            onPress={onClose}
            style={ExerciseModalStyles.exerciseModalClose}
          >
            <FontAwesome name={"close"} size={32} color={Colors.textDark} />
          </Pressable>
          <View
            style={[
              GlobalStyles.content,
              GlobalStyles.contentVertical,
              ExerciseModalStyles.exerciseModalContent,
            ]}
          >
            <HeadingAtom level={"first"} style={[GlobalStyles.textPrimary]}>
              {exercise?.title}
            </HeadingAtom>

            <Image
              source={require("@/assets/images/temp-gif.gif")}
              style={ExerciseModalStyles.exerciseModalGif}
            />

            <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
              <HeadingAtom level={"second"}>Описание</HeadingAtom>
              <ParagraphAtom>{exercise?.description}</ParagraphAtom>
            </View>

            <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
              <HeadingAtom level={"second"}>Техника выполнения</HeadingAtom>
              <ParagraphAtom>{exercise?.technique}</ParagraphAtom>
            </View>

            <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
              <HeadingAtom level={"second"}>Затрагиваемые мышцы</HeadingAtom>
              <View
                style={[GlobalStyles.content, GlobalStyles.contentHorizontal]}
              >
                {exercise?.muscleCategories.map((muscle) => (
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
            onPress={() => {}}
          />
        </View>
      </Modal>

      <MuscleModal
        muscle={selectedMuscle}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}
