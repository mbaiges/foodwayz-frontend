import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStackNavigator";
import { UserContext } from "./context/UserContext";
import MainDrawer from "./navigation/MainDrawerNavigator";

import React, { useEffect, useState, useMemo } from "react";
import { AsyncStorage, Platform, StatusBar, StyleSheet, View, Text } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import LinkingConfiguration from "./navigation/LinkingConfiguration";

import { createStackNavigator } from "@react-navigation/stack";

import Colors from "./constants/Colors";

const Stack = createStackNavigator();

const INITIAL_ROUTE_NAME = "Home";

const StorageKey = '@FoodWayz:AuthKey';

export function usePersistedAuthState(key, initialState) {
  const [authState, setAuthState] = useState(null)

  useEffect(() => {
    async function getAndSetInitialState() {
      let persistedState = await AsyncStorage.getItem(key);
      if (persistedState) {
        setAuthState(JSON.parse(persistedState));
      } else if (typeof initialState === 'function') {
        return setAuthState(initialState());
      } else {
        return setAuthState(initialState);
      }
    }
    getAndSetInitialState();
  }, [])

  async function setPersistedAuthState(authState) {
    AsyncStorage.setItem(key, JSON.stringify(authState));
    setAuthState(authState);
  }

  return [authState, setPersistedAuthState]
}

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [authState, setAuthState] = usePersistedAuthState(StorageKey, null);
  const providerAuthState = useMemo(() => ({authState, setAuthState}), [authState, setAuthState]);

  useEffect(() => {
    (async () => {
      if (authState) {
        const {state, token} = authState;
        if (state) {
          switch(state) {
            case 'REGISTERED':
              break;
            case 'LOGGED_IN':
              break;
          }
        }
        console.log(token);
      }
    })();
  }, [authState]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
          <NavigationContainer>
            <UserContext.Provider value={providerAuthState}>
              <Stack.Navigator headerMode="none">
                <Stack.Screen
                  name="Auth"
                  component={AuthStack}
                />
              </Stack.Navigator>
              <Text>{JSON.stringify(authState, null, 2)}</Text>
            </UserContext.Provider>
          </NavigationContainer>
      </View>
    );
  }
}

export async function signUpAsync(data) {
  console.log("Reached");
  return null;
}

export async function signInAsync() {
  let authState = {token:'asdasdasd'}; //await AppAuth.authAsync(config);
  //await cacheAuthAsync(authState);
  console.log('signInAsync', authState);
  return authState;
}

async function cacheAuthAsync(authState) {
  return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

export async function getCachedAuthAsync() {
  let value = await AsyncStorage.getItem(StorageKey);
  let authState = JSON.parse(value);
  console.log('getCachedAuthAsync', authState);
  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuthAsync(authState);
    } else {
      return authState;
    }
  }
  return null;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
  return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
  let authState = {token:'asdasdasd'};// await AppAuth.refreshAsync(config, refreshToken);
  console.log('refreshAuth', authState);
  await cacheAuthAsync(authState);
  return authState;
}

export async function signOutAsync({ accessToken }) {
  try {
      /*
    await AppAuth.revokeAsync(config, {
      token: accessToken,
      isClientIdProvided: true,
    });
    */
    await AsyncStorage.removeItem(StorageKey);
    return null;
  } catch (e) {
    alert(`Failed to revoke token: ${e.message}`);
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

