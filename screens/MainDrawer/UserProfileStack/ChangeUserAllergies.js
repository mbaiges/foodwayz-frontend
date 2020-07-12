import React, { Component, useContext } from "react";
import { CharacteristicApi, UserHasCharacteristicApi } from '../../../api';
import { UserContext } from '../../../context/UserContext';
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
  ActivityIndicator
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Snackbar } from 'react-native-paper';
import { CheckBox } from "react-native-elements";

import { UserApi } from '../../../api';

const { width } = Dimensions.get("window");

class EditProfileAllergiesComponent extends Component {
  constructor() {
      super();
      this.state = {
          user: {},
          chars: [],
          values:[]
      }
  }

  dismissConnectionSnackBar = () => {
    this.setState({
      snackbarConnectionVisible: false
    });
  }

  async changeValue(i){
    let newValues = this.state.values;
    newValues[i] = !newValues[i];
    this.setState({values: newValues})
    if(this.state.values[i]){
      try {
        const resp = await UserHasCharacteristicApi.addCharacteristicToUser(this.state.user.a_user_id, this.state.chars[i].a_char_id);
        switch(resp.status) {
          case 200:
   
            break;
        default:
          console.log(`Status Received: ${resp.status} --->`);
          console.log(`${resp.response}`);
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

      
    }else{
      try {
        const resp = await UserHasCharacteristicApi.removeCharacteristicFromUser(this.state.user.a_user_id, this.state.chars[i].a_char_id);
        switch(resp.status) {
          case 200:
   
            break;
        default:
          console.log(`Status Received: ${resp.status} --->`);
          console.log(`${resp.response}`);
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
  }

  setValue( id ){
    for(let i = 0; i < this.state.chars.length ; i++){
      if(this.state.chars[i].a_char_id == id){
        let newValues = this.state.values;
        newValues[i] = true;
        this.setState({values: newValues})
      }                        
    } 
  }

  async fetchUserChars(){
    try {
      const resp = await UserHasCharacteristicApi.getCharactersticsByUser(this.state.user.a_user_id);
      switch(resp.status) {
        case 200:
          for (let userChar of resp.response.result) {
            this.setValue(userChar.a_char_id);
          }
          break;
      default:
        console.log(`Status Received: ${resp.status} --->`);
        console.log(`${resp.response}`);
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

  async fetchChars(){
    try {
      const resp = await CharacteristicApi.getAll();
      switch(resp.status) {
        case 200:
          this.setState({ chars: resp.response.result });
          for(let i = 0; i < this.state.chars.length ; i++){
            this.state.values.push(false);                        
          } 
          break;
      default:
        console.log(`Status Received: ${resp.status} --->`);
        console.log(`${resp.response}`);
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
  
  async fetchUser() {

    try {
      const resp = await UserApi.getMe();
      switch(resp.status) {
        case 200:
          this.setState({
            user: resp.response.result
          })
          break;
      default:
        console.log(`Status Received: ${resp.status} --->`);
        console.log(`${resp.response}`);
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

  async componentDidMount() {
    // const { route } = this.props
    // const  { user } = route.params
    // this.setState({ user: user }); 
    // console.log(this.state.user);

    this.setState({
      activityIndicator: true
    })

    console.log('mounting');
    await this.fetchUser();
    await this.fetchChars();
    await this.fetchUserChars();
    this.setState({
      activityIndicator: false
    })
  }

  render() {
    
    const { navigation, context } = this.props;
    const date = this.state.date;

    var optionButtons = [];
    for(let i = 0; i < this.state.chars.length ; i++){
        optionButtons.push(
            <View key={i}>
                <CheckBox
                    title = {this.state.chars[i].a_char_name.charAt(0).toUpperCase() + this.state.chars[i].a_char_name.slice(1)}
                    checked = {this.state.values[i]}
                    onPress={async () => await this.changeValue(i)}
                />
            </View>
        )                        
    }

    return (
      (this.state.activityIndicator) ?
      (<SafeAreaView>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
        
      </SafeAreaView>)
      :
        
       ( <SafeAreaView style={styles.backgroundContainer}>
            <ScrollView showsVerticalScrollIndicator={false} vertical = {true}>
                <View style={styles.inner}>
                    <View style={styles.mainPage}>
                        <Text style={styles.title}>Select Characteristics</Text>
                    </View>
                </View>
                { optionButtons }
                <Snackbar
                  style={styles.snackBarError}
                  duration={4000}
                  visible={this.state.snackbarConnectionVisible}
                  onDismiss={this.dismissConnectionSnackBar}
                >
                    <Text style={styles.textSnack}>No internet connection.</Text>
                </Snackbar>
            </ScrollView>
        </SafeAreaView>)
    );
  }
  
};

export default function EditProfileAllergies(props) {
  const { authState, setAuthState } = useContext(UserContext);
  return <EditProfileAllergiesComponent {...props} context={{ authState, setAuthState }} />;
}
const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "white",
    paddingBottom: 0,
    paddingTop: 0,
  },

  inner: {
    position: "relative",
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
    //alignItems: "center",
  },

  mainPage: {
    flex: 1,
    position: "relative",
    paddingTop: 10,
    paddingBottom: 10,
    //alignItems: "center",
  },


  title:{
    color: 'black',
    fontSize: 20,
    paddingLeft:15,
    paddingTop: 20,
    fontFamily: 'Roboto', 
    fontWeight: 'bold',
    paddingBottom: 5,
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

  applyButtonContainer: {
    paddingTop: 20,
  },

  buttonText: {
    color:"white"
  },

  loading:{
    flex: 1,
    marginTop:100,
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

  snackBarError:{
    backgroundColor: "#ff4d4d",
    height:70,
  },

  loading:{
    flex: 1,
    marginTop:100,
  },

});


