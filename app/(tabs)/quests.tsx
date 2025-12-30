// Atoms Components
import ButtonAtom from "@/components/atoms/ButtonAtom";
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
import HeadingAtom from "@/components/atoms/HeadingAtom";
import QuestCard from "@/components/molecules/QuestCard";
import { useQuests } from "@/hooks/useQuests";

export default function Quests() {
  const router = useRouter();
  const survey = useSurvey();
  const questsManager = useQuests();

  const [surveyInfo, setSurveyInfo] = useState(survey.getSurveyInfo());
  const [quests, setQuests] = useState<any[]>(questsManager.getQuests());

  useEffect(() => {
    const newQuests = questsManager.getQuests();
    setQuests(newQuests);
  }, [questsManager]);

  const onClickEnterSurvey = () => {
    router.replace("/survey/name");
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[GlobalStyles.container]}
    >
      <View style={[GlobalStyles.section, GlobalStyles.sectionVertical]}>
        <HeadingAtom level={"first"}>Список квестов</HeadingAtom>
        {!surveyInfo ? (
          <InfoCard>
            <ParagraphAtom
              style={[GlobalStyles.fwSemiBold, GlobalStyles.textPrimary]}
            >
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
          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
            {quests.map((quest, index) => (
              <QuestCard key={index} quest={quest} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
