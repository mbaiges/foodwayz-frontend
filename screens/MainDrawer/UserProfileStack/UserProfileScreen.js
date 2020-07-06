import React, { Component, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { Card, ListItem, Button, Icon, Rating } from "react-native-elements";
import { UserContext } from '../../../context/UserContext';
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
  Modal,
  ActivityIndicator
} from "react-native";

import { UserApi, ReviewApi, RestaurantApi, Owns, OwnsApi } from '../../../api';

const { width } = Dimensions.get("window");

class UserProfileComponent extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      reviews: [],
      restaurants: [],
      restaurantsModalVisible: false,

    }
  }

  updateUser(user) {
    this.setState({ user });
  }

  async fetchUser() {
    console.log('fetching user');
    const resp = await UserApi.getMe();
    let user = resp.response.result;
    if(!user.a_image_url || user.a_image_url == null){
      user.a_image_url = "https://firebasestorage.googleapis.com/v0/b/foodwayz-e9a26.appspot.com/o/images%2Fusers%2Funknown.png?alt=media&token=7bec299d-aefa-486e-8aa1-6f11c874ee2f"
    }
    this.setState({
      user: resp.response.result
    })

    console.log('done fetching user');
    console.log("User is: " + this.state.user);
    console.log(JSON.stringify(resp.response.result));
  }

  async fetchReviews() {
    const resp = await ReviewApi.getReviewsByUser(this.state.user.a_user_id);
    this.setState({
      reviews: resp.response.result
    })
    console.log(resp);
  }

  async fetchRestaurants() { 
    const resp = await OwnsApi.getMyRestaurants();
    this.setState({
      restaurants: resp.response.result
    })
  }

  async componentDidMount() {
    this.setState({
      activityIndicator: true
    })

    console.log('mounting');
    await this.fetchUser();
    await this.fetchReviews();
    await this.fetchRestaurants();
    this.setState({
      activityIndicator: false
    })

  }

  async componentDidUpdate(){
    console.log("updating")
  }

  openRestaurant(){
    //if(this.state.restaurants.length === 1){
    //this.props.navigation.navigate("OwnerRestaurantProfile", {restaurant: this.state.restaurants[0]});
    //}else if(this.state.restaurants.length > 1){
      this.setState({restaurantsModalVisible: true});
    //}
  }

  render() {
    const { navigation, context } = this.props;
    const { authState, setAuthState } = context;
    
    let restaurantOptions = [];

    navigation.setOptions({
      headerRight: () => (
        <View style={styles.navbar_r_icons}>
          <Ionicons
            name="md-create"
            size={38}
            style={styles.navbar_r_icon}
            onPress={() => navigation.navigate("EditProfile", {user: this.state.user, userUpdater: this.updateUser.bind(this)})}
          />
        </View>
      ),
    });

    for(var i = 0 ; i < this.state.restaurants.length ; i++){
      const rest = this.state.restaurants[i];

      restaurantOptions.push(
        <View key={i}>
            <TouchableOpacity
                style={styles.restaurantButton}
                onPress={() => {
                  this.setState({restaurantsModalVisible: false});
                  navigation.navigate("OwnerRestaurantProfile", {restaurant: rest});
                }}
            >
                <Text style={styles.buttonRestaurantsText}>{this.state.restaurants[i].a_name}</Text>
            </TouchableOpacity>
        </View>
      )
    }

    return (
      (this.state.activityIndicator) ?
      (<SafeAreaView>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      </SafeAreaView>)
      :
      (<SafeAreaView style={styles.backgroundContainer}>
        <ScrollView>
          <View style={styles.mainPage}>
            <Image
              style={styles.logoImage}
              source={{ uri: this.state.user.a_image_url }}
            />
            <Text style={styles.logoText}>{this.state.user.a_name}</Text>
          </View>

          <View style={styles.reviewContainer} >
            <Text style={styles.subtitleText}>My reviews</Text>
            <View style={styles.review}>
              <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {

                  this.state.reviews.map((review, idx) => {
                    return (
                      <TouchableOpacity
                        key={idx}
                        onPress={async () => {
                          navigation.navigate("ReviewInfo", { review: review });
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
                          <Rating imageSize={20} readonly startingValue={review.a_score} style={styles.rating} />
                        </Card>
                      </TouchableOpacity>
                    )
                  })
                }
              </ScrollView>
            </View>
          </View>

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.restaurantsModalVisible}
              onRequestClose={() => {
                this.setState({restaurantsModalVisible: false});
              }}
            >

              <View style = {styles.centeredView}>
                <View style = {styles.modalRestaurantsView}>
                  <View flexDirection='row'>
                    <View style={styles.modalSubtitlesContainer}>
                      <Text style={styles.modalSubtitles}>Add restaurant</Text>
                      <Icon
                        paddingRight= '30'
                        name='add'
                        onPress={() => {
                          this.setState({restaurantsModalVisible: false});
                          navigation.navigate("CreateRestaurant");
                        }}/>
                    </View>
                    <View style={styles.modalSubtitlesContainer}>
                      <Text style={styles.modalSubtitles}>Close</Text>
                      <Icon
                        name='close'
                        onPress={() => this.setState({restaurantsModalVisible: false})} />
                      </View>
                  </View>
                  <ScrollView>
                    {restaurantOptions}
                  </ScrollView>
                </View>
              </View>

            </Modal>
          </View>
          { 
              (this.state.restaurants.length == 0) ? 
              (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => { navigation.navigate("CreateRestaurant") }}
                >
                  <Text style={styles.buttonText}>Add Restaurant</Text>
                </TouchableOpacity>
              </View>
              ) 
              :
              (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    this.openRestaurant();
                    //navigation.navigate("RestaurantProfile");
                  }}
                >
                  <Text style={styles.buttonText}>My Restaurants</Text>
                </TouchableOpacity>
              </View>
              )
          }
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                setAuthState({
                  state: 'SIGNED_OUT',
                  token: ''
                })
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>)
    );
  }
}

const { width: WIDTH } = Dimensions.get("window");

export default function UserProfile(props) {
  const { authState, setAuthState } = useContext(UserContext);
  return <UserProfileComponent {...props} context={{ authState, setAuthState }} />;
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "white",
  },

  navbar_r_icons: {
    flexDirection: "row",
    right: 16,
  },

  navbar_r_icon: {
    color: Colors.noticeText,
    marginLeft: 16,
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




  reviewContainer: {
    flex: 2,
  },
  favouritesContainer: {
    flex: 2,
    paddingTop: 5,
  },


  buttonContainer:{
    alignItems:"center",
    paddingTop: 10,
    paddingBottom: 15,
  },
  button: {
    elevation: 15,
    borderRadius: 25,
    backgroundColor: "#FC987E",
    color: "black",
    width: 150,
    alignItems: "center",
    padding: 13,
    height: 48,
  },


  buttonText: {
    color: "white",

  },

  buttonRestaurantsText: {
    color: "black"
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    marginTop: 22
  },

  modalRestaurantsView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 300,
  },

  restaurantButton: {
    borderColor: 'black',
    borderWidth:1,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: "white",
    color: "black",
    width: 217,
    alignItems: "center",
    padding: 13,
    height: 48,
    alignSelf: "center",
    marginBottom: 5
},


  modalSubtitles:{
    fontWeight: "bold",
  },

  modalSubtitlesContainer:{
    padding: 13,
  },

  loading:{
    flex: 1,
    marginTop:100,
  }

});
