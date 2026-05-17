package com.anbapaulachurch.service;

import com.anbapaulachurch.entity.Service;
import com.anbapaulachurch.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ChurchServiceService {

    private final ServiceRepository repo;

    public List<Service> getAll() {
        return repo.findAllByOrderByDisplayOrderAsc();
    }

    public Service getBySlug(String slug) {
        return repo.findBySlug(slug).orElseThrow(() -> new RuntimeException("Service not found: " + slug));
    }

    public Service create(Service s) {
        return repo.save(s);
    }

    public Service update(Long id, Service data) {
        Service s = repo.findById(id).orElseThrow();
        s.setSlug(data.getSlug());
        s.setName(data.getName());
        s.setDescription(data.getDescription());
        s.setBannerImage(data.getBannerImage());
        s.setSchedule(data.getSchedule());
        s.setSupervisor(data.getSupervisor());
        s.setExtraContent(data.getExtraContent());
        s.setDisplayOrder(data.getDisplayOrder());
        s.setActive(data.isActive());
        return repo.save(s);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
