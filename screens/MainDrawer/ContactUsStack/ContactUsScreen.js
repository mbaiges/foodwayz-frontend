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

    //comment

    this.state = {
      cardNumber: 0,
      expMonth: 0,
      expYear: 0,
      secCode: 0,
    };
    

  }

  validate_signin_fields = ({ name, address }) => {
    if (cardNumber === 0) {
      alert("Please fill card number");
      return false;
    } else if (expMonth === 0) {
      alert("Please fill message type");
      return false;
    }
    else if (expYear === 0) {
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
        <Text style={styles.logoText}>Sign up for premium</Text>
        <View style={styles.inputBoxes}></View>
        <View style={styles.inputView}>
          <Text style={styles.subtitle}>Card number</Text>
            <TextInput
                style={styles.input}
                placeholder={"1111 2222 3333 4444"}
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                underLineColorAndroid="transparent"
                onChangeText={(value) => (this.state.cardNumber = value)}
            />
        </View>

        <Text style={styles.subtitle}>Expiration date</Text>
        <View style={styles.pickers}>
        <Text style={styles.text}>Month</Text>
            <Picker      
                    selectedValue={this.state.expMonth}
                    style={style.picker}
                    onValueChange={(itemValue, itemIndex) => this.setState({ expMonth: itemValue })}>
                    <Picker.Item label="1"  value={1} />
                    <Picker.Item label="2"  value={2} />
                    <Picker.Item label="3"  value={3} />
                    <Picker.Item label="4"  value={4} />
                    <Picker.Item label="5"  value={5} />
                    <Picker.Item label="6"  value={6} />
                    <Picker.Item label="7"  value={7} />
                    <Picker.Item label="8"  value={8} />
                    <Picker.Item label="9"  value={9} />
                    <Picker.Item label="10"  value={10} />
                    <Picker.Item label="11"  value={11} />
                    <Picker.Item label="12"  value={12} />
                </Picker>
                <Text style={styles.text}>Year</Text>
                <Picker      
                    selectedValue={this.state.expYear}
                    style={style.picker}
                    onValueChange={(itemValue, itemIndex) => this.setState({ expYear: itemValue })}>
                    <Picker.Item label="2020"  value={2020} />
                    <Picker.Item label="2021"  value={2021} />
                    <Picker.Item label="2022"  value={2022} />
                    <Picker.Item label="2023"  value={2023} />
                    <Picker.Item label="2024"  value={2024} />
                    <Picker.Item label="2025"  value={2025} />
                    <Picker.Item label="2026"  value={2026} />
                    <Picker.Item label="2027"  value={2027} />
                    <Picker.Item label="2028"  value={2028} />
                    <Picker.Item label="2029"  value={2029} />
                    <Picker.Item label="2030"  value={2030} />
                    
                </Picker>
        </View>


        <View style={styles.inputView}>
          <Text style={styles.subtitle}>Security code</Text>
          <TextInput
                style={styles.input}
                placeholder={"123"}
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                underLineColorAndroid="transparent"
                onChangeText={(value) => (this.state.secCode = value)}
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
text: {
    fontSize: 14,
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