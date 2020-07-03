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

import { Icon, } from 'react-native-elements';

import { User, AuthApi } from '../../api'; 

class EmailVerifiedComponent extends Component {
  constructor() {
    super();
  }


  render() {

    return (
        <SafeAreaView style={styles.backgroundContainer}>
          {/* IF EMAIL VERIFIED
            <View style={styles.inner}>
                    <Text style={styles.logoText}>Verified email!</Text>
                    <Icon
                        color="white"
                        name='emoticon-happy-outline'
                        type='material-community'
                        size={100}
                    />
                                <TouchableOpacity
              style={styles.button}
              onPress={() => {}}
            >
              <Text>GO TO HOME SCREEN</Text>
            </TouchableOpacity>
            </View>
          */}

        {/* IF EMAIL NOT VERIFIED */}
            <View style={styles.inner}>
                    <Text style={styles.logoText}>Sorry, your email could not be verified</Text>
                    <Icon
                        color="white"
                        name='emoticon-sad-outline'
                        type='material-community'
                        size={100}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {}}
                        >
                        <Text>TRY AGAIN</Text>
                    </TouchableOpacity>
            </View>
          

          
      </SafeAreaView>
    );
  }
}

export default EmailVerifiedScreen = (navigation) => {
    return <EmailVerifiedComponent navigation={navigation}/>;
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
