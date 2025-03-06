import { toast } from "react-toastify";
import authAPIInstance from "./api";
import {AuthLoginResponse, AuthSignupResponse, User} from "./types";
import { NavigateFunction } from "react-router-dom";

export async function login(email : string, password : string, isStayConnected: boolean) {
    const response : AuthLoginResponse = await authAPIInstance.post('/login', {
        email,
        password
    });
    isStayConnected ?
        localStorage.setItem("accessToken", response.accessToken) :
        sessionStorage.setItem("accessToken", response.accessToken);
}

export function getToken() : string {
    return localStorage.getItem("accessToken") ? localStorage.getItem("accessToken")! : sessionStorage.getItem("accessToken")!
}

export async function signup(email : string, password : string) {
    const response : AuthSignupResponse = await authAPIInstance.post('/signup', {
        email,
        password,
        followers: [],
        followings: []
    })
    localStorage.setItem("accessToken", response.accessToken);
}

export function getIdWithToken(accessToken : string) : number {
    const payloadBase64 = accessToken.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const payload = JSON.parse(decodedPayload);
    return parseInt(payload.sub)
}

export async function getIsConnected() : Promise<boolean> {
    try {
        const token = getToken();
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

export const getUserEmailById = async (id: number) => {
    const user: User = await authAPIInstance.get(`/users/${id}`);
    return user.email;
}

authAPIInstance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    
    toast.error(error.response.data);
    throw error;
});

export const disconnect = (navigate: NavigateFunction) => {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');
    navigate('/login');
};

export const handleSignupSubmit = async (e: any, email: string, password: string, passwordConfirmation: string, navigate: NavigateFunction) => {
    e.preventDefault();
    if (password === passwordConfirmation) {
        await signup(email, password);
        navigate('/');
    } else
        toast.error(`The passwords aren't the same`)
}

export const handleLoginFormSubmit = async (e: any, email: string, password: string, navigate: NavigateFunction, isStayConnected: boolean) => {
    e.preventDefault();
    await login(email, password, isStayConnected);
    navigate('/');
};