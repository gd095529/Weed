import axios from "axios";

export async function removeAPI(pwd) {
    try {
        return await axios.delete('/join/remove', {data: {password: pwd}});

    } catch (error) {
        console.log(error);
    }

}