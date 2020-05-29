import React, { Component } from "react";

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
import { Card,Rating, Icon } from "react-native-elements";


const { width } = Dimensions.get("window");

class RestaurantStatisticsProfileComponent extends Component {
    constructor() {
        super();


        this.favourites = [{name :"fav1", img:"../../../assets/images/Po.jpg", rating: 5},
                            {name :"fav2", img:"../../../assets/images/Po.jpg", rating: 5},
                            {name :"fav3", img:"../../../assets/images/Po.jpg", rating: 4},
                            {name :"fav4", img:"../../../assets/images/Po.jpg", rating: 4},
                            {name :"fav5", img:"../../../assets/images/Po.jpg", rating: 4}];
                            
        this.lessFavourites = [{name :"Lfav1", img:"../../../assets/images/Po.jpg", rating: 2},
                                {name :"Lfav2", img:"../../../assets/images/Po.jpg", rating: 2},
                                {name :"Lfav3", img:"../../../assets/images/Po.jpg", rating: 2},
                                {name :"Lfav4", img:"../../../assets/images/Po.jpg", rating: 1},
                                {name :"Lfav5", img:"../../../assets/images/Po.jpg", rating: 1}];
        this.averageScore = 4;
        this.goodReviews = 150;
        this.neutralReviews = 50;
        this.badReviews = 25;
    }
  render() {
    const { navigation } = this.props;
    var favoriteCards = [];
    var lessFavouriteCards = [];
    for(let i = 0; i < this.favourites.length ; i++){
        favoriteCards.push(
            <View>
                <TouchableOpacity onPress={async () => {navigation.navigate("Food");
                      console.log("I want to navigate to Dish page");
                    }}>
                <Card
                    image={{uri: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg'}}
                    //image={this.favourites[i].img}
                    imageStyle={{
                        height: 100,
                        }}
                >
                    <View style={styles.cardFooter}>
                        <Text style={styles.foodName}>{this.favourites[i].name}</Text>
                    </View>
                    <Rating imageSize={20} readonly startingValue={this.favourites[i].rating} style={styles.rating} /> 
                </Card>
              </TouchableOpacity>
            </View>
        )                        
    }

    for(let i = 0; i < this.lessFavourites.length ; i++){
        lessFavouriteCards.push(
            <View>
                <TouchableOpacity onPress={async () => {navigation.navigate("Food");
                      console.log("I want to navigate to Dish page");
                    }}>
                <Card
                    image={{uri: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg'}}
                    //image={this.lessFavourites[i].img}
                    imageStyle={{
                        height: 100,
                        }}
                >
                    <View style={styles.cardFooter}>
                        <Text style={styles.foodName}>{this.lessFavourites[i].name}</Text>
                    </View>
                    <Rating imageSize={20} readonly startingValue={this.lessFavourites[i].rating} style={styles.rating} /> 
                </Card>
              </TouchableOpacity>
            </View>
        )                        
    }
    return (
        <SafeAreaView style={styles.backgroundContainer}>
            <ScrollView>
                <View style={styles.mainPage}>
                <Text style={styles.logoText}>Statistics</Text>
                </View>
                <View flexDirection='row'>
                    <Text style={styles.subtitleText}>Average dish rating</Text>
                    <Rating imageSize={20} readonly startingValue={this.averageScore} style={styles.averageRating} />
                </View>
                <View>
                    <View flexDirection='row'>
                        <Text style={styles.subtitleText}>Reviews:</Text>
                        <TouchableOpacity onPress={() => {navigation.navigate("Reviews");}}>
                            <View style={styles.showAllButton}>
                                <Text style={styles.secondaryText}>SHOW ALL</Text>
                                <Icon
                                    name='arrow-right'
                                    type='material-community'
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View flexDirection='row'>
                        <Text style={styles.reviewText}>Good: </Text>
                        <Text style={styles.reviewText}>{this.goodReviews}</Text>
                    </View>
                    <View flexDirection='row'>
                        <Text style={styles.reviewText}>Neural: </Text>
                        <Text style={styles.reviewText}>{this.neutralReviews}</Text>
                    </View>
                    <View flexDirection='row'>
                        <Text style={styles.reviewText}>Bad: </Text>
                        <Text style={styles.reviewText}>{this.badReviews}</Text>
                    </View>
                </View>
                <View style={styles.reviewContainer} >
                    <Text style={styles.subtitleText}>Favourite Dishes</Text>
                    <View style={styles.review}>
                        <ScrollView horizontal={true}>
                            {favoriteCards}
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.favouritesContainer}>
                    <Text style={styles.subtitleText}>Less Favourite Dishes</Text>
                    <View style={styles.review}>
                        <ScrollView horizontal={true}>
                            {lessFavouriteCards}
                        </ScrollView>
                    </View>
                </View>
                

                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonTitle}> Want More?</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => { }}
                    >
                        <Text style={styles.buttonText}>UPGRADE TO A BETTER PLAN</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
  }
}

export default RestaurantStatisticsProfile = (props) => {
  return <RestaurantStatisticsProfileComponent {...props} />;
};



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
        paddingTop: 10,
        //paddingBottom: 40,
        alignItems: "center",
    },
    
    logoImage: {
        position: "relative",
        width: 120,
        height: 120,
        justifyContent: "center",
        borderRadius: 120 / 2,
    },
    
    review: {
        position: "relative",
        width: width,
        flexDirection: "row",
    },
    
    reviewImage: {
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
        paddingBottom: 25,
        fontWeight: "500",
        opacity: 1,
        textAlign: "center",
    },

    subtitleText:{
        position: "relative",
        color: "black",
        fontSize: 25,
        paddingTop: 10,
        paddingBottom: 0,
        fontWeight: "bold",
        opacity: 1,
        textAlign: "left",
        paddingLeft: 15,
    },

    averageRating:{
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        alignSelf: "flex-start",
    },
    
    foodName: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 15,
        paddingLeft: 3,
    },
    
    secondaryText: {
        textAlign: "left",
        fontSize: 14,
        paddingLeft: 15,
      },
    
    reviewText:{
        textAlign: "left",
        fontSize: 22,
        paddingLeft: 15,
        paddingTop: 10,
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
    rating: {
        alignSelf: "flex-start",
    },
    
    showAllButton:{
        paddingLeft: 180,
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

    buttonTitle:{
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 26,
        //paddingLeft: 3,
    },
    buttonText:{
        color: "white",
        
    },

    reviewContainer: {
        flex: 2,
    },
    favouritesContainer:{
        flex: 2,
        paddingTop: 5,
    },

});
