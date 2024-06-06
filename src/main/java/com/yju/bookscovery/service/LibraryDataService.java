package com.yju.bookscovery.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yju.bookscovery.config.ApiConfig;
import com.yju.bookscovery.dao.BookCountDao;
import com.yju.bookscovery.dao.BookDao;
import com.yju.bookscovery.dao.SearchHistoryDao;
import com.yju.bookscovery.dto.BookCountDto;
import com.yju.bookscovery.dto.BookDto;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
public class LibraryDataService {

    private final ApiConfig apiConfig;
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    private final BookDao bookDao;
    private final SearchHistoryDao searchHistoryDao;
    private final BookCountDao bookCountDao;

    public LibraryDataService(BookCountDao bookCountDao, SearchHistoryDao searchHistoryDao, BookDao bookDao, ApiConfig apiConfig, WebClient.Builder webClientApiReq, ObjectMapper objectMapper) {
        this.apiConfig = apiConfig;
        this.webClient = webClientApiReq.build();
        this.objectMapper = objectMapper;
        this.bookDao = bookDao;
        this.searchHistoryDao = searchHistoryDao;
        this.bookCountDao = bookCountDao;
    }

    //책상세보기 완
    public Mono<JsonNode> getLoanAnalyze(String isbn, Integer member_id, Integer department_id) {
        String baseUrl = apiConfig.getLOAN_ANALYZE_URL() + "&authKey=" + apiConfig.getLIBRARY_API_KEY() + "&isbn13=" + isbn;;

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(baseUrl);

        String url = uriBuilder.toUriString();

        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(response -> {
                    System.out.println("API Response: {}"+ response); //체킹용
                    try {
                        // JSON 응답을 파싱하여 필요한 데이터만 추출
                        JsonNode jsonNode = objectMapper.readTree(response);
                        JsonNode bookJson = jsonNode.path("response").path("book");

                        // 필요한 데이터 추출
                        String bookname = bookJson.path("bookname").asText();
                        String authors = bookJson.path("authors").asText();
                        String publisher = bookJson.path("publisher").asText();
                        String bookImageURL = bookJson.path("bookImageURL").asText();
                        String class_no = bookJson.path("class_nm").asText();
                        int publication_year = bookJson.path("publication_year").asInt();
                        int loan_count = bookJson.path("loanCnt").asInt();

                        // DB 저장
                        Integer book_id = bookDao.checkByISBN(isbn);
                        if(book_id == 0 || book_id == null){
                            BookDto dto = new BookDto(null, bookname, isbn, authors, publisher, bookImageURL, publication_year, class_no, loan_count);
                            bookDao.insertBook(dto);
                            book_id = bookDao.checkByISBN(isbn);
                        }

                        Integer book_count_id = bookCountDao.check(department_id,book_id);
                        if(book_count_id == 0 || book_count_id == null){
                            bookCountDao.insertBook(department_id, book_id);
                        }else {
                            BookCountDto dto = bookCountDao.selectBook(book_count_id);
                            bookCountDao.updateBook(dto);
                        }
                        
                        searchHistoryDao.insertHistroy(member_id, book_id);

                        return Mono.just(jsonNode);
                    } catch (Exception e) {
                        return Mono.error(e);
                    }
        });
    }

    //인기 대출 도서 조회(일, 주, 월)(기간,성별,연령,대주제,세부주제,) 0이 1등 //테스트완
    public Mono<List<BookDto>> getPopularLoan(
            @RequestParam(required = false) String pageNo,
            @RequestParam(required = false) String pageSize,
            @RequestParam(required = false) String startDt,
            @RequestParam(required = false) String endDt,
            @RequestParam(required = false) Integer from_age,
            @RequestParam(required = false) Integer to_age,
            @RequestParam(required = false) Integer gender,
            @RequestParam(required = false) String kdc,
            @RequestParam(required = false) String dtl_kdc){
        String baseUrl = apiConfig.getPOPULAR_URL() + "&authKey=" + apiConfig.getLIBRARY_API_KEY();

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(baseUrl);
        //+ "&pageNo=" + pageNo + "&pageSize=" + pageSize + "&startDt="+ startDt +"&endDt="+ endDt
        //+ "&from_age=" + from_age + "&to_age=" + to_age + "&gender=" + gender;둘중하나가능 + "&kdc=2&dtl_kdc=12;13";

        if(pageNo != null && !pageNo.isEmpty()){
            uriBuilder.queryParam("pageNo", pageNo);
        }
        if(pageSize != null && !pageSize.isEmpty()) {
            uriBuilder.queryParam("pageSize", pageSize);
        }
//        if(startDt != null && !startDt.isEmpty()) {
//            uriBuilder.queryParam("startDt", startDt);
//        }
//        if(endDt != null && !endDt.isEmpty()) {
//            uriBuilder.queryParam("endDt", endDt);
//        }
        if(from_age != null) {
            uriBuilder.queryParam("from_age", from_age);
        }
        if(to_age != null) {
            uriBuilder.queryParam("to_age", to_age);
        }
        if(gender != null) {
            uriBuilder.queryParam("gender", gender);
        }
        if(dtl_kdc != null && !dtl_kdc.isEmpty()){
            uriBuilder.queryParam("dtl_kdc", dtl_kdc);
        }else{
            uriBuilder.queryParam("kdc", kdc);
        }

        String url = uriBuilder.toUriString();
        System.out.println("ORIGIN "+"http://data4library.kr/api/loanItemSrch?format=json&authKey=cc355482ccb755beacd4ba6f7134c20c6b59a237e1ee656a155a6ed3a2003941&pageNo=1&pageSize=10&startDt=2022-01-01&endDt=2022-02-01&dtl_kdc=12;13;14;15;16;17&from_age=40&to_age=45&gender=1");
        System.out.println("MY URL "+url);
        System.out.println("날짜"+startDt+endDt);

        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(response -> {
                    System.out.println("PopularAPI Response: {}"+ response); //체킹용
                    try {
                        List<BookDto> bookList = new ArrayList<>();
                        // JSON 응답을 파싱하여 필요한 데이터만 추출
                        JsonNode jsonNode = objectMapper.readTree(response);
                        // 예시: 필요한 데이터만 추출
                        JsonNode bookJson = jsonNode.path("response").path("docs");
                        System.out.println("JsonNode "+bookJson);
                        //.get(0).path("doc");
                        for (JsonNode booknode : bookJson){
                            JsonNode book = booknode.path("doc");
                            BookDto dto = new BookDto();
                            dto.setBookname(book.path("bookname").asText());
                            dto.setAuthor(book.path("authors").asText());
                            dto.setPublisher(book.path("publisher").asText());
                            dto.setPublication_year(book.path("publication_year").asInt());
                            dto.setClass_no(book.path("class_nm").asText());
                            dto.setLoan_count(book.path("loanCnt").asInt());
                            dto.setBook_image_URL(book.path("bookImageURL").asText());
                            dto.setIsbn(book.path("isbn13").asText());
                            bookList.add(dto);
                            System.out.println("bookListDTO "+dto);
                        }
                        System.out.println("bookList "+bookList);
                        return Mono.just(bookList);
                    } catch (Exception e) {
                        return Mono.error(e);
                    }
                });
    }

    //마니아 추천(양)

    //다독자 추천(양)

    //도서 상세조회(detail거의안씀 - > 도서 이용분석analyze)

    //대출 급상승 도서(양)

    //도서 검색리스트(제목,작가,키워드)(정렬)


}
