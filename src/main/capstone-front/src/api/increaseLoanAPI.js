import axios from "axios";

export async function increaseLoanAPI(config) {
    try {
        const books = [];
        const response = await axios.get('/api/increase', {params: config});

        for (let i = 0; i < response.data.length; i++) {
            books.push(response.data[i]);
        }

       // console.log(response.data);

        return books;
    } catch (error) {
        console.log(error);
        return []; // 에러가 발생하면 빈 배열 반환
    }
}



