import React, { Component, useContext } from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import { Image, ListItem, Button, Icon, Input, Rating } from 'react-native-elements';

import FoodCard from "../../components/FoodCard";

import { Snackbar } from 'react-native-paper';

import { UserContext } from '../../../context/UserContext';

import { StackActions } from '@react-navigation/native';

import { SearchApi, UserApi, UserHasCharacteristicApi } from '../../../api';
import { color } from "react-native-reanimated";

class HomeScreenComponent extends Component {
  constructor() {
    super();
    this.state = {
      foods: [],
      user: {},
      userChars: [],
    }
  }

  dismissConnectionSnackBar = () => {
    this.setState({
      snackbarConnectionVisible: false
    });
  }

  async fetchUser() {
    try {
      const resp = await UserApi.getMe();
      switch(resp.status) {
        case 200:
          this.setState({ user: resp.response.result });
          console.log(resp);
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


    try {
      const resp2 = await UserHasCharacteristicApi.getCharactersticsByUser(this.state.user.a_user_id);
      switch(resp.status) {
        case 200:
          let aux = []
          resp2.response.result.forEach(char => {
            aux.push(char.a_char_id);
          });
      
          this.setState({ userChars: aux })
      
          console.log(this.state.userChars)
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

  async fetchFoods() {
    let queryBody = {
      raw_input: "",
      filters: {
        a_type_ids: [],
        a_ingr_ids: [],
        a_char_ids: this.state.userChars
      },
      sort_by: "most_reviews"
    };

    try {
      const resp = await SearchApi.searchFoods(queryBody);
      switch(resp.status) {
        case 200:
          this.setState({ foods: resp.response.result });
          console.log(resp);
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
    await this.fetchUser();
    await this.fetchFoods();
    this.setState({
      activityIndicator: false
    })

  }

  render() {
    const { navigation, context } = this.props;
    const { authState, setAuthState } = context;

    return (
      (this.state.activityIndicator) ?
      (<SafeAreaView>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      </SafeAreaView>)
      :
      (
      <SafeAreaView style={styles.backgroundContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.homeSubtitle}>Recommended Foods For You</Text>
            <ScrollView>
              {
                this.state.foods.map(food => {
                  return (
                    <FoodCard
                      key={food.a_food_id}
                      image={{ uri: food.a_image_url }}
                      title={food.a_title}
                      brand={food.a_rest.a_name}
                      onPress={async () => {
                        const pushAction = StackActions.push("Food", { food: food });
                        navigation.dispatch(pushAction);
                        //navigation.navigate("Food", { food: food });
                        console.log("I want to navigate to Dish page");
                      }}
                      rating={food.a_score}
                    />
                  )
                })
              }
            </ScrollView>
          </View>
          <Snackbar
              style={styles.snackBarError}
              duration={4000}
              visible={this.state.snackbarConnectionVisible}
              onDismiss={this.dismissConnectionSnackBar}
        >
             <Text style={styles.textSnack}>No internet connection.</Text>
        </Snackbar>
        </ScrollView>
      </SafeAreaView>)
      )
  }
}

export default function HomeScreen(props) {
  const { authState, setAuthState } = useContext(UserContext);
  return <HomeScreenComponent {...props} context={{ authState, setAuthState }} />;
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#FFFFFF",
    paddingBottom: 30,
    paddingTop: 30,
  },

  homeSubtitle: {
    paddingLeft: 15,
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },

  cardImage: {
    width: 220,
    height: 180,
    justifyContent: "center",
  },

  foodName: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 3,
  },

  foodBrand: {
    textAlign: "left",
    fontSize: 14,
    paddingLeft: 3,
  },

  buttonContainer: {
    elevation: 10,
    position: "absolute",
    alignSelf: 'center',
    marginTop: 580,
  },

  button: {

    borderRadius: 25,
    backgroundColor: "#FC987E",
    color: "white",
    width: 150,
    padding: 13,
    height: 48,
  },

  buttonItemsContainer: {
    flexDirection: 'row',
    marginLeft: "22%",
  },

  rating: {
    alignSelf: "flex-start",
  },

  filter: {
    color:"white",
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

  snackBarError:{
    backgroundColor: "#ff4d4d",
    height:70,
  },
});
