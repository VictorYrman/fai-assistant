// Molecules Components
import Header from "@/components/molecules/Header";

// External Dependencies
import { Stack } from "expo-router";
import { SurveyProvider } from "@/hooks/useSurvey";

export default function RootLayout() {
  return (
    <SurveyProvider>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="survey" options={{ headerShown: false }} />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: true, header: () => <Header /> }}
        />
      </Stack>
    </SurveyProvider>
  );
}
