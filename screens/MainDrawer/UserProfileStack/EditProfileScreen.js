import React, { Component } from 'react';
import { Card, ListItem, Button, Icon, Input} from 'react-native-elements';
import { SafeAreaView, StyleSheet, View, Text, Image, Picker, TextInput, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


//import { Constants } from 'expo';





class EditProfileComponent extends Component {
  constructor(){
    super();

    this.state = {
      name: "Alfredo",
      lastName: "Rotta",
      email: "alfredorotta@gmail.com",
      birthDate : "13/02/1999",
      gender: "Undefined",
      date: new Date(),
      showDatePicker: false,
    }

  }


  render() {

    const {navigation} = this.props;

    const date = this.state.date;
    
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
              <Input placeholder='Name'>{this.state.name}</Input>  
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputTitle}>Last Name</Text>
          <View style={styles.inputBox}>
              <Input placeholder='Last Name'>{this.state.lastName}</Input>  
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputTitle}>Email</Text>
          <View style={styles.inputBox}>
              <Input placeholder='Email'>{this.state.email}</Input>  
          </View>
        </View>

        <Text style={styles.genderTitle}>Gender</Text>
        <View style={styles.genderContainer}>          
          <Picker
            
            selectedValue={this.state.gender}
            style={{ height: 50, width: 150,  }}
            onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>        
        <View style={styles.inputView}>
          <Text style={styles.inputTitle}>Birth Date</Text>
          <View style={styles.inputBox}>
              <Input placeholder='Birth Date'>{this.state.birthDate}</Input>  
          </View>
        </View>

        <Button onPress={() => this.setState({showDatePicker: true})} title="Show date picker!" />
        {this.state.showDatePicker && (
          <DateTimePicker 
            value={ date }
            mode='default'
            display='default'
            onChange={ () => this.setState({ date: date, showDatePicker: false })} />
        )}
        <Text>{JSON.stringify(this.state)} </Text>
        <Text>{JSON.stringify(date)} </Text>
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
  }
  
};

const { width: WIDTH } = Dimensions.get('window')

export default function EditProfile({ navigation }) {
  return <EditProfileComponent navigation={navigation} />;
}

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

    genderTitle:{
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

    genderContainer:{
      paddingLeft: 15,
      borderColor: 'black',
      borderWidth:1,
      marginRight:220,
      marginLeft: 15,
      borderRadius: 5
    }
    
  
  });


