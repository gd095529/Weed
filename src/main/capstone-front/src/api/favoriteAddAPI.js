import axios from "axios";

export async function fetchFavoriteAddAPI(bookId) {
    try {
        const response = await axios.post(`/favorite/${bookId}`, {}, { withCredentials: true });

        if (response.status === 200) {
            console.log('즐겨찾기 추가 성공');
        }
    } catch (error) {
        console.error('즐겨찾기 추가 실패', error);
    }
}
