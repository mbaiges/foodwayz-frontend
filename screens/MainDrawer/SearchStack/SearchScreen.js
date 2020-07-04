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
    querryResult: []
  };

  async updateSearch(text){
    this.setState({ search: text });
    await this.querySearch();
  };

  async querySearch(){
    const resp = await 
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
