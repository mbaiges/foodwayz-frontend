import React, { Component, useContext } from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import { Card } from 'react-native-elements';

import { Snackbar } from 'react-native-paper';


import { UserContext } from '../../../context/UserContext';

import { TypeApi } from '../../../api';
import { color } from "react-native-reanimated";

class CategoriesScreenComponent extends Component {
  constructor() {
    super();
    this.state = {
      types: [],

    }
  }

  async fetchTypes() {

    try {
      const resp = await TypeApi.getAll();
      switch(resp.status) {
        case 200:
          this.setState({
            types: resp.response.result
          })
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

  async componentDidMount() {
    this.setState({
      activityIndicator: true
    })
    await this.fetchTypes();
    this.setState({
      activityIndicator: false
    })

  }

  dismissConnectionSnackBar = () => {
    this.setState({
      snackbarConnectionVisible: false
    });
  }

  render() {
    const { navigation, context } = this.props;
    const { authState, setAuthState } = context;

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
            <Text style={styles.homeSubtitle}>Categories</Text>
            <ScrollView>
              {
                this.state.types.map(type => {
                  return (
                    <TouchableOpacity
                    onPress={async () => {
                      navigation.navigate("Categorie", { type: type });
                      //console.log("I want to navigate to Dish page");
                    }}>
                      <Card
                        key={type.a_type_id}
                        image={{ uri: type.a_image_url }}
                        imageStyle={{
                          height: 150,
                        }}

                      >
                        <Text style={styles.foodName}>{type.a_type_name}</Text>
                      </Card>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
          <Snackbar
            style={styles.snackBar}
            duration={4000}
            visible={this.state.snackbarConnectionVisible}
            onDismiss={this.dismissConnectionSnackBar}
          >
              <Text style={styles.textSnack}>No internet connection.</Text>
          </Snackbar>
        </ScrollView>

      </SafeAreaView>)

    );
  }
}

export default function CategoriesScreen(props) {
  const { authState, setAuthState } = useContext(UserContext);
  return <CategoriesScreenComponent {...props} context={{ authState, setAuthState }} />;
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#FFFFFF",
    paddingBottom: 30,
    paddingTop: 30,
  },

  homeSubtitle: {
    paddingLeft: 15,
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },

  cardImage: {
    width: 220,
    height: 180,
    justifyContent: "center",
  },

  foodName: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 3,
  },

  foodBrand: {
    textAlign: "left",
    fontSize: 14,
    paddingLeft: 3,
  },

  buttonContainer: {
    elevation: 20,
    position: "absolute",
    alignSelf: 'center',
    marginTop: 580,
  },

  button: {

    borderRadius: 25,
    backgroundColor: "#FC987E",
    color: "white",
    width: 150,
    padding: 13,
    height: 48,
  },

  buttonItemsContainer: {
    flexDirection: 'row',
    marginLeft: "22%",
  },

  rating: {
    alignSelf: "flex-start",
  },

  filter: {
    color:"white",
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
