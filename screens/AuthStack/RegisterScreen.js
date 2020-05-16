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
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
//import Api from '../../api'; 
import Storage from '../../storage';

class RegisterScreenComponent extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: "",
      checked: false,
    };
  }

  validate_signup_fields = ({
    username,
    email,
    password1,
    password2,
    checked,
  }) => {
    if (username === "") {
      alert("Please fill username");
      return false;
    } else if (email === "") {
      alert("Please fill email");
      return false;
    } else if (password1 === "") {
      alert("Please fill password");
      return false;
    } else if (password2 === "") {
      alert("Please repeat password");
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
    if (!this.validateUsername(username)) {
      alert("Please enter a valid username");
      return false;
    } else if (!this.validateEmail(email)) {
      alert("Please enter a valid email");
      return false;
    } else if (password1 !== password2) {
      alert("Passwords must match");
      return false;
    } else if (!this.validatePassword(password1)) {
      alert("Please enter a valid password");
      return false;
    } else if (!checked) {
      alert("You must agree terms and conds before continuing");
      return false;
    }

    return true;
  };

  validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  validateUsername = (username) => {
    let re = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    return re.test(username);
  };

  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  validatePassword = (password) => {
    let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
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

  register = ({navigation}) => {
    if (this.validate_signup_fields(this.state)) {
      //this.Api.auth.register({email: this.state.email, username: this.state.username, password: this.state.password1});
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.backgroundContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Image
                style={styles.logoImage}
                source={require("../../assets/images/logo.png")}
              />
              <Text style={styles.logoText}>FoodWayz</Text>
              <View style={styles.inputBoxes}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Username"}
                    placeholderTextColor={"rgba(0,0,0,0.4)"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.username = value)}
                  />
                  <Text style={styles.inputTitle}> Username </Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder={"E-mail"}
                    placeholderTextColor={"rgba(0,0,0,0.4)"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.email = value)}
                  />
                  <Text style={styles.inputTitle}> E-Mail </Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder={"Password"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.password1 = value)}
                  />
                  <Text style={styles.inputTitle}> Password </Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder={"Repeat password"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.password2 = value)}
                  />
                  <Text style={styles.inputTitle}> Repeat password </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View alignItems="center">
          <View style={styles.checkboxLine}>
          <CheckBox
              value={this.state.checked}
              tintColors={{ true: "white", false: "black" }}
              onValueChange={() =>
                this.setState({ checked: !this.state.checked })
              }
            />
            <View style={styles.checkboxText}>
              <Text>I have read and accepted </Text>
              <Text
                style={styles.termAndConds}
                onPress={() => {
                  //navigation.navigate("Terms&Conditions");
                  console.log("Clicked on terms and conditions");
                }}
              >
                terms and conditions.
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.register({navigation})}
            >
              <Text>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default RegisterScreen = (props) => {
  return <RegisterScreenComponent {...props} />;
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

  logoImage: {
    position: "relative",
    width: 84,
    height: 84,
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
    top: -10,
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

  checkboxLine: {
    flexDirection: "row",
    marginBottom: 10,
  },

  checkboxText: {
    top: 5,
    flexDirection: "row",
  },

  termAndConds: {
    textDecorationLine: "underline",
  },
});
