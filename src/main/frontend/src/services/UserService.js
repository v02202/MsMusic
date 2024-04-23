import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class UserService{
    saveUser(user){
        return axios.post(BACKEND_URL+'login', user);
    }

    registerUser(user){
        return axios.post(BACKEND_URL+'register', user);
    }

}

export default new UserService();