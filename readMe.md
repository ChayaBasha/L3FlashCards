# About L3Flashcards
Description: L3Flashcards is a flashcard application for fun or for studying.

History: The poject was build as part of a Regis University Course in October 2020

Author: Johanna Blumenthal

Tools and Langugages <br>
- Front End: ReactNative
- Back End: Java/Maven/Spring Boot
- Android Studio for Emulator
- Database: Mongo 

# Start Here
## Set Up Mongo DB
1. Make sure you create a database in your mongo called l3flashcards
2. You can seed the data using the .JSON file in this project. Simply Download the data and import it using mongoimport. https://docs.mongodb.com/database-tools/mongoimport/ 

```
mongoimport <options> <connection-string> <file>
```
3. Start the mongo database running using mongo command and entering the password

## Get the back end running
1. fork the API folder
2. navigate to the folder the API is in
3. Start the spring-boot
```
mvn spring-boot:run
```

## Get React Server Running
1. fork the reactNative code
2. open command line and start the project
``` 
npm start
```

## Get front end working
1. Open emulator
2. Start the project 
3. This code starts the project with the backend properly
```
adb reverse tcp:8080 tcp:8080 && react-native run-android
```

## Around with the deck

# Other Notes
This project is not fully completed. Currently the front end does not have register for new users. 

This is a sample project and is not production quality. 
