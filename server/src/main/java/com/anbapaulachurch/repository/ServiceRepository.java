package com.anbapaulachurch.repository;

import com.anbapaulachurch.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    Optional<Service> findBySlug(String slug);
    List<Service> findAllByOrderByDisplayOrderAsc();
}
