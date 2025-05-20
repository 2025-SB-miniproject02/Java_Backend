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
@Data
@Table(name="review")
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    private int review_id;
    
    private int review_order;
    private int review_rating;
    private String review_comment;
    private LocalDate review_date;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="review_order", referencedColumnName="order_id", insertable=false, updatable=false)
    private MemberOrder memberOrder;
}
