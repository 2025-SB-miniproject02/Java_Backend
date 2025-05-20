package com.xbooks.project.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDTO {
    private int book_id;
    
    private int book_seller;
    private String book_title;
    private String book_author;
    private String book_publisher;
    private LocalDate book_date;
    private int book_category_id;
    private String book_image;
    private String book_condition;
    private String book_description;
    private int book_price;
    private String book_status;
    private int book_original_price;
    private String book_translator;
    private String book_binding;
    private int book_pages;
    private int book_weight;
    private int book_width;
    private int book_height;
    private LocalDate book_created;
    private LocalDate book_updated;
    private LocalDate book_solded;
    private int book_predicted;
}
