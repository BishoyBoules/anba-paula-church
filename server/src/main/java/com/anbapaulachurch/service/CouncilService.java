package com.anbapaulachurch.service;

import com.anbapaulachurch.entity.CouncilMember;
import com.anbapaulachurch.repository.CouncilMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CouncilService {

    private final CouncilMemberRepository repo;

    public List<CouncilMember> getAll() {
        return repo.findAllByOrderByDisplayOrderAsc();
    }

    public CouncilMember create(CouncilMember m) {
        return repo.save(m);
    }

    public CouncilMember update(Long id, CouncilMember data) {
        CouncilMember m = repo.findById(id).orElseThrow();
        m.setName(data.getName());
        m.setRole(data.getRole());
        m.setImage(data.getImage());
        m.setDisplayOrder(data.getDisplayOrder());
        return repo.save(m);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
