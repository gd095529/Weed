package com.yju.bookscovery.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.yju.bookscovery.config.ApiConfig;
import com.yju.bookscovery.dao.BookCountDao;
import com.yju.bookscovery.dao.BookDao;
import com.yju.bookscovery.dao.KeywordDao;
import com.yju.bookscovery.dao.SearchHistoryDao;
import com.yju.bookscovery.dto.BookCountDto;
import com.yju.bookscovery.dto.BookDto;
import com.yju.bookscovery.dto.KeywordDto;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
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
    private final KeywordService keywordService;

    public LibraryDataService(BookCountDao bookCountDao, SearchHistoryDao searchHistoryDao, BookDao bookDao, ApiConfig apiConfig, WebClient.Builder webClientApiReq, ObjectMapper objectMapper, KeywordService keywordService) {
        this.apiConfig = apiConfig;
        this.webClient = webClientApiReq.build();
        this.objectMapper = objectMapper;
        this.bookDao = bookDao;
        this.searchHistoryDao = searchHistoryDao;
        this.bookCountDao = bookCountDao;
        this.keywordService = keywordService;
    }

    private Mono<JsonNode> getJsonNodeMono(String url){
        System.out.println("url = " + url);
        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(response -> {
                    try {
                        JsonNode jsonNode = objectMapper.readTree(response);
                        return Mono.just(jsonNode);
                    } catch (Exception e) {
                        return Mono.error(e);
                    }
                });
    }

    //책상세보기 완 http://data4library.kr/api/usageAnalysisList?format=json&
    public Mono<JsonNode> getLoanAnalyze(String isbn, Integer member_id, Integer department_id) {
        String baseUrl = apiConfig.getLOAN_ANALYZE_URL() + "&authKey=" + apiConfig.getLIBRARY_API_KEY() + "&isbn13=" + isbn;

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(baseUrl);

        String url = uriBuilder.toUriString();
        System.out.println("url = " + url);

        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(response -> { //나오는것 확인
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
                        if(book_id == null || book_id == 0 ){
                            BookDto dto = new BookDto(null, bookname, isbn, authors, publisher, bookImageURL, publication_year, class_no, loan_count);
                            bookDao.insertBook(dto);
                            book_id = bookDao.checkByISBN(isbn);
                        }
                        Integer book_count_id = bookCountDao.check(department_id, book_id);
                        if(book_count_id == null || book_count_id == 0){
                            bookCountDao.insertBook(department_id, book_id);
                        }else {
                            BookCountDto dto = bookCountDao.selectBook(book_count_id);
                            bookCountDao.updateBook(dto);
                        }

                        searchHistoryDao.countHistory(); // 왜했지?
                        searchHistoryDao.insertHistroy(member_id, book_id);

                        return Mono.just(jsonNode);
                    } catch (Exception e) {
                        return Mono.error(e);
                    }
        });
    }

    //인기 대출 도서 조회(일, 주, 월)(기간,성별,연령,대주제,세부주제,) 0이 1등 //테스트완
    //나중에 기간체크후 db에서 꺼낼지 말지 선택해야함
    public Mono<List<BookDto>> getPopularLoan(
            @RequestParam(required = false) String pageNo,
            @RequestParam(required = false) String pageSize,
            @RequestParam(required = false) String startDt,//yyyy-mm-dd
            @RequestParam(required = false) String endDt,
            @RequestParam(required = false) Integer age,
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
        if(startDt != null && !startDt.isEmpty()) {
            uriBuilder.queryParam("startDt", startDt);
        }
        if(endDt != null && !endDt.isEmpty()) {
            uriBuilder.queryParam("endDt", endDt);
        }
        if(age != null) {
            uriBuilder.queryParam("age", age);
        }else{
            if(from_age != null) {
                uriBuilder.queryParam("from_age", from_age);
            }
            if(to_age != null) {
                uriBuilder.queryParam("to_age", to_age);
            }
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
        System.out.println("url = " + url);

        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(response -> {
                    try {
                        List<BookDto> bookList = new ArrayList<>();
                        // JSON 응답을 파싱하여 필요한 데이터만 추출
                        JsonNode jsonNode = objectMapper.readTree(response);
                        // 예시: 필요한 데이터만 추출
                        JsonNode bookJson = jsonNode.path("response").path("docs");
                        //.get(0).path("doc");
                        for (JsonNode booknode : bookJson){
                            JsonNode book = booknode.path("doc");
                            BookDto dto = new BookDto();
                            dto.setBookname(book.path("bookname").asText());
                            dto.setAuthors(book.path("authors").asText());
                            dto.setPublisher(book.path("publisher").asText());
                            dto.setPublication_year(book.path("publication_year").asInt());
                            dto.setClass_no(book.path("class_nm").asText());
                            dto.setLoan_count(book.path("loanCnt").asInt());
                            dto.setBook_image_URL(book.path("bookImageURL").asText());
                            dto.setIsbn(book.path("isbn13").asText());
                            bookList.add(dto);
                        }
                        return Mono.just(bookList);
                    } catch (Exception e) {
                        return Mono.error(e);
                    }
                });
    }

    //도서 검색->리스트(제목,작가,키워드)(정렬)
    public Mono<JsonNode> searchBook(@RequestParam(required = false) String bookname,
                                @RequestParam(required = false) String authors,
                                @RequestParam(required = false) String keyword,
                                @RequestParam(required = false) String pageNo,
                                @RequestParam(required = false) String pageSize,
                                @RequestParam(required = false) String order,
                                @RequestParam(required = false) String sort
                                ) {
        String baseUrl = apiConfig.getSEARCH_BOOK_URL() + "&authKey=" + apiConfig.getLIBRARY_API_KEY() + "&exactMatch=true";
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(baseUrl);

        if (bookname != null && !bookname.isEmpty()) {
            uriBuilder.queryParam("title", bookname);
        }
        if (authors != null && !authors.isEmpty()) {
            uriBuilder.queryParam("author", authors);
        }
        if (keyword != null && !keyword.isEmpty()) {
            uriBuilder.queryParam("keyword", keyword);
        }
        if (pageNo != null && !pageNo.isEmpty()) {
            uriBuilder.queryParam("pageNo", pageNo);
        }
        if (pageSize != null && !pageSize.isEmpty()) {
            uriBuilder.queryParam("pageSize", pageSize);
        }
        if (order != null && !order.isEmpty()) {
            uriBuilder.queryParam("order", order);
        }
        if (sort != null && !sort.isEmpty()) {
            uriBuilder.queryParam("sort", sort);
        }

        String url = uriBuilder.build().toUriString();
//        for(String keyword : keywords){
//            UriComponentsBuilder keywordUriBuilder = UriComponentsBuilder.fromHttpUrl(sampleUrl);
//            keywordUriBuilder.queryParam("keyword", keyword);
//            String url = keywordUriBuilder.toUriString();

        return getJsonNodeMono(url);
    }

    //대출 급상승 도서(양)
    public Mono<JsonNode> getLoanIncrease(String searchDt){//yyyy-mm-dd
        String url = apiConfig.getLOAN_INCREASE_URL() + "&authKey=" + apiConfig.getLIBRARY_API_KEY() + "&searchDt=" + searchDt;

        return getJsonNodeMono(url);
    }

    //마니아 추천(양)
    public Mono<JsonNode> getMania(String[] isbn){
        String url = apiConfig.getMANIA_URL() + "&authKey=" + apiConfig.getLIBRARY_API_KEY() + "&type=mania" + "&isbn13=";
        for(String isbn13 : isbn){
            url += isbn13 +";";
        }

        return getJsonNodeMono(url);
    }
    //다독자 추천(양)
    public Mono<JsonNode> getExtensiveReader(String[] isbn){
        String url = apiConfig.getEXTENSIVE_READ_URL() + "&authKey=" + apiConfig.getLIBRARY_API_KEY() + "&type=reader" + "&isbn13=";
        for(String isbn13 : isbn){
            url += isbn13 +";";
        }

        return getJsonNodeMono(url);
    }
    //키워드
    public void saveKeyword() throws Exception{
        keywordService.deleteAll();
        String url = apiConfig.getMONTH_KEYWORD_URL() + "&authKey=" + apiConfig.getLIBRARY_API_KEY();
//        System.out.println("url이거맞나 = " + url);

        Mono<JsonNode> once = getJsonNodeMono(url);
        once.subscribe(jsonNode -> {
            JsonNode response = jsonNode.path("response").path("keywords");

            for(JsonNode keywordNode : response){
                JsonNode keyword = keywordNode.path("keyword");
                String word = keyword.path("word").asText();
                int weight = keyword.path("weight").asInt();
                System.out.println("word = " + word);
                System.out.println("weight = " + weight);
                KeywordDto keywordDto = new KeywordDto(word, weight);

                try {
                    keywordService.insert(keywordDto);
                }catch (Exception e){
                    System.out.println("키워드 저장 에러 = " + e);
                }
            }
        });
    }

    public Mono<List<KeywordDto>> getKeyword() {
        try{
            List<KeywordDto> keywords = keywordService.selectAll();
//            System.out.println("keywords.size() = " + keywords.size());
            if (keywords.size() > 0) {
                return Mono.just(keywords);
            }else{
                keywordService.deleteAll();
                saveKeyword();
                return Mono.just(keywordService.selectAll());
            }
        }catch (Exception e) {
            return Mono.error(e);
        }
    }
}
