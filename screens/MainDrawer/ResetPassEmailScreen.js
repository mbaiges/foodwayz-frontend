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

class ResetPassEmailComponent extends Component {
  constructor() {
    super();
  }


  render() {

    return (
<SafeAreaView style={styles.backgroundContainer}>
          
            <View style={styles.inner}>
                    <Text style={styles.logoText}>Check your email!</Text>
                    <Icon
                        color="white"
                        name='check'
                        type='material-community'
                        size={100}
                    />
                    <Text style={styles.text}>
                    We have sent you a reset password link on your registerd email adress.
                    </Text>
            </View>
          
      </SafeAreaView>
    );
  }
}

export default ResetPassEmailScreen = (navigation) => {
    return <ResetPassEmailComponent navigation={navigation}/>;
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


});
