import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStackNavigator";
import MainDrawer from "./navigation/MainDrawerNavigator";

import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import LinkingConfiguration from "./navigation/LinkingConfiguration";

import { createStackNavigator } from "@react-navigation/stack";

import Colors from "./constants/Colors";

const Stack = createStackNavigator();

let userToken;

const INITIAL_ROUTE_NAME = "Home";

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  //if (!isLoadingComplete) {
  //  return null;
  //} else {

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            {userToken == null ? (
              <Stack.Screen
                name="Auth"
                component={AuthStack}
              />
            ) : (
              <Stack.Screen name="Main" component={MainDrawer} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
    </View>
  );
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
