package com.anbapaulachurch.controller;

import com.anbapaulachurch.entity.Service;
import com.anbapaulachurch.service.ChurchServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ChurchServiceController {

    private final ChurchServiceService service;

    @GetMapping
    public ResponseEntity<List<Service>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Service> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(service.getBySlug(slug));
    }

    @PostMapping
    public ResponseEntity<Service> create(@RequestBody Service s) {
        return ResponseEntity.ok(service.create(s));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Service> update(@PathVariable Long id, @RequestBody Service s) {
        return ResponseEntity.ok(service.update(id, s));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
