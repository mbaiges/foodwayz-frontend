import React, { Component } from "react";

import { StyleSheet, View, ScrollView, Text, TouchableOpacity,Alert} from "react-native";
import {Rating, Card} from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";

export default class FoodCard extends Component {
  constructor() {
    super();

    this.tags = ["Tag1","Tag2","Tag3","Tag4"];
  }

  render() {
    const { image, title, brand, onPress, rating } = this.props;
    var tagButtons = [];
    
    for( let i = 0; i < tagButtons.length ; i++){
      tagButtons.push(
        <View key={i}>
          <TouchableOpacity style={styles.buttonTag}
            onPress={() => Alert.alert('Tag Button pressed')}
          >
            <Text>{this.tags[i]}</Text>
          </TouchableOpacity>
        </View>
        
      )
    }

    return (
      <SafeAreaView>
        <TouchableOpacity 
          onPress={onPress}      
        >
          <Card
            image={image}
            imageStyle={{
            height: 200,
            }}
          >
              <Text style={styles.foodName}>{title}</Text>
              <Text style={styles.foodBrand}>{brand}</Text>
              <ScrollView 
                showsVerticalScrollIndicator={false}
                horizontal={true} 
                style={styles.tagsList}>
                {tagButtons}    
                {/* <TouchableOpacity style={styles.buttonTag}
                  onPress={() => Alert.alert('Simple Button pressed')}
                >
                  <Text>{this.tags[1]}</Text>
                </TouchableOpacity> */}
              </ScrollView>      
            <Rating imageSize={20} readonly startingValue={rating} style={styles.rating} /> 
          </Card>
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
