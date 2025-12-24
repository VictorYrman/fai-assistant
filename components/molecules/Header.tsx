// Atoms Components
import LogoAtom from "../atoms/LogoAtom";
import HeadingAtom from "../atoms/HeadingAtom";

// External Dependencies
import { Platform, StatusBar, StyleSheet, View } from "react-native";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles"
import HeaderStyles from "@/assets/styles/components/molecules/Header";


const statusBarHeight =
  Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const marginTop = statusBarHeight + 16;

export default function Header() {
  return (
    <View style={[HeaderStyles.header, styles.header]}>
      <StatusBar barStyle="dark-content" />
      <View style={[GlobalStyles.content, GlobalStyles.contentHorizontal]}>
        <LogoAtom width={32} height={32} />
        <HeadingAtom level={"first"} style={HeaderStyles.title}>FAI</HeadingAtom>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: marginTop,
  },
});
