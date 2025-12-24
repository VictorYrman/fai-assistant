// Atoms Components
import HeadingAtom from "@/components/atoms/HeadingAtom";
import ParagraphAtom from "@/components/atoms/ParagraphAtom";

// External Dependencies
import { useState } from "react";
import { ScrollView, View } from "react-native";

// Hooks
import { useSurvey } from "@/hooks/useSurvey";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";

export default function Index() {
  const survey = useSurvey();
  const [surveyInfo, setSurveyInfo] = useState(survey.getSurveyInfo());

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        GlobalStyles.container,
        GlobalStyles.section,
        GlobalStyles.sectionVertical,
      ]}
    >
      <HeadingAtom level={"first"}>
        С возвращением, дорогой пользователь!
      </HeadingAtom>
      <View>
        <HeadingAtom level={"second"}>Данные из вашего опроса</HeadingAtom>
        {surveyInfo ? (
          <View>
            <ParagraphAtom>Пол: {surveyInfo.gender}</ParagraphAtom>
            <ParagraphAtom>Возраст: {surveyInfo.age}</ParagraphAtom>
            <ParagraphAtom>Рост: {surveyInfo.height}</ParagraphAtom>
            <ParagraphAtom>Вес: {surveyInfo.weight}</ParagraphAtom>
            <ParagraphAtom>Цель: {surveyInfo.goal}</ParagraphAtom>
            <ParagraphAtom>
              Уровень подготовки: {surveyInfo.level}
            </ParagraphAtom>
          </View>
        ) : (
          <ParagraphAtom>Данных нет, вы не прошли опрос!</ParagraphAtom>
        )}
      </View>
      <View>
        <HeadingAtom level={"second"}>Статистика</HeadingAtom>
      </View>
      <View>
        <HeadingAtom level={"second"}>Список ваших квестов</HeadingAtom>
      </View>
      <View>
        <HeadingAtom level={"second"}>Список всех упражнений</HeadingAtom>
      </View>
    </ScrollView>
  );
}
