import React, { Component } from "react";
import { Card, ListItem, Button, Icon, Picker,Rating } from "react-native-elements";
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
import CheckBox from "@react-native-community/checkbox";
import { FoodApi } from '../../api';
//import { Constants } from 'expo';

import FoodCard from "../components/FoodCard.js";

const { width } = Dimensions.get("window");

class ReviewInfoComponent extends Component {

  constructor() {
    super();
    this.state = {
      review: {},
      user: {},
      food: {},
      rest: {}
    }
  }

  async fetchInfo() {
    const { route } = this.props;
    const { review, food, user } = route.params;
    console.log(review);
    this.setState({
      review: review,
    })
    if(food){
      this.setState({
        user: review.a_user,
        food: food,
        rest: food.a_rest
      })
    }else{
      this.setState({
        user: user,
        food: review.a_food,
        rest: review.a_food.a_rest.a_name,
      })
    }
  }

  async componentDidMount() {
    await this.fetchInfo();
  }
  
  render() {
  
    const { navigation } = this.props;
    return (
        <SafeAreaView style={styles.backgroundContainer}>
          <ScrollView>
            <Text style={styles.logoText}>Review</Text>

            <Text style={styles.subtitle}>Review by</Text>
      
            <View style={styles.userInfo}>
            <Text style={styles.text}>{this.state.user.a_name}</Text>
            <Image
              style={styles.userImage}
              resizeMode="cover"
              source={{ uri: this.state.user.a_image_url }}
            />
            </View>

            <Text style={styles.subtitle}>User rating</Text>
            <Rating imageSize={30} readonly startingValue={this.state.review.a_score} style={styles.rating} />

            <Text style={styles.subtitle}>Comments</Text>    
            <Text style={styles.text}>{this.state.review.a_desc}</Text>   
            <Text style={styles.subtitle}>Food reviewed</Text>
            <TouchableOpacity       
              onPress={async () => {
                navigation.navigate("Food");
                console.log("I want to navigate to Dish page");
              }}>
              <FoodCard
                  image={{ uri: this.state.food.a_image_url }}
                  title={this.state.food.a_title}
                  brand={this.state.rest.a_name}
                  onPress={async () => { navigation.navigate("Food", { food: this.state.food }) }}
                  rating={this.state.food.a_score}
              />
          </TouchableOpacity>
    
            </ScrollView>
        </SafeAreaView>
    );
  };
}

export default function ReviewInfoScreen( props ) {
  return <ReviewInfoComponent {...props} />;
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: "white",
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "black",
      marginLeft:15,
      marginBottom:10,
    },
    text: {
        fontSize: 14,
        color: "black",
        marginLeft:15,
        marginBottom:10,
      },
    userInfo: {
        flexDirection:"row",
        margin:20,
        alignItems:"center"
    },
    userImage:{ 
        position: "relative",
        width: 40,
        height: 40,
        marginLeft:20,
        justifyContent: "center",
        borderRadius: 40 / 2,
    },
    message: {
      marginTop:10,
      position: "relative",
      borderColor:"gray",
      borderWidth:1,
      paddingLeft: 5,
      fontSize: 16,
      backgroundColor: "white",
      color: "#000000",
      marginHorizontal: 25,
      textAlignVertical:"top",
  },
    logoText: {
        position: "relative",
        color: "black",
        fontSize: 20,
        paddingTop: 10,
        paddingLeft:15,
        paddingBottom: 25,
        fontWeight: "bold",
        opacity: 1,
        textAlign: "left",
    },
    buttons: {
        flexDirection:"row",
        paddingTop:10,
    },
    saveButton: {
        marginLeft:180,
        backgroundColor: "#FC987E",
        color: "white",
        width: 100,
        alignItems: "center",
        paddingTop:8,
        height: 40,
        marginRight:15,
      },
    save: {
        color:"white",
    },
    cancel: {
        color:"#FC987E",
    },
    cancelButton: {
        backgroundColor: "white",
        paddingTop:8,
        width: 100,
        alignItems: "center",
        padding: 13,
        height: 40,
        borderColor: "#FC987E",
        borderWidth: 1,
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
    
      foodName: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 15,
        paddingLeft: 3,
      },
    
      cardFooter: {
        justifyContent: "space-between",
        flexDirection: "row",
      },
    

      rating: {
        alignSelf: "center",
      },

    
      reviewContainer: {
        flex: 2,
      },
      favouritesContainer: {
        flex: 2,
        paddingTop: 5,
      },
    

    
});

