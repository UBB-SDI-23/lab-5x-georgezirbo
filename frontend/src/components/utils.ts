import {Token} from "../models/Token";
import {useNavigate} from "react-router-dom";
import {User} from "../models/User";
import axios from "axios";
import {BACKEND_API_URL} from "../../constants";

export function getToken(): Token | null {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null
}

export function getUsername(): string | null {
    const username = localStorage.getItem('username')
    return username ? username : null
}

export function isTokenNotExpired() {
    const token = getToken()
    if (!token) return false; // If token is not provided, consider it expired

    const tokenExp = token.exp;
    if (!tokenExp) return false; // If token expiration time is not provided, consider it expired

    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    return tokenExp > currentTime; // Compare current time with token's expiration time
}

export function logOut() {
    localStorage.setItem('token', '');
    localStorage.setItem('username', '');
}

