// Atoms Components
import ButtonAtom from "@/components/atoms/ButtonAtom";
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

export default function Quests() {
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
      {!surveyInfo ? (
        <InfoCard>
          <ParagraphAtom>
            Для того, чтобы получить список квестов, вам нужно пройти базовый
            опрос, который соберет основные данные, на основе которых мы
            составим для вас программу тренировок!
          </ParagraphAtom>
          <ButtonAtom
            title="Пройти опрос"
            type="primary"
            onPress={onClickEnterSurvey}
          />
        </InfoCard>
      ) : (
        <View>
          <ParagraphAtom>Тут должны быть квесты</ParagraphAtom>
        </View>
      )}
    </ScrollView>
  );
}
