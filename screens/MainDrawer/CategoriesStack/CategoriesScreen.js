import React, { Component, useContext } from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import { Image, ListItem, Button, Icon, Input, Rating } from 'react-native-elements';

import FoodCard from "../../components/FoodCard";

import { UserContext } from '../../../context/UserContext';

import { FoodApi } from '../../../api';
import { color } from "react-native-reanimated";

class CategoriesScreenComponent extends Component {
  constructor() {
    super();
    this.state = {
      foods: [],
    }
  }

  async fetchFoods() {

    const resp = await FoodApi.getAll();
    this.setState({
      foods: resp.response.result
    })

    console.log(resp);
  }

  async componentDidMount() {
    this.setState({
      activityIndicator: true
    })
    await this.fetchFoods();
    this.setState({
      activityIndicator: false
    })

  }

  render() {
    const { navigation, context } = this.props;
    const { authState, setAuthState } = context;

    return (
      (this.state.activityIndicator) ?
      (<SafeAreaView>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      </SafeAreaView>)
      :
      (<SafeAreaView style={styles.backgroundContainer}>
        <ScrollView>
          <View>
            <Text style={styles.homeSubtitle}>Categpories</Text>
            <ScrollView>
              {
                this.state.foods.map(food => {
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
        </ScrollView>

      </SafeAreaView>)

    );
  }
}

export default function CategoriesScreen(props) {
  const { authState, setAuthState } = useContext(UserContext);
  return <CategoriesScreenComponent {...props} context={{ authState, setAuthState }} />;
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#FFFFFF",
    paddingBottom: 30,
    paddingTop: 30,
  },

  homeSubtitle: {
    paddingLeft: 15,
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },

  cardImage: {
    width: 220,
    height: 180,
    justifyContent: "center",
  },

  foodName: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 3,
  },

  foodBrand: {
    textAlign: "left",
    fontSize: 14,
    paddingLeft: 3,
  },

  buttonContainer: {
    elevation: 20,
    position: "absolute",
    alignSelf: 'center',
    marginTop: 580,
  },

  button: {

    borderRadius: 25,
    backgroundColor: "#FC987E",
    color: "white",
    width: 150,
    padding: 13,
    height: 48,
  },

  buttonItemsContainer: {
    flexDirection: 'row',
    marginLeft: "22%",
  },

  rating: {
    alignSelf: "flex-start",
  },

  filter: {
    color:"white",
},

  loading:{
    flex: 1,
    marginTop:100,
  }
});
