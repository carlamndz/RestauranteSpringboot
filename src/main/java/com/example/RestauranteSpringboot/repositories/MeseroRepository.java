package com.example.RestauranteSpringboot.repositories;

import com.example.RestauranteSpringboot.entities.Mesero;
import org.springframework.stereotype.Repository;

@Repository
public interface MeseroRepository extends BaseRepository<Mesero, Long> {
}