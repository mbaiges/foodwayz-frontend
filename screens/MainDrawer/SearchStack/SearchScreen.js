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

import { SearchApi } from '../../../api';

const { width } = Dimensions.get("window");
const statusBarHeight = Constants.statusBarHeight;

class SearchScreenComponent extends React.Component {
  state = {
    search: '',
    timer: undefined,
    queryResult: []
  };

  async updateSearch(text){

    if (this.state.timer) {
      clearTimeout(this.state.timer);
    }

    const timer = setTimeout(() => {
      this.querySearch(text);
    }, 500);

    this.setState({
      timer: timer,
    });

    this.querySearch(text);
    this.setState({ search: text });
  };

  async querySearch(text){

    let queryBody = {
      raw_input: text ? text : "",
      filters: {
        a_type_ids: [],
        a_ingr_ids: [],
        a_char_ids: []
      }
    }
    
    const resp = await SearchApi.searchFood(queryBody);

    this.setState({ queryResult: resp.response.result });
  }



  async componentDidMount() {
    this.querySearch();
  }


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
            onChangeText={ async( text ) => await this.updateSearch(text) }
            value={this.state.search}
          />
        <ScrollView>
          {
            this.state.queryResult.map(food => {
              return (
                <FoodCard
                  key={food.a_food_id}
                  image={{ uri: food.a_image_url }}
                  title={food.a_title}
                  brand={food.a_rest.a_name}
                  onPress={async () => {
                    navigation.navigate("Food", { food: food });
                    console.log("I want to navigate to Dish page");
                  }}
                  rating={food.a_score}
                />
              )
            })
          }
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
