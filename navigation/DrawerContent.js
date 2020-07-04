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
      <DrawerItem 
        label="Home" 
        onPress={() => props.navigation.navigate("HomeStack")} 
      />      
      <DrawerItem 
        label="Discover" 
        onPress={() => props.navigation.navigate("DiscoverStack")} 
      />
      <DrawerItem 
        label="Categories" 
        onPress={() => props.navigation.navigate("CategoriesStack")} 
      />

      <DrawerItem 
        label="Contact Us" 
        onPress={() => props.navigation.navigate("ContactUsStack")} 
      />
      <DrawerItem 
        label="About Us" 
        onPress={() => props.navigation.navigate("AboutUsStack")} 
      />
    </DrawerContentScrollView>
  );
}
