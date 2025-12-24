// Atoms Components
import HeadingAtom from "@/components/atoms/HeadingAtom";

// External Dependencies
import { ScrollView } from "react-native";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";

export default function Profile() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[GlobalStyles.container, GlobalStyles.section, GlobalStyles.sectionVertical]}
    >
      <HeadingAtom level={"first"}>Профиль</HeadingAtom>
    </ScrollView>
  );
}
