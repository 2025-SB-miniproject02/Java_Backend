package com.xbooks.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xbooks.project.model.Sale;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Integer>{
    
}
