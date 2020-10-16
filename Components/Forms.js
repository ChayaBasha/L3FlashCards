import React, { Component } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Button } from 'react-native';
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

    render() {
        const { currentDeck, currentUser } = this.props

        return (
            <View style={styles.flashcard}>
                <View>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={title => setTitle(title)}
                        placeholder='enter Front Label' />
                </View>

                <View style={styles.flashcard}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={title => setSubTitle(title)}
                        placeholder='enter front sub label' />
                </View>

                
            </View>


        )
    }
}

const styles = StyleSheet.create({

    container: {
        padding: 4,
    },

    textInput: {
        padding: 12,
        width: 200,
        height: 40,
        backgroundColor: 'lightgrey',
        alignSelf: 'center',

    },

    buttonStlye: {
        width: '60%',
        alignSelf: 'center',
        padding: 16
    }
})