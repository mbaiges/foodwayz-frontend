import React from "react";
import { StyleSheet, Text, Button } from "react-native";

const Tab1Screen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textScreen}>Home Screen</Text>
      <Button
        title="Goto Detail Screen"
        onPress={() => navigation.navigate("Detail")}
      />

      <Button
        title="Open Drawer Screen"
        onPress={() => navigation.openDrawer()}
      />

      <Button title="Log out" onPress={() => navigation.navigate("Auth")} />
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

export default Tab1Screen;
