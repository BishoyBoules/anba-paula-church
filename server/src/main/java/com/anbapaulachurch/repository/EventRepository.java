package com.anbapaulachurch.repository;

import com.anbapaulachurch.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findAllByOrderByCreatedAtDesc();
    List<Event> findByEventTypeOrderByCreatedAtDesc(String eventType);
}
