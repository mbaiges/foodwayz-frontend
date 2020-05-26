import React, { Component } from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  
} from "react-native";

import { Image, ListItem, Button, Icon, Input, Rating} from 'react-native-elements';

import FoodCard from "./components/FoodCard";

class HomeScreenComponent extends Component {
  constructor() {
    super();
  }

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.backgroundContainer}>
        <ScrollView>
          <View>
            <Text style={styles.homeSubtitle}>Recommended Dishes Near You</Text>
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
              <FoodCard
                  image={{uri: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg'}}
                  title="Guiso medio rico"
                  brand= "El restaurante mas rico"
                  onPress={async () => {navigation.navigate("Food");
                    console.log("I want to navigate to Dish page");
                  }}
                  rating = {4.20}
              />
              <FoodCard
                  image={{uri: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg'}}
                  title="Guiso no tan rico"
                  brand= "El restaurante mas rico"
                  onPress={async () => {navigation.navigate("Food");
                    console.log("I want to navigate to Dish page");
                  }}
                  rating = {4.20}
              />
            </ScrollView>
            
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                console.log("I want to navigate to the dish page");
              }}
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
  }
}

export default function HomeScreen({ navigation }) {
  return <HomeScreenComponent navigation={navigation} />;
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
  
  homeSubtitle:{
    paddingLeft:15,
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

  buttonContainer:{
    elevation: 20,
    position:"absolute",
    alignSelf:'center',
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

  buttonItemsContainer:{
    flexDirection:'row',
    marginLeft: "22%",
  },

  rating: {
    alignSelf: "flex-start",
  },

});
