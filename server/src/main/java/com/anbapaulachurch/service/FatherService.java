package com.anbapaulachurch.service;

import com.anbapaulachurch.dto.FatherDto;
import com.anbapaulachurch.dto.ScheduleDto;
import com.anbapaulachurch.dto.UpdateSchedulesRequest;
import com.anbapaulachurch.entity.Father;
import com.anbapaulachurch.entity.FatherSchedule;
import com.anbapaulachurch.repository.FatherRepository;
import com.anbapaulachurch.repository.FatherScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FatherService {

    private final FatherRepository fatherRepository;
    private final FatherScheduleRepository scheduleRepository;

    public List<FatherDto> getAllFathers() {
        return fatherRepository.findAllByOrderByCreatedAtAsc()
                .stream().map(this::toDtoBasic).toList();
    }

    public FatherDto getFatherById(Long id) {
        Father father = fatherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Father not found: " + id));
        return toDtoWithSchedules(father);
    }

    public FatherDto createFather(FatherDto dto) {
        Father father = new Father();
        father.setName(dto.getName());
        father.setImage(dto.getImage());
        return toDtoBasic(fatherRepository.save(father));
    }

    public FatherDto updateFather(Long id, FatherDto dto) {
        Father father = fatherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Father not found: " + id));
        father.setName(dto.getName());
        if (dto.getImage() != null && !dto.getImage().isBlank()) {
            father.setImage(dto.getImage());
        }
        return toDtoBasic(fatherRepository.save(father));
    }

    public void deleteFather(Long id) {
        fatherRepository.deleteById(id);
    }

    @Transactional
    public FatherDto updateSchedules(Long fatherId, UpdateSchedulesRequest req) {
        Father father = fatherRepository.findById(fatherId)
                .orElseThrow(() -> new RuntimeException("Father not found: " + fatherId));

        scheduleRepository.deleteByFatherId(fatherId);

        List<FatherSchedule> schedules = new ArrayList<>();
        schedules.addAll(toScheduleEntities(father, "CONFESSION", req.getConfessionTimes()));
        schedules.addAll(toScheduleEntities(father, "MEETING", req.getMeetings()));
        schedules.addAll(toScheduleEntities(father, "AVAILABILITY", req.getAvailability()));
        scheduleRepository.saveAll(schedules);

        return toDtoWithSchedules(father);
    }

    private List<FatherSchedule> toScheduleEntities(Father father, String type, List<ScheduleDto> dtos) {
        if (dtos == null) return List.of();
        return dtos.stream().map(dto -> {
            FatherSchedule s = new FatherSchedule();
            s.setFather(father);
            s.setType(type);
            s.setDay(dto.getDay());
            s.setTime(dto.getTime());
            s.setLocation(dto.getLocation());
            s.setMeetingType(dto.getMeetingType());
            s.setService(dto.getService());
            return s;
        }).toList();
    }

    private FatherDto toDtoBasic(Father father) {
        FatherDto dto = new FatherDto();
        dto.setId(father.getId());
        dto.setName(father.getName());
        dto.setImage(father.getImage());
        return dto;
    }

    private FatherDto toDtoWithSchedules(Father father) {
        FatherDto dto = toDtoBasic(father);
        List<FatherSchedule> schedules = scheduleRepository.findByFatherId(father.getId());

        dto.setConfessionTimes(schedules.stream()
                .filter(s -> "CONFESSION".equals(s.getType()))
                .map(this::toScheduleDto).toList());

        dto.setMeetings(schedules.stream()
                .filter(s -> "MEETING".equals(s.getType()))
                .map(this::toScheduleDto).toList());

        dto.setAvailability(schedules.stream()
                .filter(s -> "AVAILABILITY".equals(s.getType()))
                .map(this::toScheduleDto).toList());

        return dto;
    }

    private ScheduleDto toScheduleDto(FatherSchedule s) {
        ScheduleDto dto = new ScheduleDto();
        dto.setDay(s.getDay());
        dto.setTime(s.getTime());
        dto.setLocation(s.getLocation());
        dto.setMeetingType(s.getMeetingType());
        dto.setService(s.getService());
        return dto;
    }
}
