// External Dependencies
import { StyleSheet } from "react-native";

// Constants
import Colors from "@/constants/colors";

const SurveyStyles = StyleSheet.create({
  survey: {
    flex: 1,
  },
  surveyImage: {
    height: 200,
    borderStartEndRadius: 16,
    borderEndEndRadius: 16,
  },
  surveyContainer: {
    flex: 1,
    gap: 32,
    margin: 16,
  },
  surveyHeader: {
    alignItems: "center",
    position: "relative"
  },
  surveyLogoTitle: {
    color: Colors.primary,
    position: "absolute",
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
  surveyContent: {
    alignItems: "center",
  },
  surveyInput: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
  },
});

export default SurveyStyles;
