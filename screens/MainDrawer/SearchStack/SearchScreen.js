import React, { Component } from "react";
import { Card, ListItem, Button, Icon, SearchBar } from "react-native-elements";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Constants from 'expo-constants';
import FoodCard from "../../components/FoodCard";

const { width } = Dimensions.get("window");
const statusBarHeight = Constants.statusBarHeight;

class SearchScreenComponent extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { navigation } = this.props;

    navigation.setOptions({
      header: () => {<View />}
    });

    return (
      <View
        style={styles.screenContainer}>
          <SearchBar
            platform="android"
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={this.state.search}
          />
        <ScrollView>
          <FoodCard
            image={{uri: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg'}}
            title="Guiso muy rico"
            brand= "El restaurante mas rico"
            onPress={async () => {navigation.navigate("Food");
              console.log("I want to navigate to Dish page");
            }}
            rating = {4.20}
          />
        </ScrollView>
      </View>
    );
  }
}

export default SearchScreen = (props) => {
  return <SearchScreenComponent {...props} />;
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: statusBarHeight,
  },

  navbar: {
    flexDirection: "row",
    marginTop: 16,
  },
});
