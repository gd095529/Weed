import axios from "axios";

export async function fetchFavoriteDelAPI(favoriteId, bookId) {
    try {
        const response = await axios.delete(`/favorite/${favoriteId}`, {
            data: { book_id: bookId },
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });

        if (response.status === 200) {
            console.log('삭제 성공');
        } else {
            console.error(response);
        }
    } catch (error) {
        console.error('삭제 요청 중 오류 발생', error);
    }
}
