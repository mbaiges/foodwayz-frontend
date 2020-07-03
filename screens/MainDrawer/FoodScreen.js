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
  Dimensions
} from "react-native";

import { Image, ListItem, Icon, Input, Rating } from 'react-native-elements';

class FoodScreenComponent extends Component {
  constructor() {
    super();
    this.state = {
      food: {},
      ingrs: [],
      chars: [],
      rest: {},
      type: {}
    }
  }

  async fetchFood() {
    const { route } = this.props;
    const { food } = route.params;
    console.log(food);
    this.setState({
      food: food,
      type: food.a_type
    })
    this.setState({
      ingrs: food.a_ingredients ? food.a_ingredients : [] ,
      chars: food.a_characteristics ? food.a_characteristics : [],
      rest: food.a_rest
    })
  }

  componentDidMount() {
    this.fetchFood();
  }

  render() {
    
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.backgroundContainer}>
        <ScrollView justifyContent='flex-start'>
          <View style={{ alignItems: 'center' }}>
            <Image source={{ uri: this.state.food.a_image_url }}
              style={styles.imageStyle} />
          </View>
          <Text style={styles.primaryText}>{this.state.food.a_title}</Text>

          <View style={styles.showAll} flexDirection='row' justifyContent='space-between'  >
            <Text style={styles.secondaryText}>{this.state.rest.a_name}</Text>
            <View>
              <TouchableOpacity onPress={() => {navigation.navigate("RestaurantProfile", {restaurant: this.state.rest});}}>
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
                onPress={() => Alert.alert('Simple Button pressed')}
              >
                <Text>{this.state.type.a_type_name}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={styles.primaryText}>Ingredients</Text>
            <View style={styles.tagsList}>
              {
                this.state.ingrs.map((tag, idx) => {
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={styles.buttonTag}
                      onPress={() => Alert.alert('Simple Button pressed')}
                    >
                      <Text>{tag.a_ingr_name}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>

          <View>
            <Text style={styles.primaryText}>Characteristics</Text>
            <View style={styles.tagsList}>
              {
                this.state.chars.map((tag, idx) => {
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={styles.buttonTag}
                      onPress={() => Alert.alert('Simple Button pressed')}
                    >
                      <Text>{tag.a_char_name}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>

          <View style={styles.showAll} flexDirection='row' justifyContent='space-between'  >
            <Text style={styles.primaryText}>Rate:</Text>
            <View>
              <TouchableOpacity onPress={() => {navigation.navigate("Reviews", {food: this.state.food});}}>
                <Text style={styles.secondaryText}>SHOW ALL</Text>
                <Icon
                      name='arrow-right'
                      type='material-community'
                      
                    />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{this.state.food.a_score}</Text>
            <Rating imageSize={30} readonly startingValue={this.state.food.a_score} style={styles.rating} />
          </View>

          
        <View alignItems="center">
          <TouchableOpacity
            style={styles.button}
            onPress={() => {navigation.navigate("RateFood", {food: this.state.food});}}
          >
            <Text style={styles.buttonItemsContainer}>RATE DISH</Text>
          </TouchableOpacity>
        </View>
        
        </ScrollView>

      </SafeAreaView>
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
    textAlign: "left",
    fontSize: 14,
    paddingLeft: 15,
  },

  tagsList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    elevation: 20,
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
  },

  buttonItemsContainer: {
    marginLeft: "21%",
  },

  rating: {
    alignSelf: "flex-start",
  },

  showAll: {

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

  }
});
