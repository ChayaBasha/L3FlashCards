import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import DeckList from './DeckList';

const LoggedInMenu = (props) => {

    const { currentUser } = props

    return (
        <View>
            <Text style={styles.menu}>Hello {currentUser.userName}</Text>
        </View>
    )
};

const LoggedOutMenu = (props) => {
    const { goToLogin } = props

    return (
        <TouchableOpacity>
            <Text style={styles.menu} onPress={() => goToLogin()}>LogIn</Text>
        </TouchableOpacity>
    )
};

const FlashCardMenu = (props) => {
    const { currentDeck, showDeckList } = props

    return (
        <TouchableOpacity>
            <Text style={styles.menu} onPress={() => showDeckList()}>Decks</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    menu: {
        color: 'rgb(40,200,40)'
    }
})

export { LoggedInMenu, LoggedOutMenu, FlashCardMenu };