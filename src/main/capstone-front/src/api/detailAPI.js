import axios from "axios";

export async function detailAPI(isbn, config) {
    try {
        const response = await axios.get(`/api/books/${isbn}`, {params: config});

        console.log(response.data.response);

        return response.data.response;
    } catch (error) {
        console.log(error);
        return []; // 에러가 발생하면 빈 배열 반환
    }
}



