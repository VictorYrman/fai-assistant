// Molecules Components
import TabBar from "@/components/molecules/TabBar";

// External Dependencies
import { StyleSheet, View } from "react-native";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <TabBar props={props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Главная",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" color={color} size={32} />
            ),
          }}
        />
        <Tabs.Screen
          name="quests"
          options={{
            title: "Квесты",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="tasks" color={color} size={32} />
            ),
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            title: "Статистика",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="signal" color={color} size={32} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Профиль",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" color={color} size={32} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})