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
import HomeStyles from "@/assets/styles/screens/Home";
import ExerciseCard from "@/components/molecules/ExerciseCard";
import QuestCard from "@/components/molecules/QuestCard";
import FilterModal from "@/components/organisms/FilterModal";
import { useExercises } from "@/hooks/useExercises";
import { useQuests } from "@/hooks/useQuests";
import { useStatistics } from "@/hooks/useStatistics";
import {
  getAllExerciseCategories,
  getAllMuscleCategories,
} from "@/services/firebaseServices";

type CategoryObject = {
  id: number;
  title: string;
};

type MuscleObject = {
  id: number;
  title: string;
};

export default function Index() {
  const router = useRouter();
  const survey = useSurvey();
  const statisticsManager = useStatistics();
  const questsManager = useQuests();
  const exercisesManager = useExercises();

  const [exerciseCategories, setExerciseCategories] = useState<
    CategoryObject[]
  >([]);
  const [muscleCategories, setMuscleCategories] = useState<MuscleObject[]>([]);

  const [exerciseCategoriesModalVisible, setExerciseCategoriesModalVisible] =
    useState<boolean>(false);
  const [muscleCategoriesModalVisible, setMuscleCategoriesModalVisible] =
    useState<boolean>(false);

  const [exerciseCategory, setExerciseCategory] =
    useState<CategoryObject | null>(null);
  const [muscleCategory, setMuscleCategory] = useState<MuscleObject | null>(
    null
  );

  const quests = questsManager.getQuests();

  const [exercises, setExercises] = useState(exercisesManager.getExercises());

  const [surveyInfo, setSurveyInfo] = useState(survey.getSurveyInfo());

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const exerciseCategories = await getAllExerciseCategories();
        const muscleCategories = await getAllMuscleCategories();

        setExerciseCategories(exerciseCategories);
        setMuscleCategories(muscleCategories);
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const exercises = exercisesManager.getFilteredExercises(
      exerciseCategory,
      muscleCategory
    );
    setExercises(exercises);
  }, [exercisesManager, exerciseCategory, muscleCategory]);

  useEffect(() => {
    const newSurveyInfo = survey.getSurveyInfo();
    setSurveyInfo(newSurveyInfo);
  }, [survey]);

  const onClickEnterSurvey = () => {
    router.replace("/survey/name");
  };

  const onClickEnterQuests = () => {
    router.replace("/(tabs)/quests");
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[GlobalStyles.container]}
      >
        <View style={[GlobalStyles.section, GlobalStyles.sectionVertical]}>
          <HeadingAtom level={"first"}>
            С возвращением, {surveyInfo?.name}
          </HeadingAtom>
          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
            <HeadingAtom level={"second"}>Статистика</HeadingAtom>
            {!surveyInfo ? (
              <InfoCard>
                <View
                  style={[GlobalStyles.content, GlobalStyles.contentVertical]}
                >
                  <ParagraphAtom
                    style={[GlobalStyles.fwSemiBold, GlobalStyles.textPrimary]}
                  >
                    Вам необходимо пройти базовый опрос, чтобы вы могли
                    отслеживать статистику
                  </ParagraphAtom>
                  <ButtonAtom
                    title="Пройти опрос"
                    type="primary"
                    onPress={onClickEnterSurvey}
                  />
                </View>
              </InfoCard>
            ) : (
              <InfoCard>
                <View
                  style={[GlobalStyles.content, GlobalStyles.contentVertical]}
                >
                  <ParagraphAtom>
                    <ParagraphAtom style={[GlobalStyles.fwBold]}>
                      Количество выполненных квестов:
                    </ParagraphAtom>{" "}
                    {statisticsManager.getCompletedQuests()}
                  </ParagraphAtom>

                  <ParagraphAtom>
                    <ParagraphAtom style={[GlobalStyles.fwBold]}>
                      Количество выполненных квестов на выносливость:
                    </ParagraphAtom>{" "}
                    {statisticsManager.getEnduranceQuests()}
                  </ParagraphAtom>

                  <ParagraphAtom>
                    <ParagraphAtom style={[GlobalStyles.fwBold]}>
                      Количество выполненных квестов на силу:
                    </ParagraphAtom>{" "}
                    {statisticsManager.getStrengthQuests()}
                  </ParagraphAtom>

                  <ParagraphAtom>
                    <ParagraphAtom style={[GlobalStyles.fwBold]}>
                      Количество выполненных квестов на гибкость:
                    </ParagraphAtom>{" "}
                    {statisticsManager.getFlexibilityQuests()}
                  </ParagraphAtom>
                </View>
              </InfoCard>
            )}
          </View>
          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
            <HeadingAtom level={"second"}>Список ваших квестов</HeadingAtom>
            {!surveyInfo ? (
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
            ) : quests.length < 1 ? (
              <InfoCard>
                <ParagraphAtom>
                  Вы успешно прошли квесты на этот день, поздравляю! Продолжай в
                  том же духе!
                </ParagraphAtom>
              </InfoCard>
            ) : (
              <View
                style={[GlobalStyles.content, GlobalStyles.contentVertical]}
              >
                <QuestCard quest={quests[0]} />
                <ButtonAtom
                  title="Перейти к квестам"
                  type="primary"
                  onPress={onClickEnterQuests}
                />
              </View>
            )}
          </View>
          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
            <HeadingAtom level={"second"}>Список всех упражнений</HeadingAtom>
            <View
              style={[
                GlobalStyles.content,
                GlobalStyles.contentHorizontal,
                HomeStyles.homeFilters,
              ]}
            >
              <ButtonAtom
                title="Категория"
                type={"primary"}
                onPress={() => setExerciseCategoriesModalVisible(true)}
              />
              <ButtonAtom
                title="Мускулы"
                type={"primary"}
                onPress={() => setMuscleCategoriesModalVisible(true)}
              />
            </View>
            <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
              {exercises.map((exercise) => (
                <ExerciseCard key={exercise?.id} exercise={exercise} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <FilterModal
        fields={exerciseCategories}
        visible={exerciseCategoriesModalVisible}
        selectedValue={exerciseCategory}
        onClose={() => setExerciseCategoriesModalVisible(false)}
        onSelect={(exerciseCategory) => setExerciseCategory(exerciseCategory)}
      />

      <FilterModal
        fields={muscleCategories}
        visible={muscleCategoriesModalVisible}
        selectedValue={muscleCategory}
        onClose={() => setMuscleCategoriesModalVisible(false)}
        onSelect={(muscleCategory) => setMuscleCategory(muscleCategory)}
      />
    </>
  );
}
