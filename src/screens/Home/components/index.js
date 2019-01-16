import React, {Component} from 'react';
import {ScrollView, View, ImageBackground, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import AnimatedButtonWithIcon from './AnimatedButtonWithIcon'
const { width, height } = Dimensions.get('window');
import {withNavigation} from 'react-navigation';

class Home extends Component {

    render(){

        const buttons = [
            {
                icon: require("src/assets/word_icon.png"),
                textImage: require("src/assets/main_menu_words.png"),
                category: "words",
                color: "#00DD72",
            },
            {
                icon: require("src/assets/personalities_icon.png"),
                textImage: require("src/assets/main_menu_personalities.png"),
                category: "personalities",
                color: "#FFA9F2",
            },
            {
                icon: require("src/assets/situations_icons.png"),
                textImage: require("src/assets/main_menu_situations.png"),
                category: "situations",
                color: "#F9170E",
            },
            {
                icon: require("src/assets/action_icon.png"),
                textImage: require("src/assets/main_menu_actions.png"),
                category: "actions",
                color: "#00DFF6",
            }
        ];

        return(
            <ImageBackground source={require('src/assets/white_background.png')} style={{width: '100%', height: '100%'}}>
                <ScrollView>
                    <View style={styles.container}>

                            <Image
                                source={require('src/assets/choose_a_category.png')}
                                style={{width: '100%', height: 100}}
                                resizeMode={'contain'}
                            />
                            {buttons.map((buttonConfigs, index)=>{

                                return (
                                    <AnimatedButtonWithIcon
                                        key={index}
                                        {...buttonConfigs}
                                        iconPosition={index % 2 === 0 ? "left" : "right"}
                                        onPress={()=>{
                                            this.props.navigation.navigate('CardShow',{category:buttonConfigs.category})
                                        }}
                                    />
                                )
                            })}
                    </View>
                </ScrollView>
                <View style={styles.test}>
                    <TouchableOpacity style={styles.refreshButton}
                                      activeOpacity={0.5}
                                      onPress={()=>{this.props.navigation.navigate("CardShow")}}>
                        <Image
                            source={require('src/assets/random_unpressed.png')}
                            style={{
                                width: 70,
                                height: 70,
                                marginHorizontal: 10,
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.refreshButton}
                                      activeOpacity={0.5}
                                      onPress={()=>{this.props.navigation.navigate("Favorites")}}>
                        <Image
                            source={require('src/assets/up_inactive.png')}
                            style={{
                                width: 70,
                                height: 70,
                                marginHorizontal: 10,
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.refreshButton}
                                      activeOpacity={0.5}
                                      onPress={()=>{this.props.navigation.navigate("Suggest")}}>
                        <Image
                            source={require('src/assets/suggest_a_symptom_unpressed.png')}
                            style={{
                                width: 70,
                                height: 70,
                                marginHorizontal: 10,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    test: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    buttonWrapper: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonStyle: {
        height: 100,
        width: "100%",
        backgroundColor: "#00DD72",
        borderRadius: 15,
    },
    buttonImageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonImageCommon: {
        height: "100%",
        resizeMode: "contain"
    },
    buttonContentWrapper: {
        flex:1,
        flexDirection: "row"
    },
    icon: {
        width: "25%",
        transform: [{ scaleX: 1.4}, {scaleY:1.3}],
        marginTop: -5,
    },
    textImage: {
        height: "55%",
        width: "100%",
        // backgroundColor:"blue"
    },
    textImageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '3deg'}]
    }
});


export default withNavigation(Home);