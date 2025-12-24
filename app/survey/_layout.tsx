// External Dependencies
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { View } from "react-native";

// Assets
import SurveyStyles from "@/assets/styles/screens/Survey";

export default function SurveyLayout() {
  return (
    <View style={SurveyStyles.survey}>
      <Image
        source={require("../../assets/images/survey-image.png")}
        style={SurveyStyles.surveyImage}
      />
      <Stack>
        <Stack.Screen name="gender" options={{ headerShown: false }} />
        <Stack.Screen name="age" options={{ headerShown: false }} />
        <Stack.Screen name="height" options={{ headerShown: false }} />
        <Stack.Screen name="weight" options={{ headerShown: false }} />
        <Stack.Screen name="goal" options={{ headerShown: false }} />
        <Stack.Screen name="level" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}