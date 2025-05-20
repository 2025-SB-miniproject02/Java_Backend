package com.xbooks.project.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="book")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    private int book_id;
    
    private int book_category_id;
    private String book_title;
    private String book_author;
    private String book_publisher;
    private LocalDate book_date;
    private int book_original_price;
    private String book_translator;
    private String book_binding;
    private int book_pages;
    private int book_weight;
    private int book_width;
    private int book_height;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="book_category_id", referencedColumnName="category_id", insertable=false, updatable=false)
    private Category category;
}
