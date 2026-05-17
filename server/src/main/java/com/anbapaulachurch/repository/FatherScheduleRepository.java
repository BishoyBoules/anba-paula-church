package com.anbapaulachurch.repository;

import com.anbapaulachurch.entity.FatherSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FatherScheduleRepository extends JpaRepository<FatherSchedule, Long> {
    List<FatherSchedule> findByFatherId(Long fatherId);
    void deleteByFatherId(Long fatherId);
}
