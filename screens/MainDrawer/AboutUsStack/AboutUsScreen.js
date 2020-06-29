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

  //comment

  render() {
    const { navigation } = this.props;
    const { rating } = this.props;

  return (
    <SafeAreaView style={styles.backgroundContainer}>
      <View style={styles.aboutUsStackStack}>
        <View style={styles.aboutUsStack}>
          <Text style={styles.logoText}>About us</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Who are we?</Text>
          <Text style={styles.text}>
            We are a team of students from Instituto Tecnológico de Buenos Aires,
            named Dychromatic. Together we have created Foodwayz.
          </Text>
        </View>
        <View>
          <Text style={styles.subtitle}>What is Foodwayz?</Text>
          <Text style={styles.text}>
            Foodwayz is your solution to different problems that remain unsolved
            by other food applications. Our aim is to provide our customers with a
            different point of view. {"\n"}
            {"\n"}What happens when you are allergic and the ingredients are not
            specified in the description of the product? What if you go to a
            restaurant for the first time and don&#39;t know what to order? Are
            you tired of always ordering the sasme food because you are afraid of
            not getting something you like?{"\n"}
            {"\n"}Foodwayz is the solution! As our application is focused on the
            ingredients as well as on the product itself. Our app has the option
            to search by plate, ingredient, restaurant, area and price. It has an
            accurate system of reviews that, combined with the detailed
            description of each product, gives the user the most complete dining
            experience.
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {navigation.navigate("Home");}}
          >
          <Text style={styles.back}>BACK</Text>
        
        </TouchableOpacity>
      </View>
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
    backgroundColor: "white",
},
logoText: {
    position: "relative",
    color: "black",
    fontSize: 20,
    paddingTop: 10,
    paddingLeft:15,
    paddingBottom: 25,
    fontWeight: "bold",
    opacity: 1,
    textAlign: "left",
},
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginLeft:5,
  },
  text: {
    marginLeft:5,
    marginBottom:25,
  },
  button: {
    alignSelf:"center",
    backgroundColor: "#FC987E",
    borderRadius:5,
    width: 100,
    alignItems: "center",
    paddingTop:8,
    marginTop:100,
    height: 40,
  },
  back: {
    color:"white",
  }
});
