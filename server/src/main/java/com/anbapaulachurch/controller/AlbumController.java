package com.anbapaulachurch.controller;

import com.anbapaulachurch.entity.AlbumPhoto;
import com.anbapaulachurch.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/album")
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService service;

    @GetMapping
    public ResponseEntity<List<AlbumPhoto>> getAll(@RequestParam(required = false) String category) {
        if (category != null && !category.isBlank()) return ResponseEntity.ok(service.getByCategory(category));
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<AlbumPhoto> create(@RequestBody AlbumPhoto p) {
        return ResponseEntity.ok(service.create(p));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlbumPhoto> update(@PathVariable Long id, @RequestBody AlbumPhoto p) {
        return ResponseEntity.ok(service.update(id, p));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
