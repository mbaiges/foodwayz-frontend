import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { View, StyleSheet, Text } from "react-native";


import Categories from "../screens/MainDrawer/CategoriesStack/CategoriesScreen";
import Categorie from "../screens/MainDrawer/CategoriesStack/CategorieScreen";

import {
  Food,
  RestaurantProfile,
  Reviews,
  ReviewInfo,
  RateFood
} from "../screens/MainDrawer";

import DefaultNavBar from "./NavBars/DefaultNavBar";
import BackButtonNavBar from "./NavBars/BackButtonNavBar";
import BackButtonProfileNavBar from "./NavBars/BackButtonProfileNavBar";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = "Categories";

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
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Categorie" component={Categorie} />

      <Stack.Screen name="Food" component={Food} options={BackButtonProfileNavBar({ title: getHeaderTitle(route), navigation })}/>
      <Stack.Screen name="RestaurantProfile" component={RestaurantProfile} options={BackButtonProfileNavBar({ title: getHeaderTitle(route), navigation })} />
      
      <Stack.Screen name="Reviews" component={Reviews} options={BackButtonNavBar({ title: getHeaderTitle(route), navigation })}/>
      <Stack.Screen name="ReviewInfo" component={ReviewInfo} options={BackButtonNavBar({ title: getHeaderTitle(route), navigation })}/>
      <Stack.Screen name="RateFood" component={RateFood} options={BackButtonNavBar({ title: getHeaderTitle(route), navigation })}/>
    </Stack.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Categories":
      return "Categories";
    case "Categorie":
      return "Categories";
  }
}
