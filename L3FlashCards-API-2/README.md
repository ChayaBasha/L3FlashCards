# Start Here
L3Flashcards is a flashcard application that allows the user to view public decks and create their own decks.

Currently there is one deck pre-loaded called US Presidents. The JSON file for this deck is contained in the decks.json file. Right now you can edit the President's deck because I haven't gotten the authentication implemented to prevent this. 

There is a shell of a deck called "Elements" this has no description and no cards in it as of yet.

There is also a "private" deck called "TestDeck"

You can also add new decks.

# Features that Work in PostMan
- Get ALl Decks
- Get Deck
- Add new Deck
- Add new card to deck
- Update Deck 
- Update Card in deck
- Delete Deck
- Delete Card in deck


# TODO
1. Fix default if user doesn't enter anything for
    - cardOrder gets messed up with a delted card need to change to index instead of card order in the filtering 
  
 

# Changes as of Week 5
1. Added User class
2. Added UserController
3. Added UserRepository
4. Tested posting for register and login 
5. Added Owner property to FCDeck class
6. Added default Date to the current Date
7. Changed Routing on the controller to go thorugh user login Tested posting deck; deleting deck, putting deck, posting card, putting card, delete  
8. Default cardOrder set indexed at 1
 
