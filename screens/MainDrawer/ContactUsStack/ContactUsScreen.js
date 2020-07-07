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
          selectedIndex: 1
        };
        this.updateIndex = this.updateIndex.bind(this)
      }

      async sendMail(){
        if()
        let email = {
          reason: this.state.type,
          body: this.state.comment,
        }
        //console.log('asd')
        //console.log(email);
        const resp = await ContactUsApi.customEmail(email)
        console.log(resp);
        if(resp.status == 200){
          console.log("Email Sent")
        }
      }

      dismissFieldsSnackBar = () => {
        this.setState({
          snackbarFieldsVisible: false
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
            <Text style={styles.logoText}>Contact us</Text>

            {/* <Image
              style={styles.logoImage}
              source={require("../../assets/images/logo.png")}
            /> */}

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
                    placeholder={"I hava a message for you!"}
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
                      navigation.navigate("Home");
                    }}
                >
                    <Text style={styles.save}>Send</Text>
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
      height: 50, 
      borderRadius:20, 
      marginTop:15, 
      marginBottom:15
    },
    

    
});

export default ContactUs;