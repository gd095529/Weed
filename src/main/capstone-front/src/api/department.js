import axios from "axios";

export async function departmentAPI() {
    try {
        const response = await axios.get('/department');

        return response.data;
    } catch (error) {
        console.log(error);
        return []; // 에러가 발생하면 빈 배열 반환
    }
}



