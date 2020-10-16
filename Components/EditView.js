import React, { Component } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-community/picker';

export default class EditDeckView extends Component {

    state = { modifiedDeck: {} }

    componentDidMount() {
        this.setState({modifiedDeck: this.props.currentDeck});
    }
    setModifiedDeck = (deckChanges) => {
        this.setState({modifiedDeck:{...this.state.modifiedDeck, ...deckChanges}})
    }
    render() {
        const { doUpdateDeck,
            currentUser,
            } = this.props
        const { modifiedDeck } = this.state
        const owner = currentUser && currentUser.id

        return (

            <ScrollView style={styles.container}>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={name => this.setModifiedDeck({name})}
                        defaultValue={modifiedDeck.name} />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={description => this.setModifiedDeck({description})}
                        defaultValue={modifiedDeck.description} />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={createdBy => this.setModifiedDeck({createdBy})}
                        defaultValue={modifiedDeck.createdyBy} />
                </View>

                <View style={styles.container}>
                    <Picker
                        selectedValue={modifiedDeck.visibility + ''}
                        style={styles.textInput}
                        onValueChange={(itemValue) => {

                            this.setModifiedDeck({visibility: itemValue === 'true'})
                        }}
                        mode={'dropdown'}>
                        <Picker.Item label='Private' value='false' />
                        <Picker.Item label='Public' value='true' />

                    </Picker>
                </View>

                <View style={[styles.buttonStlye, styles.contianer]}>
                    <Button color='rgb(40, 200, 40)' title='Update Deck' onPress={() => doUpdateDeck(modifiedDeck)} ></Button>
                </View>

            </ScrollView>
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