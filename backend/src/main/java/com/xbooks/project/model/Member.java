package com.xbooks.project.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="member")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="member_seq_gen")
    @SequenceGenerator(name="member_seq_gen", sequenceName="Member_seq",
                       initialValue=101, allocationSize=1)
    private long   mem_id;

    @Column(name="mem_email", unique=true)
    private String memEmail;
    private String mem_addr;
    private String mem_hp;
    private String mem_password;
    private String mem_name;
    private String mem_nickname;
    private String mem_deleted;

    @OneToMany(mappedBy="member")
    private List<Sale> sales = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<MemberOrder> memberOrders = new ArrayList<>();
}
