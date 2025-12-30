// External Dependencies
import { StyleSheet } from "react-native";

// Constants
import Colors from "@/constants/colors";

const WelcomeStyles = StyleSheet.create({
  welcome: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
  },
  welcomeImage: {
    width: 450,
    height: 450,
  },
  welcomeContainer: {
    borderRadius: 16,
    backgroundColor: Colors.secondaryLight,
    padding: 12,
  },
  welcomeHeading: {
    textAlign: "center",
  },
  welcomeContainerDescription: {
    borderRadius: 16,
    backgroundColor: Colors.background,
    padding: 12,
  },
  welcomeDescription: {
    textAlign: "center",
  },
});

export default WelcomeStyles;
