import React, { Component } from "react";
import { Card, ListItem, Button, Icon, Picker } from "react-native-elements";
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

const { width } = Dimensions.get("window");

class ReviewInfo extends Component {

    constructor() {
        super();
      }
    
      render() {
        const { navigation, signIn } = this.props;

    return (
        <SafeAreaView style={styles.backgroundContainer}>
          <ScrollView>
            <Text style={styles.logoText}>Review</Text>

            <Text style={styles.subtitle}>Review by</Text>

            <View style={styles.userInfo}>
            <Text style={styles.text}>{this.review.a_user.a_name}</Text>
            <Image
              style={styles.userImage}
              source={{ uri: this.state.user.a_image_url }}
            />
            </View>

            <Text style={styles.subtitle}>Food reviewed</Text>
            <TouchableOpacity
                        key={idx}
                        onPress={async () => {
                          navigation.navigate("Food");
                          console.log("I want to navigate to Dish page");
                        }}>
                        <Card
                          image={{ uri: review.a_food.a_image_url }}
                          imageStyle={{
                            height: 100,
                          }}
                        >
                          <View style={styles.cardFooter}>
                            <Text style={styles.foodName}>{review.a_food.a_title}</Text>
                          </View>
                          <Rating imageSize={20} readonly startingValue={review.a_food.a_score} style={styles.rating} />
                        </Card>
            </TouchableOpacity>

            <Text style={styles.subtitle}>User rating</Text>
            <Rating imageSize={50} readonly startingValue={review.a_score} style={styles.rating} />

            <Text style={styles.subtitle}>Comments</Text>    
            <Text style={styles.text}>{review.a_description}</Text>        
            </ScrollView>
        </SafeAreaView>
    );
    };
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
    },
    subtitle: {
        fontSize: 14,
        color: "black",
        marginLeft:15,
      },
    userInfo: {
        flexDirection:"row"
    },
    userImage:{ 
        position: "relative",
        width: 40,
        height: 40,
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
        alignSelf: "flex-start",
      },

    
      reviewContainer: {
        flex: 2,
      },
      favouritesContainer: {
        flex: 2,
        paddingTop: 5,
      },
    

    
});

export default ReviewInfo;