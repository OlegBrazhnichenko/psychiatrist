import React, {Component} from 'react';
import {View, SectionList, Text, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {symptoms} from 'src/services/Data/index';

import styles from './styles';


export default class MainComponent extends Component {


    constructor(props) {
        super(props);

        this.getRandomCard = this.getRandomCard.bind(this);

        this.state = {
            card: null,
        }
    }

    componentWillMount() {
        this.getRandomCard();
    }

    // formatSymptoms() {
    //     const sections = [];
    //
    //     Object.keys(symptoms).map((key)=>{
    //         sections.push({
    //             title: key,
    //             data: symptoms[key]
    //         })
    //     });
    //
    //     return sections;
    // }

    getRandomCard(){
        if(!symptoms) return;

        const categories = Object.keys(symptoms);
        const category =  symptoms[categories[ categories.length * Math.random() << 0]];

        const card = category[Math.floor(Math.random()*category.length)];

        this.setState({
            card: card,
            category: card.type,
        });
    }



    render() {

        if(!this.state.card) return null;

        // const sections = this.formatSymptoms();

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

        return (
            <ImageBackground source={require('src/assets/white_background.png')} style={{width: '100%', height: '100%'}}>
                <Image
                    source={headerImages[this.state.category]}
                    style={{width: '100%', height: 100}}
                    resizeMode={'contain'}
                />
                {/*<View>*/}
                    {/*<SectionList*/}
                        {/*sections={sections}*/}
                        {/*renderItem={({item}) => <Text style={styles.item}>{item.symptom}</Text>}*/}
                        {/*renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}*/}
                        {/*keyExtractor={(item, index) => index}*/}
                    {/*/>*/}
                {/*</View>*/}
                <View style={styles.card}>
                    <Text style={{...styles.cardText, backgroundColor: cardColor}}>{this.state.card.symptom}</Text>
                    {this.state.card.example &&(
                        <Text style={styles.cardExample}>{this.state.card.example}</Text>
                    )}
                </View>

                <TouchableOpacity style={styles.refreshButton}
                                  activeOpacity={0.5}
                                  onPress={this.getRandomCard}>
                    <Image
                        source={require('src/assets/refresh_pressed.png')}
                        style={styles.refreshButtonImage}
                    />
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}
