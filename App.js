import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import DeckList from './Components/DeckList';
import { DecksSubHeading, CardsSubHeading, LoginSubHeading } from './Components/SubHeading';
import { CardList } from './Components/CardList';
import { FlashCardMenu, LoggedInMenu, LoggedOutMenu } from './Components/Menu';
import Login from './Components/login';


class App extends Component {
  state = {
    decks: [],
    currentDeck: null,
    currentUser: null,
    showLogin: false
  }

  async componentDidMount() {
    await this.loadDecks();
  }

  loadDecks = async () => {
    await fetch("http://localhost:8080/decks", {
      method: 'GET'
    })
      .then(response => {
        console.log(response.status);
        return response.json();
      })
      .then(json => {
        this.setState({ decks: json });
      });
  }

  setCurrentDeck = (deck) => {
    this.setState({ currentDeck: deck })
  }

  setCurrentUser = (user) => {
    console.log("Setting the user");
    this.setState({ currentUser: user, showLogin: false })
  }

  showDeckList = () => {
    this.setState({ currentDeck: null })
  }

  goToLogin = () => {
    this.setState({ currentUser: null, showLogin: true })
  }

  doLogin = async (user) => {
    await fetch("http://localhost:8080/login", {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(user),
    })
      .then(response => {
        console.log(response.status);
        return response.json();
      })
      .then(json => {
        this.setCurrentUser(json)
      })
  }

  doLogOut = () => {
    this.setState({ currentUser: null, showLogin: false, showDeckList: false, showDeckForm: false })
  }

  render() {
    const { decks, currentDeck, currentUser, showLogin, showDeckForm } = this.state

    return (
      <>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.headerText}>L3FlashCards</Text>
          </View>
          <View style={styles.base}>
            <View style={styles.menu}>
              {currentUser ? (<LoggedInMenu currentUser={currentUser} doLogOut={this.doLogOut} />) : <LoggedOutMenu goToLogin={this.goToLogin} />}
              {currentDeck ? (<FlashCardMenu showDeckList={this.showDeckList} />) : <></>}
            </View>
            <View style={styles.subHeader}>
              {showLogin ? (<LoginSubHeading />) : currentDeck ? (<CardsSubHeading currentDeck={currentDeck} />) : <DecksSubHeading currentUser={currentUser} />}
            </View>

            <View>
              {showLogin ? 
                (<Login doLogin={this.doLogin} />) : 
                currentDeck ? 
                  (<CardList currentDeck={currentDeck} currentUser={currentUser} />) : 
                  <DeckList loadDecks= {this.loadDecks} decks={decks} setCurrentDeck={this.setCurrentDeck} currentUser={currentUser} showDeckForm={showDeckForm} />}
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>  © 2020 Johanna Blumenthal</Text>
          </View>
        </View>

      </>
    );

  };
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  base: {
    backgroundColor: 'cornsilk',
    flex: 7,
  },
  header: {
    backgroundColor: 'rgb(40, 200, 40)',
    alignSelf: 'center',
    flex: 1,
    width: '100%',
  },
  headerText: {
    fontSize: 30,
    color: 'cornsilk',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowRadius: 4,
    padding: 10,
    fontFamily: 'Courier New'
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  subHeader: {
    backgroundColor: 'cornsilk',
  },

  footer: {
    backgroundColor: 'rgb(40, 200, 40)',
    alignSelf: 'flex-end',
    width: '100%',
    marginBottom: 0,
    flex: 1
  },

  footerText: {
    color: 'cornsilk',
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Courier New'
  }

})

export default App
