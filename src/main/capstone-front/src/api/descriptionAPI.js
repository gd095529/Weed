import axios from "axios";

export async function descriptionAPI(isbn) {
    try {
        const config = {
            member_id: '1',
            department_id: '1'
        }
        const response = await axios.get(`/api/books/${isbn}`, {params: config});

        return response.data.response.book;

    } catch (error) {
        console.log(error);
        return []; // 에러가 발생하면 빈 배열 반환
    }
}