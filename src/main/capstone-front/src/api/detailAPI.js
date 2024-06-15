import axios from "axios";

export async function detailAPI(isbn, config) {
    try {
        const books = [];
        const response = await axios.get(`/api/books/${isbn}`, {params: config});

        for (let i = 0; i < response.data.length; i++) {
            books.push(response.data[i]);
        }

        console.log(response);

        return books;
    } catch (error) {
        console.log(error);
        return []; // 에러가 발생하면 빈 배열 반환
    }
}



