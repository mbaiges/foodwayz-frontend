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
import FoodCard from "../../components/FoodCard";

class Search extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <View>
        <SearchBar
          platform = "android"
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
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
  return <Search {...props} />;
};

