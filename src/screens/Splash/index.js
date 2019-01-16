import React, {Component} from 'react';
import SplashScreen from './components';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {uploadFavorites, uploadSymptoms, uploadCards, setFavoriteCardsIds} from 'src/reducers/Cards/actions';
import {symptoms} from 'src/services/Data';

class Splash extends Component {

    constructor(){
        super();

        this.state = {
            appIsReady: false,
        }
    }

    initialAsyncStorageState = {
        cards: [],
        favoriteCardsIds: [],
    };

    storageKey = "psychiatristApp";

    componentDidMount() {

        // AsyncStorage.removeItem(this.storageKey);

        this.asyncStorageConnect().then(()=>{
            this.setState({
                appIsReady: true,
            })
        })
    }

    asyncStorageConnect() {

        return AsyncStorage.getItem(this.storageKey).then((asyncStorageData)=>{
            if(asyncStorageData === undefined || asyncStorageData === null) {
                this.asyncStorageInitialize();
            } else {
                this.storeInit(asyncStorageData);
            }
        })
    }

    asyncStorageInitialize() {
        AsyncStorage.setItem(this.storageKey, JSON.stringify(this.initialAsyncStorageState)).done(()=>{
            this.props.onFavoritesUpload(this.initialAsyncStorageState)
        });
    }

    // Init store with default cards and user cards if any
    storeInit(data){
        data = JSON.parse(data);
        this.props.onCardsUpload([...symptoms, ...(data.cards ? data.cards : [])]);
        this.props.setFavoriteCardsIds(data.favoriteCardsIds)
    }


    render(){
        return(
            <SplashScreen appIsReady={this.state.appIsReady}/>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSymptomsUpload: (symptoms)=>{
            dispatch(uploadSymptoms(symptoms));
        },
        onFavoritesUpload: (favorites) => {
            dispatch(uploadFavorites(favorites))
        },
        onCardsUpload: (cards)=>{
            dispatch(uploadCards(cards))
        },
        setFavoriteCardsIds: (ids)=>{
            dispatch(setFavoriteCardsIds(ids))
        }
    }
}

function mapStateToProps(){
    return {

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Splash);