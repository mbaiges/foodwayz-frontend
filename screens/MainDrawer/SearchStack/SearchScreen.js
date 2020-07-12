import React, { Component } from "react";
import { Card, ListItem, Button, Icon, SearchBar, Input } from "react-native-elements";
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
import Constants from 'expo-constants';
import FoodCard from "../../components/FoodCard";

import { Picker } from 'react-native';

import { Snackbar } from 'react-native-paper';

import { StackActions } from '@react-navigation/native';

import {IngredientApi, CharacteristicApi, TypeApi, FoodApi, FoodHasCharacteristicApi, FoodHasIngredientApi, SearchApi } from '../../../api';

const { width } = Dimensions.get("window");
const statusBarHeight = Constants.statusBarHeight;

class SearchScreenComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      search: '',
      timer: undefined,
      filterTimer: undefined,
      queryResult: [],
  
      typesVisible: false,
      ingredientsVisible: false,
      characteristicsVisible: false,
      filterByVisible: false,
  
      allTypes: [],
      allIngredients: [],
      allCharacteristics: [],
  
      chosenTypes: [],
      chosenIngredients: [],
      chosenCharacteristics: [],
  
      typeModalInput: "",
      ingrModalInput: "",
      charModalInput: "",
  
      queryBody: {
        raw_input: "",
        filters: {
          a_type_ids: [],
          a_ingr_ids: [],
          a_char_ids: []
        },
        sort_by: "most_reviews"
      },
  
      sortBy: "most_reviews",
      sortType: "sort_asc",
  
    };
  }

  async updateSearch(text){

    if (this.state.timer) {
      clearTimeout(this.state.timer);
    }

    const timer = setTimeout(() => {
      this.querySearch(text);
    }, 500);

    this.setState({
      timer: timer,
    });

    let queryBody = this.state.queryBody
    queryBody.raw_input = text;

    await this.setState({ 
      search: text,
      queryBody:queryBody,
    });

    this.querySearch();
    
  };

  async querySearch(initialQueryBody){
    try {
      const resp = await SearchApi.searchFoods(initialQueryBody? initialQueryBody : this.state.queryBody);
      switch(resp.status) {
        case 200:
          this.setState({ queryResult: resp.response.result });
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

  // ------------------------------- SEARCH IN FILTERS ------------------------------

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

  dismissConnectionSnackBar = () => {
    this.setState({
      snackbarConnectionVisible: false
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


  //--------------------------------- APPLY FILTERS ----------------------------------

  async applyTypeFiltersAndSearch(){
    let queryBody = this.state.queryBody;
    let aux = [];

    this.state.chosenTypes.forEach( (type) => {
      aux.push(type.a_type_id);
    });

    queryBody.filters.a_type_ids = aux;

    //console.log(queryBody);

    await this.setState({ queryBody: queryBody });

    this.querySearch();
  }

  async applyIngredientFiltersAndSearch(){
    let queryBody = this.state.queryBody;
    let aux = [];

    this.state.chosenIngredients.forEach( (ingr) => {
      aux.push(ingr.a_ingr_id);
    });

    queryBody.filters.a_ingr_ids = aux;

    //console.log(queryBody);

    await this.setState({ queryBody: queryBody });

    this.querySearch();
  }

  async applyCharacteristicFiltersAndSearch(){
    let queryBody = this.state.queryBody;
    let aux = [];

    this.state.chosenCharacteristics.forEach( (char) => {
      aux.push(char.a_char_id);
    });

    queryBody.filters.a_char_ids = aux;

    //console.log(queryBody);

    await this.setState({ queryBody: queryBody });

    this.querySearch();
  }
  
  async recalculateSortAndSearch(){
    let queryBody = this.state.queryBody;
    queryBody.sort_by = this.state.sortBy;
    this.setState({ queryBody: queryBody });
    this.querySearch();
  }

  recalculateSortType(){
    let aux = this.state.queryResult.reverse()
    this.setState({queryResult: aux});
  }

  //----------------------------DELETE TAGS------------------------------------

  deleteType(idx){
    let aux = this.state.chosenTypes;
    aux.splice(idx,1);
    this.setState({chosenTypes: aux});
  }

  deleteInredient(idx){
    let aux = this.state.chosenIngredients;
    aux.splice(idx,1);
    this.setState({chosenIngredients: aux});
  }

  deleteCharacteristic(idx){
    let aux = this.state.chosenCharacteristics;
    aux.splice(idx,1);
    this.setState({chosenCharacteristics: aux});
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
    try {
      const resp = await CharacteristicApi.getAll();
      switch(resp.status) {
        case 200:
          this.setState({ allCharacteristics: resp.response.result });
          //console.log(resp);
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

  //--------------------------------MOUNT---------------------------------------------

  async componentDidMount() {
    const { route, navigation } = this.props;

    const focusListener = navigation.addListener('focus', () => {
      this.initialQuerySearch();
    });

    this.addFocusListener(focusListener);

    if (route.params) {
      this.initialQuerySearch();
    }
    else {
      this.setState({
        activityIndicator: true
      });
      this.querySearch();
    }
    await this.fetchTypes();
    await this.fetchIngredients();
    await this.fetchCharacteristics();
    this.setState({
      activityIndicator: false
    });
  }

  async initialQuerySearch() {
    const { route } = this.props;

    let actualQueryBody = {
      raw_input: "",
      filters: {
        a_type_ids: [],
        a_ingr_ids: [],
        a_char_ids: []
      },
      sort_by: "most_reviews"
    };

    if (route.params != undefined) {
      const { a_type_id, a_char_id, a_ingr_id } = route.params;

      if (a_ingr_id != undefined) {
        actualQueryBody.filters.a_ingr_ids.push(a_ingr_id);
      }
      if (a_char_id != undefined) {
        actualQueryBody.filters.a_char_ids.push(a_char_id);
      }
      if (a_type_id != undefined) {
        actualQueryBody.filters.a_type_ids.push(a_type_id);
      }
    }
    

    this.setState({
      activityIndicator: true
    });

    await this.querySearch(actualQueryBody);

    this.setState({
      activityIndicator: false
    });
  }

  async addFocusListener(focusListener) {
    this.setState({
      focusListener
    })
  }

  render() {
    const { navigation } = this.props;

    navigation.setOptions({
      header: () => {<View />}
    });

    return (
      (this.state.activityIndicator) ?
      (<SafeAreaView>
          <View style={styles.loading}>
          <ActivityIndicator size="large" color="#000000" />
          </View>
      </SafeAreaView>)
      :
      (<View
        style={styles.screenContainer}>
          <SearchBar
            platform="android"
            placeholder="Type Here..."
            onChangeText={ async( text ) => await this.updateSearch(text) }
            value={this.state.search}
          />
        <ScrollView marginBottom={80}>
          {
            this.state.queryResult.map(food => {
              return (
                <FoodCard
                  key={food.a_food_id}
                  image={{ uri: food.a_image_url }}
                  title={food.a_title}
                  brand={food.a_rest.a_name}
                  onPress={async () => {
                    const pushAction = StackActions.push("Food", { food: food });
                    navigation.dispatch(pushAction);
                    //navigation.navigate("Food", { food: food });
                    console.log("I want to navigate to Dish page");
                  }}
                  rating={food.a_score}
                />
              )
            })
          }
        </ScrollView>
        
        <View style={styles.floatingButtonContainer}>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => { 
              this.setState({ filterByVisible: true }); 
            }}
          >
            <View style={styles.buttonItemsContainer}>
              <Text style={styles.filter}>CUSTOMIZE</Text>
              {/* <Icon
                name='filter'
                type='material-community'
                color="white"
              /> */}
            </View>
          </TouchableOpacity>
        </View>

        {/* --------------------------------------------------------- TYPES MODAL-------------------------------------------------------------- */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.typesVisible}
            onRequestClose={() => {
              this.setState({ typesVisible: false });
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Choose Types</Text>
                    <Input
                        placeholder={"Search"}
                        rightIcon={ <Icon name='search' /> }                        
                        onChangeText={ async(value) => {
                          this.setState({typeModalInput:value})
                          await this.updateTypeSearch();
                        }} 
                    />
                    {(this.state.chosenTypes.length > 0) ? (<Text style={styles.text}>Chosen Types</Text>) : (<View/>)}
                    <View style={styles.tagScrollView}>
                        <ScrollView style={{flexGrow:0}}>
                            <View style={styles.tagsList}>
                                {this.state.chosenTypes.map((type, idx) => {
                                    return(
                                        <View key={idx}>
                                            <TouchableOpacity style={styles.buttonTag}>
                                                <View style={styles.rowItemsContainer}>
                                                    <Text style={styles.tagText}>{type.a_type_name.charAt(0).toUpperCase() + type.a_type_name.slice(1)}</Text>
                                                    <TouchableOpacity
                                                        onPress={() => this.deleteType(idx)}
                                                    >
                                                        <Icon name='clear' />
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    
                    <View style={styles.searchScrollView}>
                        <ScrollView style={{flexGrow:0}}>
                            {this.state.allTypes.map((type, idx) => {
                                return(
                                    <View key={idx}>             
                                        <TouchableOpacity
                                            style={styles.ingredientsButton}
                                            onPress={() => { 
                                              let aux = this.state.chosenTypes;
                                              aux.push(type);
                                              this.setState({chosenTypes: aux});
                                            }}
                                        >
                                            <Text style={styles.ingredient}>{type.a_type_name.charAt(0).toUpperCase() + type.a_type_name.slice(1)}</Text>
                                        </TouchableOpacity>
                                  </View>
                                );
                            })}
                        </ScrollView>    
                    </View>
                    
                    <TouchableOpacity
                        style={styles.button}
                        onPress={ async() => { 
                          this.setState({ typesVisible: false });
                          await this.applyTypeFiltersAndSearch(); 
                        }}
                    >
                        <Text style={styles.buttonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        {/* ------------------------------------------------------------------------------------------------------------------------------------------------ */}

        {/* --------------------------------------------------------- INGREDIENTS MODAL-------------------------------------------------------------- */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.ingredientsVisible}
            onRequestClose={() => {
              this.setState({ ingredientsVisible: false });
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
                    {(this.state.chosenIngredients.length > 0) ? (<Text style={styles.text}>Chosen Ingredients</Text>) : (<View/>)}
                    <View style={styles.tagScrollView}>
                        <ScrollView style={{flexGrow:0}}>
                            <View style={styles.tagsList}>
                                {this.state.chosenIngredients.map((ingredient, idx) => {
                                    return(
                                        <View key={idx}>
                                            <TouchableOpacity style={styles.buttonTag}>
                                                <View style={styles.rowItemsContainer}>
                                                    <Text style={styles.tagText}>{ingredient.a_ingr_name.charAt(0).toUpperCase() + ingredient.a_ingr_name.slice(1)}</Text>
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
                        </ScrollView>
                    </View>
                    
                    <View style={styles.searchScrollView}>
                        <ScrollView style={{flexGrow:0}}>
                            {this.state.allIngredients.map((ingr, idx) => {
                                return(
                                    <View key={idx}>             
                                        <TouchableOpacity
                                            style={styles.ingredientsButton}
                                            onPress={() => { 
                                              let aux = this.state.chosenIngredients;
                                              aux.push(ingr);
                                              this.setState({chosenIngredients: aux});
                                            }}
                                        >
                                            <Text style={styles.ingredient}>{ingr.a_ingr_name.charAt(0).toUpperCase() + ingr.a_ingr_name.slice(1)}</Text>
                                        </TouchableOpacity>
                                  </View>
                                );
                            })}
                        </ScrollView>   
                    </View>
                     
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async() => { 
                          this.setState({ ingredientsVisible: false });
                          await this.applyIngredientFiltersAndSearch(); 
                        }}
                    >
                        <Text style={styles.buttonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        {/* ------------------------------------------------------------------------------------------------------------------------------------------------ */}

                
        {/* -------------------------------------------------------------- CHARACTERISTIC MODAL-------------------------------------------------------------- */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.characteristicsVisible}
            onRequestClose={() => {
              this.setState({ characteristicsVisible: false });
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Choose Characteristics</Text>
                    <Input
                        placeholder={"Search"}
                        rightIcon={ <Icon name='search' /> }
                        onChangeText={ async(value) => {
                          this.setState({charModalInput:value})
                          await this.updateCharSearch();
                        }} 
                    />
                    {(this.state.chosenCharacteristics.length > 0) ? (<Text style={styles.text}>Chosen Characteristics</Text>) : (<View/>)}
                    <View style={styles.tagScrollView}>
                        <ScrollView style={{flexGrow:0}}>
                            <View style={styles.tagsList}>
                                {this.state.chosenCharacteristics.map((characteristic, idx) => {
                                    return(
                                        <View key={idx}>
                                            <TouchableOpacity style={styles.buttonTag}>
                                                <View style={styles.rowItemsContainer}>
                                                    <Text style={styles.tagText}>{characteristic.a_char_name.charAt(0).toUpperCase() + characteristic.a_char_name.slice(1)}</Text>
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
                        </ScrollView>
                    </View>
                    
                    <View style={styles.searchScrollView}>
                        <ScrollView style={{flexGrow:0}}>
                            {this.state.allCharacteristics.map((char, idx) => {
                                return(
                                  <View key={idx}>             
                                      <TouchableOpacity
                                          style={styles.ingredientsButton}
                                          onPress={() => { 
                                              let aux = this.state.chosenCharacteristics;
                                              aux.push(char);
                                              this.setState({chosenCharacteristics: aux});
                                          }}
                                      >
                                          <Text style={styles.ingredient}>{char.a_char_name.charAt(0).toUpperCase() + char.a_char_name.slice(1)}</Text>
                                      </TouchableOpacity>
                                  </View>
                                );
                            })}
                        </ScrollView>    
                    </View>
                    
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async() => { 
                          this.setState({ characteristicsVisible: false });
                          await this.applyCharacteristicFiltersAndSearch(); 
                        }}
                    >
                        <Text style={styles.buttonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        {/* -------------------------------------------------------------- FILTER BY MODAL----------------------------------------------------------------------- */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.filterByVisible}
            onRequestClose={() => {
              this.setState({ filterByVisible: false });
            }}
        >
            <View style = {styles.centeredView}>
                <View style = {styles.modalImageView}>
                    <Text style={styles.modalTitle}>Filter By:</Text>
                    <TouchableOpacity
                        style={styles.chainButton}
                        onPress={() => { 
                          this.setState({
                              filterByVisible: false,
                              typesVisible: true,
                          });
                      }}
                    >
                        <Text style={styles.buttonText}>Types</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.chainButton}
                        onPress={() => { 
                          this.setState({
                              filterByVisible: false,
                              ingredientsVisible: true,
                          });
                      }}
                    >
                        <Text style={styles.buttonText}>Ingredients</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.chainButton}
                        onPress={() => { 
                            this.setState({
                                filterByVisible: false,
                                characteristicsVisible: true,
                            });
                        }}
                    >
                        <Text style={styles.buttonText}>Characteristics</Text>
                    </TouchableOpacity>

                    <Text style={styles.modalTitle}>Sort By:</Text>

                    <Picker
                      selectedValue={this.state.sortBy}
                      style={{height: 50, width: 200}}
                      onValueChange={async(itemValue, itemIndex) =>{
                        await this.setState({sortBy: itemValue});
                        await this.recalculateSortAndSearch();
                      }}>
                      <Picker.Item label="Most Reviews" value="most_reviews" />
                      <Picker.Item label="Best Rated" value="best_rated" />
                      <Picker.Item label="Most Views" value="most_views" />
                    </Picker>

                    <Picker
                      selectedValue={this.state.sortType}
                      style={{height: 50, width: 200}}
                      onValueChange={async(itemValue, itemIndex) =>{
                        await this.setState({sortType: itemValue});
                        await this.recalculateSortType();
                      }}>
                      <Picker.Item label="Acending" value="sort_asc" />
                      <Picker.Item label="Decending" value="sort_dsc" />
                    </Picker>

                </View>         
            </View>
        </Modal>
        {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        <Snackbar
              style={styles.snackBarError}
              duration={4000}
              visible={this.state.snackbarConnectionVisible}
              onDismiss={this.dismissConnectionSnackBar}
        >
             <Text style={styles.textSnack}>No internet connection.</Text>
        </Snackbar>
      </View>)
    );
  }
}

export default SearchScreen = (props) => {
  return <SearchScreenComponent {...props} />;
};


const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: statusBarHeight,
  },

  navbar: {
    flexDirection: "row",
    marginTop: 16,
  },

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

  modalTitle: {
    position: "relative",
    fontSize: 20,
    paddingLeft: 15,
    color: "black",
    fontWeight: "500",
    fontWeight: "bold",
    paddingBottom: 10,
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
    paddingBottom: 0
  },

  buttonContainer:{
    alignItems:"center",
    paddingTop: 20,
    paddingBottom: 22,
  },

  button: {
    elevation: 10,
    borderRadius: 25,
    backgroundColor: "#FC987E",
    color: "black",
    width: 217,
    alignItems: "center",
    padding: 13,
    height: 48,
  },


  buttonChar: {
    elevation: 10,
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

  buttonText:{
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
    // height: 230,
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
  },

  buttonItemsContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  },

  floatingButtonContainer: {
    elevation: 20,
    position: "absolute",
    alignSelf: 'center',
    marginTop: HEIGHT-75,
  },

  floatingButton: {
    borderRadius: 25,
    backgroundColor: "#FC987E",
    color: "white",
    width: 150,
    padding: 13,
    height: 48,
    elevation: 5
  },

  filter: {
    color:"white",
    fontWeight: "bold"
  },

  tagScrollView: {
    minHeight: 0,
    maxHeight:200,
  },

  searchScrollView: {
    minHeight: 0,
    maxHeight:300,
  },

  loading:{
    flex: 1,
    marginTop:100,
  },

  snackBarError:{
    backgroundColor: "#ff4d4d",
    height:70,
  },
});
