import axios from "axios";

export async function sessionAgeAPI() {
    try {
        const response = await axios.get('/session/age', { withCredentials: true});

        return response.data;
    } catch (error) {
        console.log(error)
    }
}
