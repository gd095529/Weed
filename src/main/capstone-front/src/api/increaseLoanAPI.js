import axios from "axios";

export async function increaseLoanAPI(config) {
    try {
        const books = [];
        const response = await axios.get('/api/increase', {params: config});

         // for (let i = 0; i < response.data.length; i++) {
         //     books.push(response.data[i]);
         // }

         for (let i = 0; i < response.data.response.results.length; i++) {
             for (let j = 0; j < response.data.response.results[i].result.docs.length; j++) {
                 books.push(response.data.response.results[i].result.docs[j].doc);
             }
         }

        console.log(books);

        return books;
    } catch (error) {
        console.log(error);
        return []; // 에러가 발생하면 빈 배열 반환
    }
}



