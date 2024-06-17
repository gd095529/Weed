import axios from "axios";

export function logoutAPI() {
    try {
        const response = axios.get('/logout');
        console.log(response + "로그아웃!!");
        return response;
    } catch (error) {
        console.log(error);
        return [];
    }
}