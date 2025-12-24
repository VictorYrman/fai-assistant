import Colors from "@/constants/colors";
import { StyleSheet } from "react-native";

const TabBarStyles = StyleSheet.create({
    tabBar: {
        borderRadius: 16,
        backgroundColor: Colors.secondaryLight,
        elevation: 2,
        marginBottom: 32,
        marginHorizontal: 16,
        padding: 12
    },
    tabBatItem: {
        flex: 1,
        alignItems: "center",
    }
})

export default TabBarStyles;