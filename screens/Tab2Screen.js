import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";

const Tab2Screen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textScreen}>Tab2 Screen</Text>
    </SafeAreaView>
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
