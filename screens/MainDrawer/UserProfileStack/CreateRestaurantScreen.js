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


import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
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
            address: "",
            isChain: false,
            selectedChain: {name: "None"},
            modalVisible: false,
            modalImageVisible: false,
            chainSelected: false,
            imagesUrl: []
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


        onChooseImagePress = async () => {
            let result = await ImagePicker.launchCameraAsync();
            //let result = await ImagePicker.launchImageLibraryAsync();
        
            if (!result.cancelled) {
                let aux = this.state.imagesUrl;
                aux.push(result.uri);
                this.setState({imagesUrl: aux});
            }
        }

        onChooseGalleryImagePress = async () => {
            //let result = await ImagePicker.launchCameraAsync();
            let result = await ImagePicker.launchImageLibraryAsync();
        
            if (!result.cancelled) {
                let aux = this.state.imagesUrl;
                aux.push(result.uri);
                this.setState({imagesUrl: aux});
            }
        }

        uploadImages = async () => {
            for(var i = 0 ; i < imagesUrl.length ; i++){
                const response = await fetch(imagesUrl[i]);
                const blob = await response.blob();
                //CAMBIAR LO QUE VIENE ABAJO PARA QUE NO CAMBIE LA FOTO DEL USER
                var auxName = this.state.name.replace(/ /g, "_");
                var auxCountry = this.state.countryState.replace(/ /g, "_");
                var auxCity = this.state.city.replace(/ /g, "_");
                var auxAddress = this.state.address.replace(/ /g, "_");

                var myStr = auxName + "_" + auxCountry + "_" + auxCity + "_" + this.state.postalCode + "_" + auxAddress + "_" + i.toString();
                console.log("imageName: " + myStr);
          
                var ref = firebase.storage().ref().child(`images/restaurants/${myStr}.jpg`);
                ref.put(blob);                
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
                
                
                <ScrollView horizontal={true}>
                    {this.state.imagesUrl.map(foodUrl => {
                        return(
                            <Card>
                                <Image
                                    style={styles.logoImage}
                                    source={{uri: foodUrl}}
                                />
                            </Card>
                        )
                    })}
                </ScrollView>

                
                
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => { 
                        this.setState({modalImageVisible: true});
                    }}>
                        <Text>Add Photo</Text>
                    </TouchableOpacity>
                </View>
                




                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalImageVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style = {styles.centeredView}>
                            <View style = {styles.modalImageView}>
                                <TouchableOpacity
                                    style={styles.chainButton}
                                    onPress={() => { 
                                         //Ir a la camara y sacar la foto
                                        this.onChooseImagePress();
                                        this.setState({modalImageVisible: false});
                                     }}
                                >
                                    <Text style={styles.buttonText}>Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.chainButton}
                                    onPress={() => { 

                                        this.onChooseGalleryImagePress();
                                        this.setState({modalImageVisible: false});
                                        //Ir a la galería
                                    }}
                                >
                                    <Text style={styles.buttonText}>Gallery</Text>
                                </TouchableOpacity>
                            </View>             
                            
                        </View>

                    </Modal>
                </View>

                
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
                <View style={styles.inputView}>
                    <Text style={styles.inputTitle}>Address</Text>
                    <View style={styles.inputBox}>
                        <Input
                            style={styles.input}
                            underLineColorAndroid="transparent"
                            onChangeText={(value) => { this.setState({address: value})}}
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
                        this.uploadImages();
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

    modalTitle: {
        position: "relative",
        fontSize: 20,
        paddingLeft: 15,
        color: "black",
        fontWeight: "500",
        fontWeight: "bold",
        paddingBottom: 10,
      },


      logoImage: {
        position: "relative",
        width: 240,
        height: 240,
        justifyContent: "center",
        margin: 15,
      },
    
  
  });


