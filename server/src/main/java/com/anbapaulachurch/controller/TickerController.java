package com.anbapaulachurch.controller;

import com.anbapaulachurch.entity.TickerItem;
import com.anbapaulachurch.service.TickerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ticker")
@RequiredArgsConstructor
public class TickerController {

    private final TickerService service;

    @GetMapping
    public ResponseEntity<List<TickerItem>> getActive() {
        return ResponseEntity.ok(service.getActive());
    }

    @GetMapping("/all")
    public ResponseEntity<List<TickerItem>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<TickerItem> create(@RequestBody TickerItem item) {
        return ResponseEntity.ok(service.create(item));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TickerItem> update(@PathVariable Long id, @RequestBody TickerItem item) {
        return ResponseEntity.ok(service.update(id, item));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
