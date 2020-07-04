import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

import { Search } from "../screens/MainDrawer";

import { Ionicons } from "@expo/vector-icons";
import BackButtonNavBar from "./NavBars/BackButtonNavBar";

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = "Search";

export default function StackNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  return (
    <Stack.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={() =>
        BackButtonNavBar({ title: getHeaderTitle(route), navigation })
      }
    >
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Search":
      return "Search";
  }
}
