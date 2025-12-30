// External Dependencies
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
import { QuestObject } from "@/constants/types";

type StatisticsContextType = {
  resetStatistics: () => void;
  addCompletedQuests: (quest: QuestObject) => void;
  getCompletedQuests: () => number;
  getStrengthQuests: () => number;
  getEnduranceQuests: () => number;
  getFlexibilityQuests: () => number;
};

const StatisticsContext = createContext<StatisticsContextType | undefined>(
  undefined
);

export const useStatistics = () => {
  const context = useContext(StatisticsContext);

  if (!context) throw new Error("Ошибка контекста Statistics");

  return context;
};

const COMPLETED_QUESTS_KEY = "completed_quests";
const STRENGTH_QUESTS_KEY = "strength_quests";
const ENDURANCE_QUESTS_KEY = "endurance_quests";
const FLEXIBILITY_QUESTS_KEY = "flexibility_quests";

export const StatisticsProvider = ({ children }: { children: ReactNode }) => {
  const [completedQuests, setCompletedQuests] = useState<number>(0);
  const [strengthQuests, setStrengthQuests] = useState<number>(0);
  const [enduranceQuests, setEnduranceQuests] = useState<number>(0);
  const [flexibilityQuests, setFlexibilityQuests] = useState<number>(0);

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const completedQuests = Number(
          await AsyncStorage.getItem(COMPLETED_QUESTS_KEY)
        );
        const strengthQuests = Number(
          await AsyncStorage.getItem(STRENGTH_QUESTS_KEY)
        );
        const enduranceQuests = Number(
          await AsyncStorage.getItem(ENDURANCE_QUESTS_KEY)
        );
        const flexibilityQuests = Number(
          await AsyncStorage.getItem(FLEXIBILITY_QUESTS_KEY)
        );

        setCompletedQuests(completedQuests | 0);
        setStrengthQuests(strengthQuests | 0);
        setEnduranceQuests(enduranceQuests | 0);
        setFlexibilityQuests(flexibilityQuests | 0);
      } catch (error) {
        console.error(error);
      }
    };

    loadStatistics();
  }, []);

  const resetStatistics = async () => {
    await AsyncStorage.setItem(COMPLETED_QUESTS_KEY, "");
    await AsyncStorage.setItem(STRENGTH_QUESTS_KEY, "");
    await AsyncStorage.setItem(ENDURANCE_QUESTS_KEY, "");
    await AsyncStorage.setItem(FLEXIBILITY_QUESTS_KEY, "");

    setCompletedQuests(0);
    setStrengthQuests(0);
    setEnduranceQuests(0);
    setFlexibilityQuests(0);
  }

  const addCompletedQuests = async (quest: QuestObject) => {
    if (quest.exerciseCategory.title === "Выносливость") {
      const newEnduranceQuests = enduranceQuests + 1;

      setEnduranceQuests(newEnduranceQuests);
      await AsyncStorage.setItem(
        ENDURANCE_QUESTS_KEY,
        newEnduranceQuests.toString()
      );
    } else if (quest.exerciseCategory.title === "Сила") {
      const newStrengthQuests = strengthQuests + 1;

      setStrengthQuests(newStrengthQuests);
      await AsyncStorage.setItem(
        STRENGTH_QUESTS_KEY,
        newStrengthQuests.toString()
      );
    } else if (quest.exerciseCategory.title === "Гибкость") {
      const newFlexibilityQuests = flexibilityQuests + 1;
      setFlexibilityQuests(newFlexibilityQuests);
      await AsyncStorage.setItem(
        FLEXIBILITY_QUESTS_KEY,
        newFlexibilityQuests.toString()
      );
    }

    const newCompletedQuests = completedQuests + 1;

    setCompletedQuests(newCompletedQuests);
    await AsyncStorage.setItem(
      COMPLETED_QUESTS_KEY,
      newCompletedQuests.toString()
    );
  };

  const getCompletedQuests = () => {
    return completedQuests;
  };

  const getStrengthQuests = () => {
    return strengthQuests;
  };

  const getEnduranceQuests = () => {
    return enduranceQuests;
  };

  const getFlexibilityQuests = () => {
    return flexibilityQuests;
  };

  return (
    <StatisticsContext.Provider
      value={{
        resetStatistics,
        addCompletedQuests,
        getCompletedQuests,
        getStrengthQuests,
        getEnduranceQuests,
        getFlexibilityQuests,
      }}
    >
      {children}
    </StatisticsContext.Provider>
  );
};
