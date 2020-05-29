import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";


import ReviewCard from "../components/ReviewCard";

//import { Constants } from 'expo';

const { width } = Dimensions.get("window");

class Reviews extends Component {

    constructor() {
        super();
    
        this.state = {
          allReviews: 5,
        };

    }
    
      render() {
        const { navigation, signIn } = this.props;

    return (
        <SafeAreaView style={styles.backgroundContainer}>
            <ScrollView>
            <View>
            <Text style={styles.logoText}>All reviews</Text>
              <ReviewCard
                  name="Mati"
                  date="11 months ago"
                  rating = {1}
                  comment="No me gusto, tenia arroz"
              />
              <ReviewCard
                  name="Andy"
                  date="1 month ago"
                  rating = {5}
                  comment="Estaba buenardo"
              />
              <ReviewCard
                  name="Gabi"
                  date="2 months ago"
                  rating = {3}
                  comment="Meh, probe mejores la verdad"
              />
            
          </View>
        </ScrollView>
        </SafeAreaView>
    );
    };
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
    
});

export default Reviews;