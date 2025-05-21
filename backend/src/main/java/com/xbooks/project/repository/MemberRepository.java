package com.xbooks.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xbooks.project.model.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>{
    Optional<Member> findByMemEmail(String memEmail);
}