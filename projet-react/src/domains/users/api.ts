import axios from "axios";

const usersAPIInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000
});

export default usersAPIInstance;