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
} from "react-native";
import { UserContext } from '../../context/UserContext';
import { User, AuthApi } from '../../api';
import { validateSigninFields } from '../../utils';

class LoginScreenComponent extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      emailVerificationModal: false,
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

  signIn = async function ({ state, setAuthState, navigation }) {
    /*
    if (!validateSigninFields(state)) {
      // Mensajito de error
      console.log("Something went wrong.");
    }
    */
    const user = new User({
      a_email: state.email,
      a_password: state.password
    });

    try {
      const ans = await AuthApi.signIn(user);
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
        //await AuthApi.resendEmail(this.state.a_email);
        
      }else if(ans && ans.status === 401 && ans.response.code === "invalid-auth"){
        //CONTRASEÑA INVALIDAAAAAAAA
      }
    } catch (err) {
      console.log(err);
    }
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


{/* ---------------------------------------MODAL-----------------------------------------------------------------------*/}
         
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.emailVerificationModal}
                  onRequestClose={() => {
                  }}
                >

                  <View style = {styles.centeredView}>
                    <View style = {styles.modalView}>
                      <Text>This mail is nos verified.</Text>
                      <Text>A verification mail was sended to {this.state.email}. Please check your mailbox.</Text>
                      <View flexDirection = 'row'>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                              style={styles.cancelButton}
                              onPress={async () => {
                                this.setState({emailVerificationModal: false});
                              }}
                          >
                              <Text style={styles.blackButtonText}>Close</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                              style={styles.deleteButton}
                              onPress={async () => {
                                //await AuthApi.resendEmail(this.state.a_email);

                              }}
                          >
                              <Text style={styles.buttonText}>Resend email</Text>
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
              navigation.navigate("ForgotPass");
            }}
          >
            {" "}
            Forgot your password? Get new!{" "}
          </Text>
          <Text
            style={styles.signUp}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            {" "}
            Don't have an account yet? Sign up!{" "}
          </Text>
          <Text
            style={styles.signUp}
            onPress={() => {
              navigation.navigate("Main");
            }}
          >
            {" "}
            Don't have a working log-in system yet? Bypass security right now!{" "}
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

  inputTitle: {
    elevation: 15,
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
    elevation: 15,
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
  },

  cancelButton: {
    elevation: 15,
    borderRadius: 5,
    backgroundColor: "white",
    color: "black",
    width: 100,
    alignItems: "center",
    padding: 13,
    height: 48,
  },


  deleteButton: {
    elevation: 15,
    borderRadius: 5,
    backgroundColor: "#FC987E",
    color: "white",
    width: 100,
    alignItems: "center",
    padding: 13,
    height: 48,
  },

  buttonText:{
    color: "white",
      
  },

  blackButtonText:{
    color: "black",
      
  },



});
