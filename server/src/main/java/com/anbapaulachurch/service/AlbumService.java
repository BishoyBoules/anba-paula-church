package com.anbapaulachurch.service;

import com.anbapaulachurch.entity.AlbumPhoto;
import com.anbapaulachurch.repository.AlbumPhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumPhotoRepository repo;

    public List<AlbumPhoto> getAll() {
        return repo.findAllByOrderByDisplayOrderAsc();
    }

    public List<AlbumPhoto> getByCategory(String category) {
        return repo.findByCategoryOrderByDisplayOrderAsc(category);
    }

    public AlbumPhoto create(AlbumPhoto p) {
        return repo.save(p);
    }

    public AlbumPhoto update(Long id, AlbumPhoto data) {
        AlbumPhoto p = repo.findById(id).orElseThrow();
        p.setImage(data.getImage());
        p.setTitle(data.getTitle());
        p.setCategory(data.getCategory());
        p.setDisplayOrder(data.getDisplayOrder());
        return repo.save(p);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
