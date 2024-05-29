import axios from "axios";

export async function loanBooks(config) {
    try {
        const books = [];
        const response = await axios.get('/api2/api/loanItemSrch', config);

        for (let i = 0; i < 25; i++) {
            books.push(
                {
                    url: response.data.response.docs[i].doc.bookImageURL,
                    title: response.data.response.docs[i].doc.bookname,
                    author: response.data.response.docs[i].doc.authors
                }
            )
        }
        return books;
    } catch (error) {
        console.log(error);
        return []; // 에러가 발생하면 빈 배열 반환
    }
}

export async function trendBooks(config) {
    try {
        const books = [];
        const response = await axios.get('/api2/api/hotTrend', config);

        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 5; i++) {
                books.push(
                    {
                        url: response.data.response.results[j].result.docs[i].doc.bookImageURL,
                        title: response.data.response.results[j].result.docs[i].doc.bookname,
                        author: response.data.response.results[j].result.docs[i].doc.authors
                    }
                )
            }
        }
        return books;
    } catch (error) {
        console.log(error);
        return []; // 에러가 발생하면 빈 배열 반환
    }
}

