import React, { Component } from "react";
import { Card, ListItem, Button, Icon } from "react-native-elements";
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

class CreateRestaurant extends Component {

    constructor() {
        super();
    
        this.state = {
          name: "",
          address: "",
          phone: [],
          checked: false,
        };
    
      }
    
      validate_signin_fields = ({ name, address }) => {
        if (name === "") {
          alert("Please fill name");
          return false;
        } else if (address === "") {
          alert("Please fill adress");
          return false;
        }
        return true;
      };
    
    
      render() {
        const { navigation, signIn } = this.props;

    return (
        <SafeAreaView style={styles.backgroundContainer}>
            <Text style={styles.logoText}>Create Restaurant</Text>
            <View style={styles.inputBoxes}></View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder={"Name"}
                    placeholderTextColor={"rgba(0,0,0,0.4)"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.name = value)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder={"adress"}
                    placeholderTextColor={"rgba(0,0,0,0.4)"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.address = value)}
                />
            </View>
            <View style={styles.phoneInputView}>
                <TextInput
                    style={styles.phoneInput}
                    placeholder={"Phone number"}
                    placeholderTextColor={"rgba(0,0,0,0.4)"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.phone[0] = value)}
                />
                <TouchableOpacity>
                        <Icon
                            style={styles.icon}                       
                            name="plus-circle-outline"
                            type="material-community" 
                            size={40} 
                            color="gray"                     
                        />
                    
                </TouchableOpacity>
            </View>
            <View alignItems="center">
                <View style={styles.checkboxLine}>
                    <CheckBox
                    value={this.state.checked}
                    tintColors={{ true: "black", false: "black" }}
                    onValueChange={() =>
                        this.setState({ checked: !this.state.checked })
                    }
                    />
                    <Text style={styles.checkboxText}>My restaurant belongs to a chain</Text>
                </View>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.saveButton}
                >
                    <Text style={styles.save}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancelButton}
                >
                    <Text style={styles.cancel}>Cancel</Text>
                </TouchableOpacity>
            </View>
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
    icon: {
        paddingTop:12,
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36,
    },
    inputView: {
        position: "relative",
        padding: 10,
    },
    phoneInputView: {
        position: "relative",
        padding: 10,
        flexDirection:"row",
    },
    input: {
        position: "relative",
        height: 60,
        borderBottomColor:"gray",
        borderBottomWidth:1,
        paddingTop: 25,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: "white",
        color: "#000000",
        marginHorizontal: 25,
    },
    phoneInput: {
        position: "relative",
        height: 60,
        width:"70%",
        borderBottomColor:"gray",
        borderBottomWidth:1,
        paddingTop: 25,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: "white",
        color: "#000000",
        marginHorizontal: 25,
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
    checkboxLine: {
        flexDirection: "row",
        marginTop: 30,
    },
    checkboxText: {
        paddingTop:5,
    },
    buttons: {
        flexDirection:"row",
        paddingTop:280,
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

export default CreateRestaurant;