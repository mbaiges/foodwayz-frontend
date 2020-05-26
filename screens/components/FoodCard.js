import React, { Component } from "react";

import { StyleSheet, View, ScrollView, Text, TouchableOpacity} from "react-native";
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
           <ScrollView horizontal={true} style={styles.tagsList}>
              <TouchableOpacity style={styles.buttonTag}
                onPress={() => Alert.alert('Simple Button pressed')}
              >
              <Text>Tag1</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.buttonTag}
                onPress={() => Alert.alert('Simple Button pressed')}
              >
              <Text>Tag2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonTag}
                onPress={() => Alert.alert('Simple Button pressed')}
              >
              <Text>Tag3</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.buttonTag}
                onPress={() => Alert.alert('Simple Button pressed')}
              >
              <Text>Tag4</Text>
              </TouchableOpacity>
            
              <TouchableOpacity style={styles.buttonTag}
                onPress={() => Alert.alert('Simple Button pressed')}
              >
              <Text>Taaaag5</Text>
              </TouchableOpacity>
            
              <TouchableOpacity style={styles.buttonTag}
                onPress={() => Alert.alert('Simple Button pressed')}
              >
              <Text>Taaaaaaaaaag6</Text>
              </TouchableOpacity>
            </ScrollView>      
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
