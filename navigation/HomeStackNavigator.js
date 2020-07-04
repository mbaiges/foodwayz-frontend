import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

//import HomeScreen from "../screens/HomeScreen";
import {
  Food,
  Filter,
  Search,
  RateFood,
  Reviews,
  Home,
  ReviewInfo,
  RestaurantProfile,
} from '../screens/MainDrawer';

import DefaultNavBar from "./NavBars/DefaultNavBar";
import BackButtonSearchProfileNavBar from "./NavBars/BackButtonSearchProfileNavBar";
import BackButtonProfileNavBar from "./NavBars/BackButtonProfileNavBar";
import BackButtonNavBar from "./NavBars/BackButtonNavBar";

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
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Filter" component={Filter} />

      <Stack.Screen name="Food" component={Food} options={BackButtonProfileNavBar({ title: getHeaderTitle(route), navigation })}/>
      <Stack.Screen name="RestaurantProfile" component={RestaurantProfile} options={BackButtonProfileNavBar({ title: getHeaderTitle(route), navigation })} />
      
      <Stack.Screen name="Reviews" component={Reviews} options={BackButtonNavBar({ title: getHeaderTitle(route), navigation })}/>
      <Stack.Screen name="ReviewInfo" component={ReviewInfo} options={BackButtonNavBar({ title: getHeaderTitle(route), navigation })}/>
      <Stack.Screen name="RateFood" component={RateFood} options={BackButtonNavBar({ title: getHeaderTitle(route), navigation })}/>
      
      {/* <Stack.Screen name="Search" component={SearchScreen} options={() => SearchNavBar({ title: getHeaderTitle(route), navigation })} /> */}
      {/* <Stack.Screen name="Search" component={Search} /> */}
    </Stack.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Home";
    case "Filter":
      return "Filter";
    case "Food":
      return "Dish";
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
