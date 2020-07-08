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
  ActivityIndicator
} from "react-native";
import { FoodApi } from '../../api';
//import { Constants } from 'expo';

import { Snackbar } from 'react-native-paper';

import { StackActions } from '@react-navigation/native';

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

  dismissConnectionSnackBar = () => {
    this.setState({
      snackbarConnectionVisible: false
    });
  }

  async fetchInfo() {
    const { route } = this.props;
    const { review } = route.params;
    console.log(review);
    let food = review.a_food;
    let user = review.a_user;
    let rest = food.a_rest
    this.setState({
      review: review,
      food: food,
      rest: rest,
      user: user,
    })
  }

  async fetchFood(){
    try {
      const resp = FoodApi.get()
      switch(resp.status) {
        case 200:
 
          break;
      default:
        console.log(`Status Received: ${resp.status} --->`);
        console.log(`${resp.response}`);
        // Show snackbar ?
        break;
      }
    }
    catch (error) {
      console.log(error);
      this.setState({
        snackbarConnectionVisible: true
      });
      // Show snackbar (Internet connecion, maybe?)
    }



  }

  async componentDidMount() {
    this.setState({
      activityIndicator: true
    })
    await this.fetchInfo();
    this.setState({
      activityIndicator: false
    })
  }
  
  render() {
  
    const { navigation } = this.props;
    return (
      (this.state.activityIndicator) ?
      (<SafeAreaView>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      </SafeAreaView>)
      :
       ( <SafeAreaView style={styles.backgroundContainer}>
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
            <TouchableOpacity>
              <FoodCard
                  image={{ uri: this.state.food.a_image_url }}
                  title={this.state.food.a_title}
                  brand={this.state.rest.a_name}
                  onPress={async () => {
                    const pushAction = StackActions.push("Food", { food: this.state.food });
                    navigation.dispatch(pushAction);
                    //navigation.navigate("Food", { food: this.state.food }) 
                  }}
                  rating={this.state.food.a_score}
              />
          </TouchableOpacity>
    
            </ScrollView>
        <Snackbar
              style={styles.snackBar}
              duration={4000}
              visible={this.state.snackbarConnectionVisible}
              onDismiss={this.dismissConnectionSnackBar}
        >
             <Text style={styles.textSnack}>No internet connection.</Text>
        </Snackbar>
        </SafeAreaView>)
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
    
      loading:{
        flex: 1,
        marginTop:100,
      },

      textSnack:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5,
      },
    
      snackBar:{
        backgroundColor: "#787777",
        height:70,
      },
    
});

