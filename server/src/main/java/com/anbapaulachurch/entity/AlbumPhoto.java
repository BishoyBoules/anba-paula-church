package com.anbapaulachurch.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "album_photos")
public class AlbumPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String image;

    @Column(length = 255)
    private String title;

    @Column(length = 100)
    private String category;

    private int displayOrder = 0;
}
