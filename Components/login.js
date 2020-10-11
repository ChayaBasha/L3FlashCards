import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Button } from 'react-native';

export default class Login extends Component {
    state = {
        currentUser: null,
        userName: '',
        password: ''
    }

    setUserName(userName) {
        this.setState({ userName })
    }

    setPassword(password) {
        this.setState({ password })
    }

    render() {
        const { userName, password, currentUser } = this.state
        const { doLogin } = this.props

        return (
            <ScrollView style={styles.container}>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={userName => this.setUserName(userName)}
                        placeholder='enter userName' />
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={password => this.setPassword(password)}
                        placeholder='enter password' />
                </View>

                <View style={styles.buttonStlye}>
                    <Button color='rgb(40, 200, 40)' title='Log Me In' onPress ={()=> doLogin({userName, password})} ></Button>
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        padding: 16,
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