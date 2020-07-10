import React, { Component } from "react";
import { Card, ListItem, Button, Icon, Picker, ButtonGroup } from "react-native-elements";
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
import CheckBox from "@react-native-community/checkbox";
import { Snackbar } from 'react-native-paper';
import { ContactUsApi } from '../../../api';

//import { Constants } from 'expo';

const { width } = Dimensions.get("window");

class ContactUs extends Component {

    constructor() {
        super();
    
        this.state = {
          type: "suggestion",
          comment: "",
          selectedIndex: 1,
          buttonDisabled: false,
        };
        this.updateIndex = this.updateIndex.bind(this)
      }

      async sendMail(){

        let email = {
          reason: this.state.type,
          body: this.state.comment,
        }

        if( this.state.comment != "" ){
          try {
            this.setState({
              buttonDisabled: true,
            });
            const resp = await ContactUsApi.customEmail(email)
            switch(resp.status) {
              case 200:
                console.log("Email Sent")
                this.setState({
                  buttonDisabled: false,
                  snackbarSentVisible: true
                });
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
            snackbarFieldsVisible: true
          });
          console.log("Write something!")
        }
      
      }

      dismissConnectionSnackBar = () => {
        this.setState({
          snackbarConnectionVisible: false
        });
      }

      dismissFieldsSnackBar = () => {
        this.setState({
          snackbarFieldsVisible: false
        });
      }

      dismissSentSnackBar = () => {
        this.setState({
          snackbarSentVisible: false
        });
      }

      async updateIndex (selected) {
        this.setState({selectedIndex: selected})
        if(selected == 0)
          this.setState({type: "comment"})
        else if(selected == 1)
          this.setState({type: "suggestion"});
        else if(selected == 2)
          this.setState({type: "complaint"});
        
        await console.log(this.state.type);
      }
      
    
      render() {
        const { navigation, signIn } = this.props;
        const buttons = ['Comment', 'Suggestion', 'Complaint']
        const { selectedIndex } = this.state.selectedIndex

    return (
        <SafeAreaView style={styles.backgroundContainer}>
          <ScrollView>
            <View alignItems='center'>
              <Image
                style={styles.logoImage}
                source={require("../../../assets/images/PugEmail.png")}
              />
            </View> 

            <View style={styles.inputBoxes}></View>

            <Text style={styles.subtitle}>Why you want to contact us?</Text>

            <ButtonGroup
                onPress={ async(index) => await this.updateIndex(index) }
                selectedIndex={this.state.selectedIndex}
                buttons={buttons}
                containerStyle={styles.opacities}
                selectedButtonStyle={{backgroundColor: "#FC987E"}}
              />
           
            <View style={styles.inputView}>
              <Text style={styles.subtitle}>Message</Text>
                <TextInput
                    style={styles.message}
                    multiline
                    numberOfLines={10}
                    placeholder={"I have a message for you!"}
                    placeholderTextColor={"rgba(0,0,0,0.4)"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.comment = value)}
                />
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={async() => {
                      await this.sendMail();
                    
                    }}
                    disabled={this.state.buttonDisabled}
                >
                    <Text style={styles.save}>Send</Text>
                </TouchableOpacity>
            </View>
               
        <Snackbar
              style={styles.snackBar}
              duration={4000}
              visible={this.state.snackbarConnectionVisible}
              onDismiss={this.dismissConnectionSnackBar}
        >
             <Text style={styles.textSnack}>No internet connection.</Text>
        </Snackbar>

        <Snackbar
              style={styles.snackBar}
              duration={4000}
              visible={this.state.snackbarFieldsVisible}
              onDismiss={this.dismissFieldsSnackBar}
        >
             <Text style={styles.textSnack}>Please write a message.</Text>
        </Snackbar>

        <Snackbar
              style={styles.snackBar}
              duration={4000}
              visible={this.state.snackbarSentVisible}
              onDismiss={this.dismissSentSnackBar}
        >
             <Text style={styles.textSnack}>Email sent!</Text>
        </Snackbar>
            </ScrollView>
        </SafeAreaView>
          );
      }
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
        alignItems:"center",
        justifyContent:"center"
    },
    saveButton: {
        backgroundColor: "#FC987E",
        color: "white",
        width: 100,
        alignItems: "center",
        paddingTop:8,
        height: 40,
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
        marginBottom:70
      },
    opacities:{
      height: 50, 
      borderRadius:20, 
      marginTop:15, 
      marginBottom:15
    },
    
  textSnack:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  },

  snackBar:{
    backgroundColor: "#787777",
    height:70,
  },

  logoImage: {
    position: "relative",
    marginTop: 15,
    marginBottom: 15,
    width: 200,
    height: 200,
  },

  loading:{
    flex: 1,
    marginTop:100,
  }
    
});

export default ContactUs;