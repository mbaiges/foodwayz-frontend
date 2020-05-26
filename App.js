import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStackNavigator";
import MainDrawer from "./navigation/MainDrawerNavigator";

import React, { useEffect, useState } from "react";
import { AsyncStorage, Platform, StatusBar, StyleSheet, View, Text } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import LinkingConfiguration from "./navigation/LinkingConfiguration";

import { createStackNavigator } from "@react-navigation/stack";

import Colors from "./constants/Colors";

const Stack = createStackNavigator();

const AuthContext = useContext(null);

const INITIAL_ROUTE_NAME = "Home";

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  let [authState, setAuthState] = useState(null);

  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
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
            <Text>{JSON.stringify(authState, null, 2)}</Text>
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

let StorageKey = '@FoodWayz:AuthKey';

export async function signUpAsync(data) {
  console.log("Reached");
  return null;
}

export async function signInAsync() {
  let authState = {token:'asdasdasd'}; //await AppAuth.authAsync(config);
  await cacheAuthAsync(authState);
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

function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

function validateUsername(username) {
  let re = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  return re.test(username);
};

// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
function validatePassword(password) {
  let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

function validate_signup_fields({
  username,
  email,
  password1,
  password2,
  checked,
}) {
  if (username === "") {
    alert("Please fill username");
    return false;
  } else if (email === "") {
    alert("Please fill email");
    return false;
  } else if (password1 === "") {
    alert("Please fill password");
    return false;
  } else if (password2 === "") {
    alert("Please repeat password");
    return false;
  }

  /*
  ^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
    └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
          │         │         │            │           no _ or . at the end
          │         │         │            │
          │         │         │            allowed characters
          │         │         │
          │         │         no __ or _. or ._ or .. inside
          │         │
          │         no _ or . at the beginning
          │
          username is 8-20 characters long
  */
  if (!validateUsername(username)) {
    alert("Please enter a valid username");
    return false;
  } else if (!validateEmail(email)) {
    alert("Please enter a valid email");
    return false;
  } else if (password1 !== password2) {
    alert("Passwords must match");
    return false;
  } else if (!validatePassword(password1)) {
    alert("Please enter a valid password");
    return false;
  } else if (!checked) {
    alert("You must agree terms and conds before continuing");
    return false;
  }

  return true;
};
