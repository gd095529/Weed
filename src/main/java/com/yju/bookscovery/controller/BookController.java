package com.yju.bookscovery.controller;

import com.yju.bookscovery.dto.DepartmentCountBookJoinDto;
import com.yju.bookscovery.dto.FavoriteBookJoinDto;
import com.yju.bookscovery.dto.HistoryBookJoinDto;
import com.yju.bookscovery.service.BookService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
//@RequestMapping("/test123")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok().build();
    }

    //북 컨트롤러에 조인된것들 다보며주면되지않을까?
    @GetMapping("/department/{department_id}")
    public ResponseEntity<List<DepartmentCountBookJoinDto>> getDepartmentCount(@PathVariable Integer department_id) throws Exception{
        return ResponseEntity.ok().body(bookService.selectTopByDepartment(department_id));
    }

    @GetMapping("/favorite")
    public ResponseEntity<List<FavoriteBookJoinDto>> getFavorite(HttpSession session) throws Exception{
        Integer member_id = (Integer) session.getAttribute("memeber_id");
        return ResponseEntity.ok().body(bookService.selectAllFavoriteByMemberId(member_id));
    }

    @GetMapping("/history")
    public ResponseEntity<List<HistoryBookJoinDto>> getHistory(HttpSession session) throws Exception{
        Integer member_id = (Integer) session.getAttribute("memeber_id");
        return ResponseEntity.ok().body(bookService.selectAllHistoryByMemberId(member_id));
    }


}
