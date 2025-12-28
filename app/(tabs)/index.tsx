// Atoms Components
import ButtonAtom from "@/components/atoms/ButtonAtom";
import HeadingAtom from "@/components/atoms/HeadingAtom";
import ParagraphAtom from "@/components/atoms/ParagraphAtom";

// Molecules Components
import InfoCard from "@/components/molecules/InfoCard";

// External Dependencies
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

// Hooks
import { useSurvey } from "@/hooks/useSurvey";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import ExerciseCard from "@/components/molecules/ExerciseCard";
import { getAllExercises } from "@/services/firebaseServices";

export default function Index() {
  const router = useRouter();
  const survey = useSurvey();

  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [surveyInfo, setSurveyInfo] = useState(survey.getSurveyInfo());

  useEffect(() => {
    const loadExercises = async () => {
      setLoading(true);

      try {
        const data = await getAllExercises();
        setExercises(data || []);
      } catch (error) {
        console.error(error);
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
    const newSurveyInfo = survey.getSurveyInfo();
    setSurveyInfo(newSurveyInfo);
  }, [survey]);

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
          <ParagraphAtom
            style={[GlobalStyles.fwSemiBold, GlobalStyles.textPrimary]}
          >
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
        {loading ? (
          <ParagraphAtom>Упражнения загружаются...</ParagraphAtom>
        ) : (
          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
            {exercises.map((exercise) => (
              <ExerciseCard key={exercise?.id} exercise={exercise} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
