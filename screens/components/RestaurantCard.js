import React, { Component } from "react";

import { StyleSheet, View, ScrollView, Text, TouchableOpacity} from "react-native";
import {Rating, Card, ListItem} from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";

export default class RestaurantCard extends Component {
  constructor() {
    super();
  }

  render() {
    const { image, title, desc, onPress, rating } = this.props;

    return (
      <SafeAreaView>
        <TouchableOpacity 
          onPress={onPress}          
        >
          <ListItem
            imageWrapperStyle={{
              alignSelf:"flex-start",
            }}
            image={image}
            imageStyle={{
              height: 100,
              maxWidth: 100,
            }}
          >
            <View style={styles.allCard}>
                <Text style={styles.foodName}>{title}</Text>
                <Text style={styles.foodBrand}>{desc}</Text>    
                <Rating imageSize={20} readonly startingValue={rating} style={styles.rating} /> 
            </View>
          </ListItem>
        </TouchableOpacity>
      </SafeAreaView>
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

  allCard:{
    
  }


});
