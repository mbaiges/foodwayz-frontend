import React, { Component } from "react";
import { Card, ListItem, Button, Icon, Rating, AirbnbRating} from "react-native-elements";
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
import CheckBox from "@react-native-community/checkbox";

//import { Constants } from 'expo';

const { width } = Dimensions.get("window");

class RateFood extends Component {

    constructor() {
        super();
    
        this.state = {
          comment: ""
        };
    
      }
    
    
    
      render() {
        const { navigation, signIn } = this.props;

    return (
        <SafeAreaView style={styles.backgroundContainer}>
            <ScrollView>
            <View>
                <Text style={styles.logoText}>Rate Dish</Text>
                <Rating
                    ratingCount={5}
                    imageSize={60}
                    fractions={1}
                    showRating
                    onFinishRating={this.ratingCompleted}
                />
            </View>
            <View style={styles.inputView}>
            <Text style={styles.text}>Leave a comment</Text>
                <TextInput
                    style={styles.input}
                    multiline
                    numberOfLines={10}
                    placeholder={"This dish was awesome!"}
                    placeholderTextColor={"rgba(0,0,0,0.4)"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.comment = value)}
                />
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.saveButton}
                >
                    <Text style={styles.save}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancelButton}
                >
                    <Text style={styles.cancel}>Cancel</Text>
                </TouchableOpacity>
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
    text: {
        position: "relative",
        color: "black",
        fontSize: 16,
        paddingTop: 10,
        paddingLeft:15,
        paddingBottom: 25,
        paddingLeft:15,
        fontWeight: "bold",
        opacity: 1,
        marginTop:50,
        textAlign: "left",      
    },
    input: {
        position: "relative",
        borderColor:"gray",
        borderWidth:1,
        paddingLeft: 5,
        fontSize: 16,
        backgroundColor: "white",
        color: "#000000",
        marginHorizontal: 25,

        textAlignVertical:"top",
    },
    buttons: {
        flexDirection:"row",
        paddingTop:150,
    },
    saveButton: {
        marginLeft:180,
        backgroundColor: "#FC987E",
        color: "white",
        width: 100,
        alignItems: "center",
        paddingTop:8,
        height: 40,
        marginRight:15,
      },
    save: {
        color:"white",
    },
    cancel: {
        color:"#FC987E",
    },
    cancelButton: {
        backgroundColor: "white",
        paddingTop:8,
        width: 100,
        alignItems: "center",
        padding: 13,
        height: 40,
        borderColor: "#FC987E",
        borderWidth: 1,
      },
});

export default RateFood;