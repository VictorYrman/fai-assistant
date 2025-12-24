import Colors from "@/constants/colors";
import { StyleSheet } from "react-native";

const GoalCardStyles = StyleSheet.create({
    goalCard: {
        flexGrow: 1,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "transparent",
        borderRadius: 16,
        padding: 12
    },
    goalCardSelected: {
        borderColor: Colors.primary,
        backgroundColor: Colors.secondaryLight
    },
    goalCardSelectedText: {
        color: Colors.primary
    }
})

export default GoalCardStyles;