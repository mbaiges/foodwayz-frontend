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
  ActivityIndicator
} from "react-native";

import { AuthApi } from '../../../api';

import { Snackbar } from 'react-native-paper';

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

  dismissPassSnackBar = () => {
    this.setState({
      snackbarPassVisible: false
    });
  }

  dismissFieldsSnackBar = () => {
    this.setState({
      snackbarFieldsVisible: false
    });
  }

  dismissWrongPassSnackBar = () => {
    this.setState({
      snackbarWrongPassVisible: false
    });
  }


  async changePass(){
    const {navigation} = this.props;
    
    if(this.state.newPass != "" && this.state.newPass2 != "" && this.state.oldPass != ""){
      this.setState({
        activityIndicator: true
      })
      if(this.state.newPass == this.state.newPass2){
        try {
          const resp = await AuthApi.changePassword(this.state.oldPass, this.state.newPass);
          switch(resp.status) {
            case 200:
              switch(resp.code){
                case "password-changed":
                  console.log("password changed")
                  navigation.goBack();
                break;
                case "invalid-auth":
                  console.log("incorrect old password");
                  this.setState({
                    snackbarWrongPassVisible: true
                  });
                break;
                default : 
                  console.log("an error ocurred");
                break;
      
              }
              this.setState({
                activityIndicator: true
              })
              break;
          default:
            console.log(`Status Received: ${resp.status} --->`);
            console.log(`${resp.response}`);
            // Show snackbar ?
            break;
          }
        }
        catch (error) {
          console.log(error);
          this.setState({
            snackbarConnectionVisible: true
          });
          // Show snackbar (Internet connecion, maybe?)
        }

      }else{  
        this.setState({
          snackbarPassVisible: true
        });
        console.log("passwords dont match")
      }
    }else{
      this.setState({
        snackbarFieldsVisible: true
      });
      console.log("fill fields")
    }
  }

  dismissConnectionSnackBar = () => {
    this.setState({
      snackbarConnectionVisible: false
    });
  }
  
  render() {

    const {navigation} = this.props;
    
    return (
      (this.state.activityIndicator) ?
      (<SafeAreaView>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
        
      </SafeAreaView>)
      :
        (<View style={styles.backgroundContainer}>
            
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
                        value={this.state.newPass2}
                        secureTextEntry={true}
                        style={styles.input}
                        underLineColorAndroid="transparent"
                        onChangeText={(value) => { this.setState({newPass2: value})}}
                    />   
                </View>
            </View>

            <View>
                <TouchableOpacity style={styles.button} onPress={async() => { await this.changePass();}} >
                    <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
                </TouchableOpacity>
            </View>

            <Snackbar
              duration={4000}
              style={styles.snackBar}
              visible={this.state.snackbarPassVisible}
              onDismiss={this.dismissPassSnackBar}
        >
              <Text style={styles.textSnack}>Passwords dont match.</Text>
        </Snackbar>

        <Snackbar
              style={styles.snackBar}
              duration={4000}
              visible={this.state.snackbarFieldsVisible}
              onDismiss={this.dismissFieldsSnackBar}
        >
             <Text style={styles.textSnack}> Please fill all the fields.</Text>
        </Snackbar>

        <Snackbar
              duration={4000}
              style={styles.snackBar}
              visible={this.state.snackbarWrongPassVisible}
              onDismiss={this.dismissWrongPassSnackBar}
        >
              <Text style={styles.textSnack}>Wrong password.</Text>
        </Snackbar>
        <Snackbar
                  style={styles.snackBarError}
                  duration={4000}
                  visible={this.state.snackbarConnectionVisible}
                  onDismiss={this.dismissConnectionSnackBar}
                >
                    <Text style={styles.textSnack}>No internet connection.</Text>
                </Snackbar>
        </View>  )



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

    textSnack:{
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      paddingBottom: 5,
    },

    inputTitle:{
        elevation: 10,
        position: "absolute",
        color: '#FC987E',
        paddingLeft: 20,
        fontSize: 17,
        fontWeight: '500',
        opacity: 1,
    
    },
    
    input: {
        elevation: 10,
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
        marginTop: 300,
        marginBottom:70
    },

    snackBar:{
      backgroundColor: "#787777",
      height:70,
    },

    buttonText: {
      color:"white"
    },

    loading:{
      flex: 1,
      marginTop:100,
    },
    snackBarError:{
      backgroundColor: "#ff4d4d",
      height:70,
    },
  
  });


