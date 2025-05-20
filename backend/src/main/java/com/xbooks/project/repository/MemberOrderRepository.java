package com.xbooks.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xbooks.project.model.MemberOrder;

@Repository
public interface MemberOrderRepository extends JpaRepository<MemberOrder, Number>{
    
}
