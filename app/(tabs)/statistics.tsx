// Atoms Components
import HeadingAtom from "@/components/atoms/HeadingAtom";
import ParagraphAtom from "@/components/atoms/ParagraphAtom";

// External Dependencies
import { View } from "react-native";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";

export default function Statistics() {
  return (
    <View
      style={[
        GlobalStyles.container,
        GlobalStyles.section,
        GlobalStyles.sectionVertical,
      ]}
    >
      <HeadingAtom level={"first"}>Статистика</HeadingAtom>
      <ParagraphAtom>В процессе разработки...</ParagraphAtom>
    </View>
  );
}
