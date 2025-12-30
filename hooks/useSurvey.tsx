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
import { SurveyInfoObject } from "@/constants/types";

type SurveyContextType = {
  setNameValue: (name: string) => void;
  setGenderValue: (gender: string) => void;
  setAgeValue: (age: string) => void;
  setHeightValue: (height: string) => void;
  setWeightValue: (weight: string) => void;
  setGoalValue: (goal: string) => void;
  setLevelValue: (level: string) => void;
  getNameValue: () => string;
  getGenderValue: () => string;
  getAgeValue: () => string;
  getHeightValue: () => string;
  getWeightValue: () => string;
  getGoalValue: () => string;
  getLevelValue: () => string;
  getSurveyInfo: () => SurveyInfoObject | null;
  resetSurveyInfo: () => void;
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const useSurvey = () => {
  const context = useContext(SurveyContext);

  if (!context) throw new Error("Ошибка контекста Survey");

  return context;
};

const NAME_KEY = "name";
const GENDER_KEY = "gender";
const AGE_KEY = "age";
const HEIGHT_KEY = "height";
const WEIGHT_KEY = "weight";
const GOAL_KEY = "goal";
const LEVEL_KEY = "level";

export const SurveyProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [level, setLevel] = useState<string>("");

  const saveSurveyValueToStorage = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  };

  const loadSurveyValueFromStorage = async (key: string) => {
    const value = await AsyncStorage.getItem(key);

    return value;
  };

  useEffect(() => {
    const loadSurveyInfo = async () => {
      try {
        const name = (await loadSurveyValueFromStorage(NAME_KEY)) || "";
        const gender = (await loadSurveyValueFromStorage(GENDER_KEY)) || "";
        const age = (await loadSurveyValueFromStorage(AGE_KEY)) || "";
        const height = (await loadSurveyValueFromStorage(HEIGHT_KEY)) || "";
        const weight = (await loadSurveyValueFromStorage(WEIGHT_KEY)) || "";
        const goal = (await loadSurveyValueFromStorage(GOAL_KEY)) || "";
        const level = (await loadSurveyValueFromStorage(LEVEL_KEY)) || "";

        setName(name);
        setGender(gender);
        setAge(age);
        setHeight(height);
        setWeight(weight);
        setGoal(goal);
        setLevel(level);
      } catch (error) {
        console.error(error);
      }
    };

    loadSurveyInfo();
  }, []);

  const resetSurveyInfo = () => {
    saveSurveyValueToStorage(NAME_KEY, "");
    saveSurveyValueToStorage(GENDER_KEY, "");
    saveSurveyValueToStorage(AGE_KEY, "");
    saveSurveyValueToStorage(HEIGHT_KEY, "");
    saveSurveyValueToStorage(WEIGHT_KEY, "");
    saveSurveyValueToStorage(GOAL_KEY, "");
    saveSurveyValueToStorage(LEVEL_KEY, "");

    setName("");
    setGender("");
    setAge("");
    setHeight("");
    setWeight("");
    setGoal("");
    setLevel("");
  };

  const setNameValue = (name: string) => {
    setName(name);
    saveSurveyValueToStorage(NAME_KEY, name);
  }

  const setGenderValue = (gender: string) => {
    setGender(gender);
    saveSurveyValueToStorage(GENDER_KEY, gender);
  };

  const setAgeValue = (age: string) => {
    setAge(age);
    saveSurveyValueToStorage(AGE_KEY, age);
  };

  const setHeightValue = (height: string) => {
    setHeight(height);
    saveSurveyValueToStorage(HEIGHT_KEY, height);
  };

  const setWeightValue = (weight: string) => {
    setWeight(weight);
    saveSurveyValueToStorage(WEIGHT_KEY, weight);
  };

  const setGoalValue = (goal: string) => {
    setGoal(goal);
    saveSurveyValueToStorage(GOAL_KEY, goal);
  };

  const setLevelValue = (level: string) => {
    setLevel(level);
    saveSurveyValueToStorage(LEVEL_KEY, level);
  };

  const getNameValue = () => {
    return name;
  }

  const getGenderValue = () => {
    return gender;
  };

  const getAgeValue = () => {
    return age;
  };

  const getHeightValue = () => {
    return height;
  };

  const getWeightValue = () => {
    return weight;
  };

  const getGoalValue = () => {
    return goal;
  };

  const getLevelValue = () => {
    return level;
  };

  const getSurveyInfo = () => {
    if (
      name === "" ||
      gender === "" ||
      age === "" ||
      height === "" ||
      weight === "" ||
      goal === "" ||
      level === ""
    ) {
      return null;
    }

    const surveyInfo = {
      name,
      gender,
      age,
      height,
      weight,
      goal,
      level,
    };

    return surveyInfo;
  };

  return (
    <SurveyContext.Provider
      value={{
        setNameValue,
        setGenderValue,
        setAgeValue,
        setHeightValue,
        setWeightValue,
        setGoalValue,
        setLevelValue,
        getNameValue,
        getGenderValue,
        getAgeValue,
        getHeightValue,
        getWeightValue,
        getGoalValue,
        getLevelValue,
        getSurveyInfo,
        resetSurveyInfo,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
