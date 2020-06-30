import React, { Component } from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";

import { UserApi } from '../../../api';


const { width } = Dimensions.get("window");


class EditProfileAllergiesComponent extends Component {
    constructor() {
        super();


        this.state = {
            checked: false,
            values:[false,false,false,false]
        }

        this.options = [{name :"Vegano", value: false},
                    {name :"Vegetariano", value: false},
                    {name :"Celiaco", value: false},
                    {name :"Intolerancia a las nueces", value: false}];
  }

  changeValues(i){
    let newValues = this.state.values;
    newValues[i] = !newValues[i];
    this.setState({values: newValues})
  }

  saveAlergies(){

  }
  
  render() {
    const { navigation } = this.props;
    var optionButtons = [];
    for(let i = 0; i < this.options.length ; i++){
        optionButtons.push(
            <View key={i}>
                <CheckBox
                    title = {this.options[i].name}
                    checked = {this.state.values[i]}
                    onPress={() => this.changeValues(i)}
                />
            </View>
        )                        
    }

    return (
        
        <SafeAreaView style={styles.backgroundContainer}>
            <ScrollView vertical = {true}>
                <View style={styles.inner}>
                    <View style={styles.mainPage}>
                        <Text style={styles.title}>Select Allergies</Text>
                    </View>
                </View>
                { optionButtons }

                <View style={styles.applyButtonContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => { 
                      this.saveAlergies();
                      navigation.goBack()
                  }} >
                      <Text>APPLY CHANGES</Text>
                  </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
  }
  
};


export default function EditProfileAllergies({ navigation }) {
    return <EditProfileAllergiesComponent navigation={navigation} />;
}
const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "white",
    paddingBottom: 0,
    paddingTop: 0,
  },

  inner: {
    position: "relative",
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
    //alignItems: "center",
  },

  mainPage: {
    flex: 1,
    position: "relative",
    paddingTop: 10,
    paddingBottom: 10,
    //alignItems: "center",
  },


  title:{
    color: 'black',
    fontSize: 20,
    paddingLeft:15,
    paddingTop: 20,
    fontFamily: 'Roboto', 
    fontWeight: 'bold',
    paddingBottom: 5,
  },
 
  button: {
    elevation: 5,
    borderRadius: 25,
    backgroundColor: "#FC987E",
    color: "black",
    width: 217,
    alignItems: "center",
    padding: 13,
    height: 48,
    alignSelf: "center",
    marginBottom: 20
    },

  applyButtonContainer: {
    paddingTop: 20,
  },

});


