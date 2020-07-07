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

import DateTimePicker from '@react-native-community/datetimepicker';
import {Text} from 'react-native-svg'
// import {
//     LineChart,
//     BarChart,
//     PieChart,
//     ProgressChart,
//     ContributionGraph
//   } from 'react-native-chart-kit'

import { ScrollView } from "react-native-gesture-handler";
import { Card,Rating, Icon, ThemeConsumer } from "react-native-elements";

import { BarChart, LineChart, YAxis, XAxis, Grid, PieChart } from 'react-native-svg-charts'
import { FoodApi, StatisticsApi } from '../../../api';

const screenWidth = Dimensions.get('window').width

const { width } = Dimensions.get("window");


const weekDayLabelsInfo = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const yearMonthLabelsInfo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


class FoodSpecificStatisticsComponent extends Component {
    constructor() {
        super();

        this.state = {

            food: {},
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
            
        }
      
    }

    // --------------------------------- RECALCULCULATE -----------------------------------------------

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

    
    async fetchFirstGraphData(){

        if(this.state.rest.a_premium_level < 1){
            console.log("asd");
            return;
        }

        const today = new Date();
        const lastWeek = new Date();
        const lastMonth = new Date();
        const lastYear = new Date();
        lastWeek.setDate(today.getDate() - 7);
        lastMonth.setDate(today.getDate() - 31);
        lastYear.setDate(today.getDate() - 365);
        const weekResp = await StatisticsApi.getFoodViewsByDay(this.state.food.a_food_id, lastWeek, today);
        const monthResp = await StatisticsApi.getFoodViewsByDay(this.state.food.a_food_id, lastMonth, today)
        const yearResp = await StatisticsApi.getFoodViewsByDay(this.state.food.a_food_id, lastYear, today)

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
            console.log("asd");
            return;
        }

        const isoDate = date.toISOString();

        // llanada a la api
        const resp = await StatisticsApi.getFoodViewsByHour(this.state.food.a_food_id, isoDate)
        
        await this.setState({
            //secondChartData:[2,0,10,0,0,4,25,3,0,0,0,0,3,2,6,2,5,7,4,2,10,25,30,7],
            secondChartData: resp.response.result,
            secondChartLabels: ["00hs", "06hs", "12hs", "18hs", "24hs"],
        });

    }

    async fetchUserChartData(){
        //llamada a la api

        if(this.state.rest.a_premium_level < 3){
            console.log("asd");
            return;
        }

        const resp = await StatisticsApi.getFoodUserStatistics(this.state.food.a_food_id)

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
        Object.entries(userData.a_reviews_info.a_characteristic).forEach((element,idx) => {
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

    // --------------------------------- MOUNT ----------------------------------------------------
    async fetchFood() {
        const { route } = this.props;
        const { food, rest } = route.params;
        console.log(food);
        this.setState({
          food: food,
          rest: rest
        })
      }
    
    
    async componentDidMount() {
        
        this.setState({
          activityIndicator: true
        })
    
        console.log('mounting');
    
        await this.fetchFood();
        await this.fetchFirstGraphData();
        await this.fetchSecondGraphData(this.state.date);
        await this.fetchUserChartData();
    
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

        navigation.setOptions({
            headerTitle: () => <Text2 style={styles.headerText}>{this.state.food.a_title}'s Statistics</Text2>
        });
       
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

                    <View style={{ alignItems: 'center' }}>
                        <Image source={{ uri: this.state.food.a_image_url }}
                        style={styles.imageStyle} />
                    </View>

                    <Text style={styles.primaryText}>{this.state.food.a_title}</Text>

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

                    {/* --------------------------- USER PIE CHARTS --------------------------- */}
                    
                    {
                        (this.state.rest.a_premium_level >= 3) ? 
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
                        (this.state.rest.a_premium_level >= 3) ? 
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
                         
                </ScrollView>
            </SafeAreaView>
            )
        );
    }
}

export default FoodSpecificStatistics = (props) => {
  return <FoodSpecificStatisticsComponent {...props} />;
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

    loading:{
        flex: 1,
        marginTop:100,
    },

    imageStyle: {
        width: Dimensions.get('window').width,
        height: 200,
        alignSelf: 'center',
    
    },

    primaryText: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 18,
        paddingLeft: 15,
        paddingTop: 15,
    },

    headerText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
        letterSpacing: 1,
      },
});
