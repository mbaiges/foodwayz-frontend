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

import { searchApi } from '../../../api';

const { width } = Dimensions.get("window");
const statusBarHeight = Constants.statusBarHeight;

class SearchScreenComponent extends React.Component {
  state = {
    search: '',
    queryResult: []
  };

  async updateSearch(text){
    await this.setState({ search: text });
    await this.querySearch();
  };

  async querySearch(){

    let queryBody = {
      raw_input: this.state.search,
      filters: {
        a_type_ids: [
            
        ],
        a_ingr_ids: [
            
        ],
        a_char_ids: [
            
        ]
      },
      sorted: {
        reviews_amount: true
      }
    }

    const resp = await searchApi.searchFood(queryBody);
    //console.log(resp);
    this.setState({ queryResult: resp.response.result });
  }

  async componentDidMount() {
    await this.querySearch();
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
            this.state.querryResult.map(food => {
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
