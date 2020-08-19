import axios from 'axios';
import {
  Alert,
  ToastAndroid,
  Platform
} from 'react-native';
import { setStorageAsync, getStorageAsync } from './storage'

const service = axios.create({
    baseURL: 'http://sc-cc-portal.ktest.cashbus.com', // process.env.BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
  })

  service.interceptors.request.use(
  function(config) {
    // console.log('--config', config);
    const authorization = getStorageAsync('Authorization')
    if (authorization) {
        config.headers['Authorization'] = authorization
      }
    return config;
  },
  function(err) {
    let error = err.message || '请求出错，请稍后再试';
    if (Platform.OS === 'ios') Alert.alert('提示', error)
    else ToastAndroid.show(error, ToastAndroid.SHORT)
    return Promise.reject(error);
  },
);

// Add a response interceptor
service.interceptors.response.use(
  function(response) {
    // console.log('------response', response);
    let res = response.data
    if(response.headers['authorization']){
        setStorageAsync('Authorization', response.headers['authorization'])
    }
    switch (res.code) {
        case 200:
            return response.data
        case 500:
            let error = res.message || '请求出错，请稍后再试';
            if (Platform.OS === 'ios') Alert.alert('提示', error)
            else ToastAndroid.show(error, ToastAndroid.SHORT)
            Promise.reject(error);
        default:
            return response.data
    }
  },
  function(err) {
    let error = err.message || '请求出错，请稍后再试';
    if (Platform.OS === 'ios') Alert.alert('提示', error)
    else ToastAndroid.show(error, ToastAndroid.SHORT)
    return Promise.reject(error);
  },
);

export default service