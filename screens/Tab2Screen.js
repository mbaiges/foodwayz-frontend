import React from "react";
import { StyleSheet, Text } from "react-native";

const Tab2Screen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textScreen}>Tab2 Screen</Text>
    </View>
  );
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

export default Tab2Screen;
