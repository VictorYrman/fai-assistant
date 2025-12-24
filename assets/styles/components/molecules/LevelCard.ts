import Colors from "@/constants/colors";
import { StyleSheet } from "react-native";

const LevelCardStyles = StyleSheet.create({
    levelCard: {
        flexGrow: 1,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "transparent",
        borderRadius: 16,
        padding: 12,
    },
    levelCardSelected: {
        borderColor: Colors.primary,
        backgroundColor: Colors.secondaryLight
    },
    levelCardSelectedText: {
        color: Colors.primary
    }
})

export default LevelCardStyles;