package com.anbapaulachurch.repository;

import com.anbapaulachurch.entity.AlbumPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlbumPhotoRepository extends JpaRepository<AlbumPhoto, Long> {
    List<AlbumPhoto> findAllByOrderByDisplayOrderAsc();
    List<AlbumPhoto> findByCategoryOrderByDisplayOrderAsc(String category);
}
