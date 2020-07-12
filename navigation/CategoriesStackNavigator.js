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
import BackButtonSearchProfileNavBar from "./NavBars/BackButtonSearchProfileNavBar";

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
      <Stack.Screen name="Categorie" component={Categorie} options={BackButtonSearchProfileNavBar({ title: getHeaderTitle(route), navigation })}/>

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
      return "Category";
    case "Food":
      return "Food";
    case "RestaurantProfile":
      return "Restaurant";
    case "Reviews":
      return "Reviews";
    case "ReviewInfo":
      return "Review";
    case "RateFood":
      return "Review";
  }
}
