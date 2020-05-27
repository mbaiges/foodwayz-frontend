import React, { Component, useContext } from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  Button,
} from "react-native";
import Card from "../components/Card";

import { UserContext } from '../../context/UserContext';

class HomeScreenComponent extends Component {
  constructor() {
    super();
  }

  render() {
    const { navigation, context } = this.props;
    const { authState, setAuthState } = context;

    return (
      <SafeAreaView style={styles.backgroundContainer}>
        <ScrollView>
          <View>
            <Text>Home Screen</Text>
            <Button
              onPress={() => {
                setAuthState({
                  state: 'SIGNED_OUT',
                  token: ''
                })
              }}
              title="Sign Out"
            >
              Sign Out
            </Button>
            <Card
              onPress={() => {
                console.log("Clicked on hamburgesa");
              }}
              title="Hamburguesa"
              brand="brand"
            >
              <Text style={styles.cardText}>de Local de hamburguesas</Text>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default function HomeScreen(props) {
  const { authState, setAuthState } = useContext(UserContext);
  return <HomeScreenComponent {...props} context={{authState, setAuthState}} />;
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#FFFFFF",
    paddingBottom: 30,
    paddingTop: 30,
  },
});
