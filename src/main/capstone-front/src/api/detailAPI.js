import axios from "axios";

export async function detailAPI(isbn, config) {
    try {
        console.log("디테일 요청 전");
        const response = await axios.get(`/api/books/${isbn}`, {params: config});
        console.log("디테일 요청 후");
        console.log(response.data.response);

        return response.data.response;
    } catch (error) {
        console.log("요청 제대로 안되서 에러 나옴");
        console.log(error);
        return []; // 에러가 발생하면 빈 배열 반환
    }
}



