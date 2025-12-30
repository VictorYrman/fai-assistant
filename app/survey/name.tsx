// Atoms Components
import HeadingAtom from "@/components/atoms/HeadingAtom";
import ButtonAtom from "@/components/atoms/ButtonAtom";

// External Dependencies
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// Services
import { isNameValid } from "@/services/validation";

// Hooks
import { useSurvey } from "@/hooks/useSurvey";

// Constants
import Colors from "@/constants/colors";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import SurveyStyles from "@/assets/styles/screens/Survey";

export default function Name() {
  const router = useRouter();
  const survey = useSurvey();

  const [name, setName] = useState<string>(survey.getNameValue());

  const onClickNextQuestion = () => {
    if (!name) {
      return;
    }

    const isValid = isNameValid(name);

    if (isValid) {
      router.replace("/survey/gender");
    }
  };

  const onChangeInputHandler = (name: string) => {
    setName(name);
    survey.setNameValue(name);
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
        <Pressable>
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
        <FontAwesome name="user" size={64} color={Colors.textDark} />
        <HeadingAtom level={"second"}>Укажите имя</HeadingAtom>
      </View>

      <View style={SurveyStyles.surveyInput}>
        <TextInput
          style={SurveyStyles.input}
          onChangeText={onChangeInputHandler}
          value={name}
        />
      </View>

      <ButtonAtom title="Далее" type="primary" onPress={onClickNextQuestion} />
    </View>
  );
}
