import axios from "axios";

export async function sessionMIDAPI() {
    try {
        const response = await axios.get('/session/member_id', { withCredentials: true});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
