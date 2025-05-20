package com.xbooks.project.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

@Entity
@Table(name="memberorder")
@NoArgsConstructor
@Data
@AllArgsConstructor
public class MemberOrder {
    @Id
    private int order_id;
    
    private String order_user;
    private int order_sale;
    private LocalDate order_date;
    private String order_payment;
    private LocalDate order_completed;
    

    @OneToMany(mappedBy="memberOrder")
    private List<Review> reviews = new ArrayList<>();

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="order_user", referencedColumnName="mem_id", updatable=false, insertable=false)
    private Member member;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="order_sale", referencedColumnName="sale_id", updatable=false, insertable=false)
    private Sale sale;
}
