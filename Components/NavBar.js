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

    }


})

export { FlashCardNav, DeckNav };