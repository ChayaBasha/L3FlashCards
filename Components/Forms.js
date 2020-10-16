import React, { Component } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Button, Text } from 'react-native';
import { Picker } from '@react-native-community/picker';


export default class DeckForm extends Component {


    render() {
        const { doAddDeck,
            currentUser,
            setName, name,
            setDescription, description,
            setCreatedBy, createdBy,
            setVisibility, visibility } = this.props
        const owner = currentUser && currentUser.id

        return (

            <ScrollView style={styles.container}>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={name => setName(name)}
                        placeholder='enter Deck Name' />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={description => setDescription(description)}
                        placeholder='enter Deck description' />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={createdBy => setCreatedBy(createdBy)}
                        placeholder='enter creator name' />
                </View>

                <View style={styles.container}>
                    <Picker
                        selectedValue={visibility}
                        style={styles.textInput}
                        onValueChange={(itemValue) => {

                            setVisibility(itemValue)
                        }}
                        mode={'dropdown'}>
                        <Picker.Item label='Private' value='false' />
                        <Picker.Item label='Public' value='true' />

                    </Picker>
                </View>

                <View style={[styles.buttonStlye, styles.contianer]}>
                    <Button color='rgb(40, 200, 40)' title='Add Deck' onPress={() => doAddDeck({ name, description, createdBy, visibility, owner })} ></Button>
                </View>

            </ScrollView>
        )
    }
}

export class CardForm extends Component {

    state = {
        frontCard: [],
        backCard: []
    }

    async doAddCard() {
        const{currentDeck, currentUser, setShowCardForm} = this.props;

        console.log(JSON.stringify(this.state))
        await fetch(`http://localhost:8080/decks/${currentDeck.id}/user/${currentUser.id}/cards`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(this.state),
          })
            .then(response => {
              console.log(response.status);
              this.props.loadDecks();
              return response.json();
            })
            setShowCardForm(false)
            
        }  
        
    render() {
        const { currentDeck, currentUser, cardSide, flipCard } = this.props
        const { frontCard, backCard } = this.state

        return (
            <>
                <View style={styles.flashcard}>

                    {(cardSide == "frontCard") ? (<><View>
                        <TextInput
                            value={frontCard[0]}
                            style={styles.textInput}
                            onChangeText={title => {
                                let cardCopy = [...frontCard];
                                cardCopy[0] = title;
                                this.setState({ frontCard: cardCopy });
                            }}
                            placeholder='enter Front Label' />
                    </View>

                        <View style={styles.container}>
                            <TextInput
                                value={frontCard[1]}
                                style={styles.textInput}
                                onChangeText={subTitle => {
                                    let cardCopy = [...frontCard];
                                    cardCopy[1] = subTitle;
                                    this.setState({ frontCard: cardCopy })
                                }}
                                placeholder='enter front sub label' />
                        </View></>) :
                        (<><View>
                            <TextInput
                                value={backCard[0]}
                                style={styles.textInput}
                                onChangeText={text => {
                                    let cardCopy = [...backCard];
                                    cardCopy[0] = text;
                                    this.setState({ backCard: cardCopy })
                                }}
                                placeholder='enter Back Text' />
                        </View>
                            <View style={styles.container}>
                                <TextInput
                                value={backCard[1]}
                                    style={styles.textInput}
                                    onChangeText={subText => {let cardCopy = [...backCard];
                                        cardCopy[1] = subText;
                                        this.setState({ backCard: cardCopy })
                                    }}
                                    placeholder='enterback text' />
                            </View></>)}

                    <View style={[styles.buttonStlye, styles.contianer]}>
                        <Button color='rgb(40, 200, 40)' title='Flip Card' onPress={() => flipCard()} ></Button>
                    </View>


                </View>

                <View style={[styles.buttonStlye, styles.contianer]}>
                    <Button color='rgb(40, 200, 40)' title='Add Card' onPress={()=> this.doAddCard()} ></Button>
                </View>
            </>

        )
    }
}

const styles = StyleSheet.create({

    container: {
        padding: 8,
    },

    flashcard: {
        borderColor: 'rgb(40,200,40)',
        borderWidth: 2,
        alignSelf: 'center',
        width: '80%',
        height: 200,
        marginTop: '10%'
    },

    textInput: {
        padding: 12,
        width: 200,
        height: 40,
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
        marginTop: 16,
        textAlign: 'center'

    },

    buttonStlye: {
        width: '60%',
        alignSelf: 'center',
        padding: 16
    }
})