package com.anbapaulachurch.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "council_members")
public class CouncilMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 255)
    private String role;

    @Column(length = 1000)
    private String image;

    private int displayOrder = 0;
}
