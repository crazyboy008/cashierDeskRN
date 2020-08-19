import AsyncStorage from '@react-native-community/async-storage';
import { isJSON }  from './common'

export const setStorageAsync = async (key, value) => {
    try {
      if (typeof value === 'object') return await AsyncStorage.setItem(key, JSON.stringify(value))
      else return await AsyncStorage.setItem(key, value)
    } catch(e) {
        console.log('storage_error:', e)
    }
  }

export const getStorageAsync = async (key) => {
    try {
      const val = await AsyncStorage.getItem(key)
      if (val && isJSON(val)) return JSON.parse(val)
      else return val
    } catch(e) {
        console.log('storage_error:', e)
    }
  }

export const removeStorageAsync = async (key) => {
    try {
      return await AsyncStorage.removeItem(key)
    } catch(e) {
        console.log('storage_error:', e)
    }
  }
  
export const clearStorageAsync = async () => {
  try {
    return await AsyncStorage.clear()
  } catch(e) {
      console.log('storage_error:', e)
  }
}