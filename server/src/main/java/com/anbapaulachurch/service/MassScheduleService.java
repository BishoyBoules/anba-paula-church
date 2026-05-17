package com.anbapaulachurch.service;

import com.anbapaulachurch.entity.MassSchedule;
import com.anbapaulachurch.repository.MassScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MassScheduleService {

    private final MassScheduleRepository repo;

    public List<MassSchedule> getActive() {
        return repo.findByActiveTrueOrderByDisplayOrderAsc();
    }

    public List<MassSchedule> getAll() {
        return repo.findAllByOrderByDisplayOrderAsc();
    }

    public MassSchedule create(MassSchedule s) {
        return repo.save(s);
    }

    public MassSchedule update(Long id, MassSchedule data) {
        MassSchedule s = repo.findById(id).orElseThrow();
        s.setDay(data.getDay());
        s.setTime(data.getTime());
        s.setDisplayOrder(data.getDisplayOrder());
        s.setActive(data.isActive());
        return repo.save(s);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
