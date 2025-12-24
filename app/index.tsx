// Atoms Components
import HeadingAtom from "@/components/atoms/HeadingAtom";
import ParagraphAtom from "@/components/atoms/ParagraphAtom";
import ButtonAtom from "@/components/atoms/ButtonAtom";

// External Dependencies
import { View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import WelcomeStyles from "@/assets/styles/screens/Welcome";

export default function Index() {
  const router = useRouter();

  const onClickEnterSurvey = () => {
    router.replace("/survey/gender");
  };

  const onClickSkipSurvey = () => {
    router.replace("/(tabs)");
  };

  return (
    <View
      style={[
        GlobalStyles.section,
        GlobalStyles.sectionVertical,
        WelcomeStyles.welcome,
      ]}
    >
      <Image
        source={require("../assets/images/welcome-robot.png")}
        style={WelcomeStyles.welcomeImage}
      />
      <View
        style={[
          GlobalStyles.section,
          GlobalStyles.sectionVertical,
          WelcomeStyles.welcomeContainer,
        ]}
      >
        <View style={[GlobalStyles.section, GlobalStyles.sectionVertical]}>
          <HeadingAtom level={"first"} style={WelcomeStyles.welcomeHeading}>
            Добро пожаловать в FAI!
          </HeadingAtom>
          <View style={WelcomeStyles.welcomeContainerDescription}>
            <ParagraphAtom style={WelcomeStyles.welcomeDescription}>
              Я твой верный фитнес-ассистент! Чтобы создать идеальную программу
              тренировок, расскажи о себе:
            </ParagraphAtom>
          </View>
          <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
            <ButtonAtom
              title="Пройти опрос"
              type="primary"
              onPress={onClickEnterSurvey}
            />
            <ButtonAtom
              title="Пропустить опрос"
              type="default"
              onPress={onClickSkipSurvey}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
