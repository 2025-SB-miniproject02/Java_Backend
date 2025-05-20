package com.xbooks.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xbooks.project.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer>{
    
}
