import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

const DeckNav = (props) => {
    const { showDeckForm, setEditView} = props

    return (
        <View style={styles.navBar}>
            <View>
                <Text style={styles.edit} onPress={()=> setEditView()}>Edit</Text>
            </View>
            <View>
                <FontAwesomeIcon style={styles.add} icon={faPlus} onPress={()=> showDeckForm()}/>
            </View>
        </View>
    )
}

const FlashCardNav = (props) => {
    const { currentDeck, nextCard, prevCard, showCardForm } = props

    return (
        <View style={styles.navBar}>
            <View>
                {(currentDeck.cards.length==0) ? (<Text></Text>): <FontAwesomeIcon style={styles.back} icon={faBackward} onPress={() => prevCard()} />}
            </View>
            <View>
                <Text style={styles.editControls} >Edit</Text>
            </View>
            <View>
                <FontAwesomeIcon style={styles.editControls} icon={faPlus} onPress={() => showCardForm()}/>
            </View>
            <View>
            {(currentDeck.cards.length==0) ? (<Text></Text>): <FontAwesomeIcon style={styles.next} icon={faForward} onPress={() => nextCard()} />}
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

    add:{
        color: 'rgb(40, 200, 40)',
        padding: 20,
        marginRight: 20,

    },
    edit: {
        color: 'rgb(40, 200, 40)',
        marginLeft: 20,
        fontSize: 30,
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

    },
    
    editControls: {
        color: 'rgb(40, 200, 40)'
    }


})

export { FlashCardNav, DeckNav };