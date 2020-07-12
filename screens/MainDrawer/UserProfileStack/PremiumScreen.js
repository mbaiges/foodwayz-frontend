import React, { Component } from "react";
import { Card, ListItem, Button, Icon, Picker } from "react-native-elements";
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
import CheckBox from "@react-native-community/checkbox";
import { RestaurantApi } from "../../../api";
import { Snackbar } from 'react-native-paper';
import { color } from "react-native-reanimated";

import { StackActions } from '@react-navigation/native';

//import { Constants } from 'expo';

const { width } = Dimensions.get("window");

const levels = [ "None", "Copper", "silver", "Gold"]

class PremiumComponent extends Component {

    constructor() {
        super();
        this.state = {
          chosenPlanIndex: undefined,
          rest: {},
        }
     }
    
    async uploadPrimium(){
      const { route, navigation } = this.props;
      const { updateRestaurantPremium } = route.params;

      if(this.state.chosenPlanIndex != null){
        try {
          const resp = await RestaurantApi.updatePremiumStatus(this.state.rest.a_rest_id, this.state.chosenPlanIndex)
          console.log(resp);
          switch(resp.status) {
            case 200:
              updateRestaurantPremium(this.state.chosenPlanIndex);
              navigation.goBack();
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
  }

    async fetchRestaurant(){
      const { route } = this.props;
      const { restaurant } = route.params;
      this.setState({rest: restaurant});
      console.log(restaurant);
      this.setState({ 
        chosenPlanIndex: restaurant.a_premium_level, 
        selectedCard: restaurant.a_premium_level
      })
    }

    dismissConnectionSnackBar = () => {
      this.setState({
        snackbarConnectionVisible: false
      });
    }

    changePlan(plan){
      this.setState({ 
        chosenPlanIndex: plan, 
        selectedCard: plan
      })
      console.log("selecting plan: " + plan)
    }

    async componentDidMount() {
      this.setState({
        activityIndicator: true
      })
      console.log('mounting');
      await this.fetchRestaurant();
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
      (
        <SafeAreaView style={styles.backgroundContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.logoText}>Sign up for premium</Text>

            <TouchableOpacity
                onPress={() => { this.changePlan(0) }}
            >

              <Text style={styles.subtitle}>Current Plan: {levels[this.state.rest.a_premium_level]}</Text>
              <Text style={styles.subtitle}>Selected Plan: {levels[this.state.chosenPlanIndex]}</Text>

              <Card style={ this.state.selectedCard == 0 ? styles.selectedCard : styles.card }>
                <Text style={styles.subtitle}>No Premium</Text>
                <Text style={styles.text}>You will be able to see:</Text>
                <Text style={styles.text}>- The top 5 best and worst rated foods in your restaurant according to price, quality or presentation</Text>
              </Card>
            </TouchableOpacity>
            
            <TouchableOpacity
                onPress={() => { this.changePlan(1) }}
            >
              <Card style={ this.state.selectedCard == 1 ? styles.selectedCard : styles.card }>
                <Text style={styles.subtitle}>Copper - $100 a month!</Text>
                <Text style={styles.text}>You will be able to see:</Text>
                <Text style={styles.text}>- All non premium Perks</Text>
                <Text style={styles.text}>- The restaurants views on the last week, month, or year</Text>
                <Text style={styles.text}>- Detailed hour by hour info on your restaurants views on a specific day</Text>
                <Text style={styles.text}>- Each Foods views on the last week, month, or year</Text>
                <Text style={styles.text}>- Detailed hour by hour info on each food views on a specific day</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { this.changePlan(2) }}
            >
            <Card style={ this.state.selectedCard == 2 ? styles.selectedCard : styles.card }>
                <Text style={styles.subtitle}>Silver - $300 a month!</Text>
                <Text style={styles.text}>You will be able to see:</Text>
                <Text style={styles.text}>- All Copper level Perks</Text>
                <Text style={styles.text}>- All the user statistics for your restaurant including: Views per gender, Views per age, Views per characteristic (Vegan, Celiac, etc) and the same information for the reviews</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { this.changePlan(3) }}
            >
            <Card style={ this.state.selectedCard == 3 ? styles.selectedCard : styles.card }>
                <Text style={styles.subtitle}>Gold - $500 a month!</Text>
                <Text style={styles.text}>You will be able to see:</Text>
                <Text style={styles.text}>- All Silver level Perks</Text>
                <Text style={styles.text}>- Same user statistics as on silver but not only for your restaurant but for all of the foods!</Text>
              </Card>
            </TouchableOpacity>

            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => { this.uploadPrimium() }}
                >
                    <Text style={styles.save}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      const popAction = StackActions.pop(1);
                      navigation.dispatch(popAction);
                      //navigation.navigate("UserProfile");
                    }}
                >
                    <Text style={styles.cancel}>Cancel</Text>
                 
                </TouchableOpacity>
            </View>
            <Snackbar
              style={styles.snackBarError}
              duration={4000}
              visible={this.state.snackbarConnectionVisible}
              onDismiss={this.dismissConnectionSnackBar}
            >
                <Text style={styles.textSnack}>No internet connection.</Text>
            </Snackbar>
            </ScrollView>
        </SafeAreaView>)
      );
    };
}

export default function PremiumScreen( props ) {
  return <PremiumComponent {...props} />;
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: "white",
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "black",
      marginLeft:15,
    },
    text: {
        fontSize: 14,
        color: "black",
        marginLeft:15,
      },
    inputView: {
        position: "relative",
        marginBottom:20,
    },
    input: {
        position: "relative",
        height: 60,
        borderBottomColor:"gray",
        borderBottomWidth:1,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: "white",
        color: "#000000",
        marginHorizontal: 25,
    },
    message: {
      marginTop:10,
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
    buttons: {
        flexDirection:"row",
        paddingTop:10,
        marginTop:50,
        marginBottom: 20,
        marginLeft: 20
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

      card: {
        marginTop:20,
        alignSelf:"center",
        marginBottom:50,
        alignItems: "center",
        paddingTop:8,
      },

      selectedCard: {
        marginTop:20,
        alignSelf:"center",
        marginBottom:50,
        alignItems: "center",
        paddingTop:8,
        backgroundColor: "#FC987E",
        color: "white",
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
});

