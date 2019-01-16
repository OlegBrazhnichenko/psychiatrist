import React, {Component} from 'react';
import AddCardComponent from './components';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native';
import {addNewFavorite, addFavoriteCardId} from 'src/reducers/Cards/actions';

class AddCard extends Component {

    constructor(){
        super();

        this.saveFavoriteCardId = this.saveFavoriteCardId.bind(this);
        this.handleAddCardSubmit = this.handleAddCardSubmit.bind(this);
    }

    storageKey = 'psychiatristApp';

    handleAddCardSubmit(card) {

        AsyncStorage.getItem(this.storageKey).then((appStorage)=>{
            appStorage = JSON.parse(appStorage);
            card.id = this.getNextId();
            appStorage.cards.push(card);

            AsyncStorage.setItem(this.storageKey, JSON.stringify(appStorage)).then(()=>{
                this.props.onAddCardSubmit(card);
                this.saveFavoriteCardId(card.id)
            })
        })
    }

    saveFavoriteCardId(id) {

        AsyncStorage.getItem(this.storageKey).then((appStorage)=>{
            appStorage = JSON.parse(appStorage);
            appStorage.favoriteCardsIds.push(id);

            AsyncStorage.setItem(this.storageKey, JSON.stringify(appStorage)).then(()=>{
                this.props.addFavoriteCardId(id);
            });
        })
    }

    getNextId() {
        return Math.max(...this.props.symptomCards.map(card => card.id)) + 1;
    }

    render(){
        return(
            <AddCardComponent onAddCardSubmit={this.handleAddCardSubmit}/>
        )
    }
}


function mapStateToProps(state) {
    return {
        symptomCards: state.Cards.symptoms
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onAddCardSubmit: (card) => {
            dispatch(addNewFavorite(card));
        },
        addFavoriteCardId: (id) => {
            dispatch(addFavoriteCardId(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)