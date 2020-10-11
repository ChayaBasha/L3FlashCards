import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const DecksSubHeading = (props) => {

    const { decks } = props

    return (
        <View>
            <Text style={styles.subHeadingText}>Decks</Text>
        </View>
    )
};

const CardsSubHeading = (props) => {
    const { currentDeck } = props

    return (
        <View>
            <Text style={styles.subHeadingText}>{currentDeck.name}</Text>
        </View>
    )
}

const LoginSubHeading = (props) => {
    const {showLogin} = props

    return(
        <View>
            <Text style = {styles.subHeadingText}>Enter LogIn Credentials</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    subHeadingText: {
        color: 'rgb(40, 200, 40)',
        fontSize: 24,
        textAlign: 'center'
    }
})


export { DecksSubHeading, CardsSubHeading, LoginSubHeading };