import React, { Component } from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  Button,
} from "react-native";
import Card from "./components/Card";

class HomeScreenComponent extends Component {
  constructor() {
    super();
  }

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.backgroundContainer}>
        <ScrollView>
          <View>
            <Text>Home Screen</Text>
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

export default function HomeScreen({ navigation }) {
  return <HomeScreenComponent navigation={navigation} />;
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
