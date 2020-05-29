import React, { Component } from "react";
import { Card, ListItem, Button, Icon, Rating } from "react-native-elements";
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

const { width } = Dimensions.get("window");
//const { rating } = this.props;

const RestaurantProfile = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.backgroundContainer}>
      

      <ScrollView>
      <View style={styles.mainPage}>
        <ScrollView horizontal={true}>
          <Card>
            <Image
              style={styles.logoImage}
              source={{uri: 'https://i.pinimg.com/originals/eb/80/87/eb80873b89dcc92228712b6257ac05d0.jpg'}}
            />
          </Card>
          <Card>
            <Image
              style={styles.logoImage}
              source={{uri: 'https://media-cdn.tripadvisor.com/media/photo-s/12/3f/af/ba/ambience.jpg'}}
            />
          </Card>
        </ScrollView>
        <Text style={styles.logoText}>Restaurante El Panda Guerrero</Text>
        <Rating imageSize={20} readonly startingValue={rating} style={styles.rating} /> 
        <Text style={styles.primaryText}>About us</Text>
        <Text style={styles.secondaryText}>Somos un restaurante asiático basado en la película Kung Fu Panda.
        Nuestros cocineros panda trabajan las 24h sin descansar para que tú puedas comer
        una sopa a las 2 de la madrugada si así lo deseas!</Text>
      </View>


      <View style={styles.popularContainer} >
        <Text style={styles.subtitleText}>Our most popular dishes</Text>
        <View style={styles.popular}>
          <ScrollView horizontal={true}>
            <TouchableOpacity onPress={async () => {navigation.navigate("Food");
                    console.log("I want to navigate to Dish page");
                  }}>
              <Card>
                <Image
                  style={styles.popularImage}
                  resizeMode="cover"
                  source={{uri: 'https://s1.eestatic.com/2020/01/08/cocinillas/recetas/sopas-y-cremas/Caldo-Pollo-Fideos-Sin_Lactosa-Sopas_y_cremas_458216170_142008613_1706x960.jpg'}}
                />
                <View style={styles.cardFooter}>
                  <Text style={styles.foodName}>Rica Sopa</Text>
                </View>
              </Card>
            </TouchableOpacity>
            <Card>
              <Image
                style={styles.popularImage}
                resizeMode="cover"
                source={{uri: 'https://i.pinimg.com/originals/e6/b0/6f/e6b06fc8b9901993fae74c34bcff2e09.jpg'}}
              />
              <Text style={styles.foodName}>Tallarines Po</Text>
            </Card>
            <Card>
              <Image
                style={styles.popularImage}
                resizeMode="cover"
                source={{uri: 'https://img.culturacolectiva.com/cdn-cgi/image/f=auto,w=1600,q=80,fit=contain/content_image/2019/5/2/1556836847320-recetas-de-comida-china-para-preparar-facil-y-rapido.001.jpeg'}}
              />
              <Text style={styles.foodName}>Parrillada Panda</Text>
            </Card>
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
                source={require("../assets/images/Po.jpg")}
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
                source={require("../assets/images/Po.jpg")}
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
};

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

export default RestaurantProfile;
