import React, { Component, useContext} from 'react';
import { Card, ListItem, Button, Icon, Input} from 'react-native-elements';
import { SafeAreaView, StyleSheet, View, Text, Image, Picker, TextInput, ScrollView, TouchableOpacity, Dimensions, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserContext } from '../../../context/UserContext';
import { UserApi } from '../../../api';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

class EditProfileComponent extends Component {

  constructor(){
    super();
    this.state = {
      user: {},
      date: new Date(),
      showDatePicker: false,
    }
    this.handleNameChange= this.handleNameChange.bind(this);
  }

  async fetchUser() {
    console.log('fetching user');
    const resp = await UserApi.getMe();
    this.setState({
      user: resp.result
    })
    console.log('done fetching user');
    console.log(this.state.user);
  }

  async updateUser(){
    //const { route } = this.props;
    let result = await UserApi.modifyMe(this.state.user);
    console.log("api updated" +  this.state.user);
    ///route.params.setState({user: this.state.user});
  }
    
  onChooseImagePress = async () => {
    let result = await ImagePicker.launchCameraAsync();
    //let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
        this.uploadImage(result.uri)
            .then(async () => {
                Alert.alert("Success");
                await this.getImage();
            })
            .catch((error) => {
                Alert.alert(error.message);
            });
    }
  }

  uploadImage = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();

      var myStr = this.state.user.a_email;
      var newStr = myStr.replace(/\./g, "_");

      console.log("imageName: " + newStr);

      var ref = firebase.storage().ref().child(`images/users/${newStr}.jpg`);
      return ref.put(blob);
  }

  getImage = async () => {
      var myStr = this.state.user.a_email;
      var newStr = myStr.replace(/\./g, "_");

      firebase.storage().ref().child(`images/users/${newStr}.jpg`).getDownloadURL().then(async (url) => {
        this.setState(prevState => ({
          user: {                    
              ...prevState.user,   
              a_image_url: url       
          }
        }))
        console.log(this.state.user);
        await this.updateUser();
      }).catch(function (error) {
          Alert.alert(error.message);
      });
  }

  handleNameChange(text) {    
    this.setState(prevState => ({
      user: {                    
          ...prevState.user,   
          a_name: text       
      }
    })) 
  }

  handleGenderChange(text) {    
    this.setState(prevState => ({
      user: {                    
          ...prevState.user,   
          a_gender: text       
      }
    })) 
  }

  handleDateChanged(date){
    console.log(date);

    console.log(this.state.date);
    // this.setState({
    //   date: date,
    //   showDatePicker: false}
    // );
    const isoDate = this.state.date.toISOString();
    console.log(isoDate);
    // this.setState(prevState => ({
    //   user: {                    
    //       ...prevState.user,   
    //       a_birthdate: isoDate      
    //   }
    // })) 
  }

  async saveChanges(){
    const { navigation } = this.props;
    await this.updateUser();
    navigation.goBack();
  }

  async componentDidMount() {
    console.log(JSON.stringify(this.updateProfile));
    console.log('mounting');
    await this.fetchUser();
  }

  render() {

    const { navigation, context } = this.props;
    const date = this.state.date;
    
    return (
      <ScrollView>
      <View style={styles.backgroundContainer}>
        <View style={styles.mainPage}>
            <Image style={styles.logoImage} source={{ uri: this.state.user.a_image_url }}/>
            <TouchableOpacity style={styles.button} onPress={() => { this.onChooseImagePress() }} >
              <Text>Edit Image</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}> Personal Information</Text>
        <View style={styles.inputView}>
          <Text style={styles.inputTitle}>Name</Text>
          <View style={styles.inputBox}>
              <Input type="text" value={this.state.user.a_name} onChangeText={ text => this.handleNameChange(text) } placeholder='Name'></Input>  
          </View>
        </View>
        <Text style={styles.genderTitle}>Gender</Text>
        <View style={styles.genderContainer}>          
          <Picker
            selectedValue={this.state.user.a_gender}
            style={{ height: 50, width: 150,  }}
            onValueChange={(itemValue, itemIndex) => this.handleGenderChange(itemValue)}>
            <Picker.Item label="Unknown" value="Undefined" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>        
        <View style={styles.inputView}>
          <Text style={styles.inputTitle}>Birth Date</Text>
          <View>
              <Text style={styles.dateStyle}>{this.state.date.getDate()} / {this.state.date.getMonth()} / {this.state.date.getFullYear()}</Text>  
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => this.setState({showDatePicker: true})} title="Show date picker!">
          <Text>CHANGE DATE</Text>
        </TouchableOpacity>  
          {this.state.showDatePicker && (
            <DateTimePicker 
              value={ this.state.date }
              mode='default'
              display='default'
              onChange={ date => { this.handleDateChanged(date) }}/>
          )}
        <View>
          <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("EditProfilePassword") }} >
              <Text>CHANGE PASSWORD</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditProfileAllergies")} >
              <Text>SET ALLERGIES</Text>
          </TouchableOpacity>
        </View> 
        <View>
          <TouchableOpacity style={styles.button} onPress={async() => { await this.saveChanges()}} >
              <Text>SAVE CHANGES</Text>
          </TouchableOpacity>
        </View> 
      </View>
      </ScrollView>
    );
  }
}

const { width: WIDTH } = Dimensions.get('window')

export default function EditProfile(props) {
  const { authState, setAuthState } = useContext(UserContext);
  return <EditProfileComponent {...props} context={{ authState, setAuthState }} />;
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
    },

    dateStyle: {
      color: 'black',
      fontSize: 20,
      paddingTop: 22,
      paddingLeft:20,
      fontFamily: 'Roboto', 
      fontWeight: 'bold'
    }
  
  });


