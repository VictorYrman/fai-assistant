// External Dependencies
import { StyleSheet } from "react-native";

// Constants
import Colors from "@/constants/colors";

const ExerciseCardStyles = StyleSheet.create({
    exerciseCard: {
        borderRadius: 16,
        backgroundColor: Colors.secondaryLight,
        padding: 12,
    },
    exerciseCardTitle: {
        color: Colors.primary
    },
    exerciseCardContainerIcon: {
        borderRadius: 16,
        backgroundColor: Colors.background,
        padding: 12,
    },
    exerciseCardDescription: {
        flex: 1,
    }
});

export default ExerciseCardStyles;