import Colors from "@/constants/colors";
import { StyleSheet } from "react-native";

const HeaderStyles = StyleSheet.create({
  header: {
    borderRadius: 16,
    backgroundColor: Colors.secondaryLight,
    elevation: 2,
    marginHorizontal: 16,
    padding: 12,
  },
  headerContent: {},
  title: {
    color: Colors.primary,
  },
});

export default HeaderStyles;
