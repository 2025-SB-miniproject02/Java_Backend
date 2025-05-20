package com.xbooks.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xbooks.project.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Number> {
    
}
