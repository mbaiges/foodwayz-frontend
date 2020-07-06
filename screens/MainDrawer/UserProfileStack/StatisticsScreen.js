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


import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Card,Rating, Icon } from "react-native-elements";

import { BarChart, LineChart, YAxis, XAxis, Grid, PieChart } from 'react-native-svg-charts'
import { FoodApi, StatisticsApi, RestaurantApi } from '../../../api';

const screenWidth = Dimensions.get('window').width

const { width } = Dimensions.get("window");

class RestaurantStatisticsProfileComponent extends Component {
    constructor() {
        super();

        this.state = {
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
            chosenFoodDisplay: "precentation",
            
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
            case "precentation":
                this.setState({
                    bestFoods: bestSelected.a_presentation_score,
                    worstFoods: worstSelected.a_presentation_score
                });
            break;
            case "price":
                this.setState({
                    bestFoods: bestSelected.a_food_price_Score,
                    worstFoods: worstSelected.a_food_price_Score
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

    async fetchfoodData(){

        const resp = await FoodApi.getAll();

        let foodInfo = {
            a_best: {
                a_presentation_score: [resp.response.result[0]],
                a_food_price_Score: [resp.response.result[1]],
                a_food_quality_score: [resp.response.result[2]]
            },
            a_worst: {
                a_presentation_score: [resp.response.result[3]],
                a_food_price_Score: [resp.response.result[4]],
                a_food_quality_score: [resp.response.result[5]]
            }
        }

        this.setState({
            bestFoodSet: foodInfo.a_best,
            worstFoodSet: foodInfo.a_worst
        });

        this.recalculateFoodDisplay();
   
    }

    async fetchFirstGraphData(){

        await this.setState({
            weekDayValueData:[50, 10, 40, 95, 85, 5, 30],
            weekDayLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    
            monthDayValueData:[50, 10, 40, 95, 85, 5, 30, 50, 10, 40, 95, 85, 5, 30 ,50 , 10, 40, 95, 85, 5, 30, 50, 10, 40, 95, 85, 5, 30, 50, 10, 40, 95, 85, 5],
            monthDayLabels:[],
                
            yearMonthValueData:[50, 10, 40, 95, 85, 5, 30, 50, 10, 40, 95, 85],
            yearMonthLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        });

        await this.recalculateIntervalChartInfo();

    }

    async fetchSecondGraphData(date){
        const isoDate = date.toISOString();

        // llanada a la api
        
        await this.setState({
            secondChartData:[2,0,10,0,0,4,25,3,0,0,0,0,3,2,6,2,5,7,4,2,10,25,30,7],
            secondChartLabels: ["00hs", "06hs", "12hs", "18hs", "24hs"],
        });

    }

    async fetchUserChartData(){
        //llamada a la api

        let userData = {
            a_views_info: {
                a_gender: {
                    male: 10,
                    female: 4,
                    other: 25
                },
                a_age: {
                    22: 45,
                    23: 17,
                    88: 2
                },
                a_characteristic: {
                    vegan: 12,
                    diabetic: 10
                }
            },
            a_reviews_info: {
                a_gender: {
                    male: {
                        a_score: 4.8,
                        a_amount: 10
                    },
                    female: {
                        a_score: 3.2,
                        a_amount: 4
                    },
                    other: {
                        a_score: 1.5,
                        a_amount: 25
                    }
                },
                a_age: {
                    22: {
                        a_score: 3.3,
                        a_amount: 45
                    },
                    23: {
                        a_score: 2.4,
                        a_amount: 17
                    },
                    88: {
                        a_score: 1.8,
                        a_amount: 2
                    },
                },
                a_characteristic: {
                    vegan: {
                        a_score: 2.3,
                        a_amount: 12
                    },
                    diabetic: {
                        a_score: 4.1,
                        a_amount: 10
                    }
                }
            }
        };

        //------------------------------------ VIEWS INFO -------------------------------------------
        
        let auxViewsPerGenderPieData = [];
        Object.entries(userData.a_views_info.a_gender).forEach( (element,idx) => {
            auxViewsPerGenderPieData.push({
                key: idx,
                amount: element[1],
                svg: { fill: '#600080' },
                tag: element[0]
            })
        })

        let auxViewsPerAgeGroupPieData = [];
        Object.entries(userData.a_views_info.a_age).forEach( (element,idx) => {
            auxViewsPerAgeGroupPieData.push({
                key: idx,
                amount: element[1],
                svg: { fill: '#600080' },
                tag: element[0]
            })
        })

        let auxViewsPerCharPieData = [];
        Object.entries(userData.a_views_info.a_characteristic).forEach( (element,idx) => {
            auxViewsPerCharPieData.push({
                key: idx,
                amount: element[1],
                svg: { fill: '#600080' },
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
                svg: { fill: '#600080' },
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
                svg: { fill: '#600080' },
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
                svg: { fill: '#600080' },
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

        const { route } = this.props;
        const { rest } = route.params;

        this.setState({ rest: rest });
    
        const resp = await RestaurantApi.getFoods(rest.a_rest_id);

        if( resp.status == 200 ){
            this.setState({ allResturantFoods: resp.response.result });
        }else{
            console.log("error");
        }

    }

    // --------------------------------- MOUNT ----------------------------------------------------
    async componentDidMount() {
        this.setState({
          activityIndicator: true
        })
    
        console.log('mounting');
    
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

                    <Card title='Best and Worst Dishes'>
                        <View>
                            <Text2 style={styles.subtitleText}>Best</Text2>
                        </View>
                        <View>   
                            <ScrollView horizontal= {true}
                            showsHorizontalScrollIndicator={false}>        
                                {this.state.bestFoods.map((food, idx) =>{
                                    return(
                                        <View key={idx}>
                                            <TouchableOpacity onPress={async () => {navigation.navigate("Food", { food: food});
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
                            <Text2 style={styles.subtitleText}>Worst</Text2>
                        </View>
                        <View>
                        
                            <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                                {this.state.worstFoods.map((food, idx) =>{
                                    return(
                                        <View key={idx}>
                                            <TouchableOpacity onPress={async () => {navigation.navigate("Food", { food: food});
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
                                <Picker.Item label="Precentation" value="precentation" />
                                <Picker.Item label="Price" value="price" />
                            </Picker>
                        </View>          

                    </Card>



                    {/* --------------------------- LAST INTERVAL DATA CHART --------------------------- */}
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
                                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
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
                    {/* -------------------------------------------------------------------------------- */}
                    
                    {/* --------------------------- CHOSEN DATE DATA CHART --------------------------- */}
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
                                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
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
                    {/* -------------------------------------------------------------------------------- */}

                    {/* --------------------------- USER PIE CHARTS --------------------------- */}
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
                    
                    {/* -------------------------------------------------------------------------------- */}


                    {/* --------------------------- SCORES --------------------------- */}
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
                                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
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
                    {/* -------------------------------------------------------------------------------- */}
                         

                    {/* --------------------------------ALL FOODS -------------------------------------- */}
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
                                        onPress={async () => {navigation.navigate("FoodSpecificStatistics", { food: food});}}
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
    }
});
