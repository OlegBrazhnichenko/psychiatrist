import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Dimensions, Animated} from 'react-native';
import {withNavigation} from 'react-navigation';

const {width} = Dimensions.get("window");

import { NavigationActions, StackActions } from 'react-navigation'

class Splash extends Component {

    constructor() {
        super();

        this.state = {
            appIsReady: true,
            animationEnd: false,
        }
    }

    logo = new Animated.Value(0);

    componentDidUpdate() {
        if(this.state.appIsReady && this.state.animationEnd) {
            this.props
                .navigation
                .dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'Home',
                        }),
                    ],
                }))
        }
    }

    componentDidMount() {

        Animated.sequence([
            Animated.timing(this.logo, {
                toValue: 1,
                duration: 1000,
                delay: 200,
            }),
            Animated.delay(350)
        ]).start(()=>{this.setState({
            ...this.state,
            animationEnd: true,
        })});
    }

    render(){
        const translateX = this.logo.interpolate({
            inputRange: [0,1],
            outputRange: [width, 0]
        });

        return(
            <ImageBackground fadeDuration={0}
                             source={require('src/assets/red_bg_small.png')}
                             style={styles.container}>

                <Animated.Image style={[styles.logo, {transform: [{translateX}] }]}  source={require('src/assets/game_logo_s.png')}/>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
   container: {
       flex:1,
       justifyContent: "center",
       alignItems: "center",
       width: '100%',
       height: '100%'
   },
   logo: {
       height: 435,
       width: 270
   }
});

export default withNavigation(Splash);