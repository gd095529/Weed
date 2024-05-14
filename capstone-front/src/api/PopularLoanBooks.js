import axios from "axios";
import {parseStringPromise} from "xml2js";

export async function fetchBooks(start, end, maxPage) {
    try {
        const books = [];
        const response = await axios.get('/api2/api/loanItemSrch', {
            params: {
                authKey: 'cc355482ccb755beacd4ba6f7134c20c6b59a237e1ee656a155a6ed3a2003941',
                pageSize: `${maxPage}`,
                startDt: '2023-01-01',
                endDt: '2024-05-01',
                from_age: '20',
                to_age: '30'

            }
        });
        const result = await parseStringPromise(response.data);
        for (let i = start; i < end; i++) {
            books.push(
                {
                    url: result.response.docs[0].doc[i].bookImageURL[0],
                    title: result.response.docs[0].doc[i].bookname[0]
                }
            )
        }

        /**
        const books = result.response.docs[0].doc.map(doc => ({
            url: doc.bookImageURL[0],
            title: doc.bookname[0]
        }));
        */
        return books;
    } catch (error) {
        console.log(error);
        return []; // 에러가 발생하면 빈 배열 반환
    }
}

