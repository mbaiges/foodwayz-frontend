import React, { Component, useContext } from "react";
import { Card, ListItem, Button, Icon, Rating, Input } from "react-native-elements";
import { UserContext } from '../../../context/UserContext';
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

import { AuthApi } from '../../../api';

const { width } = Dimensions.get("window");

class EditProfilePasswordComponent extends Component {
  constructor(){
    super();

    this.state = {
      oldPass: "",
      newPass: "",
      newPass2: "",
    }

  }

  async changePass(){
    if(this.state.newPass != "" || this.state.newPass2 != "" || this.state.oldPass != ""){
      if(this.state.newPass == this.state.newPass2){
        const resp = await AuthApi.changePassword(this.state.oldPass, this.state.newPass);
        console.log(resp)
        console.log("password changed")
      }else{  
        console.log("passwords dont match")
      }
    }else{
      console.log("fill fields")
    }
  }
  
  render() {

    const {navigation} = this.props;
    
    return (
      <ScrollView>
        <View style={styles.backgroundContainer}>
            
            <Text style={styles.title}> Change Password</Text>
            <View style={styles.inputView}>
                <Text style={styles.inputTitle}>Old Password</Text>
                <View style={styles.inputBox}>
                    <Input
                        secureTextEntry={true}
                        style={styles.input}
                        underLineColorAndroid="transparent"
                        onChangeText={(value) => { this.setState({oldPass: value})}}
                    />  
                </View>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.inputTitle}>New Password</Text>
                <View style={styles.inputBox}>
                    <Input
                        secureTextEntry={true}
                        style={styles.input}
                        underLineColorAndroid="transparent"
                        onChangeText={(value) => { this.setState({newPass: value})}}
                    />  
                </View>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.inputTitle}>Repeat New Password</Text>
                <View style={styles.inputBox}>
                    <Input
                        secureTextEntry={true}
                        style={styles.input}
                        underLineColorAndroid="transparent"
                        onChangeText={(value) => { this.setState({newPass2: value})}}
                    />   
                </View>
            </View>

            <View>
                <TouchableOpacity style={styles.button} onPress={async() => { 
                    await this.changePass();
                    navigation.goBack()
                 }} >
                    <Text>CHANGE PASSWORD</Text>
                </TouchableOpacity>
            </View>
        </View>  
      </ScrollView>
    );
  }
  
};

const { width: WIDTH } = Dimensions.get('window')

export default function EditProfilePassword({ navigation }) {
  return <EditProfilePasswordComponent navigation={navigation} />;
}

const styles = StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      width: null,
      height: null,
      backgroundColor: 'white',
    },
  
    mainPage: {
      //flex: 1,
      position: 'relative',
      paddingTop: 20,
      //paddingBottom: 40,
      alignItems: 'center',
    },

    titleText:{
        color: 'black',
        fontSize: 20,
        fontFamily: 'Roboto', 
        fontWeight: 'bold',
        paddingLeft: 0,
        paddingBottom: 100,
    },
    
    inputView: {
        position: 'relative',
        padding: 0,
    
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

    inputTitle:{
        elevation: 15,
        position: "absolute",
        color: '#FC987E',
        paddingLeft: 20,
        fontSize: 17,
        fontWeight: '500',
        opacity: 1,
    
    },
    
    input: {
        elevation: 15,
        position: "relative",
        width: WIDTH - 100,
        height: 60,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        paddingTop: 25,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: "white",
        color: "#000000",
        marginHorizontal: 25,
    },
    
    inputBox:{
        paddingTop: 20,
        paddingLeft:10
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
  
  });


