import React from 'react';
import { Image, StyleSheet, Button, Text, View, Alert, TextInput, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

class TestComp extends React.Component {

    constructor() {
        super();

        this.state = {
            imageUrl: null,
        };

        this.givenImageName;
    }

    onChooseImagePress = async () => {
        let result = await ImagePicker.launchCameraAsync();
        //let result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            this.uploadImage(result.uri)
                .then(() => {
                    Alert.alert("Success");
                })
                .catch((error) => {
                    Alert.alert(error.message);
                });
        }
    }

    uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        var ref = firebase.storage().ref().child(`images/${this.givenImageName}`);
        return ref.put(blob);
    }

    getImage = async () => {
        firebase.storage().ref().child(`images/${this.givenImageName}`).getDownloadURL().then((url) => {
            this.setState({ imageUrl: url });
        }).catch(function (error) {
            Alert.alert(error.message);
        });
    }

    render() {
        return (
            <View alignItems="center" style={styles.backgroundContainer}>
                <Text style={styles.logoText}>ImageTest</Text>
                <View style={styles.inputBoxes}>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.input}
                            placeholder={"some name"}
                            underLineColorAndroid="transparent"
                            onChangeText={(value) => (this.givenImageName = value)}
                        />
                        <Text style={styles.inputTitle}> Image Name </Text>
                    </View>
                </View>
                <View style={styles.inputBoxes}>
                    <View alignItems="center">
                        <Button title="Upload Image" onPress={this.onChooseImagePress} />
                    </View>
                </View>
                <View alignItems="center">
                    <View alignItems="center">
                        <Button title="Get Image" onPress={this.getImage} />
                    </View>
                </View>
                <View>
                    <Image source={{ uri: this.state.imageUrl ? this.state.imageUrl : 'https://img2.freepng.es/20180213/lbe/kisspng-po-giant-panda-kung-fu-panda-bear-valentines-day-big-eyes-of-the-panda-5a8358022317c9.3491182915185571861438.jpg', width: 200, height: 200, }} />
                </View>
            </View>
        );
    }
}

export default function TestScreen(props) {
    return <TestComp {...props} />;
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
    header: {
        fontSize: 36,
        marginBottom: 48,
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36,
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12,
    },
    logoText: {
        position: "relative",
        color: "white",
        fontSize: 50,
        paddingTop: 25,
        paddingBottom: 50,
        fontWeight: "500",
        opacity: 1,
    },

    inputView: {
        position: "relative",
        padding: 10,
    },

    inputBoxes: {
        top: -30,
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

    inputTitle: {
        elevation: 15,
        position: "absolute",
        color: "#FC987E",
        paddingLeft: 38,
        paddingTop: 14,
        fontSize: 11,
        fontWeight: "500",
        opacity: 1,
    },
    text: {
        fontSize: 10,
        paddingLeft: 20,
        color: "white",
        marginHorizontal: 25,
    },

    button: {
        elevation: 15,
        borderRadius: 25,
        backgroundColor: "white",
        color: "black",
        width: 217,
        alignItems: "center",
        padding: 13,
        height: 48,
    },

    signUp: {
        position: "relative",
        color: "black",
        fontSize: 11,
        paddingTop: 0,
        paddingBottom: 0,
        fontWeight: "500",
        opacity: 1,
        textDecorationLine: "underline",
    },

    forgotpassword: {
        position: "relative",
        color: "black",
        fontSize: 11,
        paddingTop: 25,
        paddingBottom: 8,
        fontWeight: "500",
        textDecorationLine: "underline",
        opacity: 1,
    },
});

/*
< Image
source={{ uri: 'https://reactnative.dev/img/tiny_logo.png', }}
/>
<Image
source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==', }}
/>
<Image
source={this.chosenImageUrl == '' ? require("../../assets/images/logo.png") : this.chosenImageUrl}
/>
<Image source={{ uri: this.chosenImageUrl, width: 200, height: 200, }} />
<Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/foodwayz-e9a26.appspot.com/o/images%2FTest?alt=media&token=003f65c4-18e5-4d3d-b9e0-f53fa9beb2f6', width: 200, height: 200, }} />
*/