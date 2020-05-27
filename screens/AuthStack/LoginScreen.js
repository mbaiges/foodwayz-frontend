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
import { validateSigninFields } from '../../utils';

class LoginScreenComponent extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
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

  signIn = async function(state) {
    /*
    if (!validateSigninFields(state)) {
      // Mensajito de error
      console.log("Something went wrong.");
    }
    */
    let controller = new AbortController();
    let signal = controller.signal;

    setTimeout(() => controller.abort(), 5000);

    init.signal = signal

    fetch('192.168.1.103:3002', init)
    .then(response => {
      if (!response.ok)
        reject(new Error(response.statusText));

      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
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
                    onChangeText={(value) => { this.state.password = value } }
                  />
                  <Text style={styles.inputTitle}> Password </Text>
                </View>
                <Text>{authState}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View alignItems="center">
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              console.log("I want to navigate to Main");
              try {
                await this.signIn(this.state);          
              } catch (err) {
                console.log("User didnt logged");
              }
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
              let auth = JSON.stringify({state: "REGISTERED", token: ''});
              setAuthState(auth);
              navigation.navigate("Register");
            }}
          >
            {" "}
            Don't have an account yet? Sign up!{" "}
          </Text>
          <Text
            style={styles.signUp}
            onPress={() => {
              validate_signin_fields(this.state);
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
  return <LoginScreenComponent {...props} context={{authState, setAuthState}} />;
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
});
