import React, { Component, useContext } from "react";
import { Card, ListItem, Button, Icon, Rating, Input, CheckBox } from "react-native-elements";
import { UserContext } from '../../../context/UserContext';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal
} from "react-native";

import { UserApi } from '../../../api';

const { width } = Dimensions.get("window");


class CreateRestaurantComponent extends Component {

    constructor(){
        super();
    
        this.state = {
          name: "",
          countryState: "",
          city: "",
          postalCode: "",
          isChain: false,
          selectedChain: {name: "None"},
          modalVisible: false,
          chainSelected: false,
        }

        this.chainOptions = [{name :"McRondals"},
                    {name :"Kansas"},
                    {name :"Ms Burger"},
                    {name :"Mc Burger"},
                    {name :"Burger Queen"},
                    {name :"Lo de tocarli"}];
    
      }

      setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }
    
      tickPressed = () =>{
        this.setModalVisible(!this.state.isChain);
        this.setState({isChain: !this.state.isChain});
        if(this.state.isChain){
            this.setState({chainSelected: false});
        }
      }
    
      render() {
    
        const {navigation} = this.props;
        var modalInput = "";
        var chainOptionButtons = [];
        for(let i = 0; i < this.chainOptions.length ; i++){
            chainOptionButtons.push(
                <View key={i}>
                    
                    <TouchableOpacity
                        style={styles.chainButton}
                        onPress={() => { 
                        this.setModalVisible(false);
                        this.setState({
                            selectedChain: this.chainOptions[i],
                            chainSelected: true,
                        });
                        modalInput = "";
                        }}
                    >
                        <Text style={styles.buttonText}>{this.chainOptions[i].name}</Text>
                    </TouchableOpacity>
                
                </View>
            )
        }



        
        var chainSelectedAndChange = [];
        chainSelectedAndChange.push(
            <View>
                <Text style={styles.title}>Chain selected: {this.state.selectedChain.name}</Text>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => { 
                        this.setModalVisible(true);
                     }} >
                        <Text>Change Chain</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
        
        
        return (
          <ScrollView>
            <View style={styles.backgroundContainer}>
                
                <Text style={styles.title}> Register Restaurant</Text>
                <View style={styles.inputView}>
                    <Text style={styles.inputTitle}>Restaurant Name</Text>
                    <View style={styles.inputBox}>
                        <Input
                            style={styles.input}
                            underLineColorAndroid="transparent"                      
                            onChangeText={(value) => { this.setState({name: value})}}

                        />  
                    </View>
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.inputTitle}>State</Text>
                    <View style={styles.inputBox}>
                        <Input
                            style={styles.input}
                            underLineColorAndroid="transparent"
                            onChangeText={(value) => { this.setState({countryState: value})}}
                        />  
                    </View>
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.inputTitle}>City</Text>
                    <View style={styles.inputBox}>
                        <Input
                            style={styles.input}
                            underLineColorAndroid="transparent"
                            onChangeText={(value) => { this.setState({city: value})}}
                        />   
                    </View>
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.inputTitle}>Postal Code</Text>
                    <View style={styles.inputBox}>
                        <Input
                            style={styles.input}
                            underLineColorAndroid="transparent"
                            onChangeText={(value) => { this.setState({postalCode: value})}}
                        />   
                    </View>
                </View>
                
                <View>
                    <CheckBox
                        title = "The restaurant is part of a chain"
                        checked = {this.state.isChain}
                        onPress={() => {this.tickPressed()}}
                    />
                </View>
                {this.state.chainSelected && chainSelectedAndChange}
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalTitle}>Choose Chain</Text>
                                <Input
                                    placeholder={"Search"}
                                    rightIcon={
                                        <Icon
                                        name='search'
                                        />
                                      }
                                    onChangeText={(value) => (modalInput = value)}
                                />
                                <ScrollView>
                                    {chainOptionButtons}
                                </ScrollView>    
                            </View>
                        </View>
                    </Modal>
                </View>

                


                <View>
                    <TouchableOpacity style={styles.button} onPress={() => { 
                        //HANDLE DE LA API
                        navigation.goBack()
                     }} >
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>  
          </ScrollView>
        );
      }
}


const { width: WIDTH } = Dimensions.get('window')
const { height: HEIGHT } = Dimensions.get('window').height

export default function CreateRestaurant({ navigation }) {
  return <CreateRestaurantComponent navigation={navigation} />;
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

    
    title:{
        color: 'black',
        fontSize: 20,
        paddingLeft:15,
        paddingTop: 10,
        fontFamily: 'Roboto', 
        fontWeight: 'bold',
        paddingBottom: 5,
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
  
    
    input: {
        elevation: 15,
        position: "relative",
        width: WIDTH - 100,
        height: 60,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        paddingTop: 25,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: "white",
        color: "#000000",
        marginHorizontal: 25,
    },
    
    inputBox:{
        paddingTop: 20,
        paddingLeft:10
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

    chainButton: {
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
   

    centeredView: {
        flex: 1,
        justifyContent: "center",
        //alignItems: "center",
        marginTop: 22
    },

    modalView: {
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
        height: 400,
    },

    modalTitle: {
        position: "relative",
        fontSize: 20,
        paddingLeft: 15,
        color: "black",
        fontWeight: "500",
        fontWeight: "bold",
        paddingBottom: 10,
      },
  
  });


