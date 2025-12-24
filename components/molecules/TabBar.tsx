// External Dependencies
import { Pressable, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

// Constants
import Colors from "@/constants/colors";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import TabBarStyles from "@/assets/styles/components/molecules/TabBar";

type TabBarProps = {
  props: BottomTabBarProps;
};

export default function TabBar({ props }: TabBarProps) {
  const { state, descriptors, navigation } = props;
  const activeTintColor = Colors.tabIconSelected;
  const inactiveTintColor = Colors.tabIconDefault;

  return (
    <View style={[GlobalStyles.contentHorizontal, TabBarStyles.tabBar]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const iconComponent = options.tabBarIcon;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const color = isFocused ? activeTintColor : inactiveTintColor;

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={TabBarStyles.tabBatItem}
          >
            {iconComponent &&
              iconComponent({ color, focused: isFocused, size: 32 })}
          </Pressable>
        );
      })}
    </View>
  );
}
