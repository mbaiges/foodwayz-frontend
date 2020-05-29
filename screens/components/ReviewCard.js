import React, { Component } from "react";

import { StyleSheet, View, ScrollView, Text, TouchableOpacity} from "react-native";
import {Rating, Card} from 'react-native-elements';



export default class ReviewCard extends Component {
  constructor() {
    super();
  }

  render() {
    const { name, date, comment, rating } = this.props;

    return (
        <Card>
           <Text style={styles.foodName}>{name}</Text>
           <Text style={styles.foodBrand}>{date}</Text>
           <Rating imageSize={20} readonly startingValue={rating} style={styles.rating} /> 
           <Text>{comment}</Text>
        </Card>
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

  tagsList: {
    flex: 1, 
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  buttonTag: {
    borderRadius: 25,
    color:"black",
    backgroundColor:"#D8D8D8",
    padding: 13,
    marginLeft: 20,
    marginTop:5,
    alignSelf: 'flex-start',
  },


});