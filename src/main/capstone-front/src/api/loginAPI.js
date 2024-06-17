import axios from "axios";

export function loginAPI(id, pwd, rememberId) {
    const config = {
        id: id,
        password: pwd,
        toURL: "/",
        rememberId: rememberId
    }
    try {
        const response = axios.post('/login', config);
        console.log(response + "로그인!!");
        return response;
    } catch (error) {
        console.log(error);
        return [];
    }
}