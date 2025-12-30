import Colors from "@/constants/colors";
import { StyleSheet } from "react-native";

const ButtonStyles = StyleSheet.create({
    button: {
        alignItems: "center",
        borderRadius: 16,
        padding: 12
    },
    buttonPrimary: {
        backgroundColor: Colors.primary,
    },
    buttonDefault: {
        backgroundColor: Colors.default,
    },
    title: {
        fontSize: 16,
        fontWeight: 600
    },
    titlePrimary: {
        color: Colors.textLight
    },
    titleDefault: {
        color: Colors.textLight
    }
});

export default ButtonStyles;