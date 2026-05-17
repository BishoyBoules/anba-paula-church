package com.anbapaulachurch.controller;

import com.anbapaulachurch.entity.CouncilMember;
import com.anbapaulachurch.service.CouncilService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/council")
@RequiredArgsConstructor
public class CouncilController {

    private final CouncilService service;

    @GetMapping
    public ResponseEntity<List<CouncilMember>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<CouncilMember> create(@RequestBody CouncilMember m) {
        return ResponseEntity.ok(service.create(m));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CouncilMember> update(@PathVariable Long id, @RequestBody CouncilMember m) {
        return ResponseEntity.ok(service.update(id, m));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
