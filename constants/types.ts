export type CategoryObject = {
  id: string;
  title: string;
};

export type MuscleObject = {
  id: string;
  title: string;
  description: string;
};

export type ExerciseObject = {
  id: string;
  title: string;
  exerciseCategory: CategoryObject;
  muscleCategories: MuscleObject[];
  description: string;
  technique: string;
};

export type SurveyInfoObject = {
  name: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
  goal: string;
  level: string;
};

export type QuestObject = {
  id: number;
  title: string;
  exerciseCategory: CategoryObject;
  muscleCategories: MuscleObject[];
  description: string;
  technique: string;
  sets: number;
  reps: number;
  rest: number;
};
