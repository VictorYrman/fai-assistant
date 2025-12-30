// Atoms Components
import HeadingAtom from "../atoms/HeadingAtom";

// External Dependencies
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Modal, Pressable, View } from "react-native";

// Constants
import Colors from "@/constants/colors";
import { MuscleObject } from "@/constants/types";

// Assets
import MuscleModalStyles from "@/assets/styles/components/organisms/MuscleModal";
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import MuscleIconAtom from "../atoms/MuscleIconAtom";
import ParagraphAtom from "../atoms/ParagraphAtom";

type MuscleModalProps = {
  muscle: MuscleObject | null;
  visible: boolean;
  onClose: () => void;
};

export default function MuscleModal({
  muscle,
  visible,
  onClose,
}: MuscleModalProps) {
  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View
        style={[
          GlobalStyles.container,
          GlobalStyles.section,
          GlobalStyles.sectionVertical,
          MuscleModalStyles.muscleModal,
        ]}
      >
        <Pressable onPress={onClose} style={MuscleModalStyles.muscleModalClose}>
          <FontAwesome name={"close"} size={32} color={Colors.textDark} />
        </Pressable>
        <View
          style={[
            GlobalStyles.content,
            GlobalStyles.contentVertical,
            MuscleModalStyles.muscleModalContent,
          ]}
        >
          <HeadingAtom level={"first"} style={[GlobalStyles.textPrimary]}>
            {muscle?.title}
          </HeadingAtom>

          <MuscleIconAtom
            type={muscle?.title}
            style={[MuscleModalStyles.muscleModalImage]}
          />

          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
            <HeadingAtom level={"second"}>Описание:</HeadingAtom>
            <ParagraphAtom>{muscle?.description}</ParagraphAtom>
          </View>
        </View>
      </View>
    </Modal>
  );
}
