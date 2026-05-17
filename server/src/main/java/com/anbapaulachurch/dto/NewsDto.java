package com.anbapaulachurch.dto;

import lombok.Data;

@Data
public class NewsDto {
    private Long id;
    private String title;
    private String date;
    private String description;
    private String image;
}
