import { createContext, ReactNode, useContext, useState } from "react";

type SurveyInfoObject = {
    gender: string;
    age: string;
    height: string;
    weight: string;
    goal: string;
    level: string;
}

type SurveyContextType = {
    setGenderValue: (gender: string) => void;
    setAgeValue: (age: string) => void;
    setHeightValue: (height: string) => void;
    setWeightValue: (weight: string) => void;
    setGoalValue: (goal: string) => void;
    setLevelValue: (level: string) => void;
    getGenderValue: () => string;
    getAgeValue: () => string;
    getHeightValue: () => string;
    getWeightValue: () => string;
    getGoalValue: () => string;
    getLevelValue: () => string;
    getSurveyInfo: () => SurveyInfoObject | null
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const useSurvey = () => {
  const context = useContext(SurveyContext);

  if (!context) throw new Error("Ошибка контекста Survey");

  return context;
};

export const SurveyProvider = ({ children }: { children: ReactNode }) => {
    const [gender, setGender] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [goal, setGoal] = useState<string>("");
    const [level, setLevel] = useState<string>("");

    const setGenderValue = (gender: string) => {
        setGender(gender);
    }

    const setAgeValue = (age: string) => {
        setAge(age);
    }

    const setHeightValue = (height: string) => {
        setHeight(height);
    }

    const setWeightValue = (weight: string) => {
        setWeight(weight);
    }

    const setGoalValue = (goal: string) => {
        setGoal(goal);
    }

    const setLevelValue = (level: string) => {
        setLevel(level);
    }

    const getGenderValue = () => {
        return gender;
    }

    const getAgeValue = () => {
        return age;
    }

    const getHeightValue = () => {
        return height;
    }

    const getWeightValue = () => {
        return weight;
    }

    const getGoalValue = () => {
        return goal;
    }

    const getLevelValue = () => {
        return level;
    }

    const getSurveyInfo = () => {
        if (gender === "" || age === "" || height === "" || weight === "" || goal === "" || level === "") {
            return null;
        }

        const surveyInfo = {
            gender, age, height, weight, goal, level
        };

        return surveyInfo;
    }

    return (
        <SurveyContext.Provider value={{ setGenderValue, setAgeValue, setHeightValue, setWeightValue, setGoalValue, setLevelValue, getGenderValue, getAgeValue, getHeightValue, getWeightValue, getGoalValue, getLevelValue, getSurveyInfo }}>
            {children}
        </SurveyContext.Provider>
    )
};
