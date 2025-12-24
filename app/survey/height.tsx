// Atoms Components
import HeadingAtom from "@/components/atoms/HeadingAtom";
import ButtonAtom from "@/components/atoms/ButtonAtom";

// External Dependencies
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

// Hooks
import { useSurvey } from "@/hooks/useSurvey";

// Constants
import Colors from "@/constants/colors";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import SurveyStyles from "@/assets/styles/screens/Survey";

export default function Height() {
  const router = useRouter();
  const survey = useSurvey();

  const [height, setHeight] = useState<string>(survey.getHeightValue());

  const onClickPreviousQuestion = () => {
    router.replace("/survey/age");
  };

  const onClickNextQuestion = () => {
    if (!height) {
      return;
    }

    router.replace("/survey/weight");
  };

  const onChangeInputHandler = (height: string) => {
    setHeight(height);
    survey.setHeightValue(height);
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
        <FontAwesome name="arrows-v" size={64} color={Colors.textDark} />
        <HeadingAtom level={"second"}>Укажите рост</HeadingAtom>
      </View>
      <View style={SurveyStyles.surveyInput}>
        <TextInput
          style={SurveyStyles.input}
          onChangeText={onChangeInputHandler}
          value={height}
          keyboardType="numeric"
        />
      </View>
      <ButtonAtom title="Далее" type="primary" onPress={onClickNextQuestion} />
    </View>
  );
}
