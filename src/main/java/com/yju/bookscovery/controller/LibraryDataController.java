package com.yju.bookscovery.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.yju.bookscovery.dto.BookDto;
import com.yju.bookscovery.service.LibraryDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class LibraryDataController {
    private final LibraryDataService libraryDataService;

    public LibraryDataController(LibraryDataService libraryDataService) {

        this.libraryDataService = libraryDataService;
    }

    //책 상세보기 완
    @GetMapping("/books/{isbn}")
    public Mono<ResponseEntity<JsonNode>> loanAnalyze(@PathVariable String isbn, Integer member_id, Integer department_id) {
        return libraryDataService.getLoanAnalyze(isbn, member_id, department_id)
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.just(ResponseEntity.status(500).body(null)));//e.getMessage()
    }

    //인기도서완
    @GetMapping("/popular")
    public Mono<ResponseEntity<List<BookDto>>> getPopularLoan(
            @RequestParam(required = false) String pageNo,
            @RequestParam(required = false) String pageSize,
            @RequestParam(required = false) String startDt,
            @RequestParam(required = false) String endDt,
            @RequestParam(required = false) Integer age,
            @RequestParam(required = false) Integer from_age,
            @RequestParam(required = false) Integer to_age,
            @RequestParam(required = false) Integer gender,
            @RequestParam(required = false) String kdc,
            @RequestParam(required = false) String dtl_kdc) {

        return libraryDataService.getPopularLoan(pageNo, pageSize, startDt, endDt, age, from_age, to_age, gender, kdc, dtl_kdc)
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.just(ResponseEntity.status(500).body(null)));
    }

    @GetMapping("/search")
    public Mono<ResponseEntity<JsonNode>> searchBook(
                                     @RequestParam(required = false) String bookname,
                                     @RequestParam(required = false) String authors,
                                     @RequestParam(required = false) String keyword,
                                     @RequestParam(required = false) String pageNo,
                                     @RequestParam(required = false) String pageSize,
                                     @RequestParam(required = false) String order,
                                     @RequestParam(required = false) String sort) throws UnsupportedEncodingException {


        return libraryDataService.searchBook(bookname, authors, keyword, pageNo, pageSize, order, sort)
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.just(ResponseEntity.status(500).body(null)));
    }

    @GetMapping("/increase")
    public Mono<ResponseEntity<JsonNode>> getLoanIncrease(String searchDt){
        return libraryDataService.getLoanIncrease(searchDt)
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.just(ResponseEntity.status(500).body(null)));
    }

    @GetMapping("/mania")
    public Mono<ResponseEntity<JsonNode>> getMania(String[] isbn){//isbn 5개 넣을수 있게 변경 필
        return libraryDataService.getMania(isbn)
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.just(ResponseEntity.status(500).body(null)));
    }

    @GetMapping("/reader")
    public Mono<ResponseEntity<JsonNode>> getExtensiveReader(String[] isbn){//isbn 5개 넣을수 있게 변경 필
        return libraryDataService.getExtensiveReader(isbn)
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.just(ResponseEntity.status(500).body(null)));
    }
}
