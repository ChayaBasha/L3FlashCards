import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


const LoggedInMenu = (props) => {

    const { doLogOut } = props

    return (
        
            <TouchableOpacity>
                <Text style={styles.menu} onPress={()=> doLogOut()}>LogOut</Text>
            </TouchableOpacity>

        
    )
};

const LoggedOutMenu = (props) => {
    const { goToLogin } = props

    return (
        <TouchableOpacity>
            <Text style={styles.menu} onPress={() => goToLogin()}>LogIn</Text>
        </TouchableOpacity>
    )
};

const FlashCardMenu = (props) => {
    const {showDeckList } = props

    return (
        <TouchableOpacity>
            <Text style={styles.menu} onPress={() => showDeckList()}>Decks</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    menu: {
        color: 'rgb(40,200,40)'
    }

})

export { LoggedInMenu, LoggedOutMenu, FlashCardMenu };