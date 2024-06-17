import axios from "axios";

export async function sessionDIDAPI() {
    try {
        const response = await axios.get('/session/department_id', { withCredentials: true});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
