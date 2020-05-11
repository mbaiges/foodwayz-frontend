import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function NavBar({ title, navigation }) {
  return {
    headerLeft: () => (
      <View style={styles.l_icon}>
        <MaterialIcons
          name="menu"
          size={28}
          onPress={navigation.openDrawer}
          style={styles.icon}
        />
      </View>
    ),
    headerTitle: () => <Text style={styles.headerText}>{title}</Text>,
    headerRight: () => (
      <View style={styles.r_icons}>
        <MaterialIcons
          name="search"
          size={28}
          style={styles.icon}
          onPress={navigation.openDrawer}
        />
        <MaterialIcons
          name="person"
          size={28}
          style={styles.icon}
          onPress={navigation.openDrawer}
        />
      </View>
    ),
    headerStyle: styles.header,
  };
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.tintColor,
    elevation: 2,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.noticeText,
    letterSpacing: 1,
  },
  l_icon: {
    left: 16,
  },
  r_icons: {
    flexDirection: "row",
    right: 16,
  },
  icon: {
    color: Colors.noticeText,
  },
});
