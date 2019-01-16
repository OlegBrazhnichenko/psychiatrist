import React, {Component} from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class AnimatedButtonWithIcon extends Component {

    static propTypes = {
        iconPosition: PropTypes.string,
        icon: PropTypes.any,
        textImage: PropTypes.any,
        onPress: PropTypes.func,
    };

    render() {
        console.log(this.props);
        const textRotation = this.props.iconPosition === "left" ? "3deg" : "-3deg";

        return(
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={[styles.buttonStyle, {backgroundColor: this.props.color}]}
                                  onPress={() => this.props.onPress()}
                                  activeOpacity={0.7}
                >
                    <View style = {styles.buttonContentWrapper}>

                        {this.props.iconPosition && this.props.iconPosition === "left" && (
                            <Image style={[styles.buttonImageCommon, styles.icon]}
                                   source={this.props.icon} />
                        )}
                        <View style={[styles.buttonImageCommon, styles.textImageWrapper, {transform:[{ rotate: textRotation}] }]}>
                            <Image style={[styles.buttonImageCommon, styles.textImage]}
                                   source={this.props.textImage} />
                        </View>
                        {this.props.iconPosition && this.props.iconPosition === "right" && (
                            <Image style={[styles.buttonImageCommon, styles.icon]}
                                   source={this.props.icon} />
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        height: "65%",
        width: "90%",
    },
    textImageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '3deg'}]
    }
});