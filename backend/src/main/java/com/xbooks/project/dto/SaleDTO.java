package com.xbooks.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaleDTO {
    private Long sale_id;
    private Long sale_book_id;
    private Long sale_mem_id;
    private String sale_image;
    private String sale_condition;
    private String sale_description;
    private int sale_price;
    private String sale_status;
    private int sale_predicted;
}
