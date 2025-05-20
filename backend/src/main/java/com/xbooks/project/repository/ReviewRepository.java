package com.xbooks.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xbooks.project.model.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer>{
    
}
