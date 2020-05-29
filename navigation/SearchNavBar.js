import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Button } from "react-native";
import Colors from "../constants/Colors";
import { SearchBar} from "react-native-elements";

export default function SearchNavBar({ title, navigation }) {
    
    state = {
        search: '',
    };
    
    updateSearch = search => {
        this.setState({ search });
    };
    
    const { search } = state;

    return {
        
        headerLeft: () => (
        <View style={styles.l_icon}>
            <Ionicons
            name="md-menu"
            size={38}
            style={styles.icon}
            onPress={navigation.openDrawer}
            />
        </View>
        ),
        headerRight: () => (
            <SearchBar
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
           />
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
