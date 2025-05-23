package com.xbooks.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.xbooks.project.dto.BookDTO;
import com.xbooks.project.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>{
    @Query("Select new com.xbooks.project.dto.BookDTO(b.book_id, b.book_title, b.book_publisher, b.book_author, " +
           "c.category_name, b.book_original_price, b.book_date, b.book_pages, b.book_weight, b.book_width, b.book_height, b.book_binding)" +
           "From Book b Inner Join b.category c " +
           "Where b.book_id = :book_id")
    BookDTO findBookData(Long book_id);
}
