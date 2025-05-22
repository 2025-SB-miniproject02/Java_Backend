package com.xbooks.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xbooks.project.dto.SaleDTO;
import com.xbooks.project.service.SaleService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("sale")
@RequiredArgsConstructor
public class SaleController {
    private final SaleService saleService;

    @PostMapping(path="/insert")
    public ResponseEntity<SaleDTO> setSaleInsert(@RequestBody SaleDTO saleDTO){
        return ResponseEntity.ok(this.saleService.setSaleInsert(saleDTO));
    }
}
