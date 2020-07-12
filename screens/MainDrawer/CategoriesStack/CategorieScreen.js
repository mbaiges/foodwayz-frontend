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

import { Snackbar } from 'react-native-paper';

import { Image, ListItem, Button, Icon, Input, Rating } from 'react-native-elements';

import FoodCard from "../../components/FoodCard";

import { UserContext } from '../../../context/UserContext';

import { StackActions } from '@react-navigation/native';

import { FoodApi, SearchApi } from '../../../api';
import { color } from "react-native-reanimated";

class CategorieScreenComponent extends Component {
  constructor() {
    super();
    this.state = {
      foods: [],
      type: {},
    }
  }

  fetchType(){
    const { route } = this.props;
    const { type } = route.params;
    this.setState({ type: type });
  }

  async fetchFoods() {

    let aux = [];
    aux.push(this.state.type.a_type_id);

    let queryBody = {
        raw_input: "",
        filters: {
            a_type_ids: aux,
            a_ingr_ids: [],
            a_char_ids: []
    },
        sort_by: "most_reviews"
    };
    try {
      const resp = await SearchApi.searchFoods(queryBody);
      switch(resp.status) {
        case 200:
          this.setState({ foods: resp.response.result });
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
    await this.fetchType();
    await this.fetchFoods();
    this.setState({
      activityIndicator: false
    })
  }

  dismissConnectionSnackBar = () => {
    this.setState({
      snackbarConnectionVisible: false
    });
  }

  render() {
    const { navigation } = this.props;

    navigation.setOptions({
      headerTitle: () => <Text style={styles.headerText}>{`${(this.state.type && this.state.type.a_type_name)?(new String(this.state.type.a_type_name).charAt(0).toUpperCase() + new String(this.state.type.a_type_name).slice(1)):""}`}</Text>
    });

    return (
      (this.state.activityIndicator) ?
      (<SafeAreaView>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      </SafeAreaView>)
      :
      (<SafeAreaView style={styles.backgroundContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
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
          <Snackbar
            style={styles.snackBarError}
            duration={4000}
            visible={this.state.snackbarConnectionVisible}
            onDismiss={this.dismissConnectionSnackBar}
          >
              <Text style={styles.textSnack}>No internet connection.</Text>
          </Snackbar>
      </SafeAreaView>)

    );
  }
}

export default function CategorieScreen(props) {
  const { authState, setAuthState } = useContext(UserContext);
  return <CategorieScreenComponent {...props} context={{ authState, setAuthState }} />;
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#FFFFFF",
    paddingBottom: 30,
    paddingTop: 0,
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

  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    letterSpacing: 1,
  },

});
