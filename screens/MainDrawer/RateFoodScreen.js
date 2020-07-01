import React, { Component } from "react";
import { Card, ListItem, Button, Icon, Rating, AirbnbRating} from "react-native-elements";
import { StyleSheet, View, SafeAreaView, Text, Image, TextInput, ScrollView, TouchableOpacity, Dimensions} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { ReviewApi, UserApi } from '../../api';

const { width } = Dimensions.get("window");

class RateFoodComponent extends Component {

    constructor() {
        super();

        this.state = {
            comment: "",
            raiting: 2.5,
            food: {}
        };
    }

    async uploadReview(){
        const { navigation } = this.props;
        console.log("comment: " + this.state.comment)
        console.log("score: " + this.state.raiting)

        let review = {
            a_desc: this.state.comment,
            a_food_id: this.state.food.a_food_id,
            a_score: this.state.raiting,
            a_user_id: this.state.user.a_user_id
        }

        const resp = await ReviewApi.add(review);
        console.log(resp);
        
        navigation.goBack();
    }

    async fetchUser() {
        console.log('fetching user');
        const resp = await UserApi.getMe();
        this.setState({
          user: resp.result
        })
        console.log('done fetching user');
        console.log("User is: " + resp.result);
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
        console.log('mounting');
        await this.fetchUser();
        await this.fetchFood();
    }

    render() {
        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.backgroundContainer}>
                <ScrollView>
                <View>
                <Text style={styles.logoText}>Rate Dish: {this.state.food.a_title}</Text>
                <Rating
                    ratingCount={5}
                    imageSize={60}
                    fractions={1}
                    showRating
                    onFinishRating={(value) => (this.setState({raiting: value}))}
                />
                </View>
                <View style={styles.inputView}>
                <Text style={styles.text}>Leave a comment</Text>
                    <TextInput
                        style={styles.input}
                        multiline
                        numberOfLines={10}
                        placeholder={"This dish was awesome!"}
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
            </SafeAreaView>
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
      },
});

