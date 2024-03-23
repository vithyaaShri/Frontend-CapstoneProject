import axios from 'axios'
import { getToken } from './AuthService';

const Base_URL= "http://localhost:8080/api/bus";
const Base_URL1="http://localhost:8080/api/bus/updateAvailableTickets"
axios.interceptors.request.use(
    function (config) {
    config.headers["Authorization"]= getToken();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

 export const getAllBus=()=>axios.get(Base_URL);

 export const getBus=(id)=>axios.get(Base_URL+ "/" + id);

 export const addBus=(bus)=>axios.post(Base_URL,bus);

 export const updateBus=(id,bus)=>axios.put(Base_URL+"/"+id,bus);

 export const deleteBus=(id)=>axios.delete(Base_URL+"/"+id);

 export const updateTickets=(busid,num)=>axios.put(Base_URL1+"/"+busid+"/"+num);