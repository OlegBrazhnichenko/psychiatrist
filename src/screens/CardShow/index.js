import React, {Component} from 'react';
import CardShowComponent from './components/index';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {addFavoriteCardId, removeFavoriteCardId} from 'src/reducers/Cards/actions';

class CardShow extends Component {

    constructor() {
        super();

        this.handleFavoriteSwitch = this.handleFavoriteSwitch.bind(this);
    }

    handleFavoriteSwitch(cardId) {
        const card = this.getCardById(cardId);

        if(card.favorite) {
            if(card.custom) {
                 this.props.removeUserCard(cardId)
            }
            this.props.removeFavoriteCardId(cardId);
        } else {
            this.props.addFavoriteCardId(cardId);
        }
    }

    getCardById(cardId) {
        return this.props.cards.filter((card)=>{
            return card.id === cardId;
        })[0];
    }

    render() {
        const cardId = this.props.navigation.getParam("cardId", null);

        let card = null;

        if(cardId !== null) {
            card = this.getCardById(cardId);
        }
        console.log("favorite ca rds ids",this.props.favoriteCardsIds);
        return (
            <CardShowComponent
                category={this.props.navigation.getParam("category","")}
                isFavoritesOnly={this.props.navigation.getParam("isFavoritesOnly", false)}
                card={card}
                onFavoriteSwitch={this.handleFavoriteSwitch}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        cards: state.Cards.symptoms,
        favoriteCardsIds: state.Cards.favoriteCardsIds,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addFavoriteCardId: (cardId) => {
            dispatch(addFavoriteCardId(cardId));
        },
        removeFavoriteCardId: (cardId) => {
            dispatch(removeFavoriteCardId(cardId))
        }
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(CardShow));


