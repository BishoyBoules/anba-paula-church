package com.anbapaulachurch.dto;

import lombok.Data;

import java.util.List;

@Data
public class FatherDto {
    private Long id;
    private String name;
    private String image;
    private List<ScheduleDto> confessionTimes;
    private List<ScheduleDto> meetings;
    private List<ScheduleDto> availability;
}
