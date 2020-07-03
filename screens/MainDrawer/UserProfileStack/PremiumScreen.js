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
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { RestaurantApi } from "../../../api";

//import { Constants } from 'expo';

const { width } = Dimensions.get("window");

class PremiumComponent extends Component {

    constructor() {
        super();
        this.state = {
          chosenPlanIndex: undefined,
          rest: {},
        }
     }
    
    async uploadPrimium(){
      const { navigation } = this.props;

      if(this.state.chosenPlanIndex){
        const resp = await RestaurantApi.updatePremiumStatus(this.state.rest.a_rest_id, this.state.chosenPlanIndex)
        console.log(resp)
        if(resp.status == 200){
          navigation.goBack();
        }
      }else{
        console.log("you need to choose a plan")
      }
    }

    async fetchRestaurant(){
      const { route } = this.props;
      const { restaurant } = route.params;
      this.setState({rest: restaurant});
      console.log(restaurant);
    }

    changePlan(plan){
      this.setState({ chosenPlanIndex: plan })
      console.log("selecting plan: " + plan)
    }

    async componentDidMount() {
      console.log('mounting');
      await this.fetchRestaurant();
    }

    render() {
      const { navigation } = this.props;

      return (
        <SafeAreaView style={styles.backgroundContainer}>
          <ScrollView>
            <Text style={styles.logoText}>Sign up for premium</Text>
            
            <TouchableOpacity
                onPress={() => { this.changePlan(1) }}
            >
              <Card style={styles.card}>
                <Text style={styles.subtitle}>Basic - $100 a month!</Text>
                <Text style={styles.text}>- Feature 1</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { this.changePlan(2) }}
            >
            <Card style={styles.card}>
                <Text style={styles.subtitle}>Standard - $300 a month!</Text>
                <Text style={styles.text}>- Feature 1</Text>
                <Text style={styles.text}>- Feature 2</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { this.changePlan(3) }}
            >
            <Card style={styles.card}>
                <Text style={styles.subtitle}>Premium - $500 a month!</Text>
                <Text style={styles.text}>- Feature 1</Text>
                <Text style={styles.text}>- Feature 2</Text>
                <Text style={styles.text}>- Feature 3</Text>
              </Card>
            </TouchableOpacity>

            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => { this.uploadPrimium() }}
                >
                    <Text style={styles.save}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {navigation.navigate("UserProfile");}}
                >
                    <Text style={styles.cancel}>Cancel</Text>
                 
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
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
        marginTop:230
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
    
});

