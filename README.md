# Flash Cards Project 

## Table of Contents

- [Description](#description)
- [Installation Instructions](#instructions)

## Description

This project was build for the purpose of fulfilling the requirements of the last project assignment for the 
React Nanodegree Program.  The project encompasses	the fundamental aspects of building a react native application.  
Features includes: 

 - Infinite lists handling
 - Routing - React Navigation
 - User Input
 - Splash Screen
 - Push Notifications
 - Animation

The application was tested with the Expo simulators for ios and Androd.  The push noticiations specifically 
were tested on a real device iPhone X. 

No starter code was provided. 


**All Decks View:** Opening the Flash Card Application will initially display a Splash Screen for 3 seconds and then route 
the user to an "All Decks" view. The "All Decks" view will initially be empty.  The user will create a new deck by clicking 
on "Add Deck" icon (bottom right corner).  All created decks will be listed in this view. Clicking on any individual deck
will route the user to the Deck Options View.  See description below. 


**Add Deck View:** The "Add Deck" View will display a form where the user provides a Deck title (40 chars max), a deck color 
(default is gray).  The color is used for the deck color and also as a theme color. Once the user clicks "Submit", the user 
will be routed to "Deck Options" View. Clicking on the deck will display an Animation.  To view the complete Animation
"press on" the deck for at least a second. 

**Deck Options View:** The Deck Options Views provides the user 3 options/buttons
 - Add Card - Routed to a form where the user will enter a Question and an Answer and click Submit
 - Take Quiz - The user will be displayed each card in the deck. The Question will be displayed 1st along with a  Flip card 
 button to reveal the Answer. When the answer is displayed the user will select "Yes" or "No" depending on weather the user
 guessed the answer correctly. Upon completing all questions, the user will be presented with their Quiz Results. Note: 
 Attempting to take a Quiz when the deck is emplty will display a pop-up to the user informing them, they cannot take a Quiz 
 with no cards in the deck. 
 - Delete Deck - User is asked to confirm their request to Delete the Deck, if "Yes" the user will be routed to the 
 "All Decks" View where the deleted deck will be removed from the view. 
 
 **Quiz Results View** The Quiz results view will display the user's results by percentage and also with numbers: for example
 4 / 5 (4 correct answers out of 5).  This view also provides 2 buttons.  
 -Retake Quiz - This re-starts the Quiz.
 -Back to Deck This routes the user back to the Deck Options View. 
 
 ## Installation
 1.  Navigate to the "FlashCards_ReactProject" Home in GitHub: https://github.com/sgarciachavez/FlashCards_ReactProject.git
 2.  Click on the green button titled "Clone or download"
 3.  Once you have cloned or downloaded the project run the following 2 commands in your terminal
 ```
npm install
npm start
```
or 
```
yarn install
yarn start
```
 
 
 
 
 
 

