package com.xbooks.project.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="sale")
@NoArgsConstructor
@AllArgsConstructor
public class Sale {
    @Id
    private int sale_id;
    
    private int sale_book_id;
    private int sale_mem_id;
    private String sale_image;
    private String sale_condition;
    private String sale_description;
    private int sale_price;
    private String sale_status;

    @CreationTimestamp
    private LocalDate sale_created;

    @UpdateTimestamp
    private LocalDate sale_updated;

    private LocalDate sale_solded;
    private int sale_predicted;

    @OneToMany(mappedBy="sale")
    List<MemberOrder> memberOrders = new ArrayList<>();

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="sale_book_id", referencedColumnName="book_id", insertable=false, updatable=false)
    private Book book;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="sale_mem_id", referencedColumnName="mem_id", insertable=false, updatable=false)
    private Member member;
}
