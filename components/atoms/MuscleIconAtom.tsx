// External Dependencies
import { Image } from "expo-image";

// Assets
import MuscleIconAtomStyles from "@/assets/styles/components/atoms/MuscleIconAtom";

type MuscleIconAtomProps = {
  type: string;
};

export default function MuscleIconAtom({ type }: MuscleIconAtomProps) {
  if (type === "Грудь") {
    return (
      <Image
        source={require("@/assets/images/breast.png")}
        style={MuscleIconAtomStyles.image}
      />
    );
  } else if (type === "Руки") {
    return (
      <Image
        source={require("@/assets/images/hands.png")}
        style={MuscleIconAtomStyles.image}
      />
    );
  } else if (type === "Плечи") {
    return (
      <Image
        source={require("@/assets/images/shoulders.png")}
        style={MuscleIconAtomStyles.image}
      />
    );
  } else if (type === "Спина") {
    return (
      <Image
        source={require("@/assets/images/back.png")}
        style={MuscleIconAtomStyles.image}
      />
    );
  } else if (type === "Пресс") {
    return (
      <Image
        source={require("@/assets/images/press.png")}
        style={MuscleIconAtomStyles.image}
      />
    );
  } else if (type === "Ягодицы") {
    return (
      <Image
        source={require("@/assets/images/buttocks.png")}
        style={MuscleIconAtomStyles.image}
      />
    );
  } else if (type === "Ноги") {
    return (
      <Image
        source={require("@/assets/images/legs.png")}
        style={MuscleIconAtomStyles.image}
      />
    );
  }

  return null;
}
