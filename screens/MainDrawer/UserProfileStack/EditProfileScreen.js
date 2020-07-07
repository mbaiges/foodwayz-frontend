import React, { Component, useContext} from 'react';
import { Card, ListItem, Button, Icon, Input} from 'react-native-elements';
import { SafeAreaView, StyleSheet, View, Text, Image, Picker, TextInput, ScrollView, TouchableOpacity, Dimensions, Alert, Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserContext } from '../../../context/UserContext';
import { UserApi } from '../../../api';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";

import { Snackbar } from 'react-native-paper';

class EditProfileComponent extends Component {

  constructor(){
    super();
    this.state = {
      user: {},
      date: new Date(),
      showDatePicker: false,
      modalImageVisible: false,
    }
    this.handleNameChange= this.handleNameChange.bind(this);
  }

  async fetchUser() {
    const { route } = this.props;
    const { user } = route.params;

    console.log('fetching user');

    try {
      const resp = await UserApi.getMe();
      switch(resp.status) {
        case 200:
          this.setState({
            user: resp.response.result
          })
          this.setState({
            date: this.state.user.a_birthdate ? new Date(this.state.user.a_birthdate) : new Date()
          })
          console.log('done fetching user');
          console.log(this.state.user);
          break;
      default:
        console.log(`Status Received: ${resp.status} --> ${resp.response}`);
        // Show snackbar ?
        break;
      }
    }
    catch (error) {
      console.log(error);
      this.setState({
        snackbarConnectionVisible: true
      });
      // Show snackbar (Internet connecion, maybe?)
    }



    
  }

  async updateUser(){
    const { route } = this.props;
    const { userUpdater } = route.params;

    try {
      const resp = await UserApi.modifyMe(this.state.user);
      userUpdater(this.state.user);
    } catch (error) {
      console.log(error);
    }
    
  }

  onChooseImagePress = async () => {
    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
        this.uploadImage(result.uri)
            .then(async () => {
                await this.getImage();
            })
            .catch((error) => {
                Alert.alert(error.message);
            });
    }
  }

  onChooseGalleryImagePress = async () => {
    //let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
        this.uploadImage(result.uri)
            .then(async () => {
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

  dismissConnectionSnackBar = () => {
    this.setState({
      snackbarConnectionVisible: false
    });
  }

  handleDateChanged(timeStamp){
    var newDate = timeStamp ? new Date(timeStamp) : new Date();
    this.setState({
      date: newDate,
      showDatePicker: false}
    );
    const isoDate = this.state.date.toISOString();
    console.log("----------------------------------------------------------");
    console.log(isoDate);
    console.log("----------------------------------------------------------");
    this.setState(prevState => ({
      user: {
          ...prevState.user,
          a_birthdate: isoDate
      }
    }))
  }

  async saveChanges(){
    const { navigation } = this.props;
    await this.updateUser();
    navigation.goBack();
  }

  async componentDidMount() {

    const { route } = this.props;
    const { food } = route.params;
    console.log(food);
    
    console.log(JSON.stringify(this.updateProfile));
    console.log('mounting');
    await this.fetchUser();
  }

  render() {

    const { navigation, context } = this.props;
    const date = this.state.date;

    navigation.setOptions({
      headerRight: () => (
        <View style={styles.navbar_r_icons}>
          <Icon
            color="white"
            name='check'
            type='material-community'
            size={38}
            style={styles.navbar_r_icon}
            onPress={async() => { await this.saveChanges()}} 
          />
        </View>
      ),
    });

    return (
      
      <ScrollView>
        <View style={styles.backgroundContainer}>
          <View style={styles.mainPage}>
              <Image style={styles.logoImage} source={{ uri: this.state.user.a_image_url ? this.state.user.a_image_url : "https://firebasestorage.googleapis.com/v0/b/foodwayz-e9a26.appspot.com/o/images%2Fusers%2Funknown.png?alt=media&token=7bec299d-aefa-486e-8aa1-6f11c874ee2f" }}/>
              <TouchableOpacity style={styles.imageButton} onPress={() => { this.setState({modalImageVisible: true}) }} >
              <Icon
                  name='pencil'
                  type='material-community'  
                  color="white" 
              />
            </TouchableOpacity>
          </View>

{/* ---------------------------------MODAL------------------------------------------------- */}

          <View style={styles.centeredView}>
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalImageVisible}
                  onRequestClose={() => {
                    this.setState({modalImageVisible: false});
                }}
              >
                  <View style = {styles.centeredView}>
                      <View style = {styles.modalImageView}>
                          <TouchableOpacity
                              style={styles.modalItemButton}
                              onPress={() => { 
                                    //Ir a la camara y sacar la foto
                                  this.onChooseImagePress();
                                  this.setState({modalImageVisible: false});
                                }}
                          >
                              <Text style={styles.blackButtonText}>Camera</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              style={styles.modalItemButton}
                              onPress={() => { 

                                  this.onChooseGalleryImagePress();
                                  this.setState({modalImageVisible: false});
                                  //Ir a la galería
                              }}
                          >
                              <Text style={styles.blackButtonText}>Gallery</Text>
                          </TouchableOpacity>
                      </View>             
                  </View>
              </Modal>
          </View>
    



{/* --------------------------------------------------------------------------------------- */}
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

          <View style={styles.showAll} flexDirection='row' justifyContent='space-between'  >
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>Birth Date</Text>
            <View>
                <Text style={styles.dateStyle}>{this.state.date.getDate()} / {this.state.date.getMonth() + 1} / {this.state.date.getFullYear()}</Text>
            </View>
          </View>

          <View paddingTop={10}>
                <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                  <Text style={styles.secondaryText}>CHANGE DATE</Text>
                  <Icon
                        name='calendar-check-outline'
                        type='material-community'  
                      />
                </TouchableOpacity>
              </View>
          </View>

            {this.state.showDatePicker && (
              <DateTimePicker
                value={ this.state.date }
                mode='default'
                display='default'
                onChange={ date => { this.handleDateChanged(date.nativeEvent.timestamp)}}/>
            )}
          <View>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("EditProfilePassword") }} >
                <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditProfileAllergies", { user: this.state.user })} >
              <Text style={styles.buttonText}>SET FOOD PREFERENCES</Text>
          </TouchableOpacity>
        </View>


        <Snackbar
              style={styles.snackBar}
              duration={4000}
              visible={this.state.snackbarConnectionVisible}
              onDismiss={this.dismissConnectionSnackBar}
        >
             <Text style={styles.textSnack}>No internet connection.</Text>
        </Snackbar>

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

      color: 'white',
    },

    navbar_r_icons: {
      flexDirection: "row",
      right: 16,
    },
  
    navbar_r_icon: {
      color: Colors.noticeText,
      marginLeft: 16,
    },

    mainPage: {
      flex: 3,
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
    },


    showAll: {

      marginRight:30,
      marginTop: 20,
      marginBottom:20

    },

    buttonText: {
      color:"white",
      textAlign:"center"
    },

    imageButton:{
      width: 40,  
      height: 40,
      paddingTop:5,
      alignItems:"center",   
      borderRadius: 30,            
      backgroundColor: '#FC987E',                                                                             
      bottom: 25,                                                    
      left: 30, 
    },

      
    modalImageView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      height: 120,
    },

    centeredView: {
      flex: 1,
      justifyContent: "center",
      //alignItems: "center",
      marginTop: 22
    },
  
    modalItemButton: {
      borderColor: 'black',
      borderWidth:1,
      elevation: 5,
      borderRadius: 5,
      backgroundColor: "white",
      color: "black",
      width: 217,
      alignItems: "center",
      padding: 13,
      height: 48,
      alignSelf: "center",
      marginBottom: 5
  },
  
  blackButtonText:{
    color: "black",
      
  },


  textSnack:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  },

  snackBar:{
    backgroundColor: "#787777",
    height:70,
  },
  });
