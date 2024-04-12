import axios from "axios";

const BACKEND_URL = "http://localhost:8080/api/";

class UserService{
    saveUser(user){
        return axios.post(BACKEND_URL+'login', user);
    }

    registerUser(user){
        return axios.post(BACKEND_URL+'register', user);
    }

}

export default new UserService();