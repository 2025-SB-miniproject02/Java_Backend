package com.xbooks.project.service;

import org.springframework.stereotype.Service;

import com.xbooks.project.dto.SaleDTO;
import com.xbooks.project.model.Sale;
import com.xbooks.project.repository.SaleRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class SaleService {
    private final SaleRepository saleRepository;

    public SaleDTO ConvertToDTO(Sale sale){
        return SaleDTO.builder()
                .sale_id(sale.getSale_id())
                .sale_book_id(sale.getSale_book_id())
                .sale_mem_id(sale.getSale_mem_id())
                .sale_image(sale.getSale_image())
                .sale_condition(sale.getSale_condition())
                .sale_description(sale.getSale_description())
                .sale_price(sale.getSale_price())
                .sale_status(sale.getSale_status())
                .sale_predicted(sale.getSale_predicted())
                .build();
    }

    public Sale convertToEntity(SaleDTO saleDTO){
        Sale sale = new Sale();
        sale.setSale_id(saleDTO.getSale_id());
        sale.setSale_book_id(saleDTO.getSale_book_id());
        sale.setSale_mem_id(saleDTO.getSale_mem_id());
        sale.setSale_image(saleDTO.getSale_image());
        sale.setSale_condition(saleDTO.getSale_condition());
        sale.setSale_description(saleDTO.getSale_description());
        sale.setSale_price(saleDTO.getSale_price());
        sale.setSale_status(saleDTO.getSale_status());
        sale.setSale_predicted(saleDTO.getSale_predicted());

        return sale;
    }

    public SaleDTO setSaleInsert(SaleDTO saleDTO){
        saleDTO.setSale_status("판매중");
        return ConvertToDTO(this.saleRepository.save(convertToEntity(saleDTO)));
    }
}
