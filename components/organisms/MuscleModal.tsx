// External Dependencies
import { Modal, Pressable, View } from "react-native";

// Assets
import MuscleModalStyles from "@/assets/styles/components/organisms/MuscleModal";
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import Colors from "@/constants/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import HeadingAtom from "../atoms/HeadingAtom";

type MuscleObject = {
  id: number;
  title: string;
};

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
        </View>
      </View>
    </Modal>
  );
}
