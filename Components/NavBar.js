import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

const DeckNav = (props) => {
    const { decks } = props

    return (
        <View style={styles.navBar}>
            <FontAwesomeIcon icon={faPlus} />
        </View>
    )
}

const FlashCardNav = (props) => {
    const { nextCard, prevCard } = props

    return (
        <View style={styles.navBar}>       
            <View>
            <FontAwesomeIcon style={styles.back} icon={faBackward} onPress={() => prevCard()} />
            </View>
            <View>
            <FontAwesomeIcon style={styles.next} icon={faForward} onPress={() => nextCard()} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },

    back: {
        color: 'rgb(40, 200, 40)',
        padding: 20,
        marginLeft: 20,
        
    },

    next: {
        color: 'rgb(40, 200, 40)',
        padding: 20,
        marginRight: 20,
        
    }


})

export { FlashCardNav, DeckNav };