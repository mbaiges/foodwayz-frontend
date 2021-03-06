import React from "react";
import {Icon} from "react-native-elements";

import { Ionicons } from "@expo/vector-icons";

import {Text} from "react-native"

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} >
      <Text style={{margin:20, color:"white", fontSize:28, fontWeight: "bold"}}>FoodWayz</Text>
      <DrawerItem 
        label="Home" 
        labelStyle={{color:"white", fontSize:22}}
        onPress={() => {props.navigation.navigate("HomeStack")} }
        icon= {({  }) => <Ionicons
                            name="md-home"
                            size={24}
                            color="white"
                          />}
      />      
      <DrawerItem 
        label="Discover" 
        labelStyle={{color:"white", fontSize:22}}
        onPress={() => props.navigation.navigate("DiscoverStack")} 
        icon= {({  }) => <Ionicons
                            name="md-eye"
                            size={24}
                            color="white"
                          />}
      />
      <DrawerItem 
        label="Categories" 
        labelStyle={{color:"white", fontSize:22}}
        onPress={() => props.navigation.navigate("CategoriesStack")} 
        icon= {({  }) => <Ionicons
                            name="md-grid"
                            size={24}
                            color="white"
                          />}
      />

      <DrawerItem
        label="Contact Us" 
        labelStyle={{color:"white", fontSize:22}}
        onPress={() => props.navigation.navigate("ContactUsStack")} 
        icon= {({  }) => <Ionicons
                            name="md-send"
                            size={24}
                            color="white"
                          />}
      />
      <DrawerItem 
        label="About Us" 
        labelStyle={{color:"white", fontSize:22}}
        onPress={() => props.navigation.navigate("AboutUsStack")} 
        icon= {({  }) => <Ionicons
                            name="md-people"
                            size={24}
                            color="white"
                          />}
      />
    </DrawerContentScrollView>
  );
}

