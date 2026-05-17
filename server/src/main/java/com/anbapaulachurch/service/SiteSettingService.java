package com.anbapaulachurch.service;

import com.anbapaulachurch.entity.SiteSetting;
import com.anbapaulachurch.repository.SiteSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SiteSettingService {

    private final SiteSettingRepository repo;

    public Map<String, String> getAll() {
        Map<String, String> map = new HashMap<>();
        repo.findAll().forEach(s -> map.put(s.getKey(), s.getValue()));
        return map;
    }

    public Map<String, String> saveAll(Map<String, String> settings) {
        settings.forEach((key, value) -> {
            SiteSetting setting = repo.findByKey(key).orElseGet(SiteSetting::new);
            setting.setKey(key);
            setting.setValue(value);
            repo.save(setting);
        });
        return getAll();
    }
}
