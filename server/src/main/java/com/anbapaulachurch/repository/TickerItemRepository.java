package com.anbapaulachurch.repository;

import com.anbapaulachurch.entity.TickerItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TickerItemRepository extends JpaRepository<TickerItem, Long> {
    List<TickerItem> findByActiveTrueOrderByDisplayOrderAsc();
    List<TickerItem> findAllByOrderByDisplayOrderAsc();
}
