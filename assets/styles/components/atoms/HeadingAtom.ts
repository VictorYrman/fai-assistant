import Colors from "@/constants/colors";
import { StyleSheet } from "react-native";

const HeadingStyles = StyleSheet.create({
    heading: {
        fontWeight: 700,
        color: Colors.textDark,
    },
    headingFirst: {
        fontSize: 22,
    },
    headingSecond: {
        fontSize: 19,
    },
    headingThird: {
        fontSize: 17
    }
})

export default HeadingStyles;