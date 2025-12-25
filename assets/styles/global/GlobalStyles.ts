// External Dependencies
import { StyleSheet } from "react-native";

// Constants
import Colors from "@/constants/colors";

const GlobalStyles = StyleSheet.create({
  container: {
    margin: 16,
  },
  section: {
    gap: 16,
  },
  sectionHorizontal: {
    flexDirection: "row",
  },
  sectionVertical: {
    flexDirection: "column",
  },
  content: {
    gap: 8,
  },
  contentHorizontal: {
    flexDirection: "row",
  },
  contentVertical: {
    flexDirection: "column",
  },
  fwSemiBold: {
    fontWeight: 600
  },
  fwBold: {
    fontWeight: 700
  },
  textPrimary: {
    color: Colors.primary
  }
});

export default GlobalStyles;
