import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';

export default class DeckList extends Component {
    state = {
        tableHead: ['', 'Name', 'Description', '# of Cards']
    }

    render() {
        const state = this.state;
        const { decks, setCurrentDeck } = this.props

        return (
            <ScrollView style={styles.container}>

                <View>

                    <Table>
                        <Row data={state.tableHead} style={styles.row} textStyle={styles.text} />
                        {
                            decks.filter((deck)=>deck.visibility).map((deck, index) => (
                                
                                <Row
                                    onPress={() => setCurrentDeck(deck)}
                                    key={index}
                                    data={[index + 1, deck.name, deck.description ? deck.description : "no description available", deck.cards ? deck.cards.length : 0]}
                                    widthArr={state.widthArr}
                                    style={styles.row}
                                    textStyle={styles.text}
                                />
                            )  )
                        }
                    </Table>

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


