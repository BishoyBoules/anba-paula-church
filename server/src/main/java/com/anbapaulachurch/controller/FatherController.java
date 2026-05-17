package com.anbapaulachurch.controller;

import com.anbapaulachurch.dto.FatherDto;
import com.anbapaulachurch.dto.UpdateSchedulesRequest;
import com.anbapaulachurch.service.FatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fathers")
@RequiredArgsConstructor
public class FatherController {

    private final FatherService fatherService;

    @GetMapping
    public ResponseEntity<List<FatherDto>> getAll() {
        return ResponseEntity.ok(fatherService.getAllFathers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FatherDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(fatherService.getFatherById(id));
    }

    @PostMapping
    public ResponseEntity<FatherDto> create(@RequestBody FatherDto dto) {
        return ResponseEntity.ok(fatherService.createFather(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FatherDto> update(@PathVariable Long id, @RequestBody FatherDto dto) {
        return ResponseEntity.ok(fatherService.updateFather(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        fatherService.deleteFather(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/schedules")
    public ResponseEntity<FatherDto> updateSchedules(@PathVariable Long id,
                                                     @RequestBody UpdateSchedulesRequest req) {
        return ResponseEntity.ok(fatherService.updateSchedules(id, req));
    }
}
