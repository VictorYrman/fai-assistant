// Atoms Components
import HeadingAtom from "@/components/atoms/HeadingAtom";
import ButtonAtom from "@/components/atoms/ButtonAtom";

// Molecules Components
import GoalCard from "@/components/molecules/GoalCard";

// External Dependencies
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

// Hooks
import { useSurvey } from "@/hooks/useSurvey";

// Constants
import Colors from "@/constants/colors";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import SurveyStyles from "@/assets/styles/screens/Survey";

export default function Weight() {
  const router = useRouter();
  const survey = useSurvey();

  const [goal, setGoal] = useState<string>(survey.getGoalValue());

  const onClickPreviousQuestion = () => {
    router.replace("/survey/weight");
  };

  const onClickNextQuestion = () => {
    if (!goal) {
      return;
    }

    router.replace("/survey/level");
  };

  const onChangeInputHandler = (goal: string) => {
    setGoal(goal);
    survey.setGoalValue(goal);
  };

  const isWeightLossGoal = () => {
    return goal === "Похудеть";
  };

  const isMuscleBuildingGoal = () => {
    return goal === "Наращивание мышц";
  };

  const isFormSupportGoal = () => {
    return goal === "Поддерживать форму";
  };

  return (
    <View
      style={[
        GlobalStyles.section,
        GlobalStyles.sectionVertical,
        SurveyStyles.surveyContainer,
      ]}
    >
      <View
        style={[
          GlobalStyles.content,
          GlobalStyles.contentHorizontal,
          SurveyStyles.surveyHeader,
        ]}
      >
        <Pressable onPress={onClickPreviousQuestion}>
          <FontAwesome name="arrow-left" size={32} color={Colors.textDark} />
        </Pressable>
        <HeadingAtom level={"first"} style={SurveyStyles.surveyLogoTitle}>
          FAI
        </HeadingAtom>
      </View>
      <View
        style={[
          GlobalStyles.content,
          GlobalStyles.contentVertical,
          SurveyStyles.surveyContent,
        ]}
      >
        <FontAwesome name="flag-checkered" size={64} color={Colors.textDark} />
        <HeadingAtom level={"second"}>Укажите цель</HeadingAtom>
      </View>
      <View style={SurveyStyles.surveyInput}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[GlobalStyles.content, GlobalStyles.contentVertical]}
        >
          <GoalCard
            title={"Похудеть"}
            paragraph={"Сбрось лишний вес с FAI-программой!"}
            icon={"scale-bathroom"}
            isSelected={isWeightLossGoal()}
            onPress={() => onChangeInputHandler("Похудеть")}
          />
          <GoalCard
            title={"Наращивание мышц"}
            paragraph={"Построй сильное тело с FAI-программой!"}
            icon={"dumbbell"}
            isSelected={isMuscleBuildingGoal()}
            onPress={() => onChangeInputHandler("Наращивание мышц")}
          />
          <GoalCard
            title={"Поддерживать форму"}
            paragraph={"Поддержи идеальный баланс с FAI-программой"}
            icon={"heart-pulse"}
            isSelected={isFormSupportGoal()}
            onPress={() => onChangeInputHandler("Поддерживать форму")}
          />
        </ScrollView>
      </View>
      <ButtonAtom title="Далее" type="primary" onPress={onClickNextQuestion} />
    </View>
  );
}
