import React, { Component } from "react";
import {
  StyleSheet,
  View,
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
import api from "../api";

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

  validate_fields = () => {
    const { email, password } = this.state;
    if (email === "") {
      alert("Please fill email");
      return false;
    } else if (password === "") {
      alert("Please fill password");
      return false;
    }

    /*
    ^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
      └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
            │         │         │            │           no _ or . at the end
            │         │         │            │
            │         │         │            allowed characters
            │         │         │
            │         │         no __ or _. or ._ or .. inside
            │         │
            │         no _ or . at the beginning
            │
            username is 8-20 characters long
    */
    if (!this.validateEmail(email)) {
      alert("Please enter a valid email");
      return false;
    } else if (!this.validatePassword(password)) {
      alert("Please enter a valid password");
      return false;
    }
    return true;
  };

  validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  validatePassword = (password) => {
    let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  login = (navigation) => {
    if (this.validate_fields()) {
      const { email, password } = this.state;
      console.log(`http://${api.baseURL}:${api.port}/${api.routes.login}`);
      fetch(`http://${api.baseURL}:${api.port}/${api.routes.login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => {
          console.log(`res = ${JSON.stringify(res)}`);
          if (res.status === 200) {
            navigation.navigate("Home");
          } else if (res.status === 400) {
            alert("User does not exist");
          } else if (res.status === 401) {
            alert("Incorrect password");
          } else if (res.status === 500) {
            alert("Login failed");
          }
        })
        .catch((err) => {
          console.log(`An error ocurred: ${err}`);
        });
    }
  };

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

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.backgroundContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Animated.Image
                style={{ height: this.imageHeight, width: this.imageHeight }}
                source={require("../assets/logo.png")}
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
                    onChangeText={(value) => (this.state.password = value)}
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
            onPress={() => navigation.navigate("Home")}
          >
            <Text>LOG IN</Text>
          </TouchableOpacity>
        </View>
        <View alignItems="center">
          <Text
            style={styles.forgotpassword}
            onPress={() => navigation.navigate("ForgotPass")}
          >
            {" "}
            Forgot your password? Get new!{" "}
          </Text>
          <Text
            style={styles.signUp}
            onPress={() => navigation.navigate("Register")}
          >
            {" "}
            Don't have an account yet? Sign up!{" "}
          </Text>
        </View>
      </View>
    );
  }
}

export default LoginScreen = ({ navigation }) => {
  return <LoginScreenComponent navigation={navigation} />;
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
