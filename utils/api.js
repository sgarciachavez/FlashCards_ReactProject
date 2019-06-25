import { AsyncStorage } from 'react-native'
import { _getSampleDecks } from './_DATA.js'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

export const FLASH_CARDS_KEY = 'FlashCards:decks'
export const FLASH_CARDS_NOTIFCATIONS = 'FlashCards:notifcations'


export function removeData(){
  AsyncStorage.removeItem(FLASH_CARDS_KEY)
}

export function setInitialDecks(){
  AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(_getSampleDecks()))
}

export function getDecks(){
  return AsyncStorage.getItem(FLASH_CARDS_KEY)
}

export function saveDeckTitle(title){
  AsyncStorage.mergeItem(FLASH_CARDS_KEY, JSON.stringify(title))
}

export function addCard(title, card){
  return AsyncStorage.getItem(FLASH_CARDS_KEY)
  .then((results) => {
    const data = JSON.parse(results)
    data[title].questions.push(card)
    AsyncStorage.mergeItem(FLASH_CARDS_KEY, JSON.stringify(data))
  })
}

export function getDeck(title){
  return AsyncStorage.getItem(FLASH_CARDS_KEY)
  .then((results) => {
    decks = JSON.parse(results)
    return decks[title]
  })
}

export function deleteDeck(key){
  return AsyncStorage.getItem(FLASH_CARDS_KEY)
  .then((results) => {
    const data = JSON.parse(results)
    data[key] = undefined
    delete data[key]
    AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(data))
  })
}

export function clearLocalNotification(){
  return AsyncStorage.removeItem(FLASH_CARDS_NOTIFCATIONS)
  .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification(){
  return {
    title: 'Take a Quiz!',
    body: "🎗 don't forget to take a quiz today.",
    ios:{
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification(){
  AsyncStorage.getItem(FLASH_CARDS_NOTIFCATIONS)
  .then(JSON.parse)
  .then((data) => {
    if(data === null){
      console.log("data is null")
      getNotificationAsync().then(() => {
        console.log("Success")
      }).catch(() => {
        console.log("Fail")
      })
    }
  })
}

async function alertIfRemoteNotificationsDisabledAsync() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('👋🏻 You might want to enable notifications for my app, to remind you to take a quiz.');
  }
}

async function getNotificationAsync() {
  // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
  const { status, permissions } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  .then((status) => {
    console.log(`Status == ${status['status']}`)
    if (status === 'granted') {
      Notifications.cancelAllScheduledNotificationsAsync()
      let tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(11)  //11 AM
      tomorrow.setMinutes(0)

      Notifications.scheduleLocalNotificationAsync(
        createNotification(),
        {
          time: tomorrow,
          repeat: 'day',
        }
      )

      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))

    } else {
      alertIfRemoteNotificationsDisabledAsync()
      throw new Error('NOTIFICATIONS permission not granted')
    }
  }).catch(() => {
    console.log('Error asking for Permissions')
  })
}
