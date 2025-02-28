import { toast } from "react-toastify";
import authAPIInstance from "./api";
import {AuthResponse} from "./types";

export async function login(email : string, password : string) {
    const response : AuthResponse = await authAPIInstance.post('/login', {
        email,
        password
    });
    localStorage.setItem("accessToken", response.accessToken);

}

function getIdWithToken(accessToken : string)  {
    const payloadBase64 = accessToken.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const payload = JSON.parse(decodedPayload);
    return payload.sub 
}

export async function getIsConnected() : Promise<boolean> {
    try {
        const token = localStorage.getItem("accessToken");
        const id = getIdWithToken(token!);
        await authAPIInstance.get(`/600/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true
    } catch (error) {
        console.error(error)
        return false;
    }
}

authAPIInstance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    toast.error(error.message);
    throw error;
});