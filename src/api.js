import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth"

export const RegisterUser = async (userdata)=>{
    try{
const response  = await axios.post (`${API_URL}/register`, userdata)
 return response.data 
}catch(error){
        return error.response ? error.response.data : { message: "Error occurredin registration backend" };
    }
}


export const loginUser = async (userdata)=>{
    try{

        const response = await axios.post(`${API_URL}/login`,userdata)
                 return response.data
    } catch (error){
        return error.response ? error.response.data : { message: "Error occurred in lohin frontend" };
    }
}