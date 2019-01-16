import React, {Component} from 'react';
import {View, SectionList, Text, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {symptoms} from 'src/services/Data/index';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import styles from './styles';


class CardShowComponent extends Component {

    static propTypes = {
        category: PropTypes.any,
        isFavoritesOnly: PropTypes.bool,
        card: PropTypes.any,
    };

    constructor(props) {
        super();

        this.getRandomCard = this.getRandomCard.bind(this);
        this.switchFavorite = this.switchFavorite.bind(this);

        this.state = {
            card: props.card || null,
            category: props.card && props.card.type || null,
        }
    }
// todo rewrite logic to make initial setup before first render. All cards that could
// * be displayed should be stored in state and all random cards should be picked from state.
    componentWillMount() {
        if(!this.state.card) {
            this.getRandomCard();
        }
    }

    getRandomCard(){
        if(!symptoms) return;

        let cards;

        if(this.props.category) {
            cards = symptoms.filter((card)=> {
                return card.type === this.props.category;
            })
        } else {
            cards = symptoms;
        }

        const card = cards[Math.floor(Math.random()*cards.length)];

        this.setState({
            card: card,
            category: card.type,
        });
    }

    switchFavorite() {
        this.props.onFavoriteSwitch(this.state.card.id);
    }

    render() {
        if(!this.state.card) return null;

        const headerImages = {
            words:require('src/assets/symptom_page_words.png'),
            actions:require('src/assets/symptom_page_actions.png'),
            situations:require('src/assets/symptom_page_situations.png'),
            personalities:require('src/assets/symptom_page_personalities.png')
        };
        const categoryColor = {
            words: '#00DD72',
            actions: '#00DFF6',
            situations: '#F9170E',
            personalities: '#FFA9F2'
        };

        const cardColor = categoryColor[this.state.category];

        const favoriteImg = require('src/assets/up_active.png');
        const notFavoriteImg = require('src/assets/up_inactive.png');

        return (
            <ImageBackground source={require('src/assets/white_background.png')} style={{width: '100%', height: '100%'}}>
                <Image
                    source={headerImages[this.state.category]}
                    style={{width: '100%', height: 100}}
                    resizeMode={'contain'}
                />
                <View style={styles.card}>
                    <Text style={{...styles.cardText, backgroundColor: cardColor}}>{this.state.card.symptom}</Text>
                    {this.state.card.example &&(
                        <Text style={styles.cardExample}>{this.state.card.example}</Text>
                    )}
                </View>
                <View style={styles.test}>
                    <TouchableOpacity style={styles.refreshButton}
                                      activeOpacity={0.5}
                                      onPress={()=>{this.props.navigation.navigate("Home")}}>
                        <Image
                            source={require('src/assets/home_unpressed.png')}
                            style={{
                                width: 70,
                                height: 70,
                                marginHorizontal: 10,
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.refreshButton}
                                      activeOpacity={0.5}
                                      onPress={this.getRandomCard}>
                        <Image
                            source={require('src/assets/refresh_unpressed.png')}
                            style={{
                                width: 70,
                                height: 70,
                                marginHorizontal: 10,
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.refreshButton}
                                      activeOpacity={0.5}
                                      onPress={this.switchFavorite}>
                        <Image
                            source={this.state.card.favorite ? favoriteImg : notFavoriteImg}
                            style={{
                                width: 70,
                                height: 70,
                                marginHorizontal: 10,
                            }}
                        />
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        );
    }
}

export default withNavigation(CardShowComponent);