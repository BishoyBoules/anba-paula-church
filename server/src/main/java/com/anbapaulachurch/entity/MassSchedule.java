package com.anbapaulachurch.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "mass_schedules")
public class MassSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String day;

    @Column(nullable = false, length = 200)
    private String time;

    private int displayOrder = 0;
    private boolean active = true;
}
