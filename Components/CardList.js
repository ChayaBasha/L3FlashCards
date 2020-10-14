import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import EditDeckView from './EditView';
import { FlashCardNav } from './NavBar';

export class CardList extends Component {

    state = {
        index: 0,
        cardSide: "frontCard"
    }



    flipCard = () => {
        if (this.state.cardSide == "frontCard") {
            this.setState({ cardSide: "backCard" })
        } else this.setState({ cardSide: "frontCard" })

    }

    nextCard = () => {
        if (this.state.index == this.props.currentDeck.cards.length - 1) {
            this.setState({ index: 0 })
        } else this.setState({ index: this.state.index + 1 })
    }

    prevCard = () => {
        if (this.state.index == 0) {
            this.setState({ index: this.props.currentDeck.cards.length - 1 })
        } else this.setState({ index: this.state.index - 1 })
    }

    render() {

        const { currentDeck, showEditView } = this.props
        console.log(showEditView);

        if(showEditView){
            return(
                <View>
                    <EditDeckView></EditDeckView>
                </View>
            )
            
        } if (currentDeck.cards.length == 0) {
            return (
                <View style={styles.flashcard}>
                    <Text style={styles.flashCardText}>"there are no cards for this deck"</Text>
                </View>
            )
        } else return (
            [<TouchableOpacity key={"card"} style={styles.flashcard} onPress={() => this.flipCard()}>
                {currentDeck.cards[this.state.index][this.state.cardSide].map((item, i) => {
                    return <Text style={styles.flashCardText} key={i}>{item} </Text>

                })}
            </TouchableOpacity>,
            <FlashCardNav nextCard={this.nextCard} prevCard={this.prevCard} key={"cardOrder"} />]
        )

    }
}

const styles = StyleSheet.create({
    flashcard: {
        borderColor: 'rgb(40,200,40)',
        borderWidth: 2,
        alignSelf: 'center',
        width: '80%',
        height: 200,
        marginTop: '10%'
    },

    flashCardText: {
        color: 'rgb(40,200,40)',
        fontSize: 30,
        textAlign: 'center',
        padding: 20
    }
})