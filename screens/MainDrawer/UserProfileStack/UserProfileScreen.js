import React, { Component, useContext } from "react";
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

import { UserApi } from '../../../api';

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
    const resp = await UserApi.getMe();
    this.setState({
      user: resp.result[0]
    })
  }

  async fetchReviews() {
    this.setState({
      reviews: [
        {
          name: 'Ribs',
          imageUrl: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg',
          score: 3
        },
        {
          name: 'guanacos',
          imageUrl: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg',
          score: 4
        },
        {
          name: 'fritas',
          imageUrl: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg',
          score: 1.5
        }
      ]
    })
  }

  async componentDidMount() {
    await this.fetchUser();
    await this.fetchReviews();
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
              source={require("../../../assets/images/Po.jpg")}

            />
            <Text style={styles.logoText}>{this.state.user.name}</Text>
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
                          image={{ uri: review.imageUrl }}
                          imageStyle={{
                            height: 100,
                          }}
                        >
                          <View style={styles.cardFooter}>
                            <Text style={styles.foodName}>{review.name}</Text>
                          </View>
                          <Rating imageSize={20} readonly startingValue={review.score} style={styles.rating} />
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => { navigation.navigate("RestaurantStatisticsProfile") }}
          >
            <Text>Statistics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAuthState({
                state: 'SIGNED_OUT',
                token: ''
              })
            }}
            style={styles.button}
          >
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
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

  buttonContainer: {
    position: "absolute",
    alignContent: 'flex-end',
    paddingTop: 20,
    paddingLeft: 260,
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


  buttonText: {
    color: "white",

  },

});

export default function UserProfile(props) {
  const { authState, setAuthState } = useContext(UserContext);
  return <UserProfileComponent {...props} context={{ authState, setAuthState }} />;
}
