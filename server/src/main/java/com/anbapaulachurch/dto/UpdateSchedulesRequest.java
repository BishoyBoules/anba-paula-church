package com.anbapaulachurch.dto;

import lombok.Data;

import java.util.List;

@Data
public class UpdateSchedulesRequest {
    private List<ScheduleDto> confessionTimes;
    private List<ScheduleDto> meetings;
    private List<ScheduleDto> availability;
}
