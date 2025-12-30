// Atoms Components
import HeadingAtom from "@/components/atoms/HeadingAtom";
import ParagraphAtom from "@/components/atoms/ParagraphAtom";

// External Dependencies
import { View } from "react-native";

// Hooks
import { useStatistics } from "@/hooks/useStatistics";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import InfoCard from "@/components/molecules/InfoCard";
import { useSurvey } from "@/hooks/useSurvey";
import ButtonAtom from "@/components/atoms/ButtonAtom";
import { useRouter } from "expo-router";

export default function Statistics() {
  const router = useRouter();
  const survey = useSurvey();
  const statisticsManager = useStatistics();

  const surveyInfo = survey.getSurveyInfo();

  const onClickEnterSurvey = () => {
    router.replace("/survey/name")
  }

  return (
    <View
      style={[
        GlobalStyles.container,
        GlobalStyles.section,
        GlobalStyles.sectionVertical,
      ]}
    >
      <HeadingAtom level={"first"}>Статистика</HeadingAtom>
      {!surveyInfo ? (
        <InfoCard>
          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
            <ParagraphAtom
              style={[GlobalStyles.fwSemiBold, GlobalStyles.textPrimary]}
            >
              Вам необходимо пройти базовый опрос, чтобы вы могли отслеживать
              статистику
            </ParagraphAtom>
            <ButtonAtom title="Пройти опрос" type="primary" onPress={onClickEnterSurvey} />
          </View>
        </InfoCard>
      ) : (
        <InfoCard>
          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
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
  );
}
