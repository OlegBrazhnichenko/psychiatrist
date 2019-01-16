import React, {Component} from "react";
import {
    View,
    ScrollView,
    ImageBackground,
    Text,Picker,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Alert,
} from 'react-native';

import {withNavigation} from 'react-navigation';


const {width} = Dimensions.get("window");

class AddCardComponent extends Component {

    initialState = {
        category: "actions",
        symptom: "",
        example: "",
    };

    constructor() {
        super();

        this.storeValue = this.storeValue.bind(this);
        this.submitValues = this.submitValues.bind(this);

        this.state = {
            ...this.initialState
        }
    }

    storeValue(key, value) {
        this.setState({
            ...this.state,
            [key]: value,
        });
    }

    submitValues(){
        this.props.onAddCardSubmit({
            type: this.state.category,
            symptom: this.state.symptom,
            example: this.state.example || null,
            favorite: true,
            custom: true,
        });

        this.setState({...this.initialState});

        Alert.alert(
            'Card has been added successfully',
            'Your card has been added to your favorites list. You can play with it via your favorites page',
            [
                {text: 'OK', onPress: () => this.props.navigation.goBack()},
            ],
            { cancelable: false }
        )
    }

    render(){

        return(
            <ImageBackground source={require('src/assets/white_background.png')} style={[styles.screenContainer, {width: '100%', height: '100%'}]}>
                <ScrollView>
                    <Image
                        source={require('src/assets/add_a_symptom.png')}
                        style={{width: '100%', height: 100}}
                        resizeMode={'contain'}
                    />

                    <Text style = {styles.text}>
                        You can add your own symptom here to use
                        within this app! These symptoms are
                        specific to your phone, and you can access
                        it anytime through your Favorites list! If you
                        delete the app, however, you'll also delete
                        your created symptoms.
                    </Text>

                    <View style={[formStyles.field]}>
                        <Text style = {styles.label}>SYMPTOM CATEGORY</Text>
                        <View style={inputContainerStyles.container}>
                            <Picker
                                selectedValue={this.state.category}
                                onValueChange={(value)=>{this.storeValue("category", value)}}
                            >
                                <Picker.Item label="Words" value="words" />
                                <Picker.Item label="Actions" value="actions" />
                                <Picker.Item label="Situations" value="situations" />
                                <Picker.Item label="Personalities" value="personalities" />
                            </Picker>
                        </View>
                    </View>

                    <View style={[formStyles.field]}>
                        <Text style = {styles.label}>SYMPTOM</Text>
                        <View style={[inputContainerStyles.container, textAreaStyles.textAreaContainer]}>
                            <TextInput
                                style={textAreaStyles.textAreaInput}
                                multiline={true}
                                onChange={(event)=>{this.storeValue("symptom",event.nativeEvent.text)}}
                                value={this.state.description}/>
                        </View>
                    </View>
                    <View style={[formStyles.field]}>
                        <Text style = {styles.label}>EXAMPLE</Text>
                        <View style={[inputContainerStyles.container, textAreaStyles.textAreaContainer]}>
                            <TextInput
                                style={textAreaStyles.textAreaInput}
                                multiline={true}
                                onChange={(event)=>{this.storeValue("example",event.nativeEvent.text)}}
                                value={this.state.description}/>
                        </View>
                    </View>

                </ScrollView>
                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.footerButton}
                                      activeOpacity={0.5}
                                      onPress={()=>{this.props.navigation.goBack()}}>
                        <Image
                            source={require('src/assets/home_unpressed.png')}
                            style={styles.footerButtonIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton}
                                      activeOpacity={0.5}
                                      onPress={()=>{this.submitValues()}}>
                        <Text style={styles.submitButtonText}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const formStyles = StyleSheet.create({
    field: {
        marginVertical: 10,
    }
});

const styles = StyleSheet.create({
    screenContainer: {
        paddingHorizontal: 10,
    },
    footerContainer: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    footerButton: {

    },
    footerButtonIcon: {
        width: 70,
        height: 70,
        marginHorizontal: 10,
    },
    text: {
        color: "#181818",
        fontSize: 18,
        paddingHorizontal: 10,
        textAlign: "center",
        fontWeight: "normal",
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
        marginVertical: 10,
    },
    submitButton: {
        height: 70,
        backgroundColor: "#3d3d3d",
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 60,
        borderRadius: 10,
        marginLeft: 10,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
    }
});

const pickerStyles = StyleSheet.create({
    container: {
        borderWidth: 3,
        borderColor: "grey",
    }
});

const inputContainerStyles = StyleSheet.create({
    container: {
        borderWidth: 3,
        borderColor: "grey",
    }
});

const textAreaStyles = StyleSheet.create({
    textAreaContainer: {
        minHeight: 120,
    },
    textAreaInput: {
        textAlign: "center",
    }

});

export default withNavigation(AddCardComponent);