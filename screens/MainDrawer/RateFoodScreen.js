import React, { Component } from "react";
import { Card, ListItem, Button, Icon, Rating, AirbnbRating} from "react-native-elements";
import { StyleSheet, View, SafeAreaView, Text, Image, TextInput, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { ReviewApi, UserApi } from '../../api';

const { width } = Dimensions.get("window");

import { Snackbar } from 'react-native-paper';

class RateFoodComponent extends Component {

    constructor() {
        super();

        this.state = {
            comment: "",
            rating_quality: 2.5,
            rating_precentation: 2.5,
            rating_price: 2.5,
            food: {}
        };
    }

    dismissConnectionSnackBar = () => {
        this.setState({
          snackbarConnectionVisible: false
        });
      }

    async uploadReview(){
        this.setState({
            activityIndicator: true
          })
        const { navigation } = this.props;
        console.log("comment: " + this.state.comment)
        console.log("score: " + this.state.raiting)

        let review = {
            a_desc: this.state.comment,
            a_food_id: this.state.food.a_food_id,
            a_food_quality_score: this.state.rating_quality,
            a_presentation_score: this.state.rating_precentation,
            a_price_quality_score: this.state.rating_price,
            a_user_id: this.state.user.a_user_id
        }

        try {
            const resp = await ReviewApi.add(review);
            switch(resp.status) {
              case 200:
                this.setState({
                    activityIndicator: false
                  })
                
                navigation.goBack();
                break;
            default:
              console.log(`Status Received: ${resp.status} --> ${resp.response}`);
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

    async fetchUser() {

        try {
            const resp = await UserApi.getMe();
            switch(resp.status) {
              case 200:
                this.setState({
                    user: resp.response.result
                  })
                  console.log('done fetching user');
                  console.log("User is: " + resp.response.result);
                break;
            default:
              console.log(`Status Received: ${resp.status} --> ${resp.response}`);
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

    async fetchFood(){
        const { route } = this.props;
        const { food } = route.params;
        console.log(food);
        this.setState({
            food: food,
        })
    }

    async componentDidMount() {
        this.setState({
            activityIndicator: true
          })
        console.log('mounting');
        await this.fetchUser();
        await this.fetchFood();
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
                <ScrollView>
                <View>
                <Text style={styles.logoText}>Rate Food: {this.state.food.a_title}</Text>


                <Text style={styles.logoText}>Quality</Text>
                <Rating
                    ratingCount={5}
                    imageSize={60}
                    fractions={1}
                    showRating
                    onFinishRating={(value) => (this.setState({rating_quality: value}))}
                />
                

                <Text style={styles.logoText}>Presentation</Text>
                <Rating
                    ratingCount={5}
                    imageSize={60}
                    fractions={1}
                    showRating
                    onFinishRating={(value) => (this.setState({rating_precentation: value}))}
                />

                <Text style={styles.logoText}>Price</Text>
                <Rating
                    ratingCount={5}
                    imageSize={60}
                    fractions={1}
                    showRating
                    onFinishRating={(value) => (this.setState({rating_price: value}))}
                />


                </View>
                <View style={styles.inputView}>
                <Text style={styles.text}>Leave a comment</Text>
                    <TextInput
                        style={styles.input}
                        multiline
                        numberOfLines={10}
                        placeholder={"This food was awesome!"}
                        placeholderTextColor={"rgba(0,0,0,0.4)"}
                        underLineColorAndroid="transparent"
                        onChangeText={(value) => (this.setState({comment: value}))}
                    />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={ async() => { this.uploadReview(); }}
                    >
                        <Text style={styles.save}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={ () => { navigation.goBack(); }}
                    >
                        <Text style={styles.cancel}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
                <Snackbar
              style={styles.snackBar}
              duration={4000}
              visible={this.state.snackbarConnectionVisible}
              onDismiss={this.dismissConnectionSnackBar}
        >
             <Text style={styles.textSnack}>No internet connection.</Text>
        </Snackbar>
            </SafeAreaView>)
        );
    };
}
export default function RateFood(props) {
    return <RateFoodComponent {...props} />;
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: "white",
    },
    logoText: {
        position: "relative",
        color: "black",
        fontSize: 20,
        paddingTop: 10,
        paddingLeft:15,
        paddingBottom: 25,
        fontWeight: "bold",
        opacity: 1,
        textAlign: "left",
    },
    text: {
        position: "relative",
        color: "black",
        fontSize: 16,
        paddingTop: 10,
        paddingLeft:15,
        paddingBottom: 25,
        paddingLeft:15,
        fontWeight: "bold",
        opacity: 1,
        marginTop:50,
        textAlign: "left",      
    },
    input: {
        position: "relative",
        borderColor:"gray",
        borderWidth:1,
        paddingLeft: 5,
        fontSize: 16,
        backgroundColor: "white",
        color: "#000000",
        marginHorizontal: 25,

        textAlignVertical:"top",
    },
    buttons: {
        flexDirection:"row",
        paddingTop:150,
    },
    saveButton: {
        marginLeft:180,
        backgroundColor: "#FC987E",
        color: "white",
        width: 100,
        alignItems: "center",
        paddingTop:8,
        height: 40,
        marginRight:15,
      },
    save: {
        color:"white",
    },
    cancel: {
        color:"#FC987E",
    },
    cancelButton: {
        backgroundColor: "white",
        paddingTop:8,
        width: 100,
        alignItems: "center",
        padding: 13,
        height: 40,
        borderColor: "#FC987E",
        borderWidth: 1,
        paddingBottom:15,
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
});

