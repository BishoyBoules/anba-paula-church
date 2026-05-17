package com.anbapaulachurch.controller;

import com.anbapaulachurch.entity.Event;
import com.anbapaulachurch.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService service;

    @GetMapping
    public ResponseEntity<List<Event>> getAll(@RequestParam(required = false) String type) {
        if (type != null) return ResponseEntity.ok(service.getByType(type.toUpperCase()));
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Event> create(@RequestBody Event e) {
        return ResponseEntity.ok(service.create(e));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> update(@PathVariable Long id, @RequestBody Event e) {
        return ResponseEntity.ok(service.update(id, e));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
