// External Dependencies
import { Pressable, Text } from "react-native";

// Assets
import ButtonStyles from "@/assets/styles/components/atoms/ButtonAtom";

const ButtonAtomTypes = {
  primary: {
    button: [ButtonStyles.button, ButtonStyles.buttonPrimary],
    text: [ButtonStyles.title, ButtonStyles.titlePrimary],
  },
  default: {
    button: [ButtonStyles.button, ButtonStyles.buttonDefault],
    text: [ButtonStyles.title, ButtonStyles.titleDefault],
  },
};

type ButtonType = keyof typeof ButtonAtomTypes;

type ButtonAtomProps = {
  title: string;
  type: ButtonType;
  onPress: () => void;
};

export default function ButtonAtom({ title, type, onPress }: ButtonAtomProps) {
  const { button: buttonStyle, text: textStyle } = ButtonAtomTypes[type];

  return (
    <Pressable onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}
