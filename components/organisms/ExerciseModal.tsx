// Atoms Components
import HeadingAtom from "../atoms/HeadingAtom";
import ParagraphAtom from "../atoms/ParagraphAtom";
import ButtonAtom from "../atoms/ButtonAtom";
import MuscleIconAtom from "../atoms/MuscleIconAtom";

// External Dependencies
import { Modal, Pressable, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image } from "expo-image";

// Constants
import Colors from "@/constants/colors";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import ExerciseModalStyles from "@/assets/styles/components/organisms/ExerciseModal";

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
  category: CategoryObject;
  muscles: MuscleObject[];
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
  return (
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
            {exercise.title}
          </HeadingAtom>

          <Image
            source={require("@/assets/images/temp-gif.gif")}
            style={ExerciseModalStyles.exerciseModalGif}
          />

          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
            <HeadingAtom level={"second"}>Описание</HeadingAtom>
            <ParagraphAtom>{exercise.description}</ParagraphAtom>
          </View>

          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
            <HeadingAtom level={"second"}>Техника выполнения</HeadingAtom>
            <ParagraphAtom>{exercise.technique}</ParagraphAtom>
          </View>

          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
            <HeadingAtom level={"second"}>Затрагиваемые мышцы</HeadingAtom>
            <View style={[GlobalStyles.content, GlobalStyles.contentHorizontal]}>
              {exercise.muscles.map((muscle) => (
                <MuscleIconAtom key={muscle.id} type={muscle.title} />
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
  );
}
