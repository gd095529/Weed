package com.yju.bookscovery.controller;

import com.yju.bookscovery.dto.DepartmentCountBookJoinDto;
import com.yju.bookscovery.dto.FavoriteBookJoinDto;
import com.yju.bookscovery.dto.HistoryBookJoinDto;
import com.yju.bookscovery.service.BookService;
import com.yju.bookscovery.service.FavoriteService;
import com.yju.bookscovery.service.SearchHistoryService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class BookController {
    @Autowired
    private BookService bookService;
    @Autowired
    private FavoriteService favoriteService;
    @Autowired
    private SearchHistoryService searchHistoryService;

    // 북 컨트롤러에 조인된것들 다보며주면되지않을까?
    @GetMapping("/department/{department_id}")
    public ResponseEntity<List<DepartmentCountBookJoinDto>> getDepartmentCount(@PathVariable Integer department_id) throws Exception {
        return ResponseEntity.ok().body(bookService.selectTopByDepartment(department_id));
    }

    @PostMapping("/favorite/{book_id}")
    public ResponseEntity<?> addFavorite(@PathVariable Integer book_id, HttpSession session) throws Exception {
        Integer member_id = (Integer) session.getAttribute("member_id");
        Integer check_favorite_id = favoriteService.checkFavorite(member_id, book_id);
        if (check_favorite_id == null || check_favorite_id == 0) {
            return ResponseEntity.ok().body(favoriteService.insert(member_id, book_id));
        } else {
            return ResponseEntity.status(500).body("이미 존재");
        }
    }

    @GetMapping("/favorite")
    public ResponseEntity<List<FavoriteBookJoinDto>> getFavorite(HttpSession session) throws Exception {
        Integer member_id = (Integer) session.getAttribute("member_id");
        return ResponseEntity.ok().body(bookService.selectAllFavoriteByMemberId(member_id));
    }

    @DeleteMapping("/favorite/{favorite_id}")
    public ResponseEntity<?> delFavorite(@PathVariable Integer favorite_id, HttpSession session, Integer book_id) throws Exception {
        Integer member_id = (Integer) session.getAttribute("member_id");
        // 자기 즐찾인지 확인하는 부분필요 member_id, favorite_id로 찾은 다음 맞으면 지우기
        Integer check_favorite_id = favoriteService.checkFavorite(member_id, book_id);
        if (check_favorite_id == favorite_id) {
            return ResponseEntity.ok().body(favoriteService.delete(favorite_id));
        } else {
            return ResponseEntity.status(500).body("삭제 실패");
        }
    }

    @GetMapping("/m/favorite")
    public ResponseEntity<?> checkFavoriteForMobile(@RequestParam Integer member_id, @RequestParam Integer book_id) throws Exception {
        if (member_id == null || book_id == null) {
            return ResponseEntity.badRequest().body("memberId와 bookId가 필요합니다."); // memberId 또는 bookId가 없을 경우 오류 처리
        }
        Integer check_favorite_id = favoriteService.checkFavorite(member_id, book_id);
        boolean isFavorite = (check_favorite_id != null && check_favorite_id > 0);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isFavorite", isFavorite);
        return ResponseEntity.ok().body(response);
    }

    // 모바일 즐겨찾기 추가 엔드포인트
    @PostMapping("/m/favorite/{book_id}")
    public ResponseEntity<?> addFavoriteForMobile(@RequestParam Integer member_id, @PathVariable Integer book_id) throws Exception {
        if (member_id == null) {
            return ResponseEntity.badRequest().body("memberId가 필요합니다."); // memberId가 없을 경우 오류 처리
        }
        Integer check_favorite_id = favoriteService.checkFavorite(member_id, book_id);
        if (check_favorite_id == null || check_favorite_id == 0) {
            favoriteService.insert(member_id, book_id);
            return ResponseEntity.ok().body("즐겨찾기가 추가되었습니다.");
        } else {
            return ResponseEntity.status(500).body("이미 존재");
        }
    }

    // 모바일 즐겨찾기 삭제 엔드포인트
    @DeleteMapping("/m/favorite")
    public ResponseEntity<?> deleteFavoriteForMobile(@RequestParam Integer member_id, @RequestParam Integer book_id) throws Exception {
        if (member_id == null || book_id == null) {
            return ResponseEntity.badRequest().body("memberId와 bookId가 필요합니다."); // memberId 또는 bookId가 없을 경우 오류 처리
        }

        // 즐겨찾기 항목 확인을 위해 favoriteId를 가져오기
        Integer favorite_id = favoriteService.checkFavorite(member_id, book_id);
        if (favorite_id == null) {
            return ResponseEntity.status(400).body("삭제 실패: 즐겨찾기 항목이 존재하지 않습니다.");
        }

        // 즐겨찾기 항목이 있으면 삭제
        int deleteResult = favoriteService.delete(favorite_id);
        if (deleteResult > 0) {
            return ResponseEntity.ok().body("즐겨찾기가 삭제되었습니다.");
        } else {
            return ResponseEntity.status(500).body("삭제 실패: 서버 오류");
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<HistoryBookJoinDto>> getHistory(HttpSession session) throws Exception {
        Integer member_id = (Integer) session.getAttribute("member_id");
        return ResponseEntity.ok().body(bookService.selectAllHistoryByMemberId(member_id));
    }

    @DeleteMapping("/history/{search_history_id}")
    public ResponseEntity<?> delHistory(@PathVariable Integer search_history_id, HttpSession session) throws Exception {
        Integer member_id = (Integer) session.getAttribute("member_id");
        try {
            return ResponseEntity.ok().body(searchHistoryService.delete(search_history_id, member_id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("기록 삭제 실패");
        }
    }

    // 검색 기록
    @GetMapping("/m/history")
    public ResponseEntity<List<HistoryBookJoinDto>> getHistoryForMobile(@RequestParam Integer member_id) throws Exception {
        if (member_id == null) {
            return ResponseEntity.badRequest().body(bookService.selectAllHistoryByMemberId(member_id));
        }
        List<HistoryBookJoinDto> history = bookService.selectAllHistoryByMemberId(member_id);
        return ResponseEntity.ok().body(history);
    }

    // 즐겨찾기 기록
    @GetMapping("/m/favorite/history")
    public ResponseEntity<List<FavoriteBookJoinDto>> getFavoriteForMobile(@RequestParam Integer member_id) throws Exception {
        if (member_id == null) {
            return ResponseEntity.badRequest().body(bookService.selectAllFavoriteByMemberId(member_id));
        }
        List<FavoriteBookJoinDto> favorite = bookService.selectAllFavoriteByMemberId(member_id);
        return ResponseEntity.ok().body(favorite);
    }

    @GetMapping("/books/{isbn}")
    public ResponseEntity<Map> checkBookInfo(@PathVariable String isbn, HttpSession session) throws Exception {
        Integer member_id = (Integer) session.getAttribute("member_id");
        Map map = new HashMap();
        Integer book_id = bookService.checkBookId(isbn);
        map.put("book_id", book_id);
        map.put("favorite_id", favoriteService.checkFavorite(member_id, book_id));
        return ResponseEntity.ok().body(map);
    }
}