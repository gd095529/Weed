import axios from "axios";

export async function readerAPI(isbn) {
    try {
        const books = [];
        const response = await axios.get(`/api/reader`, {params: { isbn: isbn } });

        for (let i = 0; i < response.data.response.docs.length; i++) {
            books.push(response.data.response.docs[i].book);
        }

        return books;
    } catch (error) {
        console.log(error);
        return []; // 에러가 발생하면 빈 배열 반환
    }
}



