import axios from "axios";

export async function descriptionAPI(isbn, config) {
    try {
        const books = [];
        const response = await axios.get(`/api/books/${isbn}`, {params: config});

        console.log(books);
        return response.data.response.book.description;

    } catch (error) {
        console.log(error);
        return []; // 에러가 발생하면 빈 배열 반환
    }
}