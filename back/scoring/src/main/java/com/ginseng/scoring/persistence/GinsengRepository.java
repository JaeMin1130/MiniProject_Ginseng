package com.ginseng.scoring.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ginseng.scoring.domain.Ginseng;

public interface GinsengRepository extends JpaRepository<Ginseng, String> {
}