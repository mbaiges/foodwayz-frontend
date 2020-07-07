import React, { Component } from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Modal,
  Alert,
  ActivityIndicator
} from "react-native";

import { Snackbar } from 'react-native-paper';

import { ScrollView } from "react-native-gesture-handler";
import { CheckBox, Input, Icon} from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import {IngredientApi, CharacteristicApi, FoodApi, FoodHasCharacteristicApi, FoodHasIngredientApi, TypeApi, SearchApi, ContactUsApi } from '../../api';
import { makeUrl } from "expo-linking";
import * as firebase from 'firebase';

class AddDishComponent extends Component {
    constructor() {
        super();

        this.state = {
          dishImage: undefined,
          dishTitle: "",
          dishDesc: "",
          dishType: undefined,

          requestVisible: false,
          requestIngrVisible: false,
          requestTypesVisible: false,

          ingredientsVisible: false,
          characteristicsVisible:false,
          typesVisible: false,

          modalImageVisible: false,

          newRequest: "",
          newIngrRequest: "",
          newTypeRequest: "",

          ingredientsChosen: [],
          characteristicsChosen: [],
          typeChosen: {},

          allIngredients: [],
          allCharacteristics: [],
          allTypes: [],

          ingrModalInput: "",
          charModalInput: "",
          typeModalInput: "",

          dish: {},
          rest: {},

          lastImageClicked: {},
          
          filterTimer: undefined,

        }

  }

  dismissConnectionSnackBar = () => {
    this.setState({
      snackbarConnectionVisible: false
    });
  }

  dismissIngrSnackBar = () => {
    this.setState({
      snackbarIngrVisible: false
    });
  }

  dismissCharSnackBar = () => {
    this.setState({
      snackbarCharVisible: false
    });
  }


  async sendNewTypeMail(){
    if(this.state.newTypeRequest != ""){
      try {
        const resp = await ContactUsApi.typeRequest(this.state.newTypeRequest);
        switch(resp.status) {
          case 200:
            // Do what its supposed to
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
      console.log("fill Type");
    }
  }

  async sendNewIngrMail(){
    if(this.state.newTypeRequest != ""){
      try {
        const resp = await ContactUsApi.ingredientRequest(this.state.newTypeRequest);
        switch(resp.status) {
          case 200:
            // Do what its supposed to
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
      this.setState({
        snackbarIngrVisible: false
      });
      console.log("fill Ingredient");
    }
  }

  async sendNewCharMail(){
    if(this.state.newTypeRequest != ""){
      try {
        const resp = await ContactUsApi.characteristicRequest(this.state.newTypeRequest);
        switch(resp.status) {
          case 200:
            // Do what its supposed to
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
      this.setState({
        snackbarCharVisible: true
      });
      console.log("fill Characteristic");
    }
  }
  //---------------------------OPEN ADD MODALS-----------------------------------

  setTypesVisible = (visible) => {
    this.setState({ typesVisible: visible });
  }

  setIngredientsVisible = (visible) => {
    this.setState({ ingredientsVisible: visible });
  }

  setCharacteristicsVisible = (visible) => {
    this.setState({characteristicsVisible: visible });
  }

  //------------------------OPEN REQUEST MODALS---------------------------------

  setRequestTypesVisible = (visible) => {
    this.setState({ requestTypesVisible: visible });
  }

  setRequestIngrVisible = (visible) => {
    this.setState({ requestIngrVisible: visible });
  }

  setRequestCharsVisible = (visible) => {
    this.setState({ setRequestCharsVisible: visible });
  }

  //----------------------------DELETE TAGS------------------------------------

  deleteType(){
    this.setState({ typeChosen: {} });
  }

  deleteInredient(idx){
    let aux = this.state.ingredientsChosen;
    aux.splice(idx,1);
    this.setState({ingredientsChosen: aux});
  }

  deleteCharacteristic(idx){
    let aux = this.state.characteristicsChosen;
    aux.splice(idx,1);
    this.setState({characteristicsChosen: aux});
  }

  // ----------------------SEARCH IN MODALS -----------------------------------

  async updateTypeSearch(){
    if (this.state.filterTimer) {
      console.log("clearing");
      clearTimeout(this.state.filterTimer);
    }
    const timer = setTimeout(() => {
      console.log("calling")
      this.filterTypeQuery(this.state.typeModalInput);
    }, 500);

    this.setState({
      filterTimer: timer,
    });
  }

  async updateIngrSearch(){
    if (this.state.filterTimer) {
      console.log("clearing");
      clearTimeout(this.state.filterTimer);
    }
    const timer = setTimeout(() => {
      console.log("calling")
      this.filterIngrQuery(this.state.ingrModalInput);
    }, 500);

    this.setState({
      filterTimer: timer,
    });
  }

  async updateCharSearch(){
    if (this.state.filterTimer) {
      console.log("clearing");
      clearTimeout(this.state.filterTimer);
    }
    const timer = setTimeout(() => {
      console.log("calling")
      this.filterCharQuery(this.state.charModalInput);
    }, 500);

    this.setState({
      filterTimer: timer,
    });
  }

  async filterTypeQuery(input){
    let auxFilterQueryBody = {
      raw_input: input
    }
    try {
      const resp = await SearchApi.searchTypes(auxFilterQueryBody)
      switch(resp.status) {
        case 200:
          this.setState({ allTypes: resp.response.result });
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

  async filterIngrQuery(input){
    let auxFilterQueryBody = {
      raw_input: input
    }
    try {
      const resp = await SearchApi.searchIngredients(auxFilterQueryBody)
      switch(resp.status) {
        case 200:
          this.setState({ allIngredients: resp.response.result });
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

  async filterCharQuery(input){
    let auxFilterQueryBody = {
      raw_input: input
    }
    try {
      const resp = await SearchApi.searchCharacteristics(auxFilterQueryBody)
      switch(resp.status) {
        case 200:
          this.setState({ allCharacteristics: resp.response.result });
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

  //-------------------------IMAGE MANAGEMENT----------------------------------

  async onChooseImagePress(){
    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      this.setState({dishImage: result.uri});
    }
  }

  async onChooseGalleryImagePress(){
      let result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
          this.setState({dishImage: result.uri});
      }
  }

  async uploadImage(dish){

      const response = await fetch(this.state.dishImage);
      const blob = await response.blob();

      let myStr = dish.a_food_id;
      console.log("imageName: " + myStr);

      let ref = firebase.storage().ref().child(`images/foods/${myStr}.jpg`);   
      let snapshot = await ref.put(blob)

      let downloadURL = await snapshot.ref.getDownloadURL();

      console.log("-------------------------url: ");
      console.log(downloadURL);

      this.setState({ dishImage: downloadURL });

      await this.updateDishImage(dish, downloadURL);
  }

  //---------------------------DISH UPLOAD-----------------------------------

  dismissFieldsSnackBar = () => {
    this.setState({
      snackbarFieldsVisible: false
    });
  }


  async uploadDish(){
      const {navigation, route} = this.props;
      const {dishesUpdater} = route.params;

      if(this.state.dishTitle != "" && this.state.dishDesc != "" && this.state.dishImage != "" && this.state.typeChosen.a_type_id){
        this.setState({
          activityIndicator: true
        })
          let dish = {
            a_title: this.state.dishTitle,
            a_description: this.state.dishDesc,
            a_type_id: this.state.typeChosen.a_type_id,
            a_rest_id: this.state.rest.a_rest_id,
            a_image_url: undefined
          }

          try {
            const resp = await FoodApi.add(dish);
            console.log('caca1');
            switch(resp.status) {
              case 200:
                console.log(resp.response.result);
                console.log('caca2');
                await this.uploadImage(resp.response.result); 
                console.log('caca3');
                await this.uploadIngredients(resp.response.result);
                console.log('caca4');
                await this.uploadCharacteristics(resp.response.result); 
                console.log('caca5');
                this.setState({
                  activityIndicator: false
                })
                //dishesUpdater();
                navigation.goBack();
                break;
            default:
              console.log(`Status Received: ${resp.status} --->`);
              console.log(resp);
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
        this.setState({
          snackbarFieldsVisible: true
        });
          console.log("Please fill title, description, image and type")
      }
  }

  async updateDishImage( food, url ){

      let dish = {
        a_food_id: food.a_food_id,
        a_image_url: url
      }

      console.log("---------------------------------------")
      console.log("---------------------------------------")
      console.log(food);
      console.log("---------------------------------------")
      console.log(url);
      console.log("---------------------------------------")
      console.log(dish);
      console.log("---------------------------------------")
      console.log("---------------------------------------")

      try {
        const resp = await FoodApi.modify(dish);
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

      
      console.log(resp);
  }

  async uploadCharacteristics(food){
    try {
      const resp = await FoodHasCharacteristicApi.addCharacteristicsToFood(food.a_food_id, this.state.characteristicsChosen);
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

  async uploadIngredients(food){
    try {
      const resp = await FoodHasIngredientApi.addIngredientsToFood(food.a_food_id, this.state.ingredientsChosen);
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

  //------------------------------FETCHS------------------------------------------------

  async fetchTypes(){
    try {
      
    const resp = await TypeApi.getAll();
      switch(resp.status) {
        case 200:
          this.setState({ allTypes: resp.response.result });
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

  async fetchIngredients(){
    try {
      
      const resp = await IngredientApi.getAll();
        switch(resp.status) {
          case 200:
            this.setState({ allIngredients: resp.response.result });
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

  async fetchCharacteristics(){
    try{
    const resp = await CharacteristicApi.getAll();
    switch(resp.status) {
      case 200:
        this.setState({ allCharacteristics: resp.response.result });
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



  async fetchRest(){
    const { route } = this.props;
    const { restaurant } = route.params;
    this.setState({rest: restaurant});
    console.log(restaurant);
  }

  //--------------------------------MOUNT---------------------------------------------

  async componentDidMount() {
    this.setState({
      activityIndicator: true
    })
    console.log('mounting');
    await this.fetchRest();
    await this.fetchTypes();
    await this.fetchIngredients();
    await this.fetchCharacteristics();
    this.setState({
      activityIndicator: false
    })
  }

  render() {
    const { navigation } = this.props;

    return (
      (this.state.activityIndicator) ?
      (<SafeAreaView>
          <View style={styles.loading}>
          <ActivityIndicator size="large" color="#000000" />
          </View>
      </SafeAreaView>)
      :
        (<SafeAreaView style={styles.backgroundContainer}>
            <ScrollView vertical = {true}>

                <Text style={styles.addDishTitle}> Add Food </Text>

                <TouchableOpacity onPress={() => { this.setState({modalImageVisible: true});  }}> 
                    <View style={styles.mainImage}>
                        <Image
                            style={styles.logoImage}
                            source={ this.state.dishImage ? { uri: this.state.dishImage } : require("../../assets/images/dishPlaceholder.png")}
                        />
                        <Text style={styles.logoText}>Add Image</Text>
                    </View>
                </TouchableOpacity>

                <View>
                    <Text style={styles.inputTitle}>Name</Text>
                    <Input
                        placeholder={""}
                        onChangeText={(value) => ( this.setState({ dishTitle:value }))}
                    />
                    <Text style={styles.inputTitle}>Description</Text>
                    <Input
                        multiline
                        numberOfLines={5}
                        placeholder={""}
                        style={styles.desc}
                        onChangeText={(value) => ( this.setState({ dishDesc:value }))}
                    />
                </View>


                <View>
                    <View flexDirection="row" justifyContent="space-between">
                      <Text style={styles.text}>Type</Text>
                      <TouchableOpacity onPress={() => { this.setTypesVisible(true);}} style={styles.select}>
                        <Text style={styles.secondaryText}>SELECT</Text>
                        <Icon
                              name='arrow-right'
                              type='material-community'

                            />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.tagsList}>
                          { this.state.typeChosen.a_type_id ? 
                          (
                              <View>
                                    <TouchableOpacity style={styles.buttonTag}>
                                          <View style={styles.rowItemsContainer}>
                                              <Text style={styles.tagText}>{ this.state.typeChosen.a_type_name}</Text>
                                              <TouchableOpacity
                                                  onPress={() => this.deleteType()}
                                              >
                                                  <Icon name='clear' />
                                              </TouchableOpacity>
                                          </View>
                                    </TouchableOpacity>
                              </View>
                          ) 
                          : 
                          ( <View/> )
                          }
                    </View>



                </View>

                <View >
                    <TouchableOpacity
                        
                        onPress={() => { 
                          this.setRequestTypesVisible(true);
                        }}
                    >
                        <Text style={styles.requestText}>I can't find my type</Text>
                    </TouchableOpacity>
                </View>


                <View>
                  <View flexDirection="row" justifyContent="space-between">
                    <Text style={styles.text}>Ingredients</Text>
                    <TouchableOpacity onPress={() => { this.setIngredientsVisible(true);}} style={styles.select}>
                        <Text style={styles.secondaryText}>SELECT</Text>
                        <Icon
                              name='arrow-right'
                              type='material-community'

                            />
                      </TouchableOpacity>
                  </View>
                    <View style={styles.tagsList}>
                        {this.state.ingredientsChosen.map((ingredient, idx) => {
                            return(
                                <View key={idx}>
                                    <TouchableOpacity style={styles.buttonTag}>
                                        <View style={styles.rowItemsContainer}>
                                            <Text style={styles.tagText}>{ingredient.a_ingr_name}</Text>
                                            <TouchableOpacity
                                                onPress={() => this.deleteInredient(idx)}
                                            >
                                                <Icon name='clear' />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>

                </View>

                <View>
                    <TouchableOpacity
                        
                        onPress={() => { 
                          this.setRequestIngrVisible(true);
                        }}
                    >
                        <Text style={styles.requestText}>I can't find my ingredients</Text>
                    </TouchableOpacity>
                </View>
          

                        
                <View>
                  <View flexDirection="row" justifyContent="space-between">
                    <Text style={styles.text}>Select allergies / characteristics</Text>
                    <TouchableOpacity onPress={() => { this.setCharacteristicsVisible(true);}} style={styles.select}>
                        <Text style={styles.secondaryText}>SELECT</Text>
                        <Icon
                              name='arrow-right'
                              type='material-community'

                            />
                      </TouchableOpacity>
                    </View>
                
                    <View style={styles.tagsList}>
                          {this.state.characteristicsChosen.map((char, idx) => {
                              return(
                                  <View key={idx}>
                                      <TouchableOpacity style={styles.buttonTag}>
                                          <View style={styles.rowItemsContainer}>
                                              <Text style={styles.tagText}>{char.a_char_name}</Text>
                                              <TouchableOpacity
                                                  onPress={() => this.deleteCharacteristic(idx)}
                                              >
                                                  <Icon name='clear' />
                                              </TouchableOpacity>
                                          </View>
                                      </TouchableOpacity>
                                  </View>
                              );
                          })}
                    </View>
                

                </View>
                
                <View>
                    <TouchableOpacity
                        
                        onPress={() => { 
                          this.setRequestVisible(true);
                        }}
                    >
                        <Text style={styles.requestText}>I can't find my characteristics</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { this.uploadDish(); }}
                    >
                        <Text style={styles.buttonText}>Add Food</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            
            {/* --------------------------------------------------------- TYPES MODAL-------------------------------------------------------------- */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.typesVisible}
                onRequestClose={() => {
                  this.setState({typesVisible: false});
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Choose Type</Text>
                        <Input
                            placeholder={"Search"}
                            rightIcon={ <Icon name='search' /> }
                            onChangeText={ async(value) => {
                              this.setState({typeModalInput:value})
                              await this.updateTypeSearch();
                            }}  
                        />
                        <ScrollView>
                            {this.state.allTypes.map((type, idx) => {
                                return(
                                    <View key={idx}>             
                                        <TouchableOpacity
                                            style={styles.ingredientsButton}
                                            onPress={() => { 
                                              this.setState({typeChosen: type});
                                              this.setTypesVisible(false);
                                            }}
                                        >
                                            <Text style={styles.ingredient}>{type.a_type_name}</Text>
                                        </TouchableOpacity>
                                  </View>
                                );
                            })}
                        </ScrollView>    
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { 
                              this.setTypesVisible(false);
                            }}
                        >
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* ------------------------------------------------------------------------------------------------------------------------------------------------ */}
                        
            {/* ----------------------------------------------------------- REQUEST TYPE MODAL----------------------------------------------------------- */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.requestTypesVisible}
                onRequestClose={() => {
                  this.setState({requestTypesVisible: false});
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.inputTitle}>Request a new food type</Text>
                        <Input
                            placeholder={""}
                            onChangeText={(value) => (this.newTypeRequest = value)}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={async () => { 
                                  await this.sendNewTypeMail();
                                  this.setRequestTypesVisible(false)
                                }}
                            >
                                <Text style={styles.buttonText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* ------------------------------------------------------------------------------------------------------------------------------------------------- */}


            {/* --------------------------------------------------------- INGREDIENTS MODAL-------------------------------------------------------------- */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.ingredientsVisible}
                onRequestClose={() => {
                  this.setState({ingredientsVisible: false});
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Choose ingredients</Text>
                        <Input
                            placeholder={"Search"}
                            rightIcon={ <Icon name='search' /> }
                            onChangeText={ async(value) => {
                              this.setState({ingrModalInput:value})
                              await this.updateIngrSearch();
                            }} 
                        />
                        <ScrollView>
                            {this.state.allIngredients.map((ingr, idx) => {
                                return(
                                    <View key={idx}>             
                                        <TouchableOpacity
                                            style={styles.ingredientsButton}
                                            onPress={() => { 
                                              let aux = this.state.ingredientsChosen;
                                              aux.push(ingr);
                                              this.setState({ingredientsChosen: aux});
                                              this.setIngredientsVisible(false);
                                            }}
                                        >
                                            <Text style={styles.ingredient}>{ingr.a_ingr_name}</Text>
                                        </TouchableOpacity>
                                  </View>
                                );
                            })}
                        </ScrollView>    
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { 
                              this.setIngredientsVisible(false);
                            }}
                        >
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* ------------------------------------------------------------------------------------------------------------------------------------------------ */}
                        
            {/* ----------------------------------------------------------- REQUEST INGREDIENTS MODAL----------------------------------------------------------- */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.requestIngrVisible}
                onRequestClose={() => {
                  this.setState({requestIngrVisible: false});
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.inputTitle}>Request a new ingredient</Text>
                        <Input
                            placeholder={""}
                            onChangeText={(value) => (this.newIngrRequest = value)}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={async() => { 
                                  await this.sendNewIngrMail();
                                  this.setRequestIngrVisible(false)
                                }}
                            >
                                <Text style={styles.buttonText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* ------------------------------------------------------------------------------------------------------------------------------------------------- */}
                    
            {/* -------------------------------------------------------------- CHARACTERISTIC MODAL-------------------------------------------------------------- */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.characteristicsVisible}
                onRequestClose={() => {
                  this.setState({characteristicsVisible: false});
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Choose allergies / characteristics</Text>
                        <Input
                            placeholder={"Search"}
                            rightIcon={ <Icon name='search' /> }
                            onChangeText={ async(value) => {
                              this.setState({charModalInput:value})
                              await this.updateCharSearch();
                            }}
                        />
                        <ScrollView>
                            {this.state.allCharacteristics.map((char, idx) => {
                                return(
                                  <View key={idx}>             
                                      <TouchableOpacity
                                          style={styles.ingredientsButton}
                                          onPress={() => { 
                                              let aux = this.state.characteristicsChosen;
                                              aux.push(char);
                                              this.setState({characteristicsChosen: aux});
                                              this.setCharacteristicsVisible(false);
                                          }}
                                      >
                                          <Text style={styles.ingredient}>{char.a_char_name}</Text>
                                      </TouchableOpacity>
                                  </View>
                                );
                            })}
                        </ScrollView>    
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { 
                                this.setCharacteristicsVisible(false);
                            }}
                        >
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                              
            {/* -------------------------------------------------------------- REQUEST CHARACTERISTIC MODAL------------------------------------------------------------- */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.requestVisible}
              onRequestClose={() => {
                this.setState({requestVisible: false});
              }}

            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.inputTitle}>Request a new characteristic</Text>
                        <Input
                            placeholder={""}
                            onChangeText={(value) => (this.newRequest = value)}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={async() => { 
                                    await this.sendNewCharMail();
                                    this.setRequestVisible(false)
                                }}
                            >
                                <Text style={styles.buttonText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        
            {/* -------------------------------------------------------------- CHOOSE IMAGE MODAL----------------------------------------------------------------------- */}
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
                            style={styles.chainButton}
                            onPress={() => { 
                                this.onChooseImagePress();
                                this.setState({modalImageVisible: false});
                              }}
                        >
                            <Text style={styles.blackButtonText}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.chainButton}
                            onPress={() => { 
                                this.onChooseGalleryImagePress();
                                this.setState({modalImageVisible: false});
                            }}
                        >
                            <Text style={styles.blackButtonText}>Gallery</Text>
                        </TouchableOpacity>
                    </View>         
                </View>
            </Modal>
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}

            {/* -------------------------------------------------------------- CHOOSE IMAGE MODAL----------------------------------------------------------------------- */}
        
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
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
              visible={this.state.snackbarIngrVisible}
              onDismiss={this.dismissIngrSnackBar}
        >
             <Text style={styles.textSnack}> Please fill ingredient name.</Text>
        </Snackbar>

        <Snackbar
              style={styles.snackBar}
              duration={4000}
              visible={this.state.snackbarConnectionVisible}
              onDismiss={this.dismissConnectionSnackBar}
        >
             <Text style={styles.textSnack}>No internet connection.</Text>
        </Snackbar>

        <Snackbar
              style={styles.snackBar}
              duration={4000}
              visible={this.state.snackbarCharVisible}
              onDismiss={this.dismissCharSnackBar}
        >
             <Text style={styles.textSnack}> Please fill characteristic name.</Text>
        </Snackbar>

        </SafeAreaView>)
    );
  }
}

export default AddDish = (props) => {
  return <AddDishComponent {...props} />;
};

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'white',
    paddingBottom: 0,
    paddingTop: 5,
  },

  inner: {
    position: "relative",
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  mainPage: {
    flex: 1,
    position: "relative",
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: "center",
  },

  mainImage: {
    //flex: 1,
    position: "relative",
    paddingTop: 20,
    //paddingBottom: 40,
    alignItems: "center",
  },

  logoImage: {
    position: "relative",
    width: WIDTH,
    height: 200,
    justifyContent: "center",
    margin: 15,
  },

  logoText: {
    position: "absolute",
    color: "black",
    fontSize: 23,
    paddingTop: 128,
    paddingBottom: 10,
    fontWeight: "500",
    opacity: 1,
    textAlign: "center",
  },

  addDishTitle:{
    paddingLeft:15,
    fontSize: 30,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },


  title: {
    position: "relative",
    color: "white",
    fontSize: 40,
    paddingTop: 0,
    paddingBottom: 10,
    fontWeight: "bold",
    opacity: 1,
  },

  text: {
    position: "relative",
    fontSize: 20,
    paddingLeft: 15,
    paddingBottom: 8,
    color: "black",
    fontWeight: "bold",
  },

  inputTitle: {
    position: "relative",
    fontSize: 20,
    paddingLeft: 15,
    color: "black",
    fontWeight: "500",
    fontWeight: "bold",
  },


  allergiesContainer:{
    paddingBottom: 20,
  },

  desc:{
    paddingTop: 0,
    paddingBottom: 0,
    textAlignVertical:"top",
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


  buttonChar: {
    elevation: 15,
    borderRadius: 25,
    backgroundColor: "#FC987E",
    color: "black",
    width: 300,
    alignItems: "center",
    padding: 13,
    height: 48,
  },

  ingredients: {
    color: "black",
    fontSize: 15,  
    fontWeight: "bold",    
  },

  blackButtonText:{
    color: "black",
    fontWeight: "bold",    
    fontSize: 15,      
  },

  ingredientsButton: {
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
    marginTop: 22,
    marginBottom:30,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

  buttonTag: {
    borderRadius: 25,
    color:"black",
    backgroundColor:"#D8D8D8",
    padding: 13,
    marginLeft: 20,
    marginTop:5,
    alignSelf: 'flex-start',
  },

  tagsList: {
    flex: 1, 
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  rowItemsContainer: {
    flexDirection: 'row',
  },

  tagText: {
    fontSize: 15, 
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

  textSnack:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  },

  snackBar:{
    backgroundColor: "#787777",
    height:70,
  }  ,

  loading:{
    flex: 1,
    marginTop:100,
  },

  select:{
    marginRight:20,
  },


  buttonText:{
    color: "white",   
  },

  requestText: {
    position: "relative",
    color: "black",
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 60,
    textDecorationLine: "underline",
    opacity: 1,
    paddingLeft: 15,
  },

});

