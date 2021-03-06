import { createDrawerNavigator } from "@react-navigation/drawer";
import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

import Colors from "../constants/Colors";

import DrawerContent from "./DrawerContent";

import HomeStack from "./HomeStackNavigator";
import DiscoverStack from "./DiscoverStackNavigator";
import CategoriesStack from "./CategoriesStackNavigator";
import SearchStack from "./SearchStackNavigator";
import UserProfileStack from "./UserProfileStackNavigator";
import ContactUsStack from "./ContactUsStackNavigator";
import AboutUsStack from "./AboutUsStackNavigator";

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = "HomeStack";

export default function MainDrawerNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  return (
    <Drawer.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      drawerStyle={styles.drawer}
      drawerContent={DrawerContent}
      screenOptions={{
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen label="Discover" name="DiscoverStack" component={DiscoverStack} />
      <Drawer.Screen label="CategoriesStack" name="CategoriesStack" component={CategoriesStack} />
      <Drawer.Screen name="SearchStack" component={SearchStack}/>
      <Drawer.Screen name="ProfileStack" component={UserProfileStack} />
      <Drawer.Screen name="ContactUsStack" component={ContactUsStack} />
      <Drawer.Screen name="AboutUsStack" component={AboutUsStack} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawer: {
    width: "66%",
    backgroundColor: Colors.tintColor,
  },
});
