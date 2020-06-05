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

//import { Constants } from 'expo';

const { width } = Dimensions.get("window");

const UserProfile = ({ navigation }) => {
  
  return (
    <SafeAreaView style={styles.backgroundContainer}>
      <ScrollView>
        <View style={styles.mainPage}>
          <Image
            style={styles.logoImage}
            source={require("../../../assets/images/Po.jpg")}
            
          />
          <Text style={styles.logoText}>El guerrero Dragón</Text>
        </View>

        <View style={styles.reviewContainer} >
          <Text style={styles.subtitleText}>My reviews</Text>
          <View style={styles.review}>
            <ScrollView horizontal={true}>
              <TouchableOpacity onPress={async () => {navigation.navigate("Food");
                      console.log("I want to navigate to Dish page");
                    }}>
                <Card
                  image={{uri: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg'}}
                  imageStyle={{
                    height: 100,
                    }}
                >
                  <View style={styles.cardFooter}>
                    <Text style={styles.foodName}>Ribs</Text>
                  </View>
                  <Rating imageSize={20} readonly startingValue={3} style={styles.rating} /> 
                </Card>
              </TouchableOpacity>
              <Card>
                <Image
                  style={styles.reviewImage}
                  resizeMode="cover"
                  source={require("../../../assets/images/Po.jpg")}
                />
                <Text style={styles.foodName}>Aguante Po</Text>
              </Card>
              <Card>
                <Image
                  style={styles.reviewImage}
                  resizeMode="cover"
                  source={require("../../../assets/images/Po.jpg")}
                />
                <Text style={styles.foodName}>Aguante Po</Text>
              </Card>
            </ScrollView>
          </View>
        </View>

        <View style={styles.favouritesContainer}>
          <Text style={styles.subtitleText}>My favorites</Text>
          <View style={styles.review}>
            <ScrollView horizontal={true}>
              <Card>
                <Image
                  style={styles.reviewImage}
                  resizeMode="cover"
                  source={require("../../../assets/images/Po.jpg")}
                />
                <View style={styles.cardFooter}>
                  <Text style={styles.foodName}>Ribs</Text>
                </View>
              </Card>
              <Card>
                <Image
                  style={styles.reviewImage}
                  resizeMode="cover"
                  source={require("../../../assets/images/Po.jpg")}
                />
                <Text style={styles.foodName}>Aguante Po</Text>
              </Card>
              <Card>
                <Image
                  style={styles.reviewImage}
                  resizeMode="cover"
                  source={require("../../../assets/images/Po.jpg")}
                />
                <Text style={styles.foodName}>Aguante Po</Text>
              </Card>
            </ScrollView>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.button}
              onPress={async () => {navigation.navigate("RestaurantProfile")}}
          >
              <Text style={styles.buttonText}>My Restaurants</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Statistics"
          onPress={() => {navigation.navigate("RestaurantStatisticsProfile")}}
        ></Button>
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
    paddingTop: 10,
    //paddingBottom: 40,
    alignItems: "center",
  },

  logoImage: {
    position: "relative",
    width: 120,
    height: 120,
    justifyContent: "center",
    borderRadius: 120 / 2,
  },

  review: {
    position: "relative",
    width: width,
    flexDirection: "row",
  },

  reviewImage: {
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
    paddingBottom: 25,
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
  rating: {
    alignSelf: "flex-start",
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

  reviewContainer: {
    flex: 2,
  },
  favouritesContainer:{
    flex: 2,
    paddingTop: 5,
  },
  
  buttonContainer:{
    position: "absolute",
    alignContent:'flex-end',
    paddingTop: 20,
    paddingLeft:260,
    paddingBottom: 22,
  },

  button: {
    elevation: 15,
    borderRadius: 25,
    backgroundColor: "#FC987E",
    color: "black",
    width: 130,
    alignItems: "center",
    padding: 13,
    height: 48,
  },


  buttonText:{
    color: "white",
      
  },

});

export default UserProfile;
