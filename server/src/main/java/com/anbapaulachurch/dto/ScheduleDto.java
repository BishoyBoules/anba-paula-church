package com.anbapaulachurch.dto;

import lombok.Data;

@Data
public class ScheduleDto {
    private String day;
    private String time;
    private String location;
    private String meetingType;
    private String service;
}
