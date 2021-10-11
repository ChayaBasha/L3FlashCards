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
    showLogin: false,
    showDeckForm: false,
    showEditView: false,
    name: '',
    description: '',
    createdBy: '',
    visibility: false,
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

  setEditView = (boolean) => {
    this.setState({ showEditView: boolean })
  }

  setCurrentUser = (user) => {
    this.setState({ currentUser: user, showLogin: false })
  }

  showDeckList = () => {
    this.setState({ currentDeck: null, showEditView: false, showDeckForm:false })
  }

  goToLogin = () => {
    this.setState({ currentUser: null, showLogin: true })
  }

  setShowDeckForm = (boolean) => {
    this.setState({ showDeckForm: boolean })
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

  async doUpdateDeck(deck) {
    const{currentUser, currentDeck} = this.state;

    await fetch(`http://localhost:8080/decks/${currentDeck.id}/user/${currentUser.id}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify(deck)
    }).then(response=> {
        console.log(response.status);
        this.loadDecks();
        return response.json();
    })
    this.setEditView(false)
}

  doLogOut = () => {
    this.setState({ currentDeck:null, currentUser: null, showLogin: false, showDeckList: false, showDeckForm: false, showEditView: false })
  }

  setName = (name) => {
    this.setState({ name })
  }

  setDescription= (description) => {
    this.setState({ description })
  }

  setCreatedBy = (createdBy) => {
    this.setState({ createdBy })
  }

  setVisibility =(boolean) => {
    this.setState({visibility:boolean})
  }


  render() {
    const { decks, currentDeck, 
      currentUser, showLogin, 
      showDeckForm, showEditView, 
      name, description, createdBy, visibility } = this.state

    return (
      <>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.headerText}>L3FlashCards</Text>
          </View>
          <View style={showEditView? styles.editBase : styles.base}>
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
                  (<CardList
                    currentDeck={currentDeck}
                    currentUser={currentUser}
                    setEditView={this.setEditView} showEditView={showEditView}
                    setName={this.setName} name={name}
                    setDescription={this.setDescription} description={description}
                    setCreatedBy={this.setCreatedBy} createdBy={createdBy}
                    setVisibility={this.setVisibility} visibility={visibility}
                    doUpdateDeck={deck => this.doUpdateDeck(deck)}
                    loadDecks={this.loadDecks}
                    deckLength={currentDeck.length}
                  />) :
                  <DeckList
                    loadDecks={this.loadDecks} decks={decks}
                    setCurrentDeck={this.setCurrentDeck}
                    currentDecl={currentDeck}
                    currentUser={currentUser}
                    setShowDeckForm={this.setShowDeckForm} showDeckForm={showDeckForm}
                    setEditView={this.setEditView} showEditView={showEditView}
                    setName={this.setName} name={name}
                    setDescription={this.setDescription} description={description}
                    setCreatedBy={this.setCreatedBy} createdBy={createdBy}
                    setVisibility={this.setVisibility} visibility={visibility}
                    doUpdateDeck={deck => this.doUpdateDeck(deck)}

                  />}
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
  editBase: {
    backgroundColor: 'rgb(242, 220, 235)', 
    flex:7
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
