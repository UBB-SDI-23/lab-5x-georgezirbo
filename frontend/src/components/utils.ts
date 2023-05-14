import {Token} from "../models/Token";
import {useNavigate} from "react-router-dom";
import {User} from "../models/User";
import axios from "axios";
import {BACKEND_API_URL} from "../../constants";

export function getToken(): Token  {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : ''
}

export function getUsername(): string {
    const auth = localStorage.getItem('auth');
    return auth ? JSON.parse(auth).username : 0
}

export function getUser(): number  {
    const auth = localStorage.getItem('auth');
    return auth ? parseInt(JSON.parse(auth).user_id) : 0
}

export function isVisitor(): boolean {
    const auth = localStorage.getItem('auth');
    if (auth){
        const Auth = JSON.parse(auth);
        return Auth.is_staff
    } else {
        return false;
    }
}

export function isUser(): boolean {
    const auth = localStorage.getItem('auth');
    if (auth){
        const Auth = JSON.parse(auth);
        return Auth.is_active;
    } else {
        return false;
    }
}

export function isModerator(): boolean {
    const auth = localStorage.getItem('auth');
    if (auth){
        const Auth = JSON.parse(auth);
        return Auth.is_staff
    } else {
        return false;
    }
}

export function isAdmin(): boolean {
    const auth = localStorage.getItem('auth');
    if (auth){
        const Auth = JSON.parse(auth);
        return Auth.is_superuser
    } else {
        return false;
    }
}


export function isTokenNotExpired() {
    const auth = localStorage.getItem('auth');
    if (!auth) return false;

    const tokenExp = auth ? JSON.parse(auth).exp : null;
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    return tokenExp > currentTime; // Compare current time with token's expiration time
}

export function logOut() {
    localStorage.setItem('token', '');
    localStorage.setItem('auth', '');
}

export async function getDefaultPageSize() {
    try {
        const response = await axios.get(`${BACKEND_API_URL}settings/pagesize/`);
        return parseInt(response.data.size);
    } catch (error) {
        console.error(error);
        throw new Error('Unable to retrieve default page size');
    }
}
