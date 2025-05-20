// package com.xbooks.project.controller;

// import java.util.List;

// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.xbooks.project.model.Book;
// import com.xbooks.project.service.BookService;

// import lombok.RequiredArgsConstructor;


// @RestController
// @RequestMapping("/book")
// @RequiredArgsConstructor
// public class BookController {
//     private final BookService bookService;

//     // @GetMapping(path="/list")
//     // public ResponseEntity<List<BookDTO>> getBookList() {
//     //     return ResponseEntity.ok(this.bookService.getBookList());
//     // }
    
//     @GetMapping(path="/list")
//     public String getBookList() {
//         List<Book> list = this.bookService.getBookList();

//         if (list==null) {
//             return "전체 회원에 대한 조회 결과가 없습니다.";
//         }

//         // 받아온 값(객체)가 있는 경우 처리
//         StringBuilder sb = new StringBuilder();
//         sb.append("<h1>책 전체 목록</h1>");
//         sb.append("<hr/>");
//         sb.append("<table border=1 width=500>");
//         sb.append(" <tr><th>책id</th><th>책이름</th><th>정가</th></tr>");
//         for (Book book: list){
//             sb.append("<tr><td>%s</td><td>%s</td><td>%s</td></tr>".formatted(book.getBook_id(), book.getBook_title(), book.getBook_original_price()));
//         }

//         sb.append("</table>");

//         return sb.toString();
//     }
// }
