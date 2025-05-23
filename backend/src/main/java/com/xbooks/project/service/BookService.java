package com.xbooks.project.service;

import org.springframework.stereotype.Service;

import com.xbooks.project.dto.BookDTO;
import com.xbooks.project.exception.ResourceNotFoundException;
import com.xbooks.project.repository.BookRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class BookService {
    private final BookRepository bookRepository;

    public BookDTO findBookData(Long book_id){
        BookDTO book = this.bookRepository.findBookData(book_id);
        if (book == null){
            throw new ResourceNotFoundException("검색하신 책에 대한 정보가 없습니다!");
        }
        return book;
    }
}
