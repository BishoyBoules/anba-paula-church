package com.anbapaulachurch.repository;

import com.anbapaulachurch.entity.CouncilMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CouncilMemberRepository extends JpaRepository<CouncilMember, Long> {
    List<CouncilMember> findAllByOrderByDisplayOrderAsc();
}
