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

//import { Constants } from 'expo';

import FoodCard from "../components/FoodCard.js";

const { width } = Dimensions.get("window");

class ReviewInfoComponent extends Component {

    constructor() {
        super();
        this.state = {
          review: {},
        }
      }
    
      async fetchReview() {
        const { route } = this.props;
        const { review } = route.params;
        console.log(review);
        this.setState({
        review: review,
        })
      }
    
      componentDidMount() {
        this.fetchReview();
      }
      
    render() {
    
    const { navigation } = this.props;
    

    return (
        <SafeAreaView style={styles.backgroundContainer}>
          <ScrollView>
            <Text style={styles.logoText}>Review</Text>

            <Text style={styles.subtitle}>Review by</Text>
       
            <View style={styles.userInfo}>
            <Text style={styles.text}>Mati</Text>
            <Image
              style={styles.userImage}
              resizeMode="cover"
              source={require("../../assets/images/Po.jpg")}
            />
            </View>

            <Text style={styles.subtitle}>User rating</Text>
            <Rating imageSize={30} readonly startingValue={4} style={styles.rating} />

            <Text style={styles.subtitle}>Comments</Text>    
            <Text style={styles.text}>Muy rico todo</Text>   

                        <Text style={styles.subtitle}>Food reviewed</Text>
            <TouchableOpacity
                      
                        onPress={async () => {
                          navigation.navigate("Food");
                          console.log("I want to navigate to Dish page");
                        }}>
                        <FoodCard
                            
                            image={require("../../assets/images/Po.jpg")}
                            title="Po"
                            brand="El gran Po"
                            onPress={async () => {
                                
                                console.log("I want to navigate to Dish page");
                            }}
                            rating={3}
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

