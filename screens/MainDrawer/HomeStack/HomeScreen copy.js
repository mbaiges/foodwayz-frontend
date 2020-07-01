import React, { useEffect, Component, useContext } from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,

} from "react-native";

import { Image, ListItem, Button, Icon, Input, Rating } from 'react-native-elements';

import FoodCard from "../../components/FoodCard";

import { UserContext } from '../../../context/UserContext';

import { FoodApi } from '../../../api';

const fetchFoods = () => {

  return new Promise((resolve, reject) => {
    FoodApi.getAll()
      .then(resp => {
        resolve(resp.response.result.map((food) => {
          return {
            id: food.a_food_id,
            imageUrl: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg',
            title: food.a_description,
            brand: 'El restaurante mas rico',
            rating: food.a_score,
          }
        }));
      })
      .catch(err => {
        reject(err);
      });
  });
  // this.foods = [
  //   {
  //     id: 1,
  //     imageUrl: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg',
  //     title: 'Guiso muy rico',
  //     brand: 'El restaurante mas rico',
  //     rating: 3.4,
  //   },
  //   {
  //     id: 2,
  //     imageUrl: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg',
  //     title: 'Guiso medio rico',
  //     brand: 'El restaurante mas rico',
  //     rating: 3.4,
  //   },
  //   {
  //     id: 3,
  //     imageUrl: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg',
  //     title: 'Guiso no tan ricos',
  //     brand: 'El restaurante mas rico',
  //     rating: 3.4,
  //   }
  // ];
}

export default function HomeScreen({ navigation }) {
  const { authState, setAuthState } = useContext(UserContext);
  let foods = [];

  useEffect(() => {
    fetchFoods().then(data => {
      foods = data;
      console.log(foods);
    })
  }, [])

  return (
    <SafeAreaView style={styles.backgroundContainer}>
      <ScrollView>
        <View>
          <Text style={styles.homeSubtitle}>Recommended Dishes Near You</Text>
          <Button
            onPress={() => {
              setAuthState({
                state: 'SIGNED_OUT',
                token: ''
              })
            }}
            title="Sign Out"
          >
            Sign Out
            </Button>
          <ScrollView>
            {
              foods.map(food => {
                return (
                  <FoodCard
                    key={food.id}
                    image={{ uri: food.imageUrl }}
                    title={food.title}
                    brand={food.brand}
                    onPress={async () => {
                      navigation.navigate("Food");
                      console.log("I want to navigate to Dish page");
                    }}
                    rating={food.rating}
                  />
                )
              })
            }
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => { navigation.navigate("Filter") }}
        >
          <View style={styles.buttonItemsContainer}>
            <Text>FILTERS </Text>
            <Icon
              name='filter'
              type='material-community'
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  return <HomeScreenComponent {...props} context={{ authState, setAuthState }} />;
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
    //marginLeft: "18%",
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

});

