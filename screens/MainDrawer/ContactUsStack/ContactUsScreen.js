import React, { Component } from "react";
import { Card, ListItem, Button, Icon, Picker } from "react-native-elements";
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

class ContactUs extends Component {

    constructor() {
        super();
    
        this.state = {
          name: "",
          type: "",
          comment: "",
        };
    
      }
    
      validate_signin_fields = ({ name, address }) => {
        if (name === "") {
          alert("Please fill name");
          return false;
        } else if (type === "") {
          alert("Please fill message type");
          return false;
        }
        else if (comment === "") {
          alert("Please fill message");
          return false;
        }
        return true;
      };
    
    
      render() {
        const { navigation, signIn } = this.props;

    return (
        <SafeAreaView style={styles.backgroundContainer}>
          <ScrollView>
            <Text style={styles.logoText}>Contact us</Text>
            <View style={styles.inputBoxes}></View>
            <View style={styles.inputView}>
              <Text style={styles.subtitle}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Name"}
                    placeholderTextColor={"rgba(0,0,0,0.4)"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.name = value)}
                />
            </View>

            <Text style={styles.subtitle}>Why you want to contact us?</Text>
            <View style={styles.opacities}>
                
                <TouchableOpacity
                    style={styles.opacity}
                    onPress={() => this.state.type = "suggestion"}
                >
                  <Text style={styles.subtitle}>Comment</Text>
                  
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.opacity}
                    onPress={() => this.state.type = "suggestion"}
                >
                  <Text style={styles.subtitle}>Suggestion</Text>
                  
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.opacity}
                    onPress={() => (this.state.type = "complain")}
                >
                  <Text style={styles.subtitle}>Complain</Text>
                 
                </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
              <Text style={styles.subtitle}>Message</Text>
                <TextInput
                    style={styles.message}
                    multiline
                    numberOfLines={10}
                    placeholder={"I hava a message for you!"}
                    placeholderTextColor={"rgba(0,0,0,0.4)"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.comment = value)}
                />
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.saveButton}
                >
                    <Text style={styles.save}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {navigation.navigate("Home");}}
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
    subtitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "black",
      marginLeft:15,
    },
    inputView: {
        position: "relative",
        marginBottom:20,
    },
    input: {
        position: "relative",
        height: 60,
        borderBottomColor:"gray",
        borderBottomWidth:1,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: "white",
        color: "#000000",
        marginHorizontal: 25,
    },
    message: {
      marginTop:10,
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
    buttons: {
        flexDirection:"row",
        paddingTop:10,
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
    opacities:{
        flexDirection:"row"
    },
    opacity: {
      backgroundColor: "#FC987E",
      color: "white",
      alignItems: "center",
      borderRadius: 20,
      margin:10,
      height: 40,
      paddingTop:8,
      paddingEnd:10
    } ,

    pickers:{
      flexDirection:"row"
  },
  picker: {
    margin:10,
    height: 40,
    paddingTop:8,
    paddingEnd:10
  } 
    
});

export default ContactUs;