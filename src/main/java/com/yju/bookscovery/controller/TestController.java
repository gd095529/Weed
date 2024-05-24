package com.yju.bookscovery.controller;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/api/test")
    public String test() {
        String sixteen = "{\"response\":{\"request\":{\"keyword\":\"가족\",\"pageNo\":1,\"pageSize\":20},\"numFound\":11903,\"docs\":[{\"doc\":{\"bookname\":\"엄마를 부탁해 :신경숙 장편소설 \",\"authors\":\"지은이: 신경숙\",\"publisher\":\"창비\",\"publication_year\":\"2008\",\"isbn13\":\"9788936433673\",\"vol\":\"\",\"bookImageURL\":\"http://image.aladin.co.kr/product/272/78/cover/8936433679_2.jpg\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=2271872\",\"loan_count\":\"277828\"}},{\"doc\":{\"bookname\":\"돼지책\",\"authors\":\"앤서니 브라운 글·그림;허은미 옮김\",\"publisher\":\"웅진닷컴\",\"publication_year\":\"2001\",\"isbn13\":\"9788901033518\",\"vol\":\"\",\"bookImageURL\":\"https://bookthumb-phinf.pstatic.net/cover/001/701/00170132.jpg?type=m1&udate=20150821\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=2373919\",\"loan_count\":\"226112\"}},{\"doc\":{\"bookname\":\"마법의 설탕 두 조각\",\"authors\":\"미카엘 엔데 글;유혜자 옮김\",\"publisher\":\"한길사\",\"publication_year\":\"2001\",\"isbn13\":\"9788935652792\",\"vol\":\"\",\"bookImageURL\":\"http://image.aladin.co.kr/product/27/73/cover/8935652792_2.jpg\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=1799690\",\"loan_count\":\"222629\"}},{\"doc\":{\"bookname\":\"모모\",\"authors\":\"미하엘 엔데 지음;한미희 옮김\",\"publisher\":\"비룡소\",\"publication_year\":\"1999\",\"isbn13\":\"9788949190020\",\"vol\":\"\",\"bookImageURL\":\"http://image.aladin.co.kr/product/19/10/cover/8949190028_2.jpg\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=1323591\",\"loan_count\":\"186203\"}},{\"doc\":{\"bookname\":\"수박 수영장 :안녕달 그림책 \",\"authors\":\"지은이: 안녕달\",\"publisher\":\"창비\",\"publication_year\":\"2015\",\"isbn13\":\"9788936446819\",\"vol\":\"\",\"bookImageURL\":\"https://bookthumb-phinf.pstatic.net/cover/093/451/09345174.jpg?type=m1&udate=20180718\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=2396971\",\"loan_count\":\"149835\"}},{\"doc\":{\"bookname\":\"위저드 베이커리 =구병모 장편소설 /Wizard bakery \",\"authors\":\"지은이: 구병모\",\"publisher\":\"창비\",\"publication_year\":\"2009\",\"isbn13\":\"9788936433697\",\"vol\":\"\",\"bookImageURL\":\"http://image.aladin.co.kr/product/346/0/cover/8936433695_1.jpg\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=2314042\",\"loan_count\":\"147897\"}},{\"doc\":{\"bookname\":\"두발자전거 배우기 \",\"authors\":\"글: 고대영 ;그림: 김영진\",\"publisher\":\"길벗어린이\",\"publication_year\":\"2009\",\"isbn13\":\"9788955820904\",\"vol\":\"\",\"bookImageURL\":\"http://image.aladin.co.kr/product/363/39/cover/8955820909_1.jpg\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=2296230\",\"loan_count\":\"138770\"}},{\"doc\":{\"bookname\":\"솔이의 추석 이야기 \",\"authors\":\"글·그림: 이억배\",\"publisher\":\"길벗어린이\",\"publication_year\":\"2011\",\"isbn13\":\"9788986621198\",\"vol\":\"\",\"bookImageURL\":\"https://bookthumb-phinf.pstatic.net/cover/001/803/00180381.jpg?type=m1&udate=20140407\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=1871173\",\"loan_count\":\"137916\"}},{\"doc\":{\"bookname\":\"샬롯의 거미줄\",\"authors\":\"엘윈 브룩스 화이트 글;김화곤 옮김\",\"publisher\":\"시공사\",\"publication_year\":\"2001\",\"isbn13\":\"9788952709530\",\"vol\":\"\",\"bookImageURL\":\"http://image.aladin.co.kr/product/25/86/cover/8952709535_2.jpg\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=117298\",\"loan_count\":\"137329\"}},{\"doc\":{\"bookname\":\"가면산장 살인사건 \",\"authors\":\"지은이: 히가시노 게이고 ;옮긴이: 김난주\",\"publisher\":\"재인\",\"publication_year\":\"2014\",\"isbn13\":\"9788990982575\",\"vol\":\"\",\"bookImageURL\":\"http://image.aladin.co.kr/product/4745/51/cover/899098257x_2.jpg\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=2427470\",\"loan_count\":\"130539\"}},{\"doc\":{\"bookname\":\"우아한 거짓말 :김려령 장편소설 \",\"authors\":\"김려령\",\"publisher\":\"창비\",\"publication_year\":\"2009\",\"isbn13\":\"9788936456221\",\"vol\":\"\",\"bookImageURL\":\"https://bookthumb-phinf.pstatic.net/cover/061/846/06184692.jpg?type=m1&udate=20170416\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=1039479\",\"loan_count\":\"130517\"}},{\"doc\":{\"bookname\":\"오베라는 남자 :프레드릭 배크만 장편소설 \",\"authors\":\"지은이: 프레드릭 배크만 ;옮긴이: 최민우\",\"publisher\":\"다산북스\",\"publication_year\":\"2015\",\"isbn13\":\"9791130605210\",\"vol\":\"\",\"bookImageURL\":\"https://bookthumb-phinf.pstatic.net/cover/090/537/09053751.jpg?type=m1&udate=20180717\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=2396935\",\"loan_count\":\"128988\"}},{\"doc\":{\"bookname\":\"아드님, 진지 드세요 \",\"authors\":\"강민경 글 ;이영림 그림\",\"publisher\":\"좋은책신사고 좋은책어린이\",\"publication_year\":\"2011\",\"isbn13\":\"9788928302802\",\"vol\":\"\",\"bookImageURL\":\"https://bookthumb-phinf.pstatic.net/cover/066/269/06626948.jpg?type=m1&udate=20150718\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=2372431\",\"loan_count\":\"127496\"}},{\"doc\":{\"bookname\":\"칭찬 먹으러 가요 \",\"authors\":\"글: 고대영 ;그림: 김영진\",\"publisher\":\"길벗어린이\",\"publication_year\":\"2012\",\"isbn13\":\"9788955821970\",\"vol\":\"\",\"bookImageURL\":\"https://bookthumb-phinf.pstatic.net/cover/068/274/06827420.jpg?type=m1&udate=20170609\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=2372759\",\"loan_count\":\"124259\"}},{\"doc\":{\"bookname\":\"이모의 결혼식\",\"authors\":\"선현경 글·그림\",\"publisher\":\"비룡소\",\"publication_year\":\"2004\",\"isbn13\":\"9788949100487\",\"vol\":\"\",\"bookImageURL\":\"http://image.aladin.co.kr/product/49/32/cover/8949100487_1.gif\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=371025\",\"loan_count\":\"121957\"}},{\"doc\":{\"bookname\":\"해리포터와 죽음의 성물\",\"authors\":\"조앤 K 롤링 지음 ;최인자 옮김\",\"publisher\":\"문학수첩\",\"publication_year\":\"2007\",\"isbn13\":\"9788983922557\",\"vol\":\"71\",\"bookImageURL\":\"https://bookthumb-phinf.pstatic.net/cover/032/928/03292816.jpg?type=m1&udate=20091215\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=2370330\",\"loan_count\":\"121391\"}},{\"doc\":{\"bookname\":\"먹는 이야기 \",\"authors\":\"글: 고대영 ;그림: 김영진\",\"publisher\":\"길벗어린이\",\"publication_year\":\"2011\",\"isbn13\":\"9788955821697\",\"vol\":\"\",\"bookImageURL\":\"https://bookthumb-phinf.pstatic.net/cover/066/796/06679651.jpg?type=m1&udate=20180716\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=2372398\",\"loan_count\":\"118457\"}},{\"doc\":{\"bookname\":\"설민석의 한국사 대모험\",\"authors\":\"글: 설민석,그림: 정현희\",\"publisher\":\"휴먼큐브\",\"publication_year\":\"2017\",\"isbn13\":\"9791196232160\",\"vol\":\"5\",\"bookImageURL\":\"https://image.aladin.co.kr/product/12455/35/cover/k282532761_1.jpg\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=3665736\",\"loan_count\":\"117865\"}},{\"doc\":{\"bookname\":\"내 심장을 쏴라 :정유정 장편소설 \",\"authors\":\"지은이: 정유정\",\"publisher\":\"은행나무\",\"publication_year\":\"2009\",\"isbn13\":\"9788956602998\",\"vol\":\"\",\"bookImageURL\":\"http://image.aladin.co.kr/product/364/94/cover/8956602999_3.jpg\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=2298480\",\"loan_count\":\"117037\"}},{\"doc\":{\"bookname\":\"즐거운 나의 집 :공지영 장편소설 \",\"authors\":\"공지영\",\"publisher\":\"푸른숲\",\"publication_year\":\"2007\",\"isbn13\":\"9788971847558\",\"vol\":\"\",\"bookImageURL\":\"https://bookthumb-phinf.pstatic.net/cover/033/495/03349526.jpg?type=m1&udate=20150715\",\"bookDtlUrl\":\"https://data4library.kr/bookV?seq=2155599\",\"loan_count\":\"109163\"}}]}}";
//        try {
//
//            JSONParser jsonParser = new JSONParser();
//
//            JSONObject jsonObj = (JSONObject) jsonParser.parse(jsonStr);
//
//            JSONArray memberArray = (JSONArray) jsonObj.get("members");
//
//
//
//            System.out.println("=====Members=====");
//
//
//
//            for(int i=0 ; i<memberArray.size() ; i++){
//
//                JSONObject tempObj = (JSONObject) memberArray.get(i);
//
//                System.out.println(""+(i+1)+"번째 멤버의 이름 : "+tempObj.get("name"));
//
//                System.out.println(""+(i+1)+"번째 멤버의 이메일 : "+tempObj.get("email"));
//
//                System.out.println(""+(i+1)+"번째 멤버의 나이 : "+tempObj.get("age"));
//
//                System.out.println("----------------------------"); }
//
//        } catch (ParseException e) {
//
//            // TODO Auto-generated catch block
//
//            e.printStackTrace();
//
//        }
        return "test";
    }


}