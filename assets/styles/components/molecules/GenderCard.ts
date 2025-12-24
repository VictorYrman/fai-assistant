import Colors from "@/constants/colors";
import { StyleSheet } from "react-native";

const GenderCardStyles = StyleSheet.create({
    genderCard: {
        flexGrow: 1,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "transparent",
        borderRadius: 16,
        padding: 12,
    },
    genderCardSelected: {
        borderColor: Colors.primary,
        backgroundColor: Colors.secondaryLight,
    },
    genderCardSelectedText: {
        color: Colors.primary
    }
})

export default GenderCardStyles;