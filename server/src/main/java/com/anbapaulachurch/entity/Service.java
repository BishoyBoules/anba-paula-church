package com.anbapaulachurch.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "services")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 100)
    private String slug;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 1000)
    private String bannerImage;

    @Column(length = 500)
    private String schedule;

    @Column(length = 255)
    private String supervisor;

    @Column(columnDefinition = "TEXT")
    private String extraContent;

    private int displayOrder = 0;
    private boolean active = true;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
