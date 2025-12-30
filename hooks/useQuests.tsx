// External Dependecies
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Hooks
import { useExercises } from "./useExercises";
import { useSurvey } from "./useSurvey";

// Services
import { generateQuests } from "@/services/questGenerator";

// Constants
import { ExerciseObject, QuestObject, SurveyInfoObject } from "@/constants/types";

type QuestsContenxtType = {
  resetQuests: () => void;
  createQuests: (
    surveyInfo: SurveyInfoObject | null,
    exercises: ExerciseObject[]
  ) => void;
  getQuests: () => QuestObject[];
  removeQuest: (quest: QuestObject) => void;
};

const QuestsContext = createContext<QuestsContenxtType | undefined>(undefined);

export const useQuests = () => {
  const context = useContext(QuestsContext);

  if (!context) throw new Error("Ошибка контекста Quests");

  return context;
};

const QUESTS_KEY = "quests";
const QUESTS_DAY_KEY = "quests_day";

export const QuestsProvider = ({ children }: { children: ReactNode }) => {
  const survey = useSurvey();
  const exercisesManager = useExercises();

  const [quests, setQuests] = useState<QuestObject[]>([]);

  useEffect(() => {
    const loadQuests = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];

        const savedDay = await AsyncStorage.getItem(QUESTS_DAY_KEY);
        const savedQuests = await AsyncStorage.getItem(QUESTS_KEY);

        if (savedDay === today && savedQuests) {
          setQuests(JSON.parse(savedQuests));
        } else {
          const surveyInfo = survey.getSurveyInfo();
          const exercises = exercisesManager.getExercises();

          if (surveyInfo && exercises) {
            await createQuests(surveyInfo, exercises);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadQuests();
  }, [survey, exercisesManager]);

  const resetQuests = async () => {
    await AsyncStorage.setItem(QUESTS_KEY, "");
    await AsyncStorage.setItem(QUESTS_DAY_KEY, "");

    setQuests([]);
  };

  const createQuests = async (
    surveyInfo: SurveyInfoObject | null,
    exercises: ExerciseObject[]
  ) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const newQuests = generateQuests(surveyInfo, exercises);

      await AsyncStorage.setItem(QUESTS_KEY, JSON.stringify(newQuests));
      await AsyncStorage.setItem(QUESTS_DAY_KEY, today);

      setQuests(newQuests);
    } catch (error) {
      console.error(error);
    }
  };

  const getQuests = () => {
    return quests;
  };

  const removeQuest = async (quest: QuestObject) => {
    try {
      const updatedQuests = quests.filter((q) => q.id !== quest.id);

      setQuests(updatedQuests);
      await AsyncStorage.setItem(QUESTS_KEY, JSON.stringify(updatedQuests));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <QuestsContext.Provider value={{ resetQuests, createQuests, getQuests, removeQuest }}>
      {children}
    </QuestsContext.Provider>
  );
};
