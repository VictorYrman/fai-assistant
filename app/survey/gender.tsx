// Atoms Components
import ButtonAtom from "@/components/atoms/ButtonAtom";
import HeadingAtom from "@/components/atoms/HeadingAtom";

// Molecules Components
import GenderCard from "@/components/molecules/GenderCard";

// External Dependencies
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";

// Hooks
import { useSurvey } from "@/hooks/useSurvey";

// Constants
import Colors from "@/constants/colors";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import SurveyStyles from "@/assets/styles/screens/Survey";

export default function Gender() {
  const router = useRouter();
  const survey = useSurvey();

  const [gender, setGender] = useState<string>(survey.getGenderValue());

  const onClickPreviousQuestion = () => {
    router.replace("/survey/name");
  };

  const onClickNextQuestion = () => {
    if (!gender) {
      return;
    }

    router.replace("/survey/age");
  };

  const onChangeInputHandler = (gender: string) => {
    setGender(gender);
    survey.setGenderValue(gender);
  };

  const isMale = () => {
    return gender === "Мужской";
  };

  const isFemale = () => {
    return gender === "Женский";
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
        <FontAwesome name="transgender" size={64} color={Colors.textDark} />
        <HeadingAtom level={"second"}>Укажите пол</HeadingAtom>
      </View>
      <View style={SurveyStyles.surveyInput}>
        <View style={[GlobalStyles.content, GlobalStyles.contentHorizontal]}>
          <GenderCard
            title={"Мужской"}
            icon={"man"}
            isSelected={isMale()}
            onPress={() => onChangeInputHandler("Мужской")}
          />
          <GenderCard
            title={"Женский"}
            icon={"woman"}
            isSelected={isFemale()}
            onPress={() => onChangeInputHandler("Женский")}
          />
        </View>
      </View>
      <ButtonAtom
        title={"Далее"}
        type={"primary"}
        onPress={onClickNextQuestion}
      />
    </View>
  );
}
