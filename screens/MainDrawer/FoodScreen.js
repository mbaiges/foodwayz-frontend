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
      tags: [],
    }
  }

  async fetchFood() {
    this.setState({
      food: {
        name: 'guiso',
        restaurant: 'Restaurante Bellagamba',
        description: 'Guiso con carne, papa, zanahorias, .... ',
        rating: 5
      }
    })
    this.setState({
      tags: [
        {
          name: 'Tag1'
        },
        {
          name: 'Tag2'
        },
        {
          name: 'Tag3'
        }
      ]
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
            <Image source={{ uri: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg' }}
              style={styles.imageStyle} />
          </View>
          <Text style={styles.primaryText}>{this.state.food.name}</Text>
          <Text style={styles.secondaryText}>{this.state.food.restaurant}</Text>

          <Text style={styles.primaryText}>Description</Text>
          <Text style={styles.secondaryText}>{this.state.food.description}</Text>

          <View>
            <Text style={styles.primaryText}>Tags</Text>
            <View style={styles.tagsList}>
              {
                this.state.tags.map((tag, idx) => {
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={styles.buttonTag}
                      onPress={() => Alert.alert('Simple Button pressed')}
                    >
                      <Text>{tag.name}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>

          </View>

          <View style={styles.showAll} flexDirection='row' justifyContent='space-between'  >
            <Text style={styles.primaryText}>Rate:</Text>
            <View>
              <Text style={styles.secondaryText}>SHOW ALL</Text>
              <Icon
                name='arrow-right'
                type='material-community'

              />
            </View>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{this.state.food.rating}</Text>
            <Rating imageSize={30} readonly startingValue={this.state.food.rating} style={styles.rating} />
          </View>

          <View alignItems="center">
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                console.log("I want to navigate to Main");

              }}
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
