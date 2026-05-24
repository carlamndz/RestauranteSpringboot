package com.example.RestauranteSpringboot.repositories;

import com.example.RestauranteSpringboot.entities.Alimento;
import org.springframework.stereotype.Repository;

@Repository
public interface AlimentoRepository extends BaseRepository<Alimento, Long> {
}