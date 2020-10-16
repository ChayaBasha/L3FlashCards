import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import EditDeckView from './EditView';
import { FlashCardNav } from './NavBar';
import { CardForm } from './Forms';

export class CardList extends Component {

    state = {
        index: 0,
        cardSide: "frontCard",
        showCardForm: false
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
    setShowCardForm = (boolean) => {
        this.setState({ showCardForm: boolean })
    }

    render() {

        const { doUpdateDeck, currentDeck, currentUser, showEditView,
            setName, setDescription, setCreatedBy, setVisibility,
            name, description, createdBy, visibility } = this.props

        const { showCardForm, cardSide } = this.state;

        if (showEditView) {
            return (
                <View>
                    <EditDeckView currentDeck={currentDeck}
                        currentUser={currentUser}
                        setName={setName} name={name}
                        setDescription={setDescription} description={description}
                        setCreatedBy={setCreatedBy} createdBy={createdBy}
                        setVisibility={setVisibility} visibility={visibility}
                        doUpdateDeck={doUpdateDeck}></EditDeckView>
                </View>
            )

        } if (showCardForm) {

            return (

                <CardForm style={styles.flashcard} 
                cardSide={cardSide} 
                flipCard={this.flipCard}
                setShowCardForm={this.setShowCardForm} 
                loadDecks={this.props.loadDecks}
                currentUser={currentUser}
                currentDeck={currentDeck}
                ></CardForm>
            )
        } if (currentDeck.cards.length == 0) {
            return (
                [<View style={styles.flashcard}>
                    <Text style={styles.flashCardText}>"there are no cards for this deck"</Text>
                </View>,
                <FlashCardNav 
                currentDeck={currentDeck} 
                showCardForm={() => this.setShowCardForm(true)} 
                />]
            )
        } else return (
            [<TouchableOpacity key={"card"} style={styles.flashcard} onPress={() => this.flipCard()}>
                {currentDeck.cards[this.state.index][this.state.cardSide].map((item, i) => {
                    return <Text style={styles.flashCardText} key={i}>{item} </Text>

                })}
            </TouchableOpacity>,
            <FlashCardNav 
                currentDeck={currentDeck} 
                nextCard={this.nextCard} 
                prevCard={this.prevCard} 
                key={"cardOrder"} 
                showCardForm={() => this.setShowCardForm(true)} 
                
            />]
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