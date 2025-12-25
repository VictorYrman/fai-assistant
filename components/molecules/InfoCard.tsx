// External Dependencies
import { ReactNode } from "react";
import { View } from "react-native";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import InfoCardStyles from "@/assets/styles/components/molecules/InfoCard";

type InfoCardProps = {
  children: ReactNode;
};

export default function InfoCard({ children }: InfoCardProps) {
  return (
    <View
      style={[
        GlobalStyles.content,
        GlobalStyles.contentVertical,
        InfoCardStyles.infoCard,
      ]}
    >
      {children}
    </View>
  );
}
