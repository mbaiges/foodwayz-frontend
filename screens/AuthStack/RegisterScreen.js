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
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { User, AuthApi } from '../../api'; 
import { UserContext } from '../../context/UserContext';

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

  signUp = async function({ state, setAuthState, navigation }) {
    /*
    if (!validateSignupFields(state)) {
      // Mensajito de error
      console.log("Something went wrong.");
    }
    */

    const user = new User({
      a_name: state.username,
      a_email: state.email,
      a_password: state.password1
    });

    try {
      const ans = await AuthApi.signUp(user);
      if(ans){
        console.log(ans);
        console.log("User successfully registered"); 
        const auth = {
          state: 'SIGNED_UP',
          token: ''
        };
        await setAuthState(auth);
        navigation.navigate("Login")
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
              onPress={async () => {
                console.log("I want to navigate to Main");
                this.signUp({state: this.state, navigation, setAuthState});
              }}
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
  const { authState, setAuthState } = useContext(UserContext);
  return <RegisterScreenComponent {...props} context={{authState, setAuthState}} />;
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
