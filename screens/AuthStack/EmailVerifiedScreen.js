import React, { Component, useContext } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { Icon, } from 'react-native-elements';

import { User, AuthApi } from '../../api'; 
import { Api } from "../../api/api";

class EmailVerifiedComponent extends Component {
  constructor() {
    super();

    this.state = {
      isVerified: false,
    };
  }

  componentDidMount() {
    const {route} = this.props;
    const {params} = route;
    // ESTE DEBERíA IR CUANDO FUNCIONE //this.verifyEmail(params.token);
   //this.verifyEmail("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkYWh3ZHd1YWRoYXd1aWRoYSIsInN1YiI6MTUsImV4cGlyYXRpb25fZGF0ZSI6IjIwMjAtMDctMDVUMTQ6NTE6MDkuNDY2WiIsImlhdCI6MTU5Mzg3NDI2OTQ2NiwiZXhwIjoxNTkzODc0MzU1ODY2fQ.u5iua2qcVcbM_qvwCdcSGTLohkNBtaigU5ms_h75W70");    
   // ESTE TIRA FALSE //this.verifyEmail("");    
 
  }

  async verifyEmail(token){
    const resp = await AuthApi.verifyEmail(token);
    if(resp.status === 200 && resp.response.result === true){
      this.setState({isVerified: true});
    }
  }
  
  render() {

    const {navigation} = this.props;
    
    return (
      <SafeAreaView style={styles.backgroundContainer}>
        <View style={styles.inner}>
      {
        (this.state.isVerified) ? (
        <View alignItems= 'center'>
          <Text style={styles.logoText}>Email Verified!</Text>
          <Image
            style={{ height: 200, width: 200 }}
            source={require("../../assets/images/HamburguesitaFeliz.png")}
          />
        </View>  
        ) : (
        <View alignItems= 'center'>
          <Text style={styles.logoText}>Sorry, your email could not be verified</Text>
          <Image
            style={{ height: 200, width: 200 }}
            source={require("../../assets/images/HamburguesitaTriste.png")}
          />
        </View>  
        ) 
      }

        <TouchableOpacity
          style={styles.button}
          onPress={() => { 
            navigation.navigate("Login");
          }}
        >
          <Text>GO TO LOGIN SCREEN</Text>
        </TouchableOpacity>
              
      </View>     
   
        

          
      </SafeAreaView>
    );
  }
}

export default EmailVerifiedScreen = (props) => {
    return <EmailVerifiedComponent {...props}/>;
};

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#FC987E",
    paddingBottom: 30,
    paddingTop: 30,
  },
  inner: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    position: "relative",
    paddingTop: 40,
    paddingBottom: 40,
  },

  logoText: {
    position: "relative",
    textAlign:"center",
    color: "white",
    fontSize: 50,
    paddingTop: 25,
    paddingBottom: 15,
    fontWeight: "500",
    opacity: 1,
  },

  text: {
    fontSize: 20,
    paddingLeft: 20,
    color: "white",
    marginHorizontal: 25,
  },

  button: {
    elevation: 15,
    borderRadius: 25,
    backgroundColor: "white",
    color: "black",
    width: 217,
    alignItems: "center",
    padding: 13,
    height: 48,
  },
});
