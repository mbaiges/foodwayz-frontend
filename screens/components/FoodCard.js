import React, { Component } from "react";

import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Rating, Card} from 'react-native-elements';

export default class FoodCard extends Component {
  constructor() {
    super();
  }

  render() {
    const { image, title, brand, onPress, rating } = this.props;

    return (
      <TouchableOpacity 
         onPress={onPress}      
      >
         <Card
          image={image}
          imageStyle={{
          height: 200,
          resizeMode: 'cover'
          }}
        >
           <Text style={styles.foodName}>{title}</Text>
           <Text style={styles.foodBrand}>{brand}</Text>      
           <Rating imageSize={20} readonly startingValue={rating} style={styles.rating} /> 
        </Card>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({

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
  
  rating: {
    alignSelf: "flex-start",
  },

});
