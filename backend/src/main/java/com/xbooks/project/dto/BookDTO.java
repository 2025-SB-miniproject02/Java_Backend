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
    private String book_title;
    private String book_publisher;
    private String book_author;
    private String category_name;
    private int book_original_price;
    private LocalDate book_Date;
    private int book_pages;
    private int book_weight;
    private int book_width;
    private int book_height;
    private String book_binding;
}
