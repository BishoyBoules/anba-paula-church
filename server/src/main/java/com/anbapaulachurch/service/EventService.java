package com.anbapaulachurch.service;

import com.anbapaulachurch.entity.Event;
import com.anbapaulachurch.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository repo;

    public List<Event> getAll() {
        return repo.findAllByOrderByCreatedAtDesc();
    }

    public List<Event> getByType(String type) {
        return repo.findByEventTypeOrderByCreatedAtDesc(type);
    }

    public Event create(Event e) {
        return repo.save(e);
    }

    public Event update(Long id, Event data) {
        Event e = repo.findById(id).orElseThrow();
        e.setTitle(data.getTitle());
        e.setDate(data.getDate());
        e.setDescription(data.getDescription());
        e.setImage(data.getImage());
        e.setEventType(data.getEventType());
        return repo.save(e);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
