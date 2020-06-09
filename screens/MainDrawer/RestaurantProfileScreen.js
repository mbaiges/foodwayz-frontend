import React, { Component } from "react";
import { Card, ListItem, Button, Icon, Rating} from "react-native-elements";
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
import FoodCard from "../components/FoodCard";
import { RestaurantApi } from '../../api';

class RestaurantProfileComponent extends React.Component{
  
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      images: [],
      popularfood: [],
      allfood: []
    }
  }

  componentDidMount() {
    const { id } = this.props;
    
    try {
      const rest_resp = RestaurantApi.get(id);
      //const img_resp = RestaurantImagesApi.get(id);
      //const foods_resp = FoodsApi.getByRestaurant(id);
      this.setState({
        name: resp.result.a_name,
        images: [],
        popularfood: [],
        allfood: [],
      })
    } catch (error) {
      
    }

  }
  
  render(){

    return (
      <SafeAreaView style={styles.backgroundContainer}>
        <ScrollView>

          <View style={styles.mainPage}>
            <ScrollView horizontal={true}>
                {this.state.images.map((imageURL, idx) =>
                  (
                  <Card key={idx}><Image style={styles.logoImage} src={imageURL}/></Card>
                  )
                )}
              </ScrollView>
            <Text style={styles.logoText}>{this.state.name}</Text>
            <Text style={styles.primaryText}>About us</Text>
            <Text style={styles.secondaryText}>{this.state.description}</Text>
          </View>

        <View style={styles.popularContainer} >
          <Text style={styles.subtitleText}>Our most popular dishes</Text>
          <View style={styles.popular}>
          <ScrollView horizontal={true}>
              {this.state.popularfoods.map(food =>
                (
                  <FoodCard key={food.id}
                    src={food.image}
                    title={food.name}
                    onPress={async () => {navigation.navigate("Food");
                      console.log("I want to navigate to Dish page");
                    }}
                    rating = {food.rating}
                  />
                )
              )}
            </ScrollView>
          </View>
        </View>    

        <View style={styles.popularContainer}>
          <Text style={styles.subtitleText}>All of our dishes</Text>
          <View style={styles.popular}>
            <ScrollView horizontal={true}>
              {this.state.allfoods.map(food =>
                (
                  <FoodCard key={food.id}
                    image={{uri: food.image}}
                    title={food.name}
                    onPress={async () => {navigation.navigate("Food");
                      console.log("I want to navigate to Dish page");
                    }}
                    rating = {food.rating}
                  />
                )
              )}
            </ScrollView>
          </View>
        </View>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default function RestaurantProfileScreen(props) {
  return <RestaurantProfileComponent {...props}/>
} 

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "white",
  },

  mainPage: {
    //flex: 1,
    position: "relative",
    paddingTop: 20,
    //paddingBottom: 40,
    alignItems: "center",
  },

  logoImage: {
    position: "relative",
    width: 240,
    height: 240,
    justifyContent: "center",
    margin: 15,
  },

  primaryText: {
    textAlign: "left",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 18,
    marginBottom: -10,
  },

  secondaryText: {
    textAlign: "left",
    fontSize: 14,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 15,
    textAlign: "justify",
  },

  popular: {
    position: "relative",
    width: width,
    flexDirection: "row",
  },

  popularImage: {
    width: 120,
    height: 120,
    justifyContent: "center",
  },

  starNumber: {
    position: "relative",
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 15,
    color: "black",
  },

  logoText: {
    position: "relative",
    color: "black",
    fontSize: 30,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "500",
    opacity: 1,
    textAlign: "center",
  },

  foodName: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 3,
  },

  subtitleText: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 15,
  },

  subsubtitleText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 15,
    marginTop: 15,
  },

  cardFooter: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  text: {
    fontSize: 10,
    paddingLeft: 20,
    color: "white",
    marginHorizontal: 25,
  },

  button: {
    elevation: 15,
    borderRadius: 25,
    backgroundColor: "white",
    color: "black",
    width: 217,
    alignItems: "center",
    padding: 13,
    height: 48,
  },

  popularContainer: {
    flex: 2,
  },

});

//export default RestaurantProfile;
