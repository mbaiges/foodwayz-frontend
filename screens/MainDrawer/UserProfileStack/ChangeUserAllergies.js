import React, { Component, useContext } from "react";
import { CharacteristicApi } from '../../../api';
import { UserContext } from '../../../context/UserContext';
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
            chars: [],
            values:[]
        }

  }

  changeValue(i){
    let newValues = this.state.values;
    newValues[i] = !newValues[i];
    this.setState({values: newValues})
  }

  saveAlergies(){
    
  }

  async fetchUserChars(){
    const resp = await CharacteristicApi.getAll();
  }

  async fetchChars(){
    const resp = await CharacteristicApi.getAll();
    console.log(resp)
    this.setState({ chars: resp.result });
    for(let i = 0; i < this.state.chars.length ; i++){
      values.push(false);                        
    } 
  }

  async componentDidMount() {
    console.log('mounting');
    await this.fetchUserChars();
    await this.fetchChars();
  }


  render() {
    
    const { navigation, context } = this.props;
    const date = this.state.date;

    var optionButtons = [];
    for(let i = 0; i < this.state.chars.length ; i++){
        optionButtons.push(
            <View key={i}>
                <CheckBox
                    title = {this.state.chars[i].a_char_name}
                    checked = {this.state.values[i]}
                    onPress={() => this.changeValue(i)}
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

export default function EditProfileAllergies(props) {
  const { authState, setAuthState } = useContext(UserContext);
  return <EditProfileAllergiesComponent {...props} context={{ authState, setAuthState }} />;
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


