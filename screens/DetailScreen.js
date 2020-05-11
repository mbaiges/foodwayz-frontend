import React from "react";
import { StyleSheet, Text, Button } from "react-native";

const DetailScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textScreen}>Detail Screen</Text>

      <Button title="Go back to Home" onPress={() => navigation.goBack()} />
    </View>
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

export default DetailScreen;
