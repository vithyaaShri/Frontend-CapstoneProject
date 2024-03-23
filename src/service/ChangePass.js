import axios from 'axios'
import { getToken } from './AuthService';

const Base_URL= "http://localhost:8080/user";

// axios.interceptors.request.use(
//     function (config) {
//     config.headers["Authorization"]= getToken();
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });
 

  export const getUser=(name)=>axios.get(Base_URL+ "/" + name);
  export const modifyPassword=(user)=>axios.post(Base_URL,user);