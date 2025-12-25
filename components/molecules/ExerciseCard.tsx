// Atoms Components
import HeadingAtom from "../atoms/HeadingAtom";
import ParagraphAtom from "../atoms/ParagraphAtom";
import ExerciseIconAtom from "../atoms/ExerciseIconAtom";

// Molecules Components
import ExerciseModal from "../organisms/ExerciseModal";

// External Dependencies
import { useState } from "react";
import { Pressable, View } from "react-native";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import ExerciseCardStyles from "@/assets/styles/components/molecules/ExerciseCard";

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
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <Pressable
        style={[
          GlobalStyles.content,
          GlobalStyles.contentVertical,
          ExerciseCardStyles.exerciseCard,
        ]}
        onPress={() => setModalVisible(true)}
      >
        <HeadingAtom
          level={"third"}
          style={ExerciseCardStyles.exerciseCardTitle}
        >
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

      <ExerciseModal 
        exercise={exercise}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}
