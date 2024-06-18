import axios from "axios";

export async function findID(email, name) {
    try {
        const config = {
            email: email,
            name: name
        }
        const response = await axios.post('/join/find_id');
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }

}