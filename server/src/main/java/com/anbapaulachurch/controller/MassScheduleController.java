package com.anbapaulachurch.controller;

import com.anbapaulachurch.entity.MassSchedule;
import com.anbapaulachurch.service.MassScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mass-schedules")
@RequiredArgsConstructor
public class MassScheduleController {

    private final MassScheduleService service;

    @GetMapping
    public ResponseEntity<List<MassSchedule>> getActive() {
        return ResponseEntity.ok(service.getActive());
    }

    @GetMapping("/all")
    public ResponseEntity<List<MassSchedule>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<MassSchedule> create(@RequestBody MassSchedule s) {
        return ResponseEntity.ok(service.create(s));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MassSchedule> update(@PathVariable Long id, @RequestBody MassSchedule s) {
        return ResponseEntity.ok(service.update(id, s));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
