package com.xbooks.project.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="cart")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @Id
    private int cart_id;
    private String cart_user;
    private int cart_prod;
    private LocalDate cart_add;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="cart_user", referencedColumnName="mem_id", insertable=false, updatable=false)
    private Member member;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="cart_prod", referencedColumnName="book_id", insertable=false, updatable=false)
    private Book book;
}
