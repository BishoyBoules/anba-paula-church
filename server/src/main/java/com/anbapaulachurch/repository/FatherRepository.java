package com.anbapaulachurch.repository;

import com.anbapaulachurch.entity.Father;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FatherRepository extends JpaRepository<Father, Long> {
    List<Father> findAllByOrderByCreatedAtAsc();
}
