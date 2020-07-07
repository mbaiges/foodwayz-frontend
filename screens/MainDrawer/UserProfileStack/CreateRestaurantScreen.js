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
  Modal,
  ActivityIndicator
} from "react-native";

import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import { UserApi, RestaurantChainApi, RestaurantApi } from '../../../api';
import { makeUrl } from "expo-linking";
import { Snackbar } from 'react-native-paper';

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
            selectedChain: {},
            modalVisible: false,
            modalImageVisible: false,
            chainSelected: false,
            imagesUrl: [],
            chains: [],
        }

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

        dismissFieldsSnackBar = () => {
            this.setState({
              snackbarFieldsVisible: false
            });
          }

          dismissConnectionSnackBar = () => {
            this.setState({
              snackbarConnectionVisible: false
            });
          }

        async onChooseImagePress(){
            let result = await ImagePicker.launchCameraAsync();

            if (!result.cancelled) {
                let aux = this.state.imagesUrl;
                aux.push(result.uri);
                this.setState({imagesUrl: aux});
            }
        }

        async onChooseGalleryImagePress(){
            let result = await ImagePicker.launchImageLibraryAsync();

            if (!result.cancelled) {
                let aux = this.state.imagesUrl;
                aux.push(result.uri);
                this.setState({imagesUrl: aux});
            }
        }

        async uploadImages(rest){
            let a_images = [];


            for(let i = 0 ; i < this.state.imagesUrl.length ; i++){
                const response = await fetch(this.state.imagesUrl[i]);
                const blob = await response.blob();

                let myStr = rest.a_rest_id + "_" + i;
                console.log("imageName: " + myStr);

                let ref = firebase.storage().ref().child(`images/restaurants/${myStr}.jpg`);
                let snapshot = await ref.put(blob)

                let downloadURL = await snapshot.ref.getDownloadURL();

                console.log("-------------------------url: ");
                console.log(downloadURL);
                a_images.push({ a_image_url: downloadURL, a_image_extra: i.toString() });

            }

            console.log("URLS ");
            console.log(a_images);
            await RestaurantApi.addImages(rest.a_rest_id, a_images);



        }

        async uploadRestaurant(){
            const {navigation} = this.props;

            if(this.state.name != "" && this.state.selectedChain != "" && this.state.city != "" && this.state.postalCode != "" && this.state.address != ""){
                
                this.setState({
                    activityIndicator: true
                  })

                let restaurant = {
                    a_name:this.state.name,
                    a_state:this.state.countryState,
                    a_city:this.state.city,
                    a_postal_code:this.state.postalCode,
                    a_address:this.state.address
                }

                if (this.state.isChain){
                    restaurant.a_rest_chain_id = this.state.selectedChain.a_rest_chain_id;
                }

                try {
                    const resp = await RestaurantApi.add(restaurant);
                    switch(resp.status) {
                        case 200:
                            await this.uploadImages(resp.response.result);
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


                this.setState({
                    activityIndicator: false
                  })

                navigation.goBack();

            }else{
                this.setState({
                    snackbarFieldsVisible: true
                  });
                console.log("fill fields")
            }
        }

        async fetchChains(){
            try {
                const resp = await RestaurantChainApi.getAll();
                switch(resp.status) {
                  case 200:
                    this.setState({ chains: resp.response.result });
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
            this.setState({
                activityIndicator: true
              })
            console.log('mounting');
            await this.fetchChains();
            this.setState({
                activityIndicator: false
              })
        }

        render() {

            const {navigation} = this.props;
            var modalInput = "";
            var chainOptionButtons = [];
            for(let i = 0; i < this.state.chains.length ; i++){
                chainOptionButtons.push(
                    <View key={i}>
                        <TouchableOpacity
                            style={styles.chainButton}
                            onPress={() => {
                                this.setModalVisible(false);
                                this.setState({
                                    selectedChain: this.state.chains[i],
                                    chainSelected: true,
                                });
                            modalInput = "";
                            }}
                        >
                            <Text style={styles.blackButtonText}>{this.state.chains[i].a_name}</Text>
                        </TouchableOpacity>

                    </View>
                )
            }

        var chainSelectedAndChange = [];
        chainSelectedAndChange.push(
            <View>
                <Text style={styles.title}>Chain selected: { this.state.selectedChain.a_name ? this.state.selectedChain.a_name : "none"} </Text>
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
        (this.state.activityIndicator) ?
            (<SafeAreaView>
                <View style={styles.loading}>
                <ActivityIndicator size="large" color="#000000" />
                </View>
            </SafeAreaView>)
            :
          (<ScrollView>
            <View style={styles.backgroundContainer}>

                <Text style={styles.title}> Register Restaurant</Text>


                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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

                    <TouchableOpacity onPress={() => { 
                        this.setState({modalImageVisible: true});
                    }}>
                        <View> 
                        <Card>
                            <Image
                                style={styles.logoImage}
                                source={require("../../../assets/images/dishPlaceholder.png")}
                            />
                            <Text style={styles.subsubtitleText}>Add Photo</Text>
                        </Card>
                        </View>
                    </TouchableOpacity>
                </ScrollView>


                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalImageVisible}
                        onRequestClose={() => {
                            this.setState({modalImageVisible: false, isChain: false});
                          }}

                    >
                        <View style = {styles.centeredView}>
                            <View style = {styles.modalImageView}>
                                <View style={styles.close}>

                                <TouchableOpacity
                                    style={styles.chainButton}
                                    onPress={() => {
                                         //Ir a la camara y sacar la foto
                                        this.onChooseImagePress();
                                        this.setState({modalImageVisible: false});
                                     }}
                                >
                                    <Text style={styles.blackButtonText}>Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity

                                    style={styles.closeButton}
                                    onPress={() => {
                                        this.setState({modalImageVisible: false});
                                        //cerrar
                                    }}
                                >
                                    <Icon
                                        name='close'
                                        type='material-community'

                                    />
                                </TouchableOpacity>
                                </View>
                                <TouchableOpacity

                                    style={styles.chainButton}
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
                        onPress={() => {
                            this.tickPressed();    
                        }}
                    />
                </View>
                {this.state.chainSelected && chainSelectedAndChange}
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setState({modalVisible: false});
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
                    <TouchableOpacity style={styles.button} onPress={async() => { await this.uploadRestaurant() }} >
                        <Text style={styles.buttonText}>REGISTER</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <Snackbar
              style={styles.snackBar}
              duration={4000}
              visible={this.state.snackbarFieldsVisible}
              onDismiss={this.dismissFieldsSnackBar}
        >
             <Text style={styles.textSnack}> Please fill all the fields.</Text>
        </Snackbar>

        <Snackbar
              style={styles.snackBar}
              duration={4000}
              visible={this.state.snackbarConnectionVisible}
              onDismiss={this.dismissConnectionSnackBar}
        >
             <Text style={styles.textSnack}>No internet connection.</Text>
        </Snackbar>


          </ScrollView>)
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
        paddingBottom: 15,
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

      mainImage: {
        //flex: 1,
        position: "relative",
        paddingTop: 20,
        //paddingBottom: 40,
        alignItems: "center",
      },

    close:{
        flexDirection:"row",
        marginLeft:74,
    },

    closeButton:{
        marginLeft:50,
    },

    buttonText: {
        color:"white",
        textAlign:"center"
      },

    blackButtonText: {
    color:"black",
    textAlign:"center"
    },  

    subsubtitleText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 15,
        marginTop: 15,
    },

    loading:{
        flex: 1,
        marginTop:100,
      }
    
  });
