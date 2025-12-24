// Atoms Components
import HeadingAtom from "@/components/atoms/HeadingAtom";
import ButtonAtom from "@/components/atoms/ButtonAtom";

// Molecules Components
import LevelCard from "@/components/molecules/LevelCard";

// External Dependencies
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

// Hooks
import { useSurvey } from "@/hooks/useSurvey";

// Colors
import Colors from "@/constants/colors";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import SurveyStyles from "@/assets/styles/screens/Survey";

type SurveyInfoObject = {
  gender: string;
  age: string;
  height: string;
  weight: string;
  goal: string;
  level: string;
};

export default function Level() {
  const router = useRouter();
  const survey = useSurvey();

  const [level, setLevel] = useState<string>(survey.getLevelValue());
  const [surveyInfo, setSurveyInfo] = useState<SurveyInfoObject | null>();

  useEffect(() => {
    const newSurveyInfo = survey.getSurveyInfo();
    setSurveyInfo(newSurveyInfo);
  }, [survey]);

  const onClickPreviousQuestion = () => {
    router.replace("/survey/goal");
  };

  const onChangeInputHandler = (level: string) => {
    setLevel(level);
    survey.setLevelValue(level);
  };

  const onClickSendData = () => {
    if (!level) {
      return;
    }

    router.replace("/(tabs)");
  };

  const isBeginnerLevel = () => {
    return level === "Начинающий";
  };

  const isAverageLevel = () => {
    return level === "Средний уровень";
  };

  const isAdvancedLevel = () => {
    return level === "Продвинутый уровень";
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
        <FontAwesome name="signal" size={64} color={Colors.textDark} />
        <HeadingAtom level={"second"}>Укажите уровень подготовки</HeadingAtom>
      </View>
      <View style={SurveyStyles.surveyInput}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[GlobalStyles.content, GlobalStyles.contentVertical]}
        >
          <LevelCard
            title={"Начинающий"}
            paragraph={"Я никогда раньше не занимался"}
            icon={"weight-lifter"}
            isSelected={isBeginnerLevel()}
            onPress={() => onChangeInputHandler("Начинающий")}
          />
          <LevelCard
            title={"Средний уровень"}
            paragraph={"Я раньше занимался"}
            icon={"dumbbell"}
            isSelected={isAverageLevel()}
            onPress={() => onChangeInputHandler("Средний уровень")}
          />
          <LevelCard
            title={"Продвинутый уровень"}
            paragraph={"Я занимаюсь уже много лет"}
            icon={"arm-flex"}
            isSelected={isAdvancedLevel()}
            onPress={() => onChangeInputHandler("Продвинутый уровень")}
          />
        </ScrollView>
      </View>
      <ButtonAtom title="Отправить" type="primary" onPress={onClickSendData} />
    </View>
  );
}
