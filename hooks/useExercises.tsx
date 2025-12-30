// External Dependencies
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Services
import { getAllExercises } from "@/services/firebaseServices";

// Constants
import {
  CategoryObject,
  ExerciseObject,
  MuscleObject,
} from "@/constants/types";

type ExercisesContextType = {
  getExercises: () => ExerciseObject[];
  getFilteredExercises: (
    exerciseCategory: CategoryObject | null,
    muscleCategory: MuscleObject | null
  ) => ExerciseObject[];
};

const ExercisesContext = createContext<ExercisesContextType | undefined>(
  undefined
);

export const useExercises = () => {
  const context = useContext(ExercisesContext);

  if (!context) throw new Error("Ошибка контекста Exercises");

  return context;
};

const EXERCISES_KEY = "exercises";

export const ExercisesProvider = ({ children }: { children: ReactNode }) => {
  const [exercises, setExercises] = useState<ExerciseObject[]>([]);

  const saveExercisesToStorage = async (key: string) => {
    const value = await getAllExercises();
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  const loadExercisesFromStorage = async (key: string) => {
    const value = await AsyncStorage.getItem(key);

    if (value === null) {
      return [];
    }

    return JSON.parse(value);
  };

  useEffect(() => {
    const loadExercises = async () => {
      try {
        saveExercisesToStorage(EXERCISES_KEY);
        const exercises = await loadExercisesFromStorage(EXERCISES_KEY);

        setExercises(exercises);
      } catch (error) {
        console.error(error);
      }
    };

    loadExercises();
  }, []);

  const getExercises = () => {
    return exercises;
  };

  const getFilteredExercises = (
    exerciseCategory: CategoryObject | null,
    muscleCategory: MuscleObject | null
  ) => {
    if (!exerciseCategory && !muscleCategory) {
      return exercises;
    }

    const filteredExercises = exercises.filter((exercise) => {
      const matchesExerciseCategory =
        !exerciseCategory ||
        exercise.exerciseCategory?.id === exerciseCategory.id;

      const matchesMuscleCategory =
        !muscleCategory ||
        exercise.muscleCategories?.some(
          (muscle) => muscle.id === muscleCategory.id
        );

      return matchesExerciseCategory && matchesMuscleCategory;
    });

    return filteredExercises;
  };

  return (
    <ExercisesContext.Provider value={{ getExercises, getFilteredExercises }}>
      {children}
    </ExercisesContext.Provider>
  );
};
