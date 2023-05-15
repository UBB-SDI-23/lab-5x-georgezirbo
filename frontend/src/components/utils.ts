import {Token} from "../models/Token";
import {useNavigate} from "react-router-dom";
import {User} from "../models/User";
import axios from "axios";
import {BACKEND_API_URL} from "../../constants";
import jwt_decode from "jwt-decode";

export function getToken(): Token  {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : ''
}

// export function updateToken(): Token {
//     if (!isTokenActive()) {
//         const response = await axios.post(`${BACKEND_API_URL}/token/refresh/`, {
//             refresh: getToken().refresh ? getToken().refresh : "",
//         });
//         localStorage.setItem('token', JSON.stringify(response.data));
//         localStorage.setItem('auth', JSON.stringify(jwt_decode(response.data.access)));
//     }
// }
//
//
export function getAccessToken(): string  {
    const token = getToken();
    return token.access;
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

export function isTokenActive() {
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
