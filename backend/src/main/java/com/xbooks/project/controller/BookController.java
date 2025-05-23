package com.xbooks.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xbooks.project.dto.BookDTO;
import com.xbooks.project.service.BookService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;
    
    @GetMapping(path="/seller")
    public ResponseEntity<BookDTO> findBookData(@RequestParam Long book_id){
        BookDTO data = this.bookService.findBookData(book_id);
        return ResponseEntity.ok(data);
    }
}
