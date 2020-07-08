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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { AuthApi } from "../../api";
import { ScrollView } from "react-native-gesture-handler";

import { StackActions } from '@react-navigation/native';

class ForgotPassScreenComponent extends Component {
  constructor() {
    super();

    this.buttonShowing = true;

    this.state = {
      email: "",
      codeBox: false,
      verificationCode: "",
      newPassword: "",
      showWrongVerificationMessage: false,
      wrongVerificationMessage:"",
    };
  }

  validate_field = () => {
    const { email } = this.state;
    if (email == "") {
      alert("Please fill email");
      return false;
    }
    return true;
  };

  making_api_call = () => {
    if (this.validate_field()) {
      alert("Successfully login");
    }
  };

  showCodeBox(){
    this.setState({codeBox: true});
  }

  async sendEmail(email){
    const resp = await AuthApi.resetPassword(email);
    console.log(resp);
    
  }

  async resetPasswordCall(){
    const a_email = this.state.email;
    const aux = {a_code: this.state.verificationCode, a_password_new: this.state.newPassword}
    const resp = await AuthApi.resetPasswordConfirmation(a_email, aux);
    console.log(resp);
    if(resp.response.result){
      const pushAction = StackActions.push("Login");
      this.props.navigation.dispatch(pushAction);
      //this.props.navigation.navigate("Login");      
    }else{
      
      if(resp.response.code === "expired-code"){
        this.setState({wrongVerificationMessage: "The code expired"});
      }else if(resp.response.code === "invalid-code"){
        this.setState({wrongVerificationMessage: "Invalid code"});
      }else if(resp.response.code === "email-not-registered"){
        this.setState({wrongVerificationMessage: "Email not registered"});
      }
      this.setState({showWrongVerificationMessage: true});
    }
    
  }


  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.backgroundContainer}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <View style={styles.mainPage}>
                <Image
                  style={styles.logoImage}
                  source={require("../../assets/images/logo.png")}
                />
                <Text style={styles.logoText}>FoodWayz</Text>
                <Text style={styles.text}>
                  Please enter your registered email to reset your password.
                </Text>
                <View style={styles.inputBoxes}>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.input}
                      placeholder={"Email"}
                      placeholderTextColor={"rgba(0,0,0,0.4)"}
                      underLineColorAndroid="transparent"
                      onChangeText={(value) => (this.state.email = value)}
                    />
                    <Text style={styles.inputTitle}> Mailing adress </Text>
                  </View>
                  
                </View>

                <View alignItems="center">
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => { 
                      this.sendEmail(this.state.email);
                      this.showCodeBox();
                     }}
                  >
                    <Text>Send Email</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => { this.showCodeBox();}}
                >
                  <Text style = {styles.alreadyHaveCodeText}>I already have a code</Text>
                </TouchableOpacity>

                {this.state.codeBox &&
                  <View>
                    <View style={styles.inputBoxes}>
                      <View style={styles.topShortInputView}>
                        <TextInput
                          style={styles.input}
                          placeholder={"Code"}
                          placeholderTextColor={"rgba(0,0,0,0.4)"}
                          underLineColorAndroid="transparent"
                          onChangeText={(value) => (this.state.verificationCode = value)}
                        />
                        <Text style={styles.topShortInputTitle}> Verification Code </Text>
                      </View>
                      <View style={styles.shortInputView}>
                        <TextInput
                          style={styles.input}
                          placeholder={"Password"}
                          placeholderTextColor={"rgba(0,0,0,0.4)"}
                          underLineColorAndroid="transparent"
                          onChangeText={(value) => (this.state.newPassword = value)}
                        />
                        <Text style={styles.shortInputTitle}> New Password </Text>
                      </View>
                    </View>

                    {this.state.showWrongVerificationMessage && 
                        <View>
                          <Text style={styles.errorText}>{this.state.wrongVerificationMessage}</Text>
                        </View>  
                    }

                    <View alignItems="center">
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => { 
                          this.resetPasswordCall();
                          
                        }}
                      >
                        <Text>Reset Password</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                }
                

              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView> 
        
          
        
      </SafeAreaView>
    );
  }
}

export default function ForgotPassScreen(props) {
  return <ForgotPassScreenComponent {...props} />;
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
    position: "relative",
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  mainPage: {
    flex: 1,
    position: "relative",
    paddingTop: 20,
    paddingBottom: 0,
    alignItems: "center",
  },

  logoImage: {
    position: "relative",
    width: 90,
    height: 90,
  },

  logoText: {
    position: "relative",
    color: "white",
    fontSize: 50,
    paddingTop: 0,
    paddingBottom: 10,
    fontWeight: "500",
    opacity: 1,
  },

  inputView: {
    position: "relative",
    padding: 10,
    paddingBottom: 0,
    paddingTop: 60,
  },

  topShortInputView: {
    position: "relative",
    padding: 10,
    paddingBottom: 0,
    paddingTop: 35,
  },

  
  shortInputView: {
    position: "relative",
    padding: 10,
    paddingBottom: 0,
    paddingTop: 15,
  },

  inputBoxes: {
    top: -30,
  },

  input: {
    elevation: 15,
    position: "relative",
    width: WIDTH - 100,
    height: 60,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "white",
    color: "#000000",
    marginHorizontal: 25,
  },

  inputTitle: {
    elevation: 16,
    position: "absolute",
    color: "#FC987E",
    paddingLeft: 38,
    paddingTop: 65,
    fontSize: 11,
    fontWeight: "500",
    opacity: 1,
  },

  topShortInputTitle:{
    elevation: 16,
    position: "absolute",
    color: "#FC987E",
    paddingLeft: 38,
    paddingTop: 40,
    fontSize: 11,
    fontWeight: "500",
    opacity: 1,
  },


  shortInputTitle:{
    elevation: 16,
    position: "absolute",
    color: "#FC987E",
    paddingLeft: 38,
    paddingTop: 20,
    fontSize: 11,
    fontWeight: "500",
    opacity: 1,
  },

  text: {
    position: "relative",
    fontSize: 16,
    paddingLeft: 15,
    color: "black",
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

  alreadyHaveCodeText:{
    paddingTop: 25,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 17,
  },

  errorText:{
    bottom: 15,
    paddingLeft: 25,
    color: 'red'
  },
});
