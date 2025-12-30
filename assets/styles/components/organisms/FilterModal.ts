// External Dependencies
import { StyleSheet } from "react-native";

// Constants
import Colors from "@/constants/colors";

const FilterModalStyles = StyleSheet.create({
  filterModal: {
    flex: 1,
  },
  filterModalClose: {
    alignSelf: "flex-end",
    margin: 16,
  },
  filterModalField: {},
  filterModalFieldSelected: {
    backgroundColor: Colors.secondaryLight,
  },
  filterModalFieldContent: {
    padding: 12,
  },
  filterModalFieldContentSelected: {
    color: Colors.primary,
  },
});

export default FilterModalStyles;
