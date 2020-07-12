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
  ActivityIndicator
} from "react-native";
import { RestaurantApi, FoodApi, ViewsApi } from "../../api";
import { Snackbar } from 'react-native-paper';

import { StackActions } from '@react-navigation/native';

//import { Constants } from 'expo';

const { width } = Dimensions.get("window");

class RestaurantProfileComponent extends Component {
  constructor() {
    super();

    this.state = {
      restaurant: {},
      images: [],
      dishes: [],
      hasPopularDishes:false,
    }
  }

  dismissConnectionSnackBar = () => {
    this.setState({
      snackbarConnectionVisible: false
    });
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
    try {
      const resp = await RestaurantApi.getImages(aux.a_rest_id);
      switch(resp.status) {
        case 200:
          console.log("-----------------------------------------------------------------------------------------");
          console.log(resp);
          
      
          this.setState({
            images: resp.response.result,
          })
          break;
      default:
        console.log(`Status Received: ${resp.status}`);
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

  async fetchDishes() {
    const aux = this.state.restaurant;
    try {
      const resp = await RestaurantApi.getFoods(aux.a_rest_id);
      switch(resp.status) {
        case 200:
          console.log("-----------------------------------------------------------------------------------------");
          console.log(resp);
          this.setState({
            dishes: resp.response.result,
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

  chechPolularDishes(){
    this.state.dishes.forEach( (dish) => {
      if(dish.a_score >= 4){
        this.setState({hasPopularDishes: true})
      }
    })
  }

  async componentDidMount() {
    this.setState({
      activityIndicator: true
    })
    console.log("Mounting");
    await this.fetchRestaurant();
    await this.fetchImages();
    await this.fetchDishes();
    this.chechPolularDishes();
    try {
      const resp = await ViewsApi.registerRestaurantView(this.state.restaurant.a_rest_id);
      switch(resp.status) {
        case 200:
          console.log(resp);
          this.setState({
            activityIndicator: false
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


  render(){
    const {navigation} = this.props;

      navigation.setOptions({
          headerTitle: () => <Text style={styles.headerText}>{this.state.restaurant.a_name}</Text>
      });
      

      //   navigation.setOptions({
      //     headerTitle: () => <Text style={styles.headerText}>{this.state.food.a_title}'s Statistics</Text>
      // });
      // headerText: {
      //   fontWeight: "bold",
      //   fontSize: 20,
      //   color: "white",
      //   letterSpacing: 1,
      // },

    return (
      (this.state.activityIndicator) ?
            (<SafeAreaView>
                <View style={styles.loading}>
                <ActivityIndicator size="large" color="#000000" />
                </View>

            </SafeAreaView>)
            :
      (<SafeAreaView style={styles.backgroundContainer}>

        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainPage}>
            <ScrollView 
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
                {this.state.images.map(image =>{
                return(
                    <View> 
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
                

          
          {/* <Text style={styles.primaryText}>About us</Text>
          <Text style={styles.secondaryText}>Somos un restaurante asiático basado en la película Kung Fu Panda.
          Nuestros cocineros panda trabajan las 24h sin descansar para que tú puedas comer
          una sopa a las 2 de la madrugada si así lo deseas!</Text> */}
        </View>
          {/* //-----------------------------NUEVO----------------------------      */}
          <Text style={styles.subtitleText}>Address</Text>  
          <Text style = {styles.addressText}>{this.state.restaurant.a_state +", " + this.state.restaurant.a_city}</Text>
          <Text style = {styles.addressText}>{this.state.restaurant.a_address +", " + this.state.restaurant.a_postal_code}</Text>

          <Text style= {styles.subtitleText}>Scores </Text>
          <Text style={styles.secondaryText}>Quality Score</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{this.state.restaurant.a_food_quality_score}</Text>
            <Rating imageSize={30} readonly startingValue={this.state.restaurant.a_food_quality_score} style={styles.rating} />
          </View>
          <Text style={styles.secondaryText}>Presentation Score</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{this.state.restaurant.a_presentation_score}</Text>
            <Rating imageSize={30} readonly startingValue={this.state.restaurant.a_presentation_score} style={styles.rating} />
          </View>
          <Text style={styles.secondaryText}>Price-quality Score</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{this.state.restaurant.a_price_quality_score}</Text>
            <Rating imageSize={30} readonly startingValue={this.state.restaurant.a_price_quality_score} style={styles.rating} />
          </View>

          { this.state.restaurant.a_rest_chain &&
            <View>
              <Text style={styles.subtitleText}>Chain Info</Text> 
              <Card title={this.state.restaurant.a_rest_chain.a_name}>
                <Image source={{ uri: this.state.restaurant.a_rest_chain.a_image_url}}
                style={styles.imageStyle} />

                <View style={styles.ratingContainer}>
                  <Text style={styles.chainRatingText}>{this.state.restaurant.a_rest_chain.a_score}</Text>
                  <Rating imageSize={30} readonly startingValue={this.state.restaurant.a_rest_chain.a_score} style={styles.rating} />
                </View>
              </Card>
            </View>
          
          }

          {/* //---------------------------------------------------------      */}  
        {
          (this.state.hasPopularDishes) ? 
          (
          <View style={styles.popularContainer} >
            <Text style={styles.subtitleText}>Our most popular foods</Text>
            <View style={styles.popular}>
              <ScrollView 
                showsVerticalScrollIndicator={false}
                horizontal={true}>
                {this.state.dishes.map(dish =>{
                  return(
                    (dish.a_score >= 4) ? 
                    <TouchableOpacity onPress={async () => {
                      const pushAction = StackActions.push("Food", {food: dish});
                      navigation.dispatch(pushAction);
                      //navigation.navigate("Food"); //falta pasar los params para que pase a la pag correcta
                    }}>  
                      <Card
                        image={{ uri: dish.a_image_url }}
                        imageStyle={{
                          height: 100,
                          width: 100
                        }}
                      >
                        
                        <View style={styles.cardFooter}>
                          <Text style={styles.foodName}>{dish.a_title}</Text>
                          <Rating imageSize={20} readonly startingValue={dish.a_score} /> 
                        </View>
                      </Card>
                    </TouchableOpacity>
                    :
                    <View/>
                  )
                })}
                
              </ScrollView>
            </View>
          </View>    
          ) 
          : 
          (
          <View/>
          )
        }
        
        <View paddingTop={15}>
          <Text style={styles.subtitleText}>All of our foods</Text>
            {this.state.dishes.map(dish =>{
              return( 
                <ListItem
                  onPress={async () => {
                    const pushAction = StackActions.push("Food", {food: dish});
                    navigation.dispatch(pushAction);
                    //navigation.navigate("Food");
                  }}
                  key={dish.a_food_id}
                  leftAvatar={{ source: { uri: dish.a_image_url } }}
                  title={dish.a_title}
                  subtitle={
                    <View>  
                      <Text>{dish.a_description}</Text>
                      <Rating imageSize={10} readonly startingValue={dish.a_score}  style={styles.rating}/> 
                    </View>
                  }
                  bottomDivider={true}
                  topDivider={true}
                />
              )
            })}
        </View>

        </ScrollView>
        <Snackbar
              style={styles.snackBarError}
              duration={4000}
              visible={this.state.snackbarConnectionVisible}
              onDismiss={this.dismissConnectionSnackBar}
        >
             <Text style={styles.textSnack}>No internet connection.</Text>
        </Snackbar>
      </SafeAreaView>)
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

  rating: {
    alignSelf: "flex-start",
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

    fontSize: 14,
    paddingLeft: 15,
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
    paddingTop:15,
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
    flexDirection: "column",
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
    elevation: 10,
    borderRadius: 25,
    backgroundColor: "#FC987E",
    color: "black",
    width: 217,
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


  addressText:{
    paddingLeft: 20,
    fontSize:18,
  },

  ratingContainer: {
    marginTop: 0,
    flexDirection: 'row'
  },

  ratingText: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 27,
    paddingLeft: 40,
    paddingRight: 20,

  },

  chainRatingText:{
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: 40,
    paddingRight: 20,

  },

  imageStyle: {
    width: 250,
    height: 250,
    alignSelf: 'center',

  },

  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    letterSpacing: 1,
  },

});
