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

import java.util.List;

@RestController
public class BookController {
    @Autowired
    private BookService bookService;
    @Autowired
    private FavoriteService favoriteService;
    @Autowired
    private SearchHistoryService searchHistoryService;

    //북 컨트롤러에 조인된것들 다보며주면되지않을까?
    @GetMapping("/department/{department_id}")
    public ResponseEntity<List<DepartmentCountBookJoinDto>> getDepartmentCount(@PathVariable Integer department_id) throws Exception{
        return ResponseEntity.ok().body(bookService.selectTopByDepartment(department_id));
    }

    @PostMapping("/favorite/{book_id}")
    public ResponseEntity<?> addFavorite(@PathVariable Integer book_id, HttpSession session) throws Exception{
        Integer member_id = (Integer) session.getAttribute("memeber_id");
        Integer check_favorite_id = favoriteService.checkFavorite(member_id, book_id);
        if (check_favorite_id == null || check_favorite_id == 0) {
            return ResponseEntity.ok().body(favoriteService.insert(member_id,book_id));
        }else {
            return ResponseEntity.status(500).body("이미 존재");
        }
    }

    @GetMapping("/favorite")
    public ResponseEntity<List<FavoriteBookJoinDto>> getFavorite(HttpSession session) throws Exception{
        Integer member_id = (Integer) session.getAttribute("memeber_id");
        return ResponseEntity.ok().body(bookService.selectAllFavoriteByMemberId(member_id));
    }
    @DeleteMapping("/favorite/{favorite_id}")
    public ResponseEntity<?> delFavorite(@PathVariable Integer favorite_id, HttpSession session, Integer book_id) throws Exception{
        Integer member_id = (Integer) session.getAttribute("memeber_id");
        //자기 즐찾인지 확인하는 부분필요 member_id, favorite_id로 찾은다음 맞으면 지우기
        Integer check_favorite_id = favoriteService.checkFavorite(member_id, book_id);
        if(check_favorite_id == favorite_id){
            return ResponseEntity.ok().body(favoriteService.delete(favorite_id));
        }else{
            return ResponseEntity.status(500).body("삭제 실패");
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<HistoryBookJoinDto>> getHistory(HttpSession session) throws Exception{
        Integer member_id = (Integer) session.getAttribute("memeber_id");
        return ResponseEntity.ok().body(bookService.selectAllHistoryByMemberId(member_id));
    }

    @DeleteMapping("/history/{seacrh_history_id}")
    public ResponseEntity<?> delHistory(@PathVariable Integer seacrh_history_id, HttpSession session) throws Exception{
        Integer member_id = (Integer) session.getAttribute("memeber_id");
        try{
            return ResponseEntity.ok().body(searchHistoryService.delete(seacrh_history_id, member_id));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body("기록 삭제 실패");
        }
    }


}
