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
@Table(name="Category")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    private int category_id;
    
    private String category_name;

    @OneToMany(mappedBy="category")
    private List<Book> books = new ArrayList<>();
}
