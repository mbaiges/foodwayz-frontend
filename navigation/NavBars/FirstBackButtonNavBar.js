import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Button } from "react-native";
import Colors from "../../constants/Colors";

export default function BackButtonNavBar({ title, navigation }) {
  return {
    headerLeft: () => (
      <View style={styles.l_icons}>
        <Ionicons
          name="md-arrow-back"
          size={38}
          style={styles.l_icon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    ),
    headerTitle: () => <Text style={styles.headerText}>{title}</Text>,
    headerRight: () => (
      <View />
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
  l_icons: {
    color: Colors.noticeText,
    left: 16,
  },
  l_icon: {
    color: Colors.noticeText,
  },
  r_icons: {
    flexDirection: "row",
    right: 16,
  },
  r_icon: {
    color: Colors.noticeText,
    marginLeft: 16,
  },
});

