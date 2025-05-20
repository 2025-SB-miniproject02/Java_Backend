package com.xbooks.project.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
    private String mem_id;

    private String mem_email;
    private String mem_addr;
    private String mem_password;
    private String mem_name;
    private String mem_nickname;
    private String mem_deleted;

    @OneToMany(mappedBy="member")
    private List<Sale> sales = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<MemberOrder> memberOrders = new ArrayList<>();
}
