import axios from "axios";

export async function booksAPI(isbn) {
    try {
        const response = await axios.get(`/books/${isbn}`, { withCredentials: true});
        console.log(response.data);
        return response.data;
    } catch (error) {
        alert('로그인에 실패하였습니다.');
    }
}
