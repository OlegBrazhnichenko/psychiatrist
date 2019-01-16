import React, {Component} from "react";
import FavoritesComponent from './components';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Favorites extends Component {

    static propTypes = {
        favorites: PropTypes.array,
    };

    render(){
        const favorites = this.props.cards.filter((card)=>{
            return ~this.props.favoriteCardsIds.indexOf(card.id);
        });

        return(
            <FavoritesComponent favorites={favorites || []}/>
        )
    }
}

function mapStateToProps(state) {
    return {
        cards: state.Cards.symptoms,
        favoriteCardsIds: state.Cards.favoriteCardsIds
    }
}

export default connect(mapStateToProps)(Favorites);