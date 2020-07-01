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
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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

  async changeValue(i){
    let newValues = this.state.values;
    newValues[i] = !newValues[i];
    this.setState({values: newValues})
    if(this.state.values[i]){
      const resp = await UserHasCharacteristicApi.addCharacteristicToUser(this.state.user.a_user_id, this.state.chars[i].a_char_id);
    }else{
      const resp = await UserHasCharacteristicApi.removeCharacteristicFromUser(this.state.user.a_user_id, this.state.chars[i].a_char_id);
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
    const resp = await UserHasCharacteristicApi.getCharactersticsByUser(this.state.user.a_user_id);
    for (let userChar of resp.response.result) {
      this.setValue(userChar.a_char_id);
    }
  }

  async fetchChars(){
    const resp = await CharacteristicApi.getAll();
    this.setState({ chars: resp.response.result });
    for(let i = 0; i < this.state.chars.length ; i++){
      this.state.values.push(false);                        
    } 
  }
  
  async fetchUser() {
    const resp = await UserApi.getMe();
    this.setState({
      user: resp.response.result
    })
  }

  async componentDidMount() {
    // const { route } = this.props
    // const  { user } = route.params
    // this.setState({ user: user }); 
    // console.log(this.state.user);

    console.log('mounting');
    await this.fetchUser();
    await this.fetchChars();
    await this.fetchUserChars();
  }

  render() {
    
    const { navigation, context } = this.props;
    const date = this.state.date;

    var optionButtons = [];
    for(let i = 0; i < this.state.chars.length ; i++){
        optionButtons.push(
            <View key={i}>
                <CheckBox
                    title = {this.state.chars[i].a_char_name}
                    checked = {this.state.values[i]}
                    onPress={async () => await this.changeValue(i)}
                />
            </View>
        )                        
    }

    return (
        
        <SafeAreaView style={styles.backgroundContainer}>
            <ScrollView vertical = {true}>
                <View style={styles.inner}>
                    <View style={styles.mainPage}>
                        <Text style={styles.title}>Select Characteristics</Text>
                    </View>
                </View>
                { optionButtons }

                <View style={styles.applyButtonContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => { 
                      navigation.goBack()
                  }} >
                      <Text>BACK</Text>
                  </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
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

});


