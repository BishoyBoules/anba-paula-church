package com.anbapaulachurch.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "father_schedules")
public class FatherSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "father_id", nullable = false)
    private Father father;

    // CONFESSION, MEETING, AVAILABILITY
    @Column(nullable = false, length = 50)
    private String type;

    @Column(length = 100)
    private String day;

    @Column(length = 100)
    private String time;

    @Column(length = 255)
    private String location;

    // optional label for meeting type (e.g. "عشية", "درس كتاب")
    @Column(length = 255)
    private String meetingType;

    @Column(length = 255)
    private String service;
}
