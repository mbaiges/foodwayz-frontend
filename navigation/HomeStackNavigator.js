import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

//import HomeScreen from "../screens/HomeScreen";
import FoodScreen from "../screens/FoodScreen";
import FilterScreen from "../screens/FilterScreen";
import SearchScreen from "../screens/SearchScreen";

import HomeScreen from "../screens/MainDrawer/HomeScreen";
import DefaultNavBar from "./DefaultNavBar";
import SearchNavBar from "./SearchNavBar";

import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function StackNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  return (
    <Stack.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={() =>
        DefaultNavBar({ title: getHeaderTitle(route), navigation })
      }
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Food" component={FoodScreen} />
      <Stack.Screen name="Filter" component={FilterScreen} />
      {/* <Stack.Screen name="Search" component={SearchScreen} options={() => SearchNavBar({ title: getHeaderTitle(route), navigation })} /> */}
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Home";
    case "Links":
      return "Links to learn more";
  }
}
