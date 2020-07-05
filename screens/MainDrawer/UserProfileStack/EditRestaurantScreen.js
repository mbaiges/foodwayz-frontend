import React, { Component, useContext } from "react";
import { Card, ListItem, Button, Icon, Rating, Input, CheckBox } from "react-native-elements";
import { UserContext } from '../../../context/UserContext';
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


import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import { UserApi, RestaurantApi } from '../../../api';

const { width } = Dimensions.get("window");


class EditRestaurantComponent extends Component {

    constructor(){
        super();
    
        this.state = {
            restaurant: {},
            name: "",
            countryState: "",
            city: "",
            postalCode: "",
            address: "",
        }


    }

        async fetchRestaurant() {
            const { route } = this.props;
            console.log(route);
            
            const { restaurant } = route.params;
            console.log(restaurant);
            this.setState({ 
                restaurant: restaurant,
                name: restaurant.a_name,
                countryState: restaurant.a_state,
                city: restaurant.a_city,
                postalCode: restaurant.a_postal_code,
                address: restaurant.a_address});
        }

        async componentDidMount() {
            console.log("Mounting");
            await this.fetchRestaurant();
            console.log(this.state.name);
            console.log(this.state.countryState);
            console.log(this.state.city);
            console.log(this.state.postalCode);
            console.log(this.state.address);
            

        }
    
        async saveChanges(){
            let aux = this.state.restaurant;
            aux.a_name = this.state.name;
            aux.a_state = this.state.countryState;
            aux.a_city = this.state.city;
            aux.a_postal_code = this.state.postalCode;
            aux.a_address = this.state.address;

            this.setState({restaurant: aux });

            await RestaurantApi.modify(this.state.restaurant);
        }

        render() {
            const {navigation} = this.props;
           
    
        
            return (
            <ScrollView>
                <View style={styles.backgroundContainer}>
                    
                    <Text style={styles.title}> Edit Restaurant</Text>
                    

                    
                    <View style={styles.inputView}>
                        <Text style={styles.inputTitle}>Restaurant Name</Text>
                        <View style={styles.inputBox}>
                            <Input
                                value={this.state.name}
                                style={styles.input}
                                underLineColorAndroid="transparent"                      
                                onChangeText={(value) => { this.setState({name: value})}}

                            />  
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.inputTitle}>State</Text>
                        <View style={styles.inputBox}>
                            <Input
                                value={this.state.countryState}
                                style={styles.input}
                                underLineColorAndroid="transparent"
                                onChangeText={(value) => { this.setState({countryState: value})}}
                            />  
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.inputTitle}>City</Text>
                        <View style={styles.inputBox}>
                            <Input
                                value={this.state.city}
                                style={styles.input}
                                underLineColorAndroid="transparent"
                                onChangeText={(value) => { this.setState({city: value})}}
                            />   
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.inputTitle}>Postal Code</Text>
                        <View style={styles.inputBox}>
                            <Input
                                value={this.state.postalCode}
                                style={styles.input}
                                underLineColorAndroid="transparent"
                                onChangeText={(value) => { this.setState({postalCode: value})}}
                            />   
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.inputTitle}>Address</Text>
                        <View style={styles.inputBox}>
                            <Input
                                value={this.state.address}
                                style={styles.input}
                                underLineColorAndroid="transparent"
                                onChangeText={(value) => { this.setState({address: value})}}
                            />   
                        </View>
                    </View>
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={async () => { this.setState({modalInviteToBeOwner: true }) }}
                        >
                        <Text style={styles.buttonText}>Add new owner</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => { 
                            this.saveChanges();
                            navigation.goBack();
                        }} >
                            <Text style={styles.buttonText}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </View>  
            </ScrollView>
            );
       }
}


const { width: WIDTH } = Dimensions.get('window')
const { height: HEIGHT } = Dimensions.get('window').height

export default function EditRestaurant(props) {
  return <EditRestaurantComponent {...props} />;
}

const styles = StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      width: null,
      height: null,
      backgroundColor: 'white',
    },



    
    inputView: {
        position: 'relative',
        padding: 0,
    
    },

    
    title:{
        color: 'black',
        fontSize: 20,
        paddingLeft:15,
        paddingTop: 10,
        fontFamily: 'Roboto', 
        fontWeight: 'bold',
        paddingBottom: 5,
    },



    inputTitle:{
        elevation: 15,
        position: "absolute",
        color: '#FC987E',
        paddingLeft: 20,
        fontSize: 17,
        fontWeight: '500',
        opacity: 1,
    
    },
  
    
    input: {
        elevation: 15,
        position: "relative",
        width: WIDTH - 100,
        height: 60,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        paddingTop: 25,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: "white",
        color: "#000000",
        marginHorizontal: 25,
    },
    
    inputBox:{
        paddingTop: 20,
        paddingLeft:10
      },

    button: {
        elevation: 5,
        borderRadius: 25,
        backgroundColor: "#FC987E",
        color: "black",
        width: 217,
        alignItems: "center",
        padding: 13,
        height: 48,
        alignSelf: "center",
        marginBottom: 20
    },

    buttonText: {
        color:"white",
        textAlign:"center"
      },

  });

