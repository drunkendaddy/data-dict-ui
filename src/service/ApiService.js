import axios from "axios";
import AuthService from "./auth";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 1000,
  headers: {
    'Authorization': "Bearer " + AuthService.getToken()
  }
});

const ApiService = {

  get(url) {
    return instance.get(url, {
      headers: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + AuthService.getToken()
      }
    })
      .then(res => res)
      .catch(reason => Promise.reject(reason));
  },

  delete(url, data) {
    return instance.delete(url, {
      headers: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + AuthService.getToken()
      }
    })
      .then(res => res)
      .catch(reason => Promise.reject(reason));
  },

  post(url, data) {
    return instance.post(url, data, {
      headers: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + AuthService.getToken()
      }
    })
      .then(res => res)
      .catch(reason => Promise.reject(reason));
  },

  put(url, data) {
    return instance.put(url, data, {
      headers: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + AuthService.getToken()
      }
    })
      .then(res => res)
      .catch(reason => Promise.reject(reason));
  }

};

export default ApiService;