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
    AsyncStorage
} from 'react-native';
import {withNavigation} from 'react-navigation';


const {width} = Dimensions.get("window");

class SubmitCard extends Component {

    initialState = {
        userName: "",
        category: "actions",
        description: "",
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
        // Here should be some ajax call or something like that, but someone has stolen it! call the cops
        this.setState({...this.initialState});
    }

    render(){

        return(
            <ImageBackground source={require('src/assets/white_background.png')} style={[styles.screenContainer, {width: '100%', height: '100%'}]}>
                <ScrollView>
                    <Image
                        source={require('src/assets/submit_a_symptom.png')}
                        style={{width: '100%', height: 100}}
                        resizeMode={'contain'}
                    />

                    <Text style = {styles.text}>Think you have a symptom that should be included in our next update? Feel free to suggest a symptom using the form below!</Text>

                    <View style={[formStyles.field]}>
                        <Text style = {styles.label}>YOUR NAME</Text>
                        <View style={inputContainerStyles.container}>
                            <TextInput onChange={(event)=>{this.storeValue("userName",event.nativeEvent.text)}}
                                       value={this.state.userName}/>
                        </View>
                    </View>

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
                        <Text style = {styles.label}>SYMPTOM DESCRIPTION</Text>
                        <View style={[inputContainerStyles.container, textAreaStyles.textAreaContainer]}>
                            <TextInput
                                style={textAreaStyles.textAreaInput}
                                multiline={true}
                                onChange={(event)=>{this.storeValue("description",event.nativeEvent.text)}}
                                value={this.state.description}/>
                        </View>
                    </View>

                </ScrollView>
                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.footerButton}
                                      activeOpacity={0.5}
                                      onPress={()=>{this.props.navigation.navigate("Home")}}>
                        <Image
                            source={require('src/assets/home_pressed.png')}
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

export default withNavigation(SubmitCard);