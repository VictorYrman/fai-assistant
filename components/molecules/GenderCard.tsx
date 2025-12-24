// Atoms Components
import HeadingAtom from "../atoms/HeadingAtom";

// External Dependencies
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

// Constants
import Colors from "@/constants/colors";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import GenderCardStyles from "@/assets/styles/components/molecules/GenderCard";

type GenderCardProps = {
  title: string;
  icon: any;
  isSelected: boolean;
  onPress: () => void; 
};

export default function GenderCard({ title, icon, isSelected, onPress }: GenderCardProps) {
  return (
    <Pressable onPress={onPress} style={[GlobalStyles.section, GlobalStyles.sectionVertical, GenderCardStyles.genderCard, isSelected && GenderCardStyles.genderCardSelected]}>
      <AntDesign name={icon} size={64} color={isSelected ? Colors.primary : Colors.textDark} />
      <HeadingAtom level={"third"} style={isSelected && GenderCardStyles.genderCardSelectedText}>{title}</HeadingAtom>
    </Pressable>
  );
}
