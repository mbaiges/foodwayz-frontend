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

  FoodSpecificStatistics

} from "../screens/MainDrawer";

import { Ionicons } from "@expo/vector-icons";

import DefaultNavBar from "./NavBars/DefaultNavBar";
import BackButtonSearchProfileNavBar from "./NavBars/BackButtonSearchProfileNavBar";
import BackButtonNavBar from "./NavBars/BackButtonNavBar";
import FirstBackButtonNavBar from "./NavBars/FirstBackButtonNavBar";

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
      <Stack.Screen name="UserProfile" component={UserProfile} options={FirstBackButtonNavBar}/>
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditProfilePassword" component={EditProfilePassword} />
      <Stack.Screen name="EditProfileAllergies" component={EditProfileAllergies} />

      <Stack.Screen name="CreateRestaurant" component={CreateRestaurant} />
      <Stack.Screen name="OwnerRestaurantProfile" component={OwnerRestaurantProfile} />
      <Stack.Screen name="RestaurantStatisticsProfile" component={RestaurantStatisticsProfile} />
      <Stack.Screen name="AddDish" component={AddDish} />
      <Stack.Screen name="EditRestaurant" component={EditRestaurant} />
      <Stack.Screen name="Premium" component={Premium} />
      <Stack.Screen name="FoodSpecificStatistics" component={FoodSpecificStatistics}/>

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

    case "UserProfile":
      return "Profile";
    case "EditProfile":
      return "Edit Profile";
    case "EditProfilePassword":
      return "Change Password";
    case "EditProfileAllergies":
      return "Set Preferences";

    case "CreateRestaurant":
      return "Create Restaurant";
    case "OwnerRestaurantProfile":
      return "Restaurant";
    case "RestaurantStatisticsProfile":
      return "Restaurant Statistics";
    case "FoodSpecificStatistics":
      return "Food Statistics";
    case "AddDish":
      return "Add Dish";
    case "EditRestaurant":
      return "Edit Restaurant";
    case "Premium":
      return "Plans";

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
