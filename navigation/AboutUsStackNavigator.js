import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

import DefaultNavBar from "./NavBars/DefaultNavBar";
import { AboutUs } from "../screens/MainDrawer";

import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = "AboutUs";

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
      <Stack.Screen name="AboutUs" component={AboutUs} />
    </Stack.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "AboutUs":
      return "About Us";
  }
}
