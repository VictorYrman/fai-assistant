// Atoms Components
import ButtonAtom from "@/components/atoms/ButtonAtom";
import HeadingAtom from "@/components/atoms/HeadingAtom";

// External Dependencies
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

// Hooks
import { useSurvey } from "@/hooks/useSurvey";

// Constants
import Colors from "@/constants/colors";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import SurveyStyles from "@/assets/styles/screens/Survey";
import { isWeightValid } from "@/services/validation";

export default function Weight() {
  const router = useRouter();
  const survey = useSurvey();

  const [weight, setWeight] = useState<string>(survey.getWeightValue());

  const onClickPreviousQuestion = () => {
    router.replace("/survey/height");
  };

  const onClickNextQuestion = () => {
    if (!weight) {
      return;
    }

    const isValid = isWeightValid(weight);

    if (isValid) {
      router.replace("/survey/goal");
    }
  };

  const onChangeInputHandler = (weight: string) => {
    setWeight(weight);
    survey.setWeightValue(weight);
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
        <FontAwesome name="arrows-h" size={64} color={Colors.textDark} />
        <HeadingAtom level={"second"}>Укажите вес</HeadingAtom>
      </View>
      <View style={SurveyStyles.surveyInput}>
        <TextInput
          style={SurveyStyles.input}
          onChangeText={onChangeInputHandler}
          value={weight}
          keyboardType="numeric"
        />
      </View>
      <ButtonAtom title="Далее" type="primary" onPress={onClickNextQuestion} />
    </View>
  );
}
