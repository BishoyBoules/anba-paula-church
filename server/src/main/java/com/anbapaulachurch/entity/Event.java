package com.anbapaulachurch.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String title;

    @Column(length = 100)
    private String date;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 1000)
    private String image;

    // "NEWS" or "EVENT"
    @Column(length = 50)
    private String eventType = "EVENT";

    @CreationTimestamp
    private LocalDateTime createdAt;
}
