import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

import {
  UserProfile,
  EditProfile,
  EditProfilePassword, 
  EditProfileAllergies,
  
  CreateRestaurant,
  OwnerRestaurantProfile,
  RestaurantStatisticsProfile,
  AddDish,
  Premium, 
  EditRestaurant,

  ReviewInfo, 
  Food, 
  RestaurantProfile,
  Reviews,
  RateFood,

} from "../screens/MainDrawer";

import { Ionicons } from "@expo/vector-icons";

import DefaultNavBar from "./NavBars/DefaultNavBar";
import BackButtonSearchProfileNavBar from "./NavBars/BackButtonSearchProfileNavBar";
import BackButtonNavBar from "./NavBars/BackButtonNavBar";

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = "UserProfile";

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
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditProfilePassword" component={EditProfilePassword} />
      <Stack.Screen name="EditProfileAllergies" component={EditProfileAllergies} />

      <Stack.Screen name="CreateRestaurant" component={CreateRestaurant} />
      <Stack.Screen name="OwnerRestaurantProfile" component={OwnerRestaurantProfile} />
      <Stack.Screen name="RestaurantStatisticsProfile" component={RestaurantStatisticsProfile} />
      <Stack.Screen name="AddDish" component={AddDish} />
      <Stack.Screen name="EditRestaurant" component={EditRestaurant} />
      <Stack.Screen name="Premium" component={Premium} />
      
      <Stack.Screen name="ReviewInfo" component={ReviewInfo}/>
      <Stack.Screen name="Food" component={Food}/>
      <Stack.Screen name="RestaurantProfile" component={RestaurantProfile} />
      <Stack.Screen name="Reviews" component={Reviews}/>
      <Stack.Screen name="RateFood" component={RateFood}/>

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
