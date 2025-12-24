// External Dependencies
import { ReactNode } from "react";
import { Text } from "react-native";

// Assets
import HeadingStyles from "@/assets/styles/components/atoms/HeadingAtom";

const HeadingAtomTypes = {
  first: [HeadingStyles.heading, HeadingStyles.headingFirst],
  second: [HeadingStyles.heading, HeadingStyles.headingSecond],
  third: [HeadingStyles.heading, HeadingStyles.headingThird],
};

type HeadingLevel = keyof typeof HeadingAtomTypes;

type HeadingAtomProps = {
  children: ReactNode;
  level: HeadingLevel;
  style?: any;
};

export default function HeadingAtom({
  children,
  level,
  style,
}: HeadingAtomProps) {
  const headingStyle = HeadingAtomTypes[level];

  return <Text style={[headingStyle, style]}>{children}</Text>;
}
