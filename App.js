import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStackNavigator";
import MainDrawer from "./navigation/MainDrawerNavigator";

import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import LinkingConfiguration from "./navigation/LinkingConfiguration";

import AsyncStorage from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import api from "./api";

import Colors from "./constants/Colors";

const Stack = createStackNavigator();

const INITIAL_ROUTE_NAME = "Home";

export const AuthContext = React.createContext(); // added this

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  //if (!isLoadingComplete) {
  //  return null;
  //} else {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const validate_signin_fields = ({ email, password }) => {
    if (email === "") {
      alert("Please fill email");
      return false;
    } else if (password === "") {
      alert("Please fill password");
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
    if (!validateEmail(email)) {
      alert("Please enter a valid email");
      return false;
    } else if (!validatePassword(password)) {
      alert("Please enter a valid password");
      return false;
    }
    return true;
  };

  const validate_signup_fields = ({
    username,
    email,
    password1,
    password2,
    checked,
  }) => {
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

  const validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validateUsername = (username) => {
    let re = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    return re.test(username);
  };

  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  const validatePassword = (password) => {
    let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        if (validate_signin_fields(data.state)) {
          const { email, password } = data.state;
          console.log(`http://${api.baseURL}:${api.port}/${api.routes.login}`);
          fetch(`http://${api.baseURL}:${api.port}/${api.routes.login}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              console.log(`res = ${JSON.stringify(res)}`);
              //console.log(`accestoken: ${res.accessToken}`);
              if (res.status === 200) {
                console.log("I want to navigate to Home");
                if (!accessToken) alert("Something went wrong");
                else {
                  dispatch({ type: "SIGN_IN", token: accessToken });
                }
              } else if (res.status === 400) {
                alert("User does not exist");
              } else if (res.status === 401) {
                alert("Incorrect password");
              } else if (res.status === 500) {
                alert("Login failed");
              }
            })
            .catch((err) => {
              console.log(`An error ocurred: ${err}`);
            });
        }
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        if (validate_fields(data.state)) {
          const { username, email, password1 } = data.state;
          console.log(
            `http://${api.baseURL}:${api.port}/${api.routes.register}`
          );
          fetch(`http://${api.baseURL}:${api.port}/${api.routes.register}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: username,
              email: email,
              password: password1,
            }),
          })
            .then((res) => {
              console.log(`res = ${JSON.stringify(res)}`);
              if (res.status === 200) {
                console.log("I want to navigate to Home");
                //dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
              } else if (res.status === 400) {
                alert("");
              } else if (res.status === 500) {
                alert("Register failed");
              }
            })
            .catch((err) => {
              console.log(`An error ocurred: ${err}`);
            });
        }
      },
    }),
    []
  );

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            {state.userToken == null ? (
              <Stack.Screen
                name="Auth"
                component={AuthStack}
                options={{
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
            ) : (
              <Stack.Screen name="Main" component={MainDrawer} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>

      <NavigationContainer linking={LinkingConfiguration}></NavigationContainer>
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
