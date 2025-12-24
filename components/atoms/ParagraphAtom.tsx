// External Dependencies
import { ReactNode } from "react";
import { Text } from "react-native";

// Assets
import ParagraphStyles from "@/assets/styles/components/atoms/ParagraphAtom";

type ParagraphAtomProps = {
  children: ReactNode;
  style?: any;
};

export default function ParagraphAtom({ children, style }: ParagraphAtomProps) {
  return <Text style={[ParagraphStyles.paragraph, style]}>{children}</Text>;
}
