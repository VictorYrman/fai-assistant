import ExerciseEnduranceType from "@/assets/icons/ExerciseEnduranceType";
import ExerciseFlexibilityType from "@/assets/icons/ExerciseFlexibilityType";
import ExerciseStrengthType from "@/assets/icons/ExerciseStrengthType";

type ExerciseIconAtomProps = {
  type: string;
};

export default function ExerciseIconAtom({ type }: ExerciseIconAtomProps) {
  if (type === "Сила") {
    return <ExerciseStrengthType width={48} height={48} />;
  } else if (type === "Выносливость") {
    return <ExerciseEnduranceType width={48} height={48} />
  } else if (type === "Гибкость") {
    return <ExerciseFlexibilityType width={48} height={48} />
  }

  return null;
}
