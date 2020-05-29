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
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";

class FilterScreenComponent extends Component {
    constructor() {
        super();


        this.state = {
            checked: false,
            values:[false,false,false,false]
        }

        this.options = [{name :"Vegano", value: false},
                    {name :"Celiaco", value: false},
                    {name :"Bajo en calorias", value: true},
                    {name :"Barato", value: true}];
  }

  changeValues(i){
    let newValues = this.state.values;
    newValues[i] = !newValues[i];
    this.setState({values: newValues})
  }

  render() {
    const { navigation } = this.props;
    var optionButtons = [];
    for(let i = 0; i < this.options.length ; i++){
        optionButtons.push(
            <View key={i}>
                <CheckBox
                    title = {this.options[i].name}
                    checked = {this.state.values[i]}
                    onPress={() => this.changeValues(i)}
                />
                
            </View>
        )                        
    }

    return (
        
        <SafeAreaView style={styles.backgroundContainer}>
            <ScrollView vertical = {true}>
                <View style={styles.inner}>
                    <View style={styles.mainPage}>
                        <Text style={styles.title}>Filter Dishes</Text>
                        <Text style={styles.text}>Select filters</Text>
                    </View>
                </View>
                { optionButtons }
            </ScrollView>
        </SafeAreaView>
    );
  }
}

export default FilterScreen = (props) => {
  return <FilterScreenComponent {...props} />;
};

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#FC987E",
    paddingBottom: 30,
    paddingTop: 30,
  },

  inner: {
    position: "relative",
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  mainPage: {
    flex: 1,
    position: "relative",
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: "center",
  },



  title: {
    position: "relative",
    color: "white",
    fontSize: 40,
    paddingTop: 0,
    paddingBottom: 10,
    fontWeight: "500",
    opacity: 1,
  },

  text: {
    position: "relative",
    fontSize: 20,
    paddingLeft: 15,
    color: "black",
  },

 
});
