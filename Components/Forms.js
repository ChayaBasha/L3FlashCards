import React, { Component } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-community/picker';


export default class DeckForm extends Component {

state ={
    name: '',
    description:'',
    createdBy: '',
    visibility: false,

}

setName(name) {
    this.setState({name})
}

setDescription(description) {
    this.setState({description})
}

setCreatedBy(createdBy) {
    this.setState({createdBy})
}


render(){
    const {name, description, createdBy, visibility}= this.state
    const {doAddDeck, currentUser} = this.props
    const owner = currentUser && currentUser.id

    return(

   <ScrollView style={styles.container}>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={name => this.setName(name)}
                        placeholder='enter Deck Name' />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={description => this.setDescription(description)}
                        placeholder='enter Deck description' />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={createdBy => this.setCreatedBy(createdBy)}
                        placeholder='enter creator name' />
                </View>

                <View style={styles.container}>
                    <Picker
                    selectedValue={this.state.visibility}
                    style={styles.textInput}
                    onValueChange={(itemValue) => {
                        
                        this.setState({visibility: itemValue})
                    }}
                    mode={'dropdown'}>
                        <Picker.Item label='Private' value='false'/>
                        <Picker.Item label='Public' value='true'/>
                        
                    </Picker>
                </View>

                <View style={[styles.buttonStlye, styles.contianer]}>
                    <Button color='rgb(40, 200, 40)' title='Add Deck' onPress ={()=> doAddDeck({name, description, createdBy, visibility, owner})} ></Button>
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