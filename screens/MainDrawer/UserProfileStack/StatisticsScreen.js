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
  Picker,
} from "react-native";

// import {
//     LineChart,
//     BarChart,
//     PieChart,
//     ProgressChart,
//     ContributionGraph
//   } from 'react-native-chart-kit'

import { ScrollView } from "react-native-gesture-handler";
import { Card,Rating, Icon } from "react-native-elements";

import { BarChart, LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'


const screenWidth = Dimensions.get('window').width

const { width } = Dimensions.get("window");

class RestaurantStatisticsProfileComponent extends Component {
    constructor() {
        super();

        this.state = {
            lastIntervalChartData: [ 100, 150, 100, 200, 300, 500, 100 ],
            lastIntervalChartColor: '#FC987E',
            data:[
                {
                    value: 50,
                    label: 'One',
                },
                {
                    value: 10,
                    label: 'Two',
                },
                {
                    value: 40,
                    label: 'Three',
                },
                {
                    value: 95,
                    label: 'Four',
                },
                {
                    value: 85,
                    label: 'Five',
                },
            ],
            labels: ["One", "Two", "Three", "Four", "Five"],
            chosenInterval: "week",
            
            allHoursInDayData: [],
            chosenDate: "",

            contentInset: { top: 20, bottom: 20 },
        
        }

        // this.favourites = [{name :"fav1", img:"../../../assets/images/Po.jpg", rating: 5},
        //                     {name :"fav2", img:"../../../assets/images/Po.jpg", rating: 5},
        //                     {name :"fav3", img:"../../../assets/images/Po.jpg", rating: 4},
        //                     {name :"fav4", img:"../../../assets/images/Po.jpg", rating: 4},
        //                     {name :"fav5", img:"../../../assets/images/Po.jpg", rating: 4}];
                            
        // this.lessFavourites = [{name :"Lfav1", img:"../../../assets/images/Po.jpg", rating: 2},
        //                         {name :"Lfav2", img:"../../../assets/images/Po.jpg", rating: 2},
        //                         {name :"Lfav3", img:"../../../assets/images/Po.jpg", rating: 2},
        //                         {name :"Lfav4", img:"../../../assets/images/Po.jpg", rating: 1},
        //                         {name :"Lfav5", img:"../../../assets/images/Po.jpg", rating: 1}];
        // this.averageScore = 4;
        // this.goodReviews = 150;
        // this.neutralReviews = 50;
        // this.badReviews = 25;
    }

    async recalculateIntercalChartInfo(){

    }

    render() {
        const { navigation } = this.props;
        const { width } = Dimensions.get("window");

        var favoriteCards = [];
        var lessFavouriteCards = [];
        
        // for(let i = 0; i < this.favourites.length ; i++){
        //     favoriteCards.push(
        //         <View>
        //             <TouchableOpacity onPress={async () => {navigation.navigate("Food");
        //                   console.log("I want to navigate to Dish page");
        //                 }}>
        //             <Card
        //                 image={{uri: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg'}}
        //                 //image={this.favourites[i].img}
        //                 imageStyle={{
        //                     height: 100,
        //                     }}
        //             >
        //                 <View style={styles.cardFooter}>
        //                     <Text style={styles.foodName}>{this.favourites[i].name}</Text>
        //                 </View>
        //                 <Rating imageSize={20} readonly startingValue={this.favourites[i].rating} style={styles.rating} /> 
        //             </Card>
        //           </TouchableOpacity>
        //         </View>
        //     )                        
        // }

        // for(let i = 0; i < this.lessFavourites.length ; i++){
        //     lessFavouriteCards.push(
        //         <View>
        //             <TouchableOpacity onPress={async () => {navigation.navigate("Food");
        //                   console.log("I want to navigate to Dish page");
        //                 }}>
        //             <Card
        //                 image={{uri: 'https://www.knorr.com/content/dam/unilever/global/recipe_image/352/35279-default.jpg/_jcr_content/renditions/cq5dam.web.800.600.jpeg'}}
        //                 //image={this.lessFavourites[i].img}
        //                 imageStyle={{
        //                     height: 100,
        //                     }}
        //             >
        //                 <View style={styles.cardFooter}>
        //                     <Text style={styles.foodName}>{this.lessFavourites[i].name}</Text>
        //                 </View>
        //                 <Rating imageSize={20} readonly startingValue={this.lessFavourites[i].rating} style={styles.rating} /> 
        //             </Card>
        //           </TouchableOpacity>
        //         </View>
        //     )                        
        // }
        return (
            <SafeAreaView style={styles.backgroundContainer}>

                <ScrollView>

                    {/* --------------------------- LAST INTERVAL DATA CHART --------------------------- */}
                    {/* <Card 
                        alignItems='center'
                        title={"Views last " + this.state.chosenInterval}
                    >
                        <View style={{ height: 200, flexDirection: 'row' }}>
                            <BarChart 
                                style={{ 
                                    height: 200, 
                                    width: width - 100,
                                    flex: 1
                                }} 
                                data={this.state.lastIntervalChartData} 
                                svg={ { fill: this.state.lastIntervalChartColor }} 
                                contentInset={{ top: 30, bottom: 30 }}
                            >
                                <Grid />
                            </BarChart>

                            <YAxis
                                data={ this.state.lastIntervalChartData }
                                contentInset={{ top: 30, bottom: 30 }}
                                svg={{ fontSize: 10, fill: 'black' }}
                                numberOfTicks={10}
                            />

                            <XAxis
                                style={{ marginHorizontal: -10 }}
                                data={ this.state.lastIntervalChartXAxisData }
                                formatLabel={(value, index) => value}
                                contentInset={{ left: 30, right: 30 }}
                                svg={{ fontSize: 10, fill: 'black' }}
                            />

                            <View alignItems='center'>
                                <Picker
                                    selectedValue={this.state.chosenInterval}
                                    style={{height: 50, width: 200}}
                                    onValueChange={async(itemValue, itemIndex) =>{
                                        await this.setState({chosenInterval: itemValue});
                                        await this.recalculateIntercalChartInfo();
                                }}>
                                    <Picker.Item label="Last Week" value="week" />
                                    <Picker.Item label="Last Month" value="month" />
                                    <Picker.Item label="Last Year" value="year" />
                                </Picker>
                            </View>
                        </View>
                    </Card> */}
                    {/* -------------------------------------------------------------------------------- */}


                    {/* --------------------------- LAST INTERVAL DATA CHART --------------------------- */}
                    <Card title={"Views last " + this.state.chosenInterval}>
                        <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
                            <YAxis
                                data={this.state.data}
                                yAccessor={({ index }) => index}
                                contentInset={{ top: 10, bottom: 10 }}
                                spacing={0.2}
                                formatLabel={(_, index) => this.state.labels[index]}
                            />
                            <BarChart
                                style={{ flex: 1, marginLeft: 8 }}
                                data={this.state.data}
                                xAccessor={({ item }) => item.value}
                                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                                contentInset={{ top: 10, bottom: 10 }}
                                spacing={0.2}
                                gridMin={0}
                            >
                                <Grid/>
                            </BarChart>
                        </View>

                        <Picker
                            selectedValue={this.state.chosenInterval}
                            style={{height: 50, width: 200}}
                            onValueChange={async(itemValue, itemIndex) =>{
                                await this.setState({chosenInterval: itemValue});
                                await this.recalculateIntercalChartInfo();
                        }}>
                            <Picker.Item label="Last Week" value="week" />
                            <Picker.Item label="Last Month" value="month" />
                            <Picker.Item label="Last Year" value="year" />
                        </Picker>
                    </Card>
                    {/* -------------------------------------------------------------------------------- */}


                    {/* <View style={styles.mainPage}>
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
                        <BarChart
                                width={screenWidth}
                                height={220}
                                verticalLabelRotation={30}
                                data={{
                                    labels: ["Bad", "Neutral", "Good"],
                                    datasets: [
                                        {
                                        data: [70, 85, 120]
                                        }
                                    ]
                                }}
                                chartConfig={{
                                    backgroundColor: "#FC987E",
                                    backgroundGradientFrom: "white",
                                    backgroundGradientTo: "#white",
                                    color: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`,
                                    labelColor: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`,
                                    decimalPlaces: 0, // optional, defaults to 2dp
                                    color: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    }
                                }}
                                verticalLabelRotation={0}
                                
                            />
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
                            onPress={async () => { navigation.navigate("Premium") }}
                        >
                            <Text style={styles.buttonText}>UPGRADE TO A BETTER PLAN</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.subtitleText}>
                            Reviews by date
                        </Text>
                        <LineChart
                            data={{
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
                            datasets: [{
                                data: [20, 10, 50, 25, 63, 90, 11, 70, 56, 40, 80, 100]
                            }]
                            }}
                            width={Dimensions.get('window').width} // from react-native
                            height={220}
                            chartConfig={{
                                backgroundColor: "#FC987E",
                                backgroundGradientFrom: "white",
                                backgroundGradientTo: "#white",
                                color: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`,
                                labelColor: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`,
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                }
                            }}
                            bezier={true}
                            style={{
                            marginVertical: 8,
                            borderRadius: 16
                            }}
                        />
                    </View>

                    <View>
                    <Text style={styles.subtitleText}>
                            Good Reviews by date
                        </Text>
                    <BarChart
                                width={screenWidth}
                                height={220}
                                verticalLabelRotation={30}
                                data={{
                                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
                                    datasets: [{
                                        data: [20, 10, 50, 25, 63, 90, 11, 70, 56, 40, 80, 100]
                                    }]
                                    }}
                                chartConfig={{
                                    backgroundColor: "#FC987E",
                                    backgroundGradientFrom: "white",
                                    backgroundGradientTo: "#white",
                                    color: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`,
                                    labelColor: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`,
                                    decimalPlaces: 0, // optional, defaults to 2dp
                                    color: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    }
                                }}
                                verticalLabelRotation={30}
                                
                            />
                    </View>

                    <View>
                    <Text style={styles.subtitleText}>
                            Average user age
                        </Text>
                        <LineChart
                            data={{
                            labels: ['0','10', '20', '30', '40', '50', '60', '70', '80', '90'],
                            datasets: [{
                                data: [20, 10, 50, 25, 63, 90, 11, 70, 56, 40]
                            }]
                            }}
                            width={Dimensions.get('window').width} // from react-native
                            height={220}
                            chartConfig={{
                                backgroundColor: "#FC987E",
                                backgroundGradientFrom: "white",
                                backgroundGradientTo: "#white",
                                color: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`,
                                labelColor: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`,
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                }
                            }}
                            bezier={true}
                            style={{
                            marginVertical: 8,
                            borderRadius: 16
                            }}
                        />
                    </View> */}
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
    
    buttonTitle:{
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 26,
        //paddingLeft: 3,
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
