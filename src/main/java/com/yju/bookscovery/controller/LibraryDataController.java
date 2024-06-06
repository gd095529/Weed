package com.yju.bookscovery.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.yju.bookscovery.dto.BookDto;
import com.yju.bookscovery.service.LibraryDataService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

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
            @RequestParam(required = false) Integer from_age,
            @RequestParam(required = false) Integer to_age,
            @RequestParam(required = false) Integer gender,
            @RequestParam(required = false) String kdc,
            @RequestParam(required = false) String dtl_kdc) {

        return libraryDataService.getPopularLoan(pageNo, pageSize, startDt, endDt, from_age, to_age, gender, kdc, dtl_kdc)
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.just(ResponseEntity.status(500).body(null)));
    }
}
