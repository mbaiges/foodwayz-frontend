import React, { Component, useContext} from 'react';
import { Card, ListItem, Button, Icon, Input} from 'react-native-elements';
import { SafeAreaView, StyleSheet, View, Text, Image, TextInput, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import { UserContext } from '../../../context/UserContext';
import { UserApi } from '../../../api';


class EditProfileComponent extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    }
  }

  async fetchUser() {
    console.log('fetching user');
    const resp = await UserApi.getMe();
    this.setState({
      user: resp.result[0]
    })
    console.log('done fetching user');
    console.log(this.state.user);
    console.log(JSON.stringify(resp.result[0]));
  }

  async componentDidMount() {
    console.log('mounting');
    await this.fetchUser();
  }

  async changeImage() {
    
  }

  async saveChanges() {
    
  }

  async changePass() {
    
  }

  async setAlergies() {
    
  }

  render() {
    const { navigation, context } = this.props;
    const { authState, setAuthState } = context;

    return (
      <ScrollView>
      <View style={styles.backgroundContainer}>
        <View style={styles.mainPage}>
            <Image style={styles.logoImage} source={{ uri: this.state.user.a_image_url }}/>
            <TouchableOpacity style={styles.small_button} onPress={() => this.changeImage()} >
              <Text>EDIT IMAGE</Text>
            </TouchableOpacity>
            
        </View>
        <Text style={styles.subtitle}>Personal Information</Text>
        <View style={styles.inputView}>
          <Text style={styles.inputTitle}>Name</Text>
          <View style={styles.inputBox}>
              <Input placeholder='Name'>{this.state.user.a_name}</Input>  
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputTitle}>Email</Text>
          <View style={styles.inputBox}>
              <Input placeholder='Email'>{this.state.user.a_email}</Input>  
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputTitle}>Birth Date</Text>
          <View style={styles.inputBox}>
              <Input placeholder='Birth Date'>{this.state.BirthDate}</Input>  
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputTitle}>Gender</Text>
          <View style={styles.inputBox}>
              <Input placeholder='Gender'>{this.state.Gender}</Input>  
          </View>
        </View>
        
        <View>
          <TouchableOpacity style={styles.button} onPress={() => this.changePass()} >
              <Text>CHANGE PASSWORD</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => this.setAlergies()} >
              <Text>SET ALLERGIES</Text>
          </TouchableOpacity>
        </View> 
        <View>
          <TouchableOpacity style={styles.button} onPress={() => this.saveChanges()} >
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
    
    small_button:{
      elevation: 5,
      borderRadius: 25,
      backgroundColor: "#FC987E",
      color: "black",
      width: 120,
      alignItems: "center",
      height: 30,
      padding: 5,
      alignSelf: "center",
      marginBottom: 20,
      marginTop: 20
    },
  
  });
