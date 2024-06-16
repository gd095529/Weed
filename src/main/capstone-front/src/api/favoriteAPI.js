import axios from "axios";

export async function fetchFavoriteAPI() {
    try {
        const response = await axios.get('/favorite', { withCredentials: true});
        console.log(response.data);
        return response.data;
    } catch (error) {
        alert('로그인에 실패하였습니다.');
    }
}
