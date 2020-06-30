import React, { Component, useContext, u } from "react";
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
} from "react-native";

import { UserApi, ReviewApi } from '../../../api';

const { width } = Dimensions.get("window");

class UserProfileComponent extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      reviews: [],
    }
  }

  async fetchUser() {
    console.log('fetching user');
    const resp = await UserApi.getMe();
    this.setState({
      user: resp.result
    })
    console.log('done fetching user');
    console.log("User is: " + JSON.stringify(this.state.user));
    console.log(JSON.stringify(resp.result));
  }

  async fetchReviews() {
    const resp = await ReviewApi.getReviewsByUser(this.state.user.a_user_id);
    this.setState({
      reviews: resp.result
    })
    console.log(resp.result)
    console.log(this.state.review)
  }

  async componentDidMount() {
    console.log('mounting');
    await this.fetchUser();
    await this.fetchReviews();
  }

  async componentDidUpdate(){
    console.log("updating")
  }

  render() {
    const { navigation, context } = this.props;
    const { authState, setAuthState } = context;

    return (
      <SafeAreaView style={styles.backgroundContainer}>
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
              <ScrollView horizontal={true}>
                {
                  this.state.reviews.map((review, idx) => {
                    return (
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
                          <Rating imageSize={20} readonly startingValue={review.a_score} style={styles.rating} />
                        </Card>
                      </TouchableOpacity>
                    )
                  })
                }
              </ScrollView>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => { navigation.navigate("RestaurantProfile") }}
            >
              <Text style={styles.buttonText}>My Restaurants</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => { navigation.navigate("EditProfile", {setState: this.setState}) }}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { navigation.navigate("RestaurantStatisticsProfile") }}
            >
              <Text style={styles.buttonText}>Statistics</Text>
            </TouchableOpacity>
          </View>
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
      </SafeAreaView>
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
    width: 130,
    alignItems: "center",
    padding: 13,
    height: 48,
  },


  buttonText: {
    color: "white",

  },

});

