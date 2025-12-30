// External Dependencies
import { StyleSheet } from "react-native";

// Constants
import Colors from "@/constants/colors";

const QuestCardStyles = StyleSheet.create({
    questCard: {
        borderRadius: 16,
        backgroundColor: Colors.secondaryLight,
        padding: 12,
    },
    questCardTitle: {
        color: Colors.primary
    },
    questCardDescription: {
        flex: 1,
    },
    questCardContent: {
        justifyContent: "space-between"
    },
    questCardSwap: {
        alignSelf: "flex-end"
    },
});

export default QuestCardStyles;