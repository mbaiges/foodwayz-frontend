import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStackNavigator";
import { UserContext } from "./context/UserContext";
import MainDrawer from "./navigation/MainDrawerNavigator";

import TestScreen from "./screens/TestScreen/ImageTest"

import React, { useEffect, useState, useMemo } from "react";
import { AsyncStorage, Platform, StatusBar, StyleSheet, View, Text } from "react-native";

import useCachedResources from "./hooks/useCachedResources";

import { createStackNavigator } from "@react-navigation/stack";

import { firebaseConfig } from './constants/ApiKeys';
import * as firebase from 'firebase';
import { Api } from "./api/api"

import Colors from "./constants/Colors";

import * as Linking from 'expo-linking';

const Stack = createStackNavigator();

const INITIAL_ROUTE_NAME = "Home";

const StorageKey = '@FoodWayz:AuthKey';

export function usePersistedAuthState(key, initialState) {
  const [authState, setAuthState] = useState(null)
  Api.setTokenGetter(() => authState.token);

  useEffect(() => {
    async function getAndSetInitialState() {
      //await AsyncStorage.removeItem(key);
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
    await AsyncStorage.setItem(key, JSON.stringify(authState));
    setAuthState(authState);
  }

  return [authState, setPersistedAuthState]
}

export default function App(props) {

  // In case all blows up
  //AsyncStorage.removeItem(StorageKey);

  const isLoadingComplete = useCachedResources();
  const [authState, setPersistedAuthState] = usePersistedAuthState(StorageKey, { state: 'SIGNED_OUT', token: '' });
  const providerAuthState = useMemo(() => ({ authState, setAuthState: setPersistedAuthState }), [authState, setPersistedAuthState]);

  const [links, setLinks] = useState(null);

  //initialize firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    (async () => {
      const auth = authState; //await JSON.parse(authState);
      if (auth) {
        const { state, token } = auth;
        if (state) {
          switch (state) {
            case 'SIGNED_UP':
              console.log("User signed out");
              break;
            case 'SIGNED_IN':
              console.log("User signed out");
              break;
            case 'SIGNED_OUT':
              console.log("User signed out")
              break;
          }
        }
      }
    })();
  }, [authState]);

  printLink(links, setLinks);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
          <UserContext.Provider value={providerAuthState}>
            <Stack.Navigator headerMode="none">
              {(!authState || authState.token === '') ?
                <Stack.Screen
                  name="Auth"
                  component={AuthStack}
                />
                :
                <Stack.Screen
                  name="Main"
                  component={MainDrawer}
                />
              }
            </Stack.Navigator>
            {/* <Text>{authState}</Text> */}
          </UserContext.Provider>
        </NavigationContainer>
        <Text>{links}</Text>
      </View>
    );
  }
}

export async function printLink(links, setLinks) {
  const link1 = await Linking.getInitialURL();
  console.log("Initial URL ");
  console.log(link1);
  const link2 = Linking.makeUrl();
  console.log("Make URL returned ");
  console.log(link2);
  setLinks("" + link1 + " / " + link2);
}

export async function signUpAsync(data) {
  console.log("Reached");
  return null;
}

export async function signInAsync() {
  let authState = { token: 'asdasdasd' }; //await AppAuth.authAsync(config);
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
  let authState = { token: 'asdasdasd' };// await AppAuth.refreshAsync(config, refreshToken);
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
