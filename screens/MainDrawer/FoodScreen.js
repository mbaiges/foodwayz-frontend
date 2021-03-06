import React, { Component } from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  Dimensions,
  Alert,
  ActivityIndicator
} from "react-native";

import { Snackbar } from 'react-native-paper';

import { Image, ListItem, Icon, Input, Rating } from 'react-native-elements';

import { ViewsApi, FoodApi } from '../../api';

import { StackActions } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width

import {
  BarChart,
} from 'react-native-chart-kit'

class FoodScreenComponent extends Component {
  constructor() {
    super();
    this.state = {
      food: {},
      ingrs: [],
      chars: [],
      rest: {},
      type: {},
      reviews: {}
    }
  }

  async fetchFood() {
    const { route } = this.props;
    const { food } = route.params;
    console.log(food);
    let aux = {
      quality: food.a_food_quality_score,
      presentation: food.a_presentation_score,
      price: food.a_price_quality_score
    }
    this.setState({
      food: food,
      type: food.a_type,
      reviews: aux
    })
    this.setState({
      ingrs: food.a_ingredients,
      chars: food.a_characteristics,
      rest: food.a_rest
    })

  }

  async updateFood() {
    try {
      const resp = await FoodApi.get(this.state.food.a_food_id);
      switch(resp.status) {
        case 200:
          let food = resp.response.result;
          let aux = {
            quality: food.a_food_quality_score,
            presentation: food.a_presentation_score,
            price: food.a_price_quality_score
          }
          this.setState({
            food: food,
            type: food.a_type,
            reviews: aux
          })
          this.setState({
            ingrs: food.a_ingredients,
            chars: food.a_characteristics,
            rest: food.a_rest
          })
          break;
        default:
          console.log(`Status Received: ${resp.status} --->`);
          console.log(`${resp.response}`);
          // Show snackbar ?
          break;
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  dismissConnectionSnackBar = () => {
    this.setState({
      snackbarConnectionVisible: false
    });
  }

  async componentDidMount() {
    const { navigation } = this.props;

    this.setState({
      ActivityIndicator:true
    })
    await this.fetchFood();
    try {
      const resp = await ViewsApi.registerFoodView(this.state.food.a_food_id);
      switch(resp.status) {
        case 200:
          this.setState({
            ActivityIndicator:false
          })
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

    this.setState({
      updateWhenFocus: navigation.addListener('focus', async() => {
        console.log("Updating");
        await this.updateFood();
      })
    });

  }

  async componentWillUnmount() {
    this.state.updateWhenFocus.remove();
  }

  render() {

    const { navigation } = this.props;

      navigation.setOptions({
        headerTitle: () => <Text style={styles.headerText}>{this.state.food.a_title}</Text>
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
          showsVerticalScrollIndicator={false}
          justifyContent='flex-start'>
          <View style={{ alignItems: 'center' }}>
            <Image source={{ uri: this.state.food.a_image_url }}
              style={styles.imageStyle} />
          </View>

          <Text style={styles.primaryText}>{this.state.food.a_title}</Text>

          <View style={styles.showAll} flexDirection='row' justifyContent='space-between' >
            <Text style={styles.secondaryText}>From: {this.state.rest.a_name}</Text>
            <View >
              <TouchableOpacity onPress={() => {
                  const pushAction = StackActions.push("RestaurantProfile", {restaurant: this.state.rest});
                  navigation.dispatch(pushAction);
                  //navigation.navigate("RestaurantProfile", {restaurant: this.state.rest});
                }}>
                <Text style={styles.secondaryText}>VISIT</Text>
                <Icon name='arrow-right' type='material-community' />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.primaryText}>Description</Text>
          <Text style={styles.secondaryText}>{this.state.food.a_description}</Text>


          <View>
            <Text style={styles.primaryText}>Type</Text>
            <View style={styles.tagsList}>
              <TouchableOpacity
                style={styles.buttonTag}
                onPress={() => {
                  navigation.navigate('SearchStack', { screen: 'Search', params: {a_type_id: this.state.type.a_type_id} });
                }}
              >
                <Text>{`${(this.state.type && this.state.type.a_type_name)?(new String(this.state.type.a_type_name).charAt(0).toUpperCase() + new String(this.state.type.a_type_name).slice(1)):""}`}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={styles.primaryText}>Ingredients</Text>
            <View style={styles.tagsList}>
              {

                (this.state.ingrs.length > 0) ?
                (this.state.ingrs.map((tag, idx) => {
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={styles.buttonTag}
                      onPress={() => {
                        navigation.navigate('SearchStack', { screen: 'Search', params: {a_ingr_id: tag.a_ingr_id} });
                      }}
                    >
                      <Text>{tag.a_ingr_name.charAt(0).toUpperCase() + tag.a_ingr_name.slice(1)}</Text>
                    </TouchableOpacity>
                  )
                }))
                :
                (<View/>)
              }
            </View>
          </View>

          <View>
            <Text style={styles.primaryText}>Characteristics</Text>
            <View style={styles.tagsList}>
              {
                (this.state.chars.length > 0) ?
                (this.state.chars.map((tag, idx) => {
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={styles.buttonTag}
                      onPress={() => {
                        navigation.navigate('SearchStack', { screen: 'Search', params: {a_char_id: tag.a_char_id} });
                      }}
                    >
                      <Text>{tag.a_char_name.charAt(0).toUpperCase() + tag.a_char_name.slice(1)}</Text>
                    </TouchableOpacity>
                  )
                }))
                :
                (<View/>)
              }
            </View>
          </View>

          <View style={styles.showAll} flexDirection='row' justifyContent='space-between'  >
            <Text style={styles.primaryText}>Rating:</Text>
            <View>
              <TouchableOpacity onPress={() => {
                  const pushAction = StackActions.push("Reviews", {food: this.state.food});
                  navigation.dispatch(pushAction);
                  //navigation.navigate("Reviews", {food: this.state.food});
                }}>
                <Text style={styles.secondaryText}>SHOW ALL</Text>
                <Icon
                      name='arrow-right'
                      type='material-community'

                    />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.secondaryText}>Quality Score</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{this.state.reviews.quality}</Text>
            <Rating imageSize={30} readonly startingValue={this.state.reviews.quality} style={styles.rating} />
          </View>
          <Text style={styles.secondaryText}>Presentation Score</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{this.state.reviews.presentation}</Text>
            <Rating imageSize={30} readonly startingValue={this.state.reviews.presentation} style={styles.rating} />
          </View>
          <Text style={styles.secondaryText}>Price-quality Score</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{this.state.reviews.price}</Text>
            <Rating imageSize={30} readonly startingValue={this.state.reviews.price} style={styles.rating} />
          </View>


        <View alignItems="center">
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const pushAction = StackActions.push("RateFood", {food: this.state.food});
              navigation.dispatch(pushAction);
              //navigation.navigate("RateFood", {food: this.state.food});
            }}
          >
            <Text style={styles.buttonItemsContainer}>RATE FOOD</Text>
          </TouchableOpacity>
        </View>

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

export default function FoodScreen( props ) {
  return <FoodScreenComponent {...props} />;
}

const styles = StyleSheet.create({

  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#FFFFFF",
    paddingBottom: 0,
    paddingTop: 0,
  },

  primaryText: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 15,
    paddingTop: 15,
  },

  secondaryText: {

    fontSize: 14,
    paddingLeft: 15,
  },

  tagsList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  snackBarError:{
    backgroundColor: "#ff4d4d",
    height:70,
  },

  buttonTag: {
    borderRadius: 25,
    color: "black",
    backgroundColor: "#D8D8D8",
    padding: 13,
    marginLeft: 20,
    marginTop: 5,
    alignSelf: 'flex-start',
  },

  imageStyle: {
    width: Dimensions.get('window').width,
    height: 200,
    alignSelf: 'center',

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
    marginTop: 20,
    marginBottom:20,
  },

  buttonItemsContainer: {
    marginLeft: "21%",
    color:"white"
  },

  rating: {
    alignSelf: "flex-start",
  },

  showAll: {

    marginRight:30,
    marginTop: 22,

  },
  ratingContainer: {
    marginTop: 0,
    flexDirection: 'row'
  },

  ratingText: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 27,
    paddingLeft: 40,
    paddingRight: 20,

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

  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    letterSpacing: 1,
  },
  loading:{
    flex: 1,
    marginTop:100,
  },

});
