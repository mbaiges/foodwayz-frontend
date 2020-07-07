import React, { Component } from "react";
import { StyleSheet,  View,  SafeAreaView,  Text,  Image,  TextInput, ActivityIndicator,  ScrollView,  TouchableOpacity,  Dimensions} from "react-native";
import { ReviewApi } from '../../api';
import ReviewCard from "../components/ReviewCard";

import { StackActions } from '@react-navigation/native';

const { width } = Dimensions.get("window");

class ReviewsComponent extends Component {

    constructor() {
        super();

        this.state = {
          reviews: [],
          food: {}
        };

    }

    async fetchFood(){
        const { route } = this.props;
        const { food } = route.params;
        console.log(food);
        this.setState({
            food: food,
        })
    }

    async fetchReviews(){
        let resp = await ReviewApi.getReviewsByFood(this.state.food.a_food_id);
        console.log(resp);
        this.setState({
            reviews: resp.response.result
        })
    }

    async componentDidMount() {
        this.setState({
            activityIndicator: true
          })
        console.log('mounting');
        await this.fetchFood();
        await this.fetchReviews();
        this.setState({
            activityIndicator: false
          })
    }

    render() {
        const { navigation } = this.props;

        var reviewCards = [];

        for(let i = 0; i < this.state.reviews.length ; i++){
            let review = this.state.reviews[i];
            let date = new Date(review.a_created_at)
            reviewCards.push(
                <View key={i}>
                    <TouchableOpacity
                        onPress={() => {
                            const pushAction = StackActions.push("ReviewInfo", { review: review });
                            navigation.dispatch(pushAction);
                            //navigation.navigate("ReviewInfo", { review: review });
                        }}  
                    >
                        <ReviewCard
                            name = {review.a_user.a_name}
                            date = {date.toLocaleString()}
                            rating = {review.a_score}
                            comment = {review.a_desc}                   
                        />
                    </TouchableOpacity>
                </View>
            )
        }

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
                <Text style={styles.logoText}>All reviews</Text>
                { reviewCards }
            </View>
            </ScrollView>
            </SafeAreaView>)
        );
    };
}

export default function Reviews(props) {
    return <ReviewsComponent {...props} />;
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

    loading:{
        flex: 1,
        marginTop:100,
      }
});
