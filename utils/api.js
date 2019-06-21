import { AsyncStorage } from 'react-native'
import { _getSampleDecks } from './_DATA.js'

export const FLASH_CARDS_KEY = 'FlashCards:decks'

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
