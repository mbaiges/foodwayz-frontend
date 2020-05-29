import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function ContactUs(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rectStack}>
        <View style={styles.rect}></View>
        <View style={styles.rect6}></View>
      </View>
      <Text style={styles.contactUs}>Contact us</Text>
      <Text style={styles.loremIpsum}>
        Please fill out this form to contact us.
      </Text>
      <View style={styles.rect2Stack}>
        <View style={styles.rect2}></View>
        <Text style={styles.name}>NAME</Text>
      </View>
      <View style={styles.emailStack}>
        <Text style={styles.email}>EMAIL</Text>
        <View style={styles.rect3}></View>
      </View>
      <View style={styles.rect4Stack}>
        <View style={styles.rect4}></View>
        <Text style={styles.phoneNumber}>PHONE NUMBER</Text>
      </View>
      <View style={styles.messageStack}>
        <Text style={styles.message}>MESSAGE</Text>
        <View style={styles.rect5}></View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.send}>SEND</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    top: 0,
    width: 0,
    height: 0,
    position: "absolute",
    backgroundColor: "rgba(252,152,126,1)",
    left: 187
  },
  rect6: {
    top: 0,
    left: 0,
    width: 375,
    height: 85,
    position: "absolute",
    backgroundColor: "rgba(252,149,126,1)"
  },
  rectStack: {
    width: 375,
    height: 85,
    marginLeft: -7
  },
  contactUs: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 28,
    marginTop: 25,
    marginLeft: 24
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 14,
    marginLeft: 24
  },
  rect2: {
    top: 15,
    left: 0,
    width: 323,
    height: 35,
    position: "absolute",
    backgroundColor: "#E6E6E6"
  },
  name: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  rect2Stack: {
    width: 323,
    height: 50,
    marginTop: 24,
    marginLeft: 24
  },
  email: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  rect3: {
    top: 16,
    left: 0,
    width: 323,
    height: 35,
    position: "absolute",
    backgroundColor: "#E6E6E6"
  },
  emailStack: {
    width: 323,
    height: 51,
    marginTop: 25,
    marginLeft: 24
  },
  rect4: {
    top: 16,
    left: 0,
    width: 323,
    height: 35,
    position: "absolute",
    backgroundColor: "#E6E6E6"
  },
  phoneNumber: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  rect4Stack: {
    width: 323,
    height: 51,
    marginTop: 21,
    marginLeft: 24
  },
  message: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  rect5: {
    top: 16,
    left: 0,
    width: 323,
    height: 225,
    position: "absolute",
    backgroundColor: "#E6E6E6"
  },
  messageStack: {
    width: 323,
    height: 241,
    marginTop: 16,
    marginLeft: 24
  },
  button: {
    width: 164,
    height: 38,
    backgroundColor: "rgba(252,149,126,1)",
    borderRadius: 22,
    marginTop: 34,
    marginLeft: 106
  },
  send: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    marginTop: 7,
    marginLeft: 56
  }
});

export default ContactUs;
