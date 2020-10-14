import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Table, Row } from 'react-native-table-component';

import { DeckNav } from './NavBar';
import DeckForm from './Forms';

export default class DeckList extends Component {
    state = {
        tableHead: ['', 'Name', 'Description', '# of Cards'],
        showDeckForm: false
    }

    goToAddDeck = ()=>{
        console.log('onpress working')
        this.setState({showDeckForm:true})
    }

    async doAddDeck(deck) {
        const {currentUser} = this.props;

        await fetch(`http://localhost:8080/decks/user/${currentUser.id}`, {
           headers: {'Content-Type': 'application/json'}, 
        method: 'POST',
        body: JSON.stringify(deck)
        })
        .then(response => {
            console.log(response.status);
            this.props.loadDecks();
            return response.json();
        }). then(this.setState({showDeckForm: false}))
    }

    render() {
        const state = this.state;
        const { decks, setCurrentDeck, currentUser } = this.props
        const { showDeckForm } = this.state;

        return (
            <ScrollView style={{marginBottom:100}}>
            <View style={styles.container}>

 

                    <Table>
                        <Row data={state.tableHead} style={styles.row} textStyle={styles.text} />
                        {
                            decks.filter(currentUser ? ((deck) => (deck.owner == currentUser.id)) : ((deck) => deck.visibility)).map((deck, index) => (

                                <Row
                                    onPress={() => setCurrentDeck(deck)}
                                    key={index}
                                    data={[index + 1, deck.name, deck.description ? deck.description : "no description available", deck.cards ? deck.cards.length : 0]}
                                    widthArr={state.widthArr}
                                    style={styles.row}
                                    textStyle={styles.text}
                                />
                            ))
                        }
                    </Table>
                    <View>
                        {currentUser ? (<DeckNav currentUser={currentUser} goToAddDeck={()=>this.goToAddDeck()}/>) : (<Text> </Text>)}
                    </View>
                    <View>
                        {showDeckForm ? (<DeckForm doAddDeck = {deck => this.doAddDeck(deck)} currentUser={currentUser}/>) : (<Text></Text>)}
                    </View>





            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },

    text: {
        textAlign: 'center',
        fontWeight: '200',
        color: 'rgb(40, 200, 40)'
    },

    row: {
        borderWidth: 2,
        borderColor: 'rgb(40, 200, 40)'
    }
});


