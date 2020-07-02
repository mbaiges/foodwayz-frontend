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
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CheckBox,Input, Icon} from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';


class AddDishComponent extends Component {
    constructor() {
        super();


        this.state = {
          checked: false,
          values:[false,false,false,false, false],
          dishImage: "../../assets/images/dishPlaceholder.png",
          dishTitle: "",
          dishDesc: "",
          tagsVisible: false,
          requestVisible: false,
          ingredientsVisible: false,
          newRequest: "",
          tags: [],
          ingredients: [],
        }

        this.options = [{name :"Vegan", value: false},
                    {name :"celiac fit", value: false},
                    {name :"Low fat", value: false},
                    {name :"Cheap", value: false},
                    {name :"Vegetarian", value: false}
                  ];
  }

  setTagsVisible = (visible) => {
    this.setState({ tagsVisible: visible });
  }

  setIngredientsVisible = (visible) => {
    this.setState({ ingredientsVisible: visible });
  }

  setRequestVisible = (visible) => {
    this.setState({ requestVisible: visible });
  }

  changeValues(i){
    let newValues = this.state.values;
    newValues[i] = !newValues[i];
    this.setState({values: newValues})
  }

  deleteTag(idx){
    let aux = this.state.tags;
    aux.splice(idx,1);
    this.setState({tags: aux});
  }

  deleteIngredient(idx){
    let aux = this.state.ingredients;
    aux.splice(idx,1);
    this.setState({ingredients: aux});
  }

  onChooseImagePress = async () => {
    let result = await ImagePicker.launchCameraAsync();
    //let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
        this.uploadImage(result.uri)
            .then(async () => {
                Alert.alert("Success");
                await this.getImage();
            })
            .catch((error) => {
                Alert.alert(error.message);
            });
    }
  }

  uploadImage = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();

      var myStr = this.state.user.a_email;
      var newStr = myStr.replace(/\./g, "_");

      console.log("imageName: " + newStr);

      var ref = firebase.storage().ref().child(`images/users/${newStr}.jpg`);
      return ref.put(blob);
  }

  getImage = async () => {
      var myStr = this.state.user.a_email;
      var newStr = myStr.replace(/\./g, "_");

      firebase.storage().ref().child(`images/users/${newStr}.jpg`).getDownloadURL().then(async (url) => {
        this.setState(prevState => ({
          user: {
              ...prevState.user,
              a_image_url: url
          }
        }))
        console.log(this.state.user);
        await this.updateUser();
      }).catch(function (error) {
          Alert.alert(error.message);
      });
  }

  render() {
    const { navigation } = this.props;
    
    var modalInput = "";
    var optionButtons = [];
    for(let i = 0; i < this.options.length ; i++){
        optionButtons.push(
            <View key={i}>
                <CheckBox
                    title = {this.options[i].name}
                    checked = {this.state.values[i]}
                    onPress={() => this.changeValues(i)}
                />
            </View>
        )                        
    }

    return (
        
        <SafeAreaView style={styles.backgroundContainer}>
            <ScrollView vertical = {true}>
              <Text style={styles.addDishTitle}> Add Dish </Text>
              <TouchableOpacity onPress={() => { this.onChooseImagePress() }}
                 //esto tiene que hacer lo de la foto (lo que habia hecho andy y guardarla en el this.state.dishImage)
              > 
                <View style={styles.mainImage}>
                  <Image
                    style={styles.logoImage}
                    source={require("../../assets/images/dishPlaceholder.png")}//CAMBIARLO POR this.state.dishImage
                    
                  />
                  <Text style={styles.logoText}>Add Image</Text>
                </View>
              </TouchableOpacity>
              <View>
                <Text style={styles.inputTitle}> Name </Text>
                <Input
                  placeholder={""}
                  onChangeText={(value) => (this.state.dishTitle = value)}
                />
                
                <Text style={styles.inputTitle}> Description </Text>
                <Input
                  placeholder={""}
                  onChangeText={(value) => (this.state.dishDesc = value)}
                />
              </View>
              <View>
                <Text style={styles.text}>Tags</Text>
                <View style={styles.tagsList}>
                  {this.state.tags.map((tag, idx) => {
                    return(
                      <View
                        key={idx}
                      >
                        <TouchableOpacity style={styles.buttonTag}
                          onPress={() => this.deleteTag(idx)}
                        >
                          <View style={styles.rowItemsContainer}>
                            <Text style={styles.tagText}>{tag}</Text>
                            <Icon name='clear' />
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>

                <View style={styles.centeredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.tagsVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.inputTitle}>Tag Name </Text>
                        <Input
                          placeholder={""}
                          onChangeText={(value) => (modalInput = value)}
                        />

                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={() => { 
                              this.setTagsVisible(false);
                              let ans = [...this.state.tags, modalInput];
                              this.setState({
                                tags: ans,
                              });
                              modalInput="";
                            }}
                          >
                            <Text style={styles.buttonText}>ADD</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => { 
                        this.setTagsVisible(true);
                      }}
                    >
                      {/* getState((state) => {//Code here}) */}
                      <Text style={styles.buttonText}>ADD TAG</Text>
                    </TouchableOpacity>
                  </View>
                 
                </View>

                <View>
                <Text style={styles.text}>Ingredients</Text>
                <View style={styles.tagsList}>
                  {this.state.ingredients.map((ingredient, idx) => {
                    return(
                      <View
                        key={idx}
                      >
                        <TouchableOpacity style={styles.buttonTag}
                          onPress={() => this.deleteIngredient(idx)}
                        >
                          <View style={styles.rowItemsContainer}>
                            <Text style={styles.tagText}>{ingredient}</Text>
                            <Icon name='clear' />
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
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
                                <Text style={styles.modalTitle}>Choose ingredients</Text>
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
            

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => { 
                        this.setIngredientsVisible(true);
                      }}
                    >
                      {/* getState((state) => {//Code here}) */}
                      <Text style={styles.buttonText}>ADD INGREDIENT</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                </View>
                
              </View>
              <View style={styles.allergiesContainer}>
                <Text style={styles.text}>Select allergies / characteristics</Text>
                { optionButtons }
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.buttonChar}
                      onPress={() => { 
                        this.setRequestVisible(true);
                      }}
                    >
                      {/* getState((state) => {//Code here}) */}
                      <Text style={styles.buttonText}>This dish has other characteristics</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.centeredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.requestVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
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
                            onPress={() => { 
                              this.setRequestVisible(false)
                            }}
                          >
                            <Text style={styles.buttonText}>Send</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  </View>
              </View>

              

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => { 
                    //ACA SE ENVIA TODA LA DATA A LA API PARA QUE SE ALMACENE
                   }}
                >
                  <Text style={styles.buttonText}>Add Dish</Text>
                </TouchableOpacity>
              </View>


            </ScrollView>
        </SafeAreaView>
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


  buttonText:{
    color: "white",
    fontWeight: "bold",    
    fontSize: 15,      
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

});

