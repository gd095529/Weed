import axios from "axios";

export async function todayBooksAPI() {
    try {
        let today = new Date();
        let yesterday = new Date(today.setDate(today.getDate() - 1));
        let year = yesterday.getFullYear();
        let month = yesterday.getMonth() + 1 < 10 ? '0' + (yesterday.getMonth() + 1) : (yesterday.getMonth() + 1);
        let date = yesterday.getDate() < 10 ? '0' + yesterday.getDate() : yesterday.getDate();

        const config = {
            startDt: `${year}-${month}-${date}`
        };

        const response = await axios.get('/api/popular', { params: config });

        return response.data;
    } catch (error) {
        console.log(error);
        return []; // Return an empty array if an error occurs
    }
}
