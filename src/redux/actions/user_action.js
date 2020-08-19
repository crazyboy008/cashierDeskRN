import { requestLogin } from '@/utils/api'
import { getStorageAsync, setStorageAsync, clearStorageAsync } from '@/utils/storage';

export const REQUEST_USER = "REQUEST_USER";
export const USER_LOGIN = "USER_LOGIN";
export const CLEAR_USER = "CLEAR_USER";

export const login = (obj = {}) => {
    return async dispatch => {
        const response = await requestLogin(obj);
        setStorageAsync('STORAGE_USER', { ...response, username: obj.username });
        dispatch({
            type: USER_LOGIN,
            payload: { ...response, username: obj.username }
        })
        return { ...response, username: obj.username }
    }
}

export const getUserInfo = (obj = {}) => {
    return async dispatch => {
        const user = await getStorageAsync('STORAGE_USER') || {};
        dispatch({
            type: REQUEST_USER,
            payload: {
                ...user
            }
        })
        return user
    }
}

export const clearUserInfo = async () => {
    return async dispatch => {
        clearStorageAsync()
        dispatch({
            type: CLEAR_USER,
            payload: {}
        })
    }
}