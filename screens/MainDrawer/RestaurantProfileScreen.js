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
import { RestaurantApi } from "../../api";

//import { Constants } from 'expo';

const { width } = Dimensions.get("window");

class RestaurantProfileComponent extends Component {
  constructor() {
    super();

    this.state = {
      restaurant: {},
      images: [],
      dishes: [],
    }
  }


  async fetchRestaurants() {
    const { route } = this.props;
    console.log(route);
    
    const { restaurant } = route.params;
    console.log(restaurant);
    this.setState({ restaurant: restaurant});
  }

  async fetchImages() {
    const aux = this.state.restaurant;

    const resp = await RestaurantApi.getImages(aux.a_rest_id);
    console.log("-----------------------------------------------------------------------------------------");
    console.log(resp);
    this.setState({
      images: resp.result,
    })
  }

  async fetchDishes() {
    const aux = this.state.restaurant;
    const resp = await RestaurantApi.getFoods(aux.a_rest_id);
    console.log("-----------------------------------------------------------------------------------------");
    console.log(resp);
    this.setState({
      dishes: resp.result,
    })
  }

  async componentDidMount() {
    console.log("Mounting");
    await this.fetchRestaurants();
    await this.fetchImages();
    await this.fetchDishes();
  }

  render(){
    const {navigation} = this.props;



    return (
      <SafeAreaView style={styles.backgroundContainer}>
        
  
        <ScrollView>
        <View style={styles.mainPage}>
          <ScrollView horizontal={true}>
            {this.state.images.map(image =>{
              // return(
              //   <Card>
              //     <Image
              //       style={styles.logoImage}
              //       source={{uri: image}}
              //     />
              //   </Card>
              // )
            })}
          </ScrollView>
          <Text style={styles.logoText}>{this.state.restaurant.a_name}</Text>
  
          <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => { navigation.navigate("RestaurantStatisticsProfile") }}
              >
                <Text style={styles.buttonText}>Statistics</Text>
              </TouchableOpacity>
          </View>
          
          {/* <Text style={styles.primaryText}>About us</Text>
          <Text style={styles.secondaryText}>Somos un restaurante asiático basado en la película Kung Fu Panda.
          Nuestros cocineros panda trabajan las 24h sin descansar para que tú puedas comer
          una sopa a las 2 de la madrugada si así lo deseas!</Text> */}
        </View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.button}
              onPress={async () => {navigation.navigate("AddDish")}}
          >
              <Text style={styles.buttonText}>ADD NEW DISH</Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.popularContainer} >
          <Text style={styles.subtitleText}>Our most popular dishes</Text>
          <View style={styles.popular}>
            <ScrollView horizontal={true}>
              {this.state.dishes.map(dish =>{
                return(
                  <TouchableOpacity onPress={async () => {navigation.navigate("Food"); //falta pasar los params para que pase a la pag correcta
                  }}>
                    <Card
                      image={{ uri: dish.a_image_url }}
                      imageStyle={{
                        height: 100,
                      }}
                    >
                      {/* <Image
                        style={styles.popularImage}
                        resizeMode="cover"
                        source={{uri: dish.a_image_url}}
                      /> */}
                      <View style={styles.cardFooter}>
                        <Text style={styles.foodName}>{dish.a_title}</Text>
                      </View>
                    </Card>
                  </TouchableOpacity>

                )
              })}
              
              
            </ScrollView>
          </View>
        </View>    
  
  
        <View style={styles.popularContainer}>
          <Text style={styles.subtitleText}>All of our dishes</Text>
  
          <Text style={styles.subsubtitleText}>Go vegan!</Text>
          <View style={styles.popular}>
            <ScrollView horizontal={true}>
              <Card>
                <Image
                  style={styles.popularImage}
                  resizeMode="cover"
                  source={require("../../assets/images/Po.jpg")}
                />
                <View style={styles.cardFooter}>
                  <Text style={styles.foodName}>Ensalada</Text>
                </View>
              </Card>
            </ScrollView>
          </View>
  
          <Text style={styles.subsubtitleText}>Meat yourself</Text>
          <View style={styles.popular}>
            <ScrollView horizontal={true}>
              <Card>
                <Image
                  style={styles.popularImage}
                  resizeMode="cover"
                  source={require("../../assets/images/Po.jpg")}
                />
                <View style={styles.cardFooter}>
                  <Text style={styles.foodName}>Costillar</Text>
                </View>
              </Card>
            </ScrollView>
          </View>
          
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

}

export  default function RestaurantProfile( props ){
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
    paddingTop:10,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 15,
  },

  subsubtitleText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
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



  
  buttonContainer:{
    alignItems:"center",
    paddingTop: 20,
    paddingBottom: 22,
  },


  button: {
    elevation: 15,
    borderRadius: 25,
    backgroundColor: "#FC987E",
    color: "black",
    width: 217,
    alignItems: "center",
    padding: 13,
    height: 48,
  },


  buttonText:{
    color: "white",
      
  },

  popularContainer: {
    flex: 2,
  },

});
