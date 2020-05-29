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

import { Image, ListItem, Icon, Input, Rating} from 'react-native-elements';



class FoodScreenComponent extends Component {
  constructor() {
    super();
  }

  render() {
    const { navigation } = this.props;
    const { rating } = this.props;

    return (
      <SafeAreaView style={styles.backgroundContainer}>
        <ScrollView justifyContent = 'flex-start'>
          <View style={{alignItems: 'center'}}>
            <Image source={{ uri: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg' }}
                  style={styles.imageStyle}/>
          </View>
          <Text style={styles.primaryText}>Guiso</Text>
          <Text style={styles.secondaryText}>Restaurante Bellagamba </Text> 

          <Text style={styles.primaryText}>Description</Text>
          <Text style={styles.secondaryText}>Guiso con carne, papa, zanahorias, .... </Text>
          
          <View>
            <Text style={styles.primaryText}>Tags</Text>
            <View style={styles.tagsList}>
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
            </View>
            
          </View>  

          
          <View style={styles.showAll} flexDirection='row' justifyContent= 'space-between'  >
            <Text style={styles.primaryText}>Rate:</Text>
            <View>
              <TouchableOpacity onPress={() => {navigation.navigate("Reviews");}}>
                <Text style={styles.secondaryText}>SHOW ALL</Text>
                <Icon
                      name='arrow-right'
                      type='material-community'
                      
                    />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>3.5</Text>
            <Rating imageSize={30} readonly startingValue={rating} style={styles.rating} />
          </View>

          
        <View alignItems="center">
          <TouchableOpacity
            style={styles.button}
            onPress={() => {navigation.navigate("RateFood");}}
          >
            <Text style={styles.buttonItemsContainer}>RATE DISH</Text>
          </TouchableOpacity>
        </View>

        </ScrollView>

      </SafeAreaView>
    );
  }
}

export default function FoodScreen({ navigation }) {
  return <FoodScreenComponent navigation={navigation} />;
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
    paddingTop:15,
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
    color:"black",
    backgroundColor:"#D8D8D8",
    padding: 13,
    marginLeft: 20,
    marginTop:5,
    alignSelf: 'flex-start',
  },

  imageStyle:{
    width: Dimensions.get('window').width,
    height: 200, 
    alignSelf:'center',
    
  },


  buttonContainer:{
    elevation: 20,
    position:"absolute",
    alignSelf:'center',
    marginTop: 580,    
  },

  button: {
    borderRadius: 25,
    backgroundColor: "#FC987E",
    color: "white",
    width: 150,
    padding: 13,
    height: 48,
    marginTop:20,
  },

  buttonItemsContainer:{
    marginLeft: "21%",
  },

  rating: {
    alignSelf: "flex-start",
  },

  showAll:{
  
    marginTop: 22,

  },
  ratingContainer:{
    marginTop: 0,
    flexDirection: 'row'
  },

  ratingText:{
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 27,
    paddingLeft: 40,
    paddingRight: 20,
   
  }
});
