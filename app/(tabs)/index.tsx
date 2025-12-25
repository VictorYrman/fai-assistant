// Atoms Components
import ButtonAtom from "@/components/atoms/ButtonAtom";
import HeadingAtom from "@/components/atoms/HeadingAtom";
import ParagraphAtom from "@/components/atoms/ParagraphAtom";

// Molecules Components
import InfoCard from "@/components/molecules/InfoCard";

// External Dependencies
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

// Hooks
import { useSurvey } from "@/hooks/useSurvey";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";

export default function Index() {
  const router = useRouter();
  const survey = useSurvey();
  const [surveyInfo, setSurveyInfo] = useState(survey.getSurveyInfo());

  const onClickEnterSurvey = () => {
    router.replace("/survey/gender");
  };

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
      <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
        <HeadingAtom level={"second"}>Данные из вашего опроса</HeadingAtom>
        {surveyInfo ? (
          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
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
      <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
        <HeadingAtom level={"second"}>Статистика</HeadingAtom>
      </View>
      <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
        <HeadingAtom level={"second"}>Список ваших квестов</HeadingAtom>
        <InfoCard>
          <ParagraphAtom>
            У вас нет активных квестов. Пройдите опрос, чтобы получить
            персональные рекомендации!
          </ParagraphAtom>
          <ButtonAtom
            title="Пройти опрос"
            type="primary"
            onPress={onClickEnterSurvey}
          />
        </InfoCard>
      </View>
      <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
        <HeadingAtom level={"second"}>Список всех упражнений</HeadingAtom>
      </View>
    </ScrollView>
  );
}
