// External Dependencies
import { Pressable, View } from "react-native";

// Assets
import ExerciseCardStyles from "@/assets/styles/components/molecules/ExerciseCard";
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import ExerciseIconAtom from "../atoms/ExerciseIconAtom";
import HeadingAtom from "../atoms/HeadingAtom";
import ParagraphAtom from "../atoms/ParagraphAtom";

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

type ExerciseCardProps = {
  exercise: ExerciseObject;
};

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <Pressable
      style={[
        GlobalStyles.content,
        GlobalStyles.contentVertical,
        ExerciseCardStyles.exerciseCard,
      ]}
      onPress={() => console.info(exercise)}
    >
      <HeadingAtom level={"third"} style={ExerciseCardStyles.exerciseCardTitle}>
        {exercise.title}
      </HeadingAtom>
      <View style={[GlobalStyles.content, GlobalStyles.contentHorizontal]}>
        <View style={ExerciseCardStyles.exerciseCardContainerIcon}>
          <ExerciseIconAtom type={exercise.category.title} />
        </View>
        <ParagraphAtom style={ExerciseCardStyles.exerciseCardDescription}>
          {exercise.description}
        </ParagraphAtom>
      </View>
    </Pressable>
  );
}
