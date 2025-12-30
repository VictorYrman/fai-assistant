// Molecules Components
import Header from "@/components/molecules/Header";

// External Dependencies
import { Stack } from "expo-router";

// Hooks
import { ExercisesProvider } from "@/hooks/useExercises";
import { QuestsProvider } from "@/hooks/useQuests";
import { StatisticsProvider } from "@/hooks/useStatistics";
import { SurveyProvider } from "@/hooks/useSurvey";

export default function RootLayout() {
  return (
    <SurveyProvider>
      <ExercisesProvider>
        <QuestsProvider>
          <StatisticsProvider>
            <Stack initialRouteName="welcome">
              <Stack.Screen name="welcome" options={{ headerShown: false }} />
              <Stack.Screen name="survey" options={{ headerShown: false }} />
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: true, header: () => <Header /> }}
              />
            </Stack>
          </StatisticsProvider>
        </QuestsProvider>
      </ExercisesProvider>
    </SurveyProvider>
  );
}
