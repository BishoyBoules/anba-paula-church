package com.anbapaulachurch.service;

import com.anbapaulachurch.dto.NewsDto;
import com.anbapaulachurch.entity.News;
import com.anbapaulachurch.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsRepository newsRepository;

    public List<NewsDto> getAllNews() {
        return newsRepository.findAllByOrderByCreatedAtDesc()
                .stream().map(this::toDto).toList();
    }

    public NewsDto createNews(NewsDto dto) {
        News news = new News();
        news.setTitle(dto.getTitle());
        news.setDate(dto.getDate());
        news.setDescription(dto.getDescription());
        news.setImage(dto.getImage());
        return toDto(newsRepository.save(news));
    }

    public NewsDto updateNews(Long id, NewsDto dto) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News not found: " + id));
        news.setTitle(dto.getTitle());
        news.setDate(dto.getDate());
        news.setDescription(dto.getDescription());
        news.setImage(dto.getImage());
        return toDto(newsRepository.save(news));
    }

    public void deleteNews(Long id) {
        newsRepository.deleteById(id);
    }

    private NewsDto toDto(News news) {
        NewsDto dto = new NewsDto();
        dto.setId(news.getId());
        dto.setTitle(news.getTitle());
        dto.setDate(news.getDate());
        dto.setDescription(news.getDescription());
        dto.setImage(news.getImage());
        return dto;
    }
}
