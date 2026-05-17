package com.anbapaulachurch.service;

import com.anbapaulachurch.entity.TickerItem;
import com.anbapaulachurch.repository.TickerItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TickerService {

    private final TickerItemRepository repo;

    public List<TickerItem> getActive() {
        return repo.findByActiveTrueOrderByDisplayOrderAsc();
    }

    public List<TickerItem> getAll() {
        return repo.findAllByOrderByDisplayOrderAsc();
    }

    public TickerItem create(TickerItem item) {
        return repo.save(item);
    }

    public TickerItem update(Long id, TickerItem data) {
        TickerItem item = repo.findById(id).orElseThrow();
        item.setContent(data.getContent());
        item.setDisplayOrder(data.getDisplayOrder());
        item.setActive(data.isActive());
        return repo.save(item);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
