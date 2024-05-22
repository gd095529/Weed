//package com.yju.bookscovery.controller;
//
//import com.yju.bookscovery.dao.UsersDao;
//import com.yju.bookscovery.dto.User;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//
//@Controller
//public class HomeController {
//    @Autowired
//    UsersDao usersDao;
//
//    @GetMapping
//    public String index(Model m) throws Exception{
//        User user = usersDao.selectUser("asdf");
//        m.addAttribute("user",user);
//        return "index";
//    }
//}
