// Atoms Components
import ParagraphAtom from "../atoms/ParagraphAtom";
import HeadingAtom from "../atoms/HeadingAtom";

// External Dependencies
import { Pressable, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Constants
import Colors from "@/constants/colors";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import LevelCardStyles from "@/assets/styles/components/molecules/LevelCard";

type LevelCardProps = {
  title: string;
  paragraph: string;
  icon: any;
  isSelected: boolean;
  onPress: () => void;
};

export default function LevelCard({
  title,
  paragraph,
  icon,
  isSelected,
  onPress,
}: LevelCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        GlobalStyles.section,
        GlobalStyles.sectionHorizontal,
        LevelCardStyles.levelCard,
        isSelected && LevelCardStyles.levelCardSelected,
      ]}
    >
      <MaterialCommunityIcons
        name={icon}
        size={56}
        color={isSelected ? Colors.primary : Colors.textDark}
      />
      <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
        <HeadingAtom
          level={"third"}
          style={isSelected && LevelCardStyles.levelCardSelectedText}
        >
          {title}
        </HeadingAtom>
        <ParagraphAtom style={isSelected && LevelCardStyles.levelCardSelectedText}>
          {paragraph}
        </ParagraphAtom>
      </View>
    </Pressable>
  );
}
