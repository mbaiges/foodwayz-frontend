import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import {
  LoginScreen,
  ForgotPassScreen,
  RegisterScreen,
  ResetPassEmail,
  EmailVerifiedScreen
} from '../screens/AuthStack';
import MainDrawer from "./MainDrawerNavigator";

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = "Login";

export default function AuthStackNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  return (
    <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME} headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="EmailVerified" component={EmailVerifiedScreen} />
      <Stack.Screen name="ResetPassEmail" component={ResetPassEmail} />
    </Stack.Navigator>
  );
}
