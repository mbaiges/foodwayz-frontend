import React, { Component } from "react";
import { Card, ListItem, Button, Icon, Input, Rating} from "react-native-elements";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";

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
import { RestaurantApi, FoodApi, UserApi, OwnsApi } from "../../../api";


import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

//import { Constants } from 'expo';

const { width } = Dimensions.get("window");

class OwnerRestaurantProfileComponent extends Component {
  constructor() {
    super();

    this.state = {
      restaurant: {},
      images: [],
      dishes: [],
      verificationModal: false,
      verificationModalImage: false,
      modalImageVisible: false,
      modalInviteToBeOwner: false,
      lastDishClicked: {},
      lastImageClicked: {},
      theBiggestExtra: 0,
    }
  }

  async fetchRestaurant() {
    const { route } = this.props;
    console.log(route);
    
    const { restaurant } = route.params;
    console.log(restaurant);
    this.setState({ restaurant: restaurant});
  }

  async fetchImages() {
    const aux = this.state.restaurant;
    var theBiggestExtra = 0;
    const resp = await RestaurantApi.getImages(aux.a_rest_id);
    
    console.log("-----------------------------------------------------------------------------------------");
    console.log(resp);
    // if(resp.response.result.length != 0){
    //   theBiggestExtra = resp.response.result.reduce((a,b) => (a<b) ? b : a);  
    // }
    for(var i = 0 ; i < resp.response.result.length ; i++){
      if(resp.response.result[i].a_image_extra > theBiggestExtra){
        theBiggestExtra = resp.response.result[i].a_image_extra;
      }
    }
    

    this.setState({
      images: resp.response.result,
      theBiggestExtra: theBiggestExtra,
    })
  }

  async fetchDishes() {
    const aux = this.state.restaurant;
    const resp = await RestaurantApi.getFoods(aux.a_rest_id);
    console.log("-----------------------------------------------------------------------------------------");
    console.log(resp);
    this.setState({
      dishes: resp.response.result,
    })
  }

  async componentDidMount() {
    console.log("Mounting");
    await this.fetchRestaurant();
    await this.fetchImages();
    await this.fetchDishes();
  }



  async deleteDish(){
    let foodToDelete = this.state.lastDishClicked;
    console.log(".......................................................................");
    console.log(foodToDelete);
    console.log(".......................................................................");
    var myStr = foodToDelete.a_food_id;
    var ref = firebase.storage().ref().child(`images/foods/${myStr}.jpg`);
    //var ref = firebase.storage().ref().child(`images/foods/18.jpg`);
    
    await ref.delete();
    await FoodApi.delete(foodToDelete.a_food_id);
    await this.fetchDishes();
  }


  async deleteImage(){
    
    let imageToDelete = this.state.lastImageClicked;
    var myStr = "" + imageToDelete.a_rest_id + "_" + imageToDelete.a_image_extra;
    console.log(myStr);
    
    var ref = firebase.storage().ref().child(`images/restaurants/${myStr}.jpg`);
    await ref.delete();

    await RestaurantApi.removeImage(this.state.restaurant.a_rest_id, imageToDelete.a_image_id);
    
    await this.fetchImages();
  }

  onChooseImagePress = async () => {
      let result = await ImagePicker.launchCameraAsync();

      if (!result.cancelled) {
        await this.uploadImage(result.uri);
      }
  }

  onChooseGalleryImagePress = async () => {
      let result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
        await this.uploadImage(result.uri);
        
      }
  }

  async uploadImage(uri){
    let a_image = [];
    let biggestNumber = this.state.theBiggestExtra;
    biggestNumber = +biggestNumber + +1;
    
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      //SETEAR EL NAME DE ALGUNA FORMA
      this.setState({theBiggestExtra: biggestNumber});
      var myStr = this.state.restaurant.a_rest_id + "_" + biggestNumber;
      console.log("imageName: " + myStr);

      var ref = firebase.storage().ref().child(`images/restaurants/${myStr}.jpg`);
      
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      console.log(ref);
      
      let snapshot = await ref.put(blob)          


      console.log("6666666666666666666666666666666666666666666666666666");

      let downloadURL = await snapshot.ref.getDownloadURL();
      
      console.log("-------------------------url: ");
      console.log(downloadURL);
      a_image.push({ a_image_url: downloadURL, a_image_extra: this.state.theBiggestExtra.toString()});

      console.log(a_image)
      await RestaurantApi.addImages(this.state.restaurant.a_rest_id,a_image);
      await this.fetchImages();
    } catch (error) {
      console.log(error);
    }
    
  }


  async insertNewOwner(modalInput){
    let body = {a_email: modalInput};
    let resp = await UserApi.findUsers(body);
    let userId = resp.response.result[0].a_user_id;
    await OwnsApi.addOtherOwner(userId,this.state.restaurant.a_rest_id)
  }


  render(){
    const {navigation} = this.props;

    var modalInput = "";

    navigation.setOptions({
      headerRight: () => (
        <View style={styles.navbar_r_icons}>
          <Ionicons
            name="md-create"
            size={38}
            style={styles.navbar_r_icon}
            onPress={() => navigation.navigate("EditRestaurant", {restaurant: this.state.restaurant})}
          />
        </View>
      ),
    });

    return (
      <SafeAreaView style={styles.backgroundContainer}>
        
        
          

        <ScrollView>
          
          <View style={styles.mainPage}>
            <ScrollView 
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {this.state.images.map(image =>{
                return(
                  <View>
                    <View style={styles.iconContainer}>
                      <Icon
                        name='close'
                        onPress={() => this.setState({verificationModalImage: true, lastImageClicked: image})} />
                    </View> 
                    <Card>
                      <Image
                        style={styles.logoImage}
                        source={{uri: image.a_image_url}}
                      />
                    </Card>
                  </View>
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
            <Text style={styles.logoText}>{this.state.restaurant.a_name}</Text>
              
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => { navigation.navigate("RestaurantStatisticsProfile") }}
                >
                  <Text style={styles.buttonText}>Statistics</Text>
                </TouchableOpacity>
            </View>
            
            {/* <Text style={styles.primaryText}>About us</Text>
            <Text style={styles.secondaryText}>Somos un restaurante asiático basado en la película Kung Fu Panda.
            Nuestros cocineros panda trabajan las 24h sin descansar para que tú puedas comer
            una sopa a las 2 de la madrugada si así lo deseas!</Text> */}
          </View>
    
          <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={async () => {navigation.navigate("AddDish", {restaurant: this.state.restaurant})}}
            >
                <Text style={styles.buttonText}>Add New Dish!</Text>
            </TouchableOpacity>
          </View>

          <View paddingTop={15}>
          <Text style={styles.subtitleText}>Our dishes</Text>
            {this.state.dishes.map(dish =>{
              return( 
                <ListItem
                  onPress={async () => {navigation.navigate("Food", { food: dish} );}}
                  key={dish.a_food_id}
                  leftAvatar={{ source: { uri: dish.a_image_url } }}
                  title={dish.a_title}
                  subtitle={
                    <View flexDirection="row" justifyContent='space-between'>  
                      <View>
                      <Text>{dish.a_description}</Text>
                      <Rating imageSize={10} readonly startingValue={dish.a_score}  style={styles.rating}/> 
                      </View>
                      <View style={styles.iconContainer} >
                        <Icon
                          name='close'
                          onPress={() => this.setState({verificationModal: true, lastDishClicked: dish})} />
                      </View>
                    </View>
}
                  bottomDivider={true}
                  topDivider={true}
                />
              )
            })}
        </View>

  {/* ------------------------------------MODALS-------------------------------------------- */}

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.verificationModal}
              onRequestClose={() => {
                this.setState({verificationModal: false});
              }}
            >

              <View style = {styles.centeredView}>
                <View style = {styles.modalView}>
                  <Text>Are you sure that you want to delete this dish. This action is irreversible</Text>
                  <View flexDirection = 'row'>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={async () => {this.setState({verificationModal: false})}}
                      >
                          <Text style={styles.blackButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={async () => {
                            this.setState({verificationModal: false})
                            await this.deleteDish();
                          }}
                      >
                          <Text style={styles.buttonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                  
                </View>
              </View>

            </Modal>
          </View>

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.verificationModalImage}
              onRequestClose={() => {
                this.setState({verificationModalImage: false});
              }}
            >

              <View style = {styles.centeredView}>
                <View style = {styles.modalView}>
                  <Text>Are you sure that you want to delete this image. This action is irreversible</Text>
                  <View flexDirection = 'row'>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={async () => {this.setState({verificationModalImage: false})}}
                      >
                          <Text style={styles.blackButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={async () => {
                            this.setState({verificationModalImage: false})
                            await this.deleteImage();
                          }}
                      >
                          <Text style={styles.buttonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                  
                </View>
              </View>

            </Modal>
          </View>

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
    
          <View style={styles.centeredView}>
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalInviteToBeOwner}
                  onRequestClose={() => {
                    this.setState({modalInviteToBeOwner: false});
                  }}
              >
                  <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                          <View flexDirection='row'>
                            <Text style={styles.modalTitle}>Add an Owner</Text>
                            <View style={styles.closeModalIconContainer}>
                              <Icon
                                name='close'
                                onPress={() => this.setState({modalInviteToBeOwner: false,})} />
                            </View> 
                          </View>
                          <Input
                              placeholder={"email"}
                              rightIcon={
                                  <Icon
                                    name='email'
                                  />
                                }
                              onChangeText={(value) => (modalInput = value)}
                          />
                              
                          <TouchableOpacity
                            style={styles.button}
                            onPress={() => { 
                              this.setState({modalInviteToBeOwner: false});
                              this.insertNewOwner(modalInput);

                              modalInput = "";
                            }}
                          >
                            {/* getState((state) => {//Code here}) */}
                            <Text style={styles.buttonText}>Done</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </Modal>
          </View>


  {/* -------------------------------------------------------------------------------------------- */}




          

        </ScrollView>
      </SafeAreaView>
    );
  }

}

export  default function OwnerRestaurantProfile( props ){
  return <OwnerRestaurantProfileComponent {...props}/>
}



const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "white",
  },

  mainPage: {
    //flex: 1,
    position: "relative",
    paddingTop: 20,
    //paddingBottom: 40,
    alignItems: "center",
  },

  navbar_r_icons: {
    flexDirection: "row",
    right: 16,
  },

  navbar_r_icon: {
    color: Colors.noticeText,
    marginLeft: 16,
  },
  logoImage: {
    position: "relative",
    width: 240,
    height: 240,
    justifyContent: "center",
    margin: 15,
  },

  primaryText: {
    textAlign: "left",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 18,
    marginBottom: -10,
  },

  secondaryText: {
    textAlign: "left",
    fontSize: 14,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 15,
    textAlign: "justify",
  },

  popular: {
    position: "relative",
    width: width,
    flexDirection: "row",
  },

  popularImage: {
    width: 120,
    height: 120,
    justifyContent: "center",
  },

  starNumber: {
    position: "relative",
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 15,
    color: "black",
  },

  logoText: {
    position: "relative",
    color: "black",
    fontSize: 30,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "500",
    opacity: 1,
    textAlign: "center",
  },

  foodName: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 3,
  },

  subtitleText: {
    paddingTop:10,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 15,
  },

  subsubtitleText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
    marginTop: 15,
  },

  cardFooter: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  text: {
    fontSize: 10,
    paddingLeft: 20,
    color: "white",
    marginHorizontal: 25,
  },



  
  buttonContainer:{
    alignItems:"center",
    paddingTop: 20,
    paddingBottom: 22,
  },


  button: {
    elevation: 15,
    borderRadius: 25,
    backgroundColor: "#FC987E",
    color: "black",
    width: 217,
    alignItems: "center",
    padding: 13,
    height: 48,
  },

  cancelButton: {
    elevation: 15,
    borderRadius: 5,
    backgroundColor: "white",
    color: "black",
    width: 100,
    alignItems: "center",
    padding: 13,
    height: 48,
  },

  deleteButton: {
    elevation: 15,
    borderRadius: 5,
    backgroundColor: "red",
    color: "white",
    width: 100,
    alignItems: "center",
    padding: 13,
    height: 48,
  },

  buttonText:{
    color: "white",
      
  },

  blackButtonText:{
    color: "black",
      
  },

  popularContainer: {
    flex: 2,
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
    height: 300,
  },

  iconContainer:{
    position:"absolute",
    marginTop: 0,
    marginLeft: 0,
    elevation:20
  },

  closeModalIconContainer:{
    position:"absolute",
    marginTop: 0,
    marginLeft: 200,
    elevation:20,
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
