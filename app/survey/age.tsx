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

export default function Age() {
  const router = useRouter();
  const survey = useSurvey();

  const [age, setAge] = useState<string>(survey.getAgeValue());

  const onClickPreviousQuestion = () => {
    router.replace("/survey/gender");
  };

  const onClickNextQuestion = () => {
    if (!age) {
      return;
    }

    router.replace("/survey/height");
  };

  const onChangeInputHandler = (age: string) => {
    setAge(age);
    survey.setAgeValue(age);
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
        <FontAwesome name="birthday-cake" size={64} color={Colors.textDark} />
        <HeadingAtom level={"second"}>Укажите возраст</HeadingAtom>
      </View>
      <View style={SurveyStyles.surveyInput}>
        <TextInput
          style={SurveyStyles.input}
          onChangeText={onChangeInputHandler}
          value={age}
          keyboardType="numeric"
        />
      </View>
      <ButtonAtom title="Далее" type="primary" onPress={onClickNextQuestion} />
    </View>
  );
}
