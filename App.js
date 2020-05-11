import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import LinkingConfiguration from "./navigation/LinkingConfiguration";

import HomeStack from "./navigation/HomeStackNavigator";
import DiscoverStack from "./navigation/DiscoverStackNavigator";
import CategoriesStack from "./navigation/CategoriesStackNavigator";
import UserProfileStack from "./navigation/UserProfileStackNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./navigation/DrawerContent";

import Colors from "./constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { SplashScreen } from "expo";

const Drawer = createDrawerNavigator();

const INITIAL_ROUTE_NAME = "Home";

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Drawer.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            drawerStyle={styles.drawer}
            drawerContent={DrawerContent}
            screenOptions={{
              swipeEnabled: false,
            }}
          >
            <Drawer.Screen
              drawerIcon={() => (
                <MaterialIcons name={focused ? "heart" : "heart-outline"} />
              )}
              name="Home"
              component={HomeStack}
            />
            <Drawer.Screen
              label="Discover"
              name="DiscoverStack"
              component={DiscoverStack}
            />
            <Drawer.Screen
              label="Categories"
              name="CategoriesStack"
              component={CategoriesStack}
            />
            <Drawer.Screen
              name="UserProfileStack"
              component={UserProfileStack}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  drawer: {
    width: "66%",
    backgroundColor: Colors.tintColor,
  },
});
