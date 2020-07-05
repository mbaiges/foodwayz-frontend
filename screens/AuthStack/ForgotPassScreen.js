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

class ForgotPassScreenComponent extends Component {
  constructor() {
    super();

    this.buttonShowing = true;

    this.state = {
      email: "",
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
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View alignItems="center">
          <TouchableOpacity
            style={styles.button}
            onPress={() => { navigation.navigate("ResetPassEmail") }}
          >
            <Text>RESET PASSWORD</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default ForgotPassScreen = (props) => {
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
    paddingTop: 40,
    paddingBottom: 40,
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
    paddingTop: 0,
    paddingBottom: 10,
    fontWeight: "500",
    opacity: 1,
  },

  inputView: {
    position: "relative",
    padding: 10,
    paddingBottom: 250,
    paddingTop: 60,
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
    elevation: 15,
    position: "relative",
    color: "#FC987E",
    paddingLeft: 38,
    paddingTop: 14,
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
});
