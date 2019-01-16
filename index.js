/** @format */
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';

import Main from './src/screens/Main';
import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import SubmitCard from './src/screens/SubmitCard';
import Favorites from './src/screens/Favorites'
import AddCard from './src/screens/AddCard';

import {name as appName} from './app.json';

import { createStackNavigator, createAppContainer } from "react-navigation";

import configStore from './src/store';
import CardShow from "./src/screens/CardShow/index";


const store = configStore();

export const AppNavigator = createAppContainer(createStackNavigator({
        Home: {
            screen: Home
        },
        Splash: {
            screen: Splash
        },
        Suggest: {
            screen: SubmitCard
        },
        Favorites: {
            screen: Favorites,
        },
        AddCard: {
            screen: AddCard
        },
        CardShow: {
            screen: CardShow,
        }
    },{
        initialRouteName: 'Splash',
        headerMode: 'none',
    }
));

export class App extends Component {
    render() {
        return(
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        )
    }
}


AppRegistry.registerComponent(appName, () => App);
