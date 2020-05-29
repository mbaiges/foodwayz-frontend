import React, { Component } from 'react';
import { Card, ListItem, Button, Icon, Input} from 'react-native-elements';
import { SafeAreaView, StyleSheet, View, Text, Image, TextInput, ScrollView, TouchableOpacity, Dimensions} from 'react-native';


//import { Constants } from 'expo';

const { width } = Dimensions.get('window');

const state={
    Name: "Alfredo",
    LastName: "Rotta",
    Email: "alfredorotta@gmail.com",
    BirthDate : "13/02/1999",
    Gender: "Male",
};


const EditProfile = ({ navigation }) => {
    

  return (
    <ScrollView>
    <View style={styles.backgroundContainer}>
      <View style={styles.mainPage}>
          <Image style={styles.logoImage} source={require('../../../assets/images/Po.jpg')}/>
          <Text style={styles.logoEditText}>Edit image</Text>
      </View>
      <Text style={styles.subtitle}> Personal Information</Text>
      <View style={styles.inputView}>
        <Text style={styles.inputTitle}>Name</Text>
        <View style={styles.inputBox}>
            <Input placeholder='Name'>{state.Name}</Input>  
        </View>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputTitle}>Last Name</Text>
        <View style={styles.inputBox}>
            <Input placeholder='Last Name'>{state.LastName}</Input>  
        </View>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputTitle}>Email</Text>
        <View style={styles.inputBox}>
            <Input placeholder='Email'>{state.Email}</Input>  
        </View>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputTitle}>Birth Date</Text>
        <View style={styles.inputBox}>
            <Input placeholder='Birth Date'>{state.BirthDate}</Input>  
        </View>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputTitle}>Gender</Text>
        <View style={styles.inputBox}>
            <Input placeholder='Gender'>{state.Gender}</Input>  
        </View>
      </View>
      
      <View>
        <TouchableOpacity style={styles.button} onPress={() => this.making_api_call()} >
            <Text>CHANGE PASSWORD</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => this.making_api_call()} >
            <Text>SET ALLERGIES</Text>
        </TouchableOpacity>
      </View> 
    </View>
    </ScrollView>
  );
};

const { width: WIDTH } = Dimensions.get('window')

const styles = StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      width: null,
      height: null,
      backgroundColor: 'white',
    },
  
    mainPage: {
      //flex: 1,
      position: 'relative',
      paddingTop: 20,
      //paddingBottom: 40,
      alignItems: 'center',
    },
  
    logoImage: {
      position: 'relative',
      width: 120,
      height: 120,
      justifyContent: 'center',
      borderRadius: 120/2,
    },

  
    logoEditText:{
      position: "relative",
      color: 'black',
      fontSize: 20,
      paddingTop: 10,
      paddingBottom: 25,
      fontWeight: '500',
      opacity: 1,
      textAlign: 'center',

    },

    titleText:{
        color: 'black',
        fontSize: 20,
        fontFamily: 'Roboto', 
        fontWeight: 'bold',
        paddingLeft: 0,
        paddingBottom: 100,
    },
  
    inputView: {
        position: 'relative',
        padding: 0,
        
      },
    
    inputBox:{
        paddingTop: 15,
        paddingLeft:10

    },
      
    subtitle:{
        color: 'black',
        fontSize: 20,
        paddingLeft:15,
        fontFamily: 'Roboto', 
        fontWeight: 'bold',
        paddingBottom: 5,
    },

    input: {
    elevation: 15,
    position: 'relative',
    width: WIDTH - 100 ,
    height: 60,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingTop: 25,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#000000',
    marginHorizontal: 25,
    },

    inputTitle:{
    elevation: 15,
    position: "absolute",
    color: '#FC987E',
    paddingLeft: 20,
    fontSize: 17,
    fontWeight: '500',
    opacity: 1,
    
    },

    button: {
        elevation: 5,
        borderRadius: 25,
        backgroundColor: "#FC987E",
        color: "black",
        width: 217,
        alignItems: "center",
        padding: 13,
        height: 48,
        alignSelf: "center",
        marginBottom: 20
      },
    
  
  });

export default EditProfile;
