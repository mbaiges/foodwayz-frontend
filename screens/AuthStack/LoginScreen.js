import React, { Component, useContext } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Animated,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Alert,
} from "react-native";
import { Input } from "react-native-elements";
import { UserContext } from '../../context/UserContext';
import { User, AuthApi } from '../../api';

import { StackActions } from '@react-navigation/native';

import { validateSigninFields } from '../../utils';



class LoginScreenComponent extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      emailVerificationModal: false,
      verificationCodeValue: "",
      showWrongVerificationMessage: false,
      wrongVerificationMessage:"",
    };

    this.imageHeights = {
      IMAGE_HEIGHT_SMALL: 84,
      IMAGE_HEIGHT: 200,
    };

    this.imageHeight = new Animated.Value(this.imageHeights.IMAGE_HEIGHT);
  }

  componentDidMount() {
    keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    keyboardDidShowListener.remove();
    keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    Animated.timing(this.imageHeight, {
      duration: 500,
      toValue: this.imageHeights.IMAGE_HEIGHT_SMALL,
    }).start();
  };

  _keyboardDidHide = () => {
    Animated.timing(this.imageHeight, {
      duration: 500,
      toValue: this.imageHeights.IMAGE_HEIGHT,
    }).start();
  };


  showWrongVerificationMessage(){
    this.setState({showWrongVerificationMessage: true})
  }

  
  async verificateAccount(){
    const {context} = this.props;
    const {setAuthState} = context;
    const resp = await AuthApi.verifyEmail(this.state.email,this.state.verificationCodeValue);
    const isVerified = resp.response.result;
    console.log(resp);
    const codeType = resp.response.code;
    if(isVerified){
      this.setState({emailVerificationModal: false});
      const user = new User({
        a_email: this.state.email,
        a_password: this.state.password
      });
      const ans = await AuthApi.signIn(user);
      console.log(ans.response);
      console.log("User successfully logged");
      const auth = {
        state: 'SIGNED_IN',
        token: ans.response.accessToken,
      };
      await setAuthState(auth);
    }else if(codeType === "expired-code"){
      this.setState({wrongVerificationMessage: "The code expired"});
      this.showWrongVerificationMessage();
    }else if(codeType === "invalid-code"){
      this.setState({wrongVerificationMessage: "Invalid code"});
      this.showWrongVerificationMessage();
    }
  }
  
  async resendEmail(email){
    await AuthApi.resendEmail(email);
  }

  signIn = async function ({ state, setAuthState, navigation }) {
    
    const inputs = {email: this.state.email, password:this.state.password};
   

    // if (!validateSigninFields(inputs)) {  // DESCOMENTAR ANTES DE LA ENTREGA
    //   // El Mensajito de error lo manda validateSigninFields
    //   console.log("Something went wrong.");
    // }else{
      const user = new User({
        a_email: state.email,
        a_password: state.password
      });


      try {
        const ans = await AuthApi.signIn(user);
        console.log(ans);
        if (ans && ans.status === 200) {
          console.log(ans.response);
          console.log("User successfully logged");
          const auth = {
            state: 'SIGNED_IN',
            token: ans.response.accessToken
          };
          await setAuthState(auth);
        }else if(ans && ans.status === 401 && ans.response.code === "not-verified"){
          this.setState({emailVerificationModal: true});
        }else if(ans && ans.status === 401 && ans.response.code === "invalid-auth"){
          alert("Incorrect password");
        }else if(ans && ans.status === 400 && ans.response.code === "user-not-exists"){
          alert("A user with that mail address was not found.");
        }

      } catch (err) {
        console.log(err);
      }

    //}
  }

  render() {
    const { navigation, context } = this.props;
    const { authState, setAuthState } = context;

    return (
      <SafeAreaView style={styles.backgroundContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Animated.Image
                style={{ height: this.imageHeight, width: this.imageHeight }}
                source={require("../../assets/images/logo.png")}
              />
              <Text style={styles.logoText}>FoodWayz</Text>


{/* ---------------------------------------------------MODAL-----------------------------------------------------------------*/}
         
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.emailVerificationModal}
                  onRequestClose={() => {
                    this.setState({emailVerificationModal: false});
                  }}
                >

                  <View style = {styles.centeredView}>
                  <View style = {styles.modalView}>
                      <Text style={styles.modalText}>Verification mail sent to:</Text>
                      <Text style={styles.modalText}>{this.state.email}</Text>
                      <Text style={styles.modalText}>Please check your mailbox.</Text>
                      
                     
                      <Input
                          placeholder={"Insert Verification Code"}
                          onChangeText={(value) => ( this.setState({ verificationCodeValue:value }))}
                      />
                      {this.state.showWrongVerificationMessage && 
                        <View>
                          <Text style={styles.errorText}>{this.state.wrongVerificationMessage}</Text>
                        </View>  
                      }
                      <View flexDirection = 'row'>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                              style={styles.cancelButton2}
                              onPress={async () => {
                                this.setState({emailVerificationModal: false});
                              }}
                          >
                              <Text style={styles.blackButtonText}>Close</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                              style={styles.cancelButton}
                              onPress={async () => {
                                this.resendEmail(this.state.email);
                              }}
                          >
                              <Text style={styles.blackButtonText}>Resend Email</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                              style={styles.deleteButton}
                              onPress={async() => {
                                this.verificateAccount();
                              }}
                          >
                              <Text style={styles.buttonText}>Verify</Text>
                          </TouchableOpacity>
                        </View>

                      </View>
                      
                    </View>
                  </View>

                </Modal>
              </View>

{/* --------------------------------------------------------------------------------------------------------------------*/} 



              <View style={styles.inputBoxes}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Email"}
                    placeholderTextColor={"rgba(0,0,0,0.4)"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.email = value)}
                  />
                  <Text style={styles.inputTitle}> Email </Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder={"Password"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => { this.state.password = value }}
                  />
                  <Text style={styles.inputTitle}> Password </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View alignItems="center">
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              console.log("I want to navigate to Main");
              this.signIn({ state: this.state, navigation, setAuthState });
            }}
          >
            <Text>LOG IN</Text>
          </TouchableOpacity>
        </View>
        <View alignItems="center">
          <Text
            style={styles.forgotpassword}
            onPress={() => {
              const pushAction = StackActions.push("ForgotPass");
              navigation.dispatch(pushAction);
              //navigation.navigate("ForgotPass");
            }}
          >
            {" "}
            Forgot your password? Get new!{" "}
          </Text>
          <Text
            style={styles.signUp}
            onPress={() => {
              const pushAction = StackActions.push("Register");
              navigation.dispatch(pushAction);
              //navigation.navigate("Register");
            }}
          >
            {" "}
            Don't have an account yet? Sign up!{" "}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default LoginScreen = (props) => {
  const { authState, setAuthState } = useContext(UserContext);
  return <LoginScreenComponent {...props} context={{ authState, setAuthState }} />;
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
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
  logoText: {
    position: "relative",
    color: "white",
    fontSize: 50,
    paddingTop: 25,
    paddingBottom: 50,
    fontWeight: "500",
    opacity: 1,
  },

  inputView: {
    position: "relative",
    padding: 10,
  },

  inputBoxes: {
    top: -30,
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

  inputTitle: {
    elevation: 10,
    position: "absolute",
    color: "#FC987E",
    paddingLeft: 38,
    paddingTop: 14,
    fontSize: 11,
    fontWeight: "500",
    opacity: 1,
  },
  text: {
    fontSize: 10,
    paddingLeft: 20,
    color: "white",
    marginHorizontal: 25,
  },

  button: {
    elevation: 10,
    borderRadius: 25,
    backgroundColor: "white",
    color: "black",
    width: 217,
    alignItems: "center",
    padding: 13,
    height: 48,
  },

  signUp: {
    position: "relative",
    color: "black",
    fontSize: 11,
    paddingTop: 0,
    paddingBottom: 0,
    fontWeight: "500",
    opacity: 1,
    textDecorationLine: "underline",
  },

  forgotpassword: {
    position: "relative",
    color: "black",
    fontSize: 11,
    paddingTop: 25,
    paddingBottom: 8,
    fontWeight: "500",
    textDecorationLine: "underline",
    opacity: 1,
  },


  centeredView: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    marginTop: 22
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 300,
  },

 
  buttonContainer:{
    alignItems:"center",
    paddingTop: 20,
    paddingBottom: 22,
    paddingLeft: 8,
  },

  cancelButton: {
    elevation: 10,
    borderRadius: 5,
    backgroundColor: "white",
    color: "black",
    width: 100,
    alignItems: "center",
    padding: 8,
    borderColor: 'black',
    borderWidth:0.5,
    height: 48,
  },

  deleteButton: {
    elevation: 10,
    borderRadius: 5,
    backgroundColor: "#FC987E",
    color: "white",
    width: 100,
    alignItems: "center",
    padding: 13,
    height: 48,
    paddingLeft: 0,
  },

  buttonText:{
    color: "white",
      
  },

  blackButtonText:{
    color: "black",
      
  },

  modalText:{
    fontSize: 20,
    paddingBottom: 10,
  },

  cancelButton2:{
    elevation: 10,
    borderRadius: 5,
    backgroundColor: "white",
    color: "black",
    width: 100,
    alignItems: "center",
    padding: 13,
    borderColor: 'black',
    borderWidth:0.5,
    height: 48,
  },

  errorText:{
    bottom: 15,
    paddingLeft: 25,
    color: 'red'
  },

});
