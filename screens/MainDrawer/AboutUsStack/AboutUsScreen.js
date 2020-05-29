import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function AboutUs(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rectStack}>
        <View style={styles.rect2}></View>
      </View>
      <View style={styles.aboutUsStackStack}>
        <View style={styles.aboutUsStack}>
          <Text style={styles.aboutUs}>About us</Text>
          <View style={styles.rect3}></View>
        </View>
        <Text style={styles.whoAreWe}>Who are we?</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.back}>BACK</Text>
        </TouchableOpacity>
        <Text style={styles.weAre}>
          We are a team of students from Instituto Tecnológico de Buenos Aires,
          named Dychromatic. Together we have created Foodwayz.
        </Text>
        <Text style={styles.whatIsFoodwayz}>What is Foodwayz?</Text>
        <Text style={styles.weAre1}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect2: {
    top: 0,
    left: 0,
    width: 375,
    height: 85,
    position: "absolute",
    backgroundColor: "rgba(252,149,126,1)"
  },
  rectStack: {
    width: 375,
    height: 85
  },
  aboutUs: {
    top: 19,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 28
  },
  rect3: {
    top: 0,
    left: 0,
    width: 0,
    height: 655,
    position: "absolute",
    backgroundColor: "#E6E6E6"
  },
  aboutUsStack: {
    top: 0,
    left: 1,
    width: 112,
    height: 655,
    position: "absolute"
  },
  whoAreWe: {
    top: 66,
    left: 1,
    position: "absolute",
    fontFamily: "roboto-500",
    color: "#121212"
  },
  button: {
    top: 596,
    left: 82,
    width: 164,
    height: 38,
    position: "absolute",
    backgroundColor: "rgba(252,149,126,1)",
    borderRadius: 22
  },
  back: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    marginTop: 7,
    marginLeft: 56
  },
  weAre: {
    top: 96,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    textAlign: "justify",
    width: 308,
    height: 51
  },
  whatIsFoodwayz: {
    top: 185,
    left: 2,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  weAre1: {
    top: 202,
    left: 2,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    textAlign: "justify",
    width: 308,
    height: 51
  },
  aboutUsStackStack: {
    width: 310,
    height: 655,
    marginLeft: 22
  }
});

export default AboutUs;
