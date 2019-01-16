import React, {Component} from "react";
import Swipeout from 'react-native-swipeout';
import {
    View,
    ScrollView,
    ImageBackground,
    Text,
    Picker,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    TextInput,
    AsyncStorage
} from 'react-native';
import {withNavigation} from 'react-navigation';


const {width} = Dimensions.get("window");

class Favorites extends Component {

    constructor() {
        super();

        this.state = {
            activeRow: 1,
        }
    }

    categoryColor = {
        words: '#00DD72',
        actions: '#00DFF6',
        situations: '#F9170E',
        personalities: '#FFA9F2'
    };

    render(){
        // console.log("FAVORITES", this.props.favorites);

        const favorites = this.props.favorites;


        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: '#ffffff',
            onPress: () => {  }
        }];
        return(
            <ImageBackground source={require('src/assets/white_background.png')} style={[styles.screenContainer, {width: '100%', height: '100%'}]}>
                <ScrollView>
                    <Image
                        source={require('src/assets/favorites.png')}
                        style={{width: '100%', height: 100}}
                        resizeMode={'contain'}
                    />

                    {!this.props.favorites.length && (
                        <Text style = {styles.text}>
                            You can add symptoms to your "Favorites
                            List" by clicking the "Favorite" icon at the
                            bottom of each symptom.
                        </Text>
                    ) || (
                        favorites.map((card, index)=>{
                            return (
                                <Swipeout backgroundColor={"#ffffff"}
                                          right={swipeBtns}
                                          key={index}
                                          rowId={index}
                                          close={this.state.activeRow !== index}
                                          onOpen={()=>{
                                              if (this.state) {
                                                  this.setState({ activeRow: index});
                                              }
                                          }}
                                          style={[styles.favoriteCardBorder, (index===0? styles.favoriteCardBorderFirstChild : {})]}>
                                    <TouchableOpacity style={[styles.favoriteCardContainer]}
                                                      onPress={()=>{
                                                          this.props.navigation.navigate("CardShow",{
                                                              isFavoritesOnly:true,
                                                              cardId:card.id
                                                          })
                                                      }}
                                                      activeOpacity={1}>
                                        <View style={[styles.favoriteCardCategoryCircle,{backgroundColor:this.categoryColor[card.type]}]} />
                                        <Text numberOfLines={1} style={styles.favoriteCardText}>
                                            {card.symptom}
                                        </Text>
                                    </TouchableOpacity>
                                </Swipeout>
                            )
                        })
                    )}
                </ScrollView>
                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.footerButton}
                                      activeOpacity={0.5}
                                      onPress={()=>{this.props.navigation.navigate("Home")}}>
                        <Image
                            source={require('src/assets/home_unpressed.png')}
                            style={styles.footerButtonIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton}
                                      activeOpacity={0.5}
                                      onPress={()=>{this.props.navigation.navigate("Home")}}>
                        <Image
                            source={require('src/assets/random_unpressed.png')}
                            style={styles.footerButtonIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton}
                                      activeOpacity={0.5}
                                      onPress={()=>{this.props.navigation.navigate("AddCard")}}>
                        <Image
                            source={require('src/assets/new_symptom_unpressed.png')}
                            style={styles.footerButtonIcon}
                        />
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
    },
    favoriteCardBorder: {
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: "#dcdcdc",
    },
    favoriteCardContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: "#fff",
        alignItems:'center',
        justifyContent:'center'
    },
    favoriteCardBorderFirstChild:{
        borderTopWidth: 1,
    },
    favoriteCardText: {
        flex: 1,
        width: "100%"
    },
    favoriteCardCategoryCircle: {
        borderRadius: 15,
        width: 10,
        height: 10,
        marginRight: 10
    }

});

export default withNavigation(Favorites);