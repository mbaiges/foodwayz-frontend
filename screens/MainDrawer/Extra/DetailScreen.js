import React from "react";
import { StyleSheet, SafeAreaView, Text, Button } from "react-native";

export default function DetailScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textScreen}>Detail Screen</Text>

      <Button title="Go back to Home" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

DetailScreen.navigationOptions = {
  title: "Welcome to Detail Screen!",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textScreen: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
