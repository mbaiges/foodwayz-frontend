import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Text as Text2,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Picker,
  ActivityIndicator,
} from "react-native";

import { Snackbar } from 'react-native-paper';

import DateTimePicker from '@react-native-community/datetimepicker';
import {Text} from 'react-native-svg'

import { StackActions } from '@react-navigation/native';

import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Card,Rating, Icon } from "react-native-elements";

import { BarChart, LineChart, YAxis, XAxis, Grid, PieChart } from 'react-native-svg-charts'
import { FoodApi, StatisticsApi, RestaurantApi } from '../../../api';

const screenWidth = Dimensions.get('window').width

const { width } = Dimensions.get("window");

const weekDayLabelsInfo = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const yearMonthLabelsInfo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

class RestaurantStatisticsProfileComponent extends Component {
    constructor() {
        super();

        this.state = {
            rest: {},
            //First Graph
            weekDayValueData:[],
            weekDayLabels: [],

            monthDayValueData:[],
            monthDayLabels:[],

            yearMonthValueData:[],
            yearMonthLabels: [],

            firstChartData: [],
            firstChartLabels: [],

            chosenInterval: "week",  

            //Second Graph
            secondChartData: [],
            secondChartLabel: [],
            showDatePicker: false,
            date: new Date(),

            //Favourite Foods
            bestFoodSet: [],
            worstFoodSet: [],
            bestFoods: [],
            worstFoods: [],
            chosenFoodDisplay: "presentation",
            
            //User Data 
            userData: {},
            
            chosenPieChart: "Views per gender",

            viewsPerGenderPieData: [],
            viewsPerAgeGroupPieData: [],
            viewsPerCharPieData: [],
            reviewsPerGenderPieData: [],
            reviewsPerAgeGroupPieData: [],
            reviewsPerCharPieData: [],

            pieChartData: [],

            //score Data
            genderScoreData: [],
            genderScoreLabels: [],

            ageScoreDate: [],
            ageScoreLabels: [],
            
            charScoreData: [],
            charScoreLabels: [],

            scoreChosenData: [],
            scoreChosenLabels: [],

            chosenDataType: "gender",
            
            //rest foods
            allResturantFoods: []
            
        }
      
    }

    updatePremiumLevel = (premiumLevel) => {
        const { route } = this.props;
        const { updateRestaurantPremium } = route.params;

        updateRestaurantPremium(premiumLevel);
        this.recalculateAll();
    }

    // --------------------------------- RECALCULCULATE -----------------------------------------------

    dismissConnectionSnackBar = () => {
        this.setState({
          snackbarConnectionVisible: false
        });
      }

    async recalculateIntervalChartInfo(){

        switch( this.state.chosenInterval ){
            case "week":
                this.setState({
                    firstChartData: this.state.weekDayValueData,
                    firstChartLabels: this.state.weekDayLabels
                });
            break;
            case "month":
                this.setState({
                    firstChartData: this.state.monthDayValueData,
                    firstChartLabels: this.state.monthDayLabels,
                });
            break;
            case "year":
                this.setState({
                    firstChartData: this.state.yearMonthValueData,
                    firstChartLabels: this.state.yearMonthLabels
                });
            break;
        }

    }

    async recalculatePieChartData(){

        switch( this.state.chosenPieChart ){
            case "Views per gender":
                this.setState({
                    pieChartData: this.state.viewsPerGenderPieData,
                });
            break;
            case "Views per age group":
                this.setState({
                    pieChartData: this.state.viewsPerAgeGroupPieData,
                });
            break;
            case "Views per characteristic":
                this.setState({
                    pieChartData: this.state.viewsPerCharPieData,
                });
            break;
            case "Reviews per gender":
                this.setState({
                    pieChartData: this.state.reviewsPerGenderPieData,
                });
            break;
            case "Reviews per age group":
                this.setState({
                    pieChartData: this.state.reviewsPerAgeGroupPieData,
                });
            break;
            case "Reviews per characteristic":
                this.setState({
                    pieChartData: this.state.reviewsPerCharPieData,
                });
            break;
        }

    }

    async recalculateScoreData(){

        switch( this.state.chosenDataType ){
            case "gender":
                this.setState({
                    scoreChosenData: this.state.genderScoreData,
                    scoreChosenLabels: this.state.genderScoreLabels
                });
            break;
            case "age":
                this.setState({
                    scoreChosenData: this.state.ageScoreDate,
                    scoreChosenLabels: this.state.ageScoreLabels
                });
            break;
            case "characteristics":
                this.setState({
                    scoreChosenData: this.state.charScoreData,
                    scoreChosenLabels: this.state.charScoreLabels
                });
            break;
        }

    }

    async recalculateFoodDisplay(){

        let bestSelected = this.state.bestFoodSet;
        let worstSelected = this.state.worstFoodSet;

        switch( this.state.chosenFoodDisplay ){
            case "quality":
                this.setState({
                    bestFoods: bestSelected.a_food_quality_score,
                    worstFoods: worstSelected.a_food_quality_score
                });
            break;
            case "presentation":
                this.setState({
                    bestFoods: bestSelected.a_presentation_score,
                    worstFoods: worstSelected.a_presentation_score
                });
            break;
            case "price":
                this.setState({
                    bestFoods: bestSelected.a_price_quality_score,
                    worstFoods: worstSelected.a_price_quality_score
                });
            break;
        }

    }

    async recalculateAll(){
        await this.recalculateFoodDisplay();
        await this.recalculateIntervalChartInfo();
        await this.recalculatePieChartData();
        await this.recalculateScoreData();
    }

    // --------------------------------- DATE CHANGED -----------------------------------------------

    async handleDateChanged(timeStamp){
        var newDate = timeStamp ? new Date(timeStamp) : new Date();
        this.setState({
            chosenDate: newDate.toString(),
            date: newDate,
            showDatePicker: false}
        );
        await this.fetchSecondGraphData(newDate);
    }

    // --------------------------------- FETCH DATA -----------------------------------------------

    async fetchfoodData(){
        try {
            const resp = await StatisticsApi.getBestWorstFoods(this.state.rest.a_rest_id, 5);
            switch(resp.status) {
              case 200:
                let foodInfo = resp.response.result;
                this.setState({
                    bestFoodSet: foodInfo.a_best,
                    worstFoodSet: foodInfo.a_worst
                });
        
                this.recalculateFoodDisplay();
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

    async fetchFirstGraphData(){

        if(this.state.rest.a_premium_level < 1){
            return;
        }

        const today = new Date();
        const lastWeek = new Date();
        const lastMonth = new Date();
        const lastYear = new Date();
        lastWeek.setDate(today.getDate() - 7);
        lastMonth.setDate(today.getDate() - 31);
        lastYear.setDate(today.getDate() - 365);
        const weekResp = await StatisticsApi.getRestaurantViewsByDay(this.state.rest.a_rest_id, lastWeek, today);
        const monthResp = await StatisticsApi.getRestaurantViewsByDay(this.state.rest.a_rest_id, lastMonth, today)
        const yearResp = await StatisticsApi.getRestaurantViewsByDay(this.state.rest.a_rest_id, lastYear, today)

        console.log("-------------------------")
        console.log(weekResp);
        console.log(monthResp);
        console.log(yearResp);
        console.log("-------------------------")

        let auxWeekDayValueData = new Array(7).fill(0);
        let auxMonthDayValueData = new Array(31).fill(0);
        let auxYearMonthValueData = new Array(365).fill(0);

        const todayDow = today.getDay();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        
        let dow;
        let day;
        let month;
        let aux;
        let num;

        let dowIndex = todayDow + 1;
        let monthIndex = todayMonth + 1; 
        
        let auxWeekDayObjects = []

        for (let i = 0; i < 7; i++) {
            if(dowIndex == 7){
                dowIndex = 0;
            }
            auxWeekDayObjects.push({
                dow: dowIndex++,
                value: 0
            });
        }

        weekResp.response.result.forEach( (obj) => {
            dow = new Date(obj.a_time).getDay();
            aux = (dow - (todayDow + 1));
            num = aux < 0 ? aux + 7 : aux;
            auxWeekDayObjects[num].value += obj.a_amount;
        });

        console.log("AUX WEEK DAY");
        console.log(auxWeekDayObjects);

        let auxMonthDayData = new Array(31).fill(0);

        monthResp.response.result.forEach( (obj) => {
            day = new Date(obj.a_time).getDate();
            aux = (day - (todayDate + 1));
            num = aux < 0 ? aux + 31 : aux;
            auxMonthDayData[num] += obj.a_amount;
        });

        let auxYearMonthObjects = [];

        for (let i = 0; i < 12; i++) {
            if(monthIndex == 12){
                monthIndex = 0;
            }
            auxYearMonthObjects.push({
                month: monthIndex++,
                value: 0
            });
        }

        yearResp.response.result.forEach( (obj) => {
            month = new Date(obj.a_time).getMonth();
            aux = (month - (todayMonth + 1));
            num = aux < 0 ? aux + 12 : aux;
            auxYearMonthObjects[num].value += obj.a_amount;
        });

        console.log("AUX YEAR MONTH");
        console.log(auxYearMonthObjects);

        await this.setState({
            weekDayValueData: auxWeekDayObjects.map(o => o.value),
            weekDayLabels: auxWeekDayObjects.map(o => weekDayLabelsInfo[o.dow]),
    
            monthDayValueData: auxMonthDayData,
            monthDayLabels: [],
                
            yearMonthValueData: auxYearMonthObjects.map(o => o.value),
            yearMonthLabels:auxYearMonthObjects.map(o => yearMonthLabelsInfo[o.month])
        });

        await this.recalculateIntervalChartInfo();
    }

    async fetchSecondGraphData(date){

        if(this.state.rest.a_premium_level < 1){
            return;
        }

        const isoDate = date.toISOString();
        const resp = await StatisticsApi.getRestaurantViewsByHour(this.state.rest.a_rest_id, isoDate)
        
        await this.setState({
            //secondChartData:[2,0,10,0,0,4,25,3,0,0,0,0,3,2,6,2,5,7,4,2,10,25,30,7],
            secondChartData: resp.response.result,
            secondChartLabels: ["00hs", "06hs", "12hs", "18hs", "24hs"],
        });

    }

    async fetchUserChartData(){

        if(this.state.rest.a_premium_level < 2){
            console.log("asd");
            return;
        }
        
        const resp = await StatisticsApi.getRestaurantUserStatistics(this.state.rest.a_rest_id)

        let userData = resp.response.result;

        // let userData = {
        //     a_views_info: {
        //         a_gender: {
        //             male: 10,
        //             female: 4,
        //             other: 25
        //         },
        //         a_age: {
        //             22: 45,
        //             23: 17,
        //             88: 2
        //         },
        //         a_characteristic: {
        //             vegan: 12,
        //             diabetic: 10
        //         }
        //     },
        //     a_reviews_info: {
        //         a_gender: {
        //             male: {
        //                 a_score: 4.8,
        //                 a_amount: 10
        //             },
        //             female: {
        //                 a_score: 3.2,
        //                 a_amount: 4
        //             },
        //             other: {
        //                 a_score: 1.5,
        //                 a_amount: 25
        //             }
        //         },
        //         a_age: {
        //             22: {
        //                 a_score: 3.3,
        //                 a_amount: 45
        //             },
        //             23: {
        //                 a_score: 2.4,
        //                 a_amount: 17
        //             },
        //             88: {
        //                 a_score: 1.8,
        //                 a_amount: 2
        //             },
        //         },
        //         a_characteristic: {
        //             vegan: {
        //                 a_score: 2.3,
        //                 a_amount: 12
        //             },
        //             diabetic: {
        //                 a_score: 4.1,
        //                 a_amount: 10
        //             }
        //         }
        //     }
        // };

        //------------------------------------ VIEWS INFO -------------------------------------------
        
        let auxViewsPerGenderPieData = [];
        Object.entries(userData.a_views_info.a_gender).forEach( (element,idx) => {
            auxViewsPerGenderPieData.push({
                key: idx,
                amount: element[1],
                svg: { fill: "#FC987E" },
                tag: element[0]
            })
        })

        let auxViewsPerAgeGroupPieData = [];
        Object.entries(userData.a_views_info.a_age).forEach( (element,idx) => {
            auxViewsPerAgeGroupPieData.push({
                key: idx,
                amount: element[1],
                svg: { fill: "#FC987E" },
                tag: element[0]
            })
        })

        let auxViewsPerCharPieData = [];
        Object.entries(userData.a_views_info.a_characteristic).forEach( (element,idx) => {
            auxViewsPerCharPieData.push({
                key: idx,
                amount: element[1],
                svg: { fill: "#FC987E" },
                tag: element[0]
            })
        })

        this.setState({
            viewsPerGenderPieData: auxViewsPerGenderPieData,
            viewsPerAgeGroupPieData: auxViewsPerAgeGroupPieData,
            viewsPerCharPieData: auxViewsPerCharPieData,  
        });

        //------------------------------------ REVIEWS INFO -------------------------------------------
        
        let auxReviewsPerGenderPieData = [];
        let auxGenderScoreData = [];
        let auxGenderScoreLabels = [];
        Object.entries(userData.a_reviews_info.a_gender).forEach( (element,idx) => {
            auxReviewsPerGenderPieData.push({
                key: idx,
                amount: element[1].a_amount,
                svg: { fill: "#FC987E" },
                tag: element[0]
            });
            auxGenderScoreData.push( element[1].a_score );
            auxGenderScoreLabels.push( element[0] );
        })

        let auxReviewsPerAgeGroupPieData = [];
        let auxAgeScoreDate = [];
        let auxAgeScoreLabels = [];
        Object.entries(userData.a_reviews_info.a_age).forEach( (element,idx) => {
            auxReviewsPerAgeGroupPieData.push({
                key: idx,
                amount: element[1].a_amount,
                svg: { fill: "#FC987E" },
                tag: element[0]
            })
            auxAgeScoreDate.push( element[1].a_score );
            auxAgeScoreLabels.push( element[0] );
        })

        let auxReviewsPerCharPieData = [];
        let auxCharScoreData = [];
        let auxCharScoreLabels = [];
        Object.entries(userData.a_reviews_info.a_characteristic).forEach( (element,idx) => {
            auxReviewsPerCharPieData.push({
                key: idx,
                amount: element[1].a_amount,
                svg: { fill: "#FC987E" },
                tag: element[0]
            })
            auxCharScoreData.push( element[1].a_score );
            auxCharScoreLabels.push( element[0] );
        })

        this.setState({
            reviewsPerGenderPieData: auxReviewsPerGenderPieData,
            reviewsPerAgeGroupPieData: auxReviewsPerAgeGroupPieData,
            reviewsPerCharPieData: auxReviewsPerCharPieData,  
            genderScoreData: auxGenderScoreData,
            genderScoreLabels: auxGenderScoreLabels,
            ageScoreDate: auxAgeScoreDate,
            ageScoreLabels: auxAgeScoreLabels,
            charScoreData: auxCharScoreData,
            charScoreLabels: auxCharScoreLabels
        });


        //------------------------------------ SCORE INFO -------------------------------------------

        this.recalculatePieChartData();
        this.recalculateScoreData();
    }

    async fetchRestaurantFoods(){

        const resp = await RestaurantApi.getFoods(this.state.rest.a_rest_id);

        if( resp.status == 200 ){
            this.setState({ allResturantFoods: resp.response.result });
        }else{
            console.log("error");
        }

    }

    async fetchRestaurant(){
        const { route } = this.props;
        const { rest } = route.params;

        this.setState({ rest: rest });
    }

    // --------------------------------- MOUNT ----------------------------------------------------
    async componentDidMount() {
        this.setState({
          activityIndicator: true
        })
    
        console.log('mounting');
        
        await this.fetchRestaurant();
        await this.fetchfoodData();
        await this.fetchFirstGraphData();
        await this.fetchSecondGraphData(this.state.date);
        await this.fetchUserChartData();
        await this.fetchRestaurantFoods();
    
        this.setState({
          activityIndicator: false
        })
    
    }

    render() {
        const { navigation } = this.props;
        const { width } = Dimensions.get("window");

        var favoriteCards = [];
        var lessFavouriteCards = [];

        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30;
       
        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.tag}
                    </Text>
                )
            })
        }

        return (
            (this.state.activityIndicator) ?
            (<SafeAreaView>
                <View style={styles.loading}>
                <ActivityIndicator size="large" color="#000000" />
                </View>
            </SafeAreaView>)
            :
            (
            <SafeAreaView style={styles.backgroundContainer}>

                <ScrollView>

                    <Card title='Best and worst rated foods'>
                        <View>
                            <Text2 style={styles.subtitleText}>Best rated</Text2>
                        </View>
                        <View>   
                            <ScrollView horizontal= {true}
                            showsHorizontalScrollIndicator={false}>        
                                {this.state.bestFoods.map((food, idx) =>{
                                    return(
                                        <View key={idx}>
                                            <TouchableOpacity onPress={async () => {
                                                const pushAction = StackActions.push("Food", { food: food});
                                                navigation.dispatch(pushAction);
                                                //navigation.navigate("Food", { food: food});
                                                console.log("I want to navigate to Dish page");
                                                }}>
                                                <Card
                                                    image={{uri: food.a_image_url}}
                                                    //image={this.favourites[i].img}
                                                    imageStyle={{
                                                        height: 100,
                                                    }}
                                                >
                                                    <View style={styles.cardFooter}>
                                                        <Text2 style={styles.foodName}>{food.a_title}</Text2>
                                                    </View>
                                                    <Rating imageSize={20} readonly startingValue={food.a_score} style={styles.rating} /> 
                                                </Card>
                                            </TouchableOpacity>
                                        </View>    
                                    );   
                                })}
                            </ScrollView> 
                        </View>
                        <View>
                            <Text2 style={styles.subtitleText}>Worst rated</Text2>
                        </View>
                        <View>
                        
                            <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                                {this.state.worstFoods.map((food, idx) =>{
                                    return(
                                        <View key={idx}>
                                            <TouchableOpacity onPress={async () => {
                                                const pushAction = StackActions.push("Food", { food: food});
                                                navigation.dispatch(pushAction);
                                                //navigation.navigate("Food", { food: food});
                                                console.log("I want to navigate to Dish page");
                                                }}>
                                                <Card
                                                    image={{uri: food.a_image_url}}
                                                    //image={this.favourites[i].img}
                                                    imageStyle={{
                                                        height: 100,
                                                        }}
                                                >
                                                    <View style={styles.cardFooter}>
                                                        <Text2 style={styles.foodName}>{food.a_title}</Text2>
                                                    </View>
                                                    <Rating imageSize={20} readonly startingValue={food.a_score} style={styles.rating} /> 
                                                </Card>
                                            </TouchableOpacity>
                                        </View>    
                                    );   
                                })}
                            </ScrollView>
                        </View>    
                        <View alignItems = 'center'>
                            <Picker
                                selectedValue={this.state.chosenFoodDisplay}
                                style={{height: 50, width: 200}}
                                onValueChange={async(itemValue, itemIndex) =>{
                                    await this.setState({chosenFoodDisplay: itemValue});
                                    await this.recalculateFoodDisplay();
                            }}>
                                <Picker.Item label="Quality" value="quality" />
                                <Picker.Item label="Presentation" value="presentation" />
                                <Picker.Item label="Price" value="price" />
                            </Picker>
                        </View>          

                    </Card>



                    {/* --------------------------- LAST INTERVAL DATA CHART --------------------------- */}
                    {
                        (this.state.rest.a_premium_level >= 1) ? 
                        (
                            <Card title={"Views last " + this.state.chosenInterval}>
                                <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
        
                                <YAxis
                                        data={this.state.firstChartData}
                                        style={{ marginBottom: xAxisHeight }}
                                        contentInset={verticalContentInset}
                                        svg={axesSvg}
                                    />
                                    <View style={{ flex: 1, marginLeft: 8 }}>
                                        <BarChart
                                            style={{ flex: 1, marginLeft: 8 }}
                                            data={this.state.firstChartData}
                                            xAccessor={({ item }) => item.value}
                                            svg={{ fill: "#FC987E" }}
                                            contentInset={{ top: 10, bottom: 10 }}
                                            spacing={0.2}
                                            gridMin={0}
                                        >
                                            <Grid/>
                                        </BarChart>    
                                        <XAxis
                                            style={{ marginLeft: 10, height: xAxisHeight, width: 300}}
                                            data={this.state.firstChartData}
                                            formatLabel={(value, index) => this.state.firstChartLabels[index] }
                                            contentInset={{ left: 10, right: 10 }}
                                            svg={axesSvg}
                                        />
                                    </View>
                                </View>
                                <View alignItems = 'center'>
                                    <Picker
                                        selectedValue={this.state.chosenInterval}
                                        style={{height: 50, width: 200}}
                                        onValueChange={async(itemValue, itemIndex) =>{
                                            await this.setState({chosenInterval: itemValue});
                                            await this.recalculateIntervalChartInfo();
                                    }}>
                                        <Picker.Item label="Last Week" value="week" />
                                        <Picker.Item label="Last Month" value="month" />
                                        <Picker.Item label="Last Year" value="year" />
                                    </Picker>
                                </View>
                            </Card>
                        )
                        : (<View></View>)
                    }

                    {/* -------------------------------------------------------------------------------- */}
                    
                    {/* --------------------------- CHOSEN DATE DATA CHART --------------------------- */}
                    {
                        (this.state.rest.a_premium_level >= 1) ? 
                        (
                            <Card title={"Views on " + this.state.date.getDate() +"/"+ (this.state.date.getMonth() + 1) +"/"+ this.state.date.getFullYear() }>
                                <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
        
                                <YAxis
                                        data={this.state.secondChartData}
                                        style={{ marginBottom: xAxisHeight }}
                                        contentInset={verticalContentInset}
                                        //formatLabel={(value, index) => index%2 == 0 ? index : "" }
                                        svg={axesSvg}
                                        numberOfTicks={10}
                                    />
                                    <View style={{ flex: 1, marginLeft: 8 }}>
                                        <BarChart
                                            style={{ flex: 1, marginLeft: 8 }}
                                            data={this.state.secondChartData}
                                            xAccessor={({ item }) => item.value}
                                            svg={{ fill: "#FC987E" }}
                                            contentInset={{ top: 10, bottom: 10 }}
                                            spacing={0.2}
                                            gridMin={0}
                                        >
                                            <Grid/>
                                        </BarChart>    
                                        <XAxis
                                            style={{ marginLeft: 10, height: xAxisHeight, width: 300}}
                                            data={this.state.secondChartData}
                                            formatLabel={(value, index) => index%6 == 0 ? this.state.secondChartLabels[index/6] : "" }
                                            contentInset={{ left: 10, right: 10 }}
                                            svg={axesSvg}
                                        />
                                    </View>
                                </View>
                                <View alignItems = 'center'>
                                    <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                                        <Text style={styles.secondaryText}>CHANGE DATE</Text>
                                        <Icon name='calendar-check-outline' type='material-community'/>
                                    </TouchableOpacity>
                                    {this.state.showDatePicker && (
                                        <DateTimePicker
                                            value={ this.state.date }
                                            mode='default'
                                            display='default'
                                            onChange={ date => { this.handleDateChanged(date.nativeEvent.timestamp)}}
                                        />
                                    )}
                                </View>
                            </Card>
                        )
                        : (<View></View>)
                    }
                    {/* -------------------------------------------------------------------------------- */}

                    {
                        (this.state.rest.a_premium_level < 3) ? 
                        (
                            <View style={ styles.center } >
                                <Text2 style={styles.subtitleText}>Want more stats?</Text2>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => { 
                                            const pushAction = StackActions.push("Premium", {restaurant: this.state.rest, updateRestaurantPremium: this.updatePremiumLevel.bind(this)});
                                            navigation.dispatch(pushAction);
                                            //navigation.navigate("Premium", {restaurant: this.state.restaurant}) 
                                        }}
                                    >
                                        <Text2 style={styles.buttonText}>Premium</Text2>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                        : (<View></View>)
                    }
                
                    {/* --------------------------- USER PIE CHARTS --------------------------- */}
                    {
                        (this.state.rest.a_premium_level >= 2) ? 
                        (
                            <Card title={this.state.chosenPieChart}>
                                <PieChart
                                    style={{ height: 200 }}
                                    valueAccessor={({ item }) => item.amount}
                                    data={this.state.pieChartData}
                                    spacing={0}
                                    outerRadius={'95%'}
                                >
                                    <Labels/>
                                </PieChart>

                                <View alignItems = 'center'>
                                    <Picker
                                        selectedValue={this.state.chosenPieChart}
                                        style={{height: 50, width: 200}}
                                        onValueChange={async(itemValue, itemIndex) =>{
                                            await this.setState({chosenPieChart: itemValue});
                                            await this.recalculatePieChartData();
                                    }}>
                                        <Picker.Item label="Views per gender" value="Views per gender" />
                                        <Picker.Item label="Views per age group" value="Views per age group" />
                                        <Picker.Item label="Views per characteristic" value="Views per characteristic" />
                                        <Picker.Item label="Reviews per gender" value="Reviews per gender" />
                                        <Picker.Item label="Reviews per age group" value="Reviews per age group" />
                                        <Picker.Item label="Reviews per characteristic" value="Reviews per characteristic" />
                                    </Picker>
                                </View>
                            </Card>
                        )
                        : (<View></View>)
                    }
                    
                    
                    {/* -------------------------------------------------------------------------------- */}


                    {/* --------------------------- SCORES --------------------------- */}
                    {
                        (this.state.rest.a_premium_level >= 2) ? 
                        (
                            <Card title={"Average score by " + this.state.chosenDataType}>
                                <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
        
                                <YAxis
                                        data={this.state.scoreChosenData}
                                        style={{ marginBottom: xAxisHeight }}
                                        contentInset={verticalContentInset}
                                        svg={axesSvg}
                                    />
                                    <View style={{ flex: 1, marginLeft: 8 }}>
                                        <BarChart
                                            style={{ flex: 1, marginLeft: 8 }}
                                            data={this.state.scoreChosenData}
                                            xAccessor={({ item }) => item.value}
                                            svg={{ fill: "#FC987E" }}
                                            contentInset={{ top: 10, bottom: 10 }}
                                            spacing={0.2}
                                            gridMin={0}
                                        >
                                            <Grid/>
                                        </BarChart>    
                                        <XAxis
                                            style={{ marginLeft: 10, height: xAxisHeight, width: 300}}
                                            data={this.state.scoreChosenData}
                                            formatLabel={(value, index) => this.state.scoreChosenLabels[index] }
                                            contentInset={{ left: 10, right: 10 }}
                                            svg={axesSvg}
                                        />
                                    </View>
                                </View>
                                <View alignItems = 'center'>
                                    <Picker
                                        selectedValue={this.state.chosenDataType}
                                        style={{height: 50, width: 200}}
                                        onValueChange={async(itemValue, itemIndex) =>{
                                            await this.setState({chosenDataType: itemValue});
                                            await this.recalculateScoreData();
                                    }}>
                                        <Picker.Item label="Gender" value="gender"/>
                                        <Picker.Item label="Age" value="age"/>
                                        <Picker.Item label="Characteristic" value="characteristics"/>
                                    </Picker>
                                </View>
                            </Card>
                        )
                        : (<View></View>)
                    }

                    {/* -------------------------------------------------------------------------------- */}
                         

                    {/* --------------------------------ALL FOODS -------------------------------------- */}
                    {
                        (this.state.rest.a_premium_level >= 1) ? 
                        (
                            <View>
                                <View>
                                    <Text2 style={styles.subtitleText}>Food Specific Statistics</Text2>
                                </View>
                                <View>   
                                    <ScrollView
                                    showsHorizontalScrollIndicator={false}>        
                                        {this.state.allResturantFoods.map((food, idx) =>{
                                            return(
                                                // <View key={idx}>
                                                //     <TouchableOpacity onPress={async () => {navigation.navigate("FoodSpecificStatistics", { food: food});
                                                //         console.log("I want to navigate to Dish page");
                                                //         }}>
                                                //         <Card
                                                //             image={{uri: food.a_image_url}}
                                                //             //image={this.favourites[i].img}
                                                //             imageStyle={{
                                                //                 height: 100,
                                                //             }}
                                                //         >
                                                //             <View style={styles.cardFooter}>
                                                //                 <Text2 style={styles.foodName}>{food.a_title}</Text2>
                                                //             </View>
                                                //             <Rating imageSize={20} readonly startingValue={food.a_score} style={styles.rating} /> 
                                                //         </Card>
                                                //     </TouchableOpacity>
                                                // </View>    

                                                <ListItem
                                                    onPress={async () => {
                                                        const pushAction = StackActions.push("FoodSpecificStatistics", { food: food, rest: this.state.rest});
                                                        navigation.dispatch(pushAction);
                                                        //navigation.navigate("FoodSpecificStatistics", { food: food, rest: this.state.rest});
                                                    }}
                                                    key={food.a_food_id}
                                                    leftAvatar={{ source: { uri: food.a_image_url } }}
                                                    title={food.a_title}
                                                    subtitle={
                                                        <View>  
                                                            <Text2>{food.a_description}</Text2>
                                                            <Rating imageSize={10} readonly startingValue={food.a_score}  style={styles.rating}/> 
                                                        </View>
                                                    }
                                                    bottomDivider={true}
                                                    topDivider={true}
                                                />

                                            );   
                                        })}
                                    </ScrollView> 
                                </View>
                            </View>
                        )
                        : (<View></View>)
                    }
                    <Snackbar
                        style={styles.snackBar}
                        duration={4000}
                        visible={this.state.snackbarConnectionVisible}
                        onDismiss={this.dismissConnectionSnackBar}
                    >
                        <Text style={styles.textSnack}>No internet connection.</Text>
                    </Snackbar>
                    {/* -------------------------------------------------------------------------------- */}
                </ScrollView>
            </SafeAreaView>
            )
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
    rating: {
        alignSelf: "flex-start",
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

    center: {
        alignItems: "center",
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
        elevation: 10,
        borderRadius: 25,
        backgroundColor: "#FC987E",
        color: "black",
        width: 217,
        alignItems: "center",
        padding: 13,
        height: 48,
      },
    
      cancelButton: {
        elevation: 10,
        borderRadius: 5,
        backgroundColor: "white",
        color: "black",
        width: 100,
        alignItems: "center",
        padding: 13,
        height: 48,
      },
    
      deleteButton: {
        elevation: 10,
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

    
    buttonText:{
        color: "#FFFFFF",
    },

    reviewContainer: {
        flex: 2,
    },
    favouritesContainer:{
        flex: 2,
        paddingTop: 5,
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
