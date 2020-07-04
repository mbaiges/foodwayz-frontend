import React from "react";

import { Ionicons } from "@expo/vector-icons";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="FoodWayz" />
      <DrawerItem label="Home" onPress={() => props.navigation.navigate("HomeStack")} />
      <DrawerItem label="Search" onPress={() => props.navigation.navigate("SearchStack")} />
      {/* <DrawerItemList {...props} /> */}
    </DrawerContentScrollView>
  );
}
