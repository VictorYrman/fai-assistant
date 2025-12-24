// Atoms Components
import HeadingAtom from "../atoms/HeadingAtom";
import ParagraphAtom from "../atoms/ParagraphAtom";

// External Dependencies
import { Pressable, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Constants
import Colors from "@/constants/colors";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import GoalCardStyles from "@/assets/styles/components/molecules/GoalCard";

type GoalCardProps = {
  title: string;
  paragraph: string;
  icon: any;
  isSelected: boolean;
  onPress: () => void;
};

export default function GoalCard({
  title,
  paragraph,
  icon,
  isSelected,
  onPress,
}: GoalCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        GlobalStyles.section,
        GlobalStyles.sectionHorizontal,
        GoalCardStyles.goalCard,
        isSelected && GoalCardStyles.goalCardSelected,
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
          style={isSelected && GoalCardStyles.goalCardSelectedText}
        >
          {title}
        </HeadingAtom>
        <ParagraphAtom
          style={isSelected && GoalCardStyles.goalCardSelectedText}
        >
          {paragraph}
        </ParagraphAtom>
      </View>
    </Pressable>
  );
}
