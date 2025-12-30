// Atoms Components
import HeadingAtom from "@/components/atoms/HeadingAtom";
import ParagraphAtom from "@/components/atoms/ParagraphAtom";

// External Dependencies
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

// Hooks
import { useSurvey } from "@/hooks/useSurvey";

// Constants
import Colors from "@/constants/colors";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import ProfileStyles from "@/assets/styles/screens/Profile";
import InfoCard from "@/components/molecules/InfoCard";
import { useQuests } from "@/hooks/useQuests";
import { useStatistics } from "@/hooks/useStatistics";

export default function Profile() {
  const router = useRouter();
  const survey = useSurvey();
  const questsManager = useQuests();
  const statisticsManager = useStatistics();

  const onClickRetakeSurvey = () => {
    router.replace("/survey/name");
  };

  const onClickResetData = () => {
    survey.resetSurveyInfo();
    questsManager.resetQuests();
    statisticsManager.resetStatistics();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[GlobalStyles.container]}
    >
      <View style={[GlobalStyles.section, GlobalStyles.sectionVertical]}>
        <HeadingAtom level={"first"}>Профиль</HeadingAtom>

        <InfoCard>
          <ParagraphAtom
            style={[GlobalStyles.fwBold, GlobalStyles.textPrimary]}
          >
            {survey.getNameValue()}
          </ParagraphAtom>
        </InfoCard>

        <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
          <Pressable
            onPress={onClickRetakeSurvey}
            style={[
              GlobalStyles.content,
              GlobalStyles.contentHorizontal,
              ProfileStyles.profileField,
            ]}
          >
            <FontAwesome
              name="question-circle"
              size={32}
              color={Colors.textDark}
            />
            <ParagraphAtom style={[GlobalStyles.fwBold]}>
              Перепройти опрос
            </ParagraphAtom>
          </Pressable>
          <Pressable
            onPress={onClickResetData}
            style={[
              GlobalStyles.content,
              GlobalStyles.contentHorizontal,
              ProfileStyles.profileField,
            ]}
          >
            <FontAwesome name="trash" size={32} color={Colors.textDark} />
            <ParagraphAtom style={[GlobalStyles.fwBold]}>
              Сбросить данные
            </ParagraphAtom>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
