import React, { Component } from "react";
import { Card, ListItem, Button, Icon, Rating} from "react-native-elements";
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
import { RestaurantApi, FoodApi } from "../../api";


import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

//import { Constants } from 'expo';

const { width } = Dimensions.get("window");

class RestaurantProfileComponent extends Component {
  constructor() {
    super();

    this.state = {
      restaurant: {},
      images: [],
      dishes: [],
      verificationModal: false,
      verificationModalImage: false,
      modalImageVisible: false,
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
    await FoodApi.delete(foodToDelete.a_food_id);
    await this.fetchDishes();
  }


  async deleteImage(){
    
    let imageToDelete = this.state.lastImageClicked;
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    console.log(this.state.images);
    console.log(imageToDelete);
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    
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

    console.log("?////////////////////////////////////////////////////////////////////////////////////////////////////");
    console.log(biggestNumber);
    biggestNumber = +biggestNumber + +1;
    console.log(biggestNumber);
    console.log("?////////////////////////////////////////////////////////////////////////////////////////////////////");

    const response = await fetch(uri);
    const blob = await response.blob();
    //SETEAR EL NAME DE ALGUNA FORMA
    this.setState({theBiggestExtra: biggestNumber});
    var myStr = this.state.restaurant.a_rest_id + "_" + biggestNumber;
    console.log("imageName: " + myStr);

    var ref = firebase.storage().ref().child(`images/restaurants/${myStr}.jpg`);
    let snapshot = await ref.put(blob)          

    downloadURL = await snapshot.ref.getDownloadURL();
    console.log("-------------------------url: ");
    console.log(downloadURL);
    a_image.push({ a_image_url: downloadURL, a_image_extra: this.state.theBiggestExtra.toString()});

    console.log(a_image)
    await RestaurantApi.addImages(this.state.restaurant.a_rest_id,a_image);
    await this.fetchImages();
  }


  render(){
    const {navigation} = this.props;

    return (
      <SafeAreaView style={styles.backgroundContainer}>
        
        
          

        <ScrollView>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => { 
                this.setState({modalImageVisible: true});
            }}>
              <View flexDirection='row'>
                {/* <Icon name='add_a_photo'/> */}
                <Text style={styles.buttonText} >Add Photo</Text>
              </View>  
            </TouchableOpacity>
        </View>
        <View style={styles.mainPage}>
          <ScrollView horizontal={true}>
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
              onPress={async () => {navigation.navigate("AddDish", { restaurant: this.state.restaurant})}}
          >
              <Text style={styles.buttonText}>Add New Dish!</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.button}
              onPress={async () => {navigation.navigate("EditRestaurant", {restaurant: this.state.restaurant})}}
          >
              <Text style={styles.buttonText}>Edit Restaurant</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.button}
              onPress={async () => { navigation.navigate("Premium") }}
            >
            <Text style={styles.buttonText}>Change Plan</Text>
          </TouchableOpacity>
        </View>

{/* ------------------------------------MODALS-------------------------------------------- */}

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.verificationModal}
            onRequestClose={() => {
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
  

{/* -------------------------------------------------------------------------------------------- */}




        <View style={styles.popularContainer} >
          <Text style={styles.subtitleText}>Our most popular dishes</Text>
          <View style={styles.popular}>
            <ScrollView horizontal={true}>
              {this.state.dishes.map(dish =>{
                return(
                  <TouchableOpacity onPress={async () => {navigation.navigate("Food"); //falta pasar los params para que pase a la pag correcta
                  }}>
                    <View style={styles.iconContainer}>
                      <Icon
                        name='close'
                        onPress={() => this.setState({verificationModal: true, lastDishClicked: dish})} />
                    </View>  
                    <Card
                      image={{ uri: dish.a_image_url }}
                      imageStyle={{
                        height: 100,
                      }}
                    >
                      
                      <View style={styles.cardFooter}>
                        <Text style={styles.foodName}>{dish.a_title}</Text>
                      </View>
                    </Card>
                  </TouchableOpacity>

                )
              })}
              
            </ScrollView>
          </View>
        </View>    
  
  
        <View style={styles.popularContainer}>
          <Text style={styles.subtitleText}>All of our dishes</Text>
  
          <Text style={styles.subsubtitleText}>Go vegan!</Text>
          
          
          <Text style={styles.subsubtitleText}>Meat yourself</Text>
  
        </View>
    
        </ScrollView>
      </SafeAreaView>
    );
  }

}

export  default function RestaurantProfile( props ){
  return <RestaurantProfileComponent {...props}/>
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




});
