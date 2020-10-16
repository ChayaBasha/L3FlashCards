import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Table, Row } from 'react-native-table-component';

import { DeckNav } from './NavBar';
import DeckForm from './Forms';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons'

export default class DeckList extends Component {
    state = {
        tableHead: ['', 'Name', 'Description', '# of Cards', ''],
    }



    async doAddDeck(deck) {
        const { currentUser, setShowDeckForm } = this.props;

        await fetch(`http://localhost:8080/decks/user/${currentUser.id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(deck)
        })
            .then(response => {
                console.log(response.status);
                this.props.loadDecks();
                return response.json();
            })
        setShowDeckForm(false)
    }

    async doDeleteDeck(currentDeckId) {
        const {currentUser, setEditView} = this.props;

        await fetch(`http://localhost:8080/decks/${currentDeckId}/user/${currentUser.id}`, {
            method: 'DELETE'
        })
        .then(response => {
            console.log(response.status);
            this.props.loadDecks();
        })
        setEditView(false)
    }

    render() {
        const state = this.state;
        const { decks,
            setCurrentDeck, currentUser,
            currentDeck,
            showDeckForm, setShowDeckForm,
            setEditView, showEditView,
            setName, setDescription, setCreatedBy, setVisibility,
            visibility,
            doUpdateDeck } = this.props


        return (
            <ScrollView style={{ marginBottom: 100 }}>
                <View style={styles.container}>

                    <Table>
                        <Row data={state.tableHead} flexArr={[1, 2, 3, 2, 1]} style={styles.row} textStyle={styles.text} />
                        {
                            decks.filter(currentUser ? ((deck) => (deck.owner == currentUser.id)) : ((deck) => deck.visibility)).map((deck, index) => 
                                (<Row
                                    onPress={() => setCurrentDeck(deck)}
                                    key={index}
                                    data={[index + 1,
                                    deck.name,
                                    deck.description ? deck.description : "no description available",
                                    deck.cards ? deck.cards.length : 0,
                                    showEditView ? <FontAwesomeIcon style={styles.delete} icon={faMinus} onPress={() => this.doDeleteDeck(deck.id)}/> : <></>]}
                                    flexArr={[1, 2, 3, 2, 1]}
                                    style={styles.row}
                                    textStyle={styles.text}>
                                </Row>)
                            )
                        }
                    </Table>
                    <View>
                        {currentUser ? (
                            <DeckNav
                                doUpdateDeck={doUpdateDeck}
                                currentDeck={currentDeck} 
                                currentUser={currentUser}
                                showDeckForm={() => setShowDeckForm(true)} 
                                setEditView={() => setEditView(true)} 
                                showEditView={showEditView}
                                setName={setName} 
                                setDescription={setDescription} 
                                setCreatedBy={setCreatedBy} 
                                setVisibility={setVisibility}
                                visibility={visibility} 
                            />
                        ) : (<Text> </Text>)}
                    </View>
                    <View>
                        {showDeckForm ? (<DeckForm
                            doAddDeck={deck => this.doAddDeck(deck)}
                            currentUser={currentUser} setName={setName}
                            setDescription={setDescription} setCreatedBy={setCreatedBy} setVisibility={setVisibility}
                            visibility={visibility} />) : (<></>)}
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
    },
    delete:{
        color: 'rgb(40, 200, 40)'
    }
});


