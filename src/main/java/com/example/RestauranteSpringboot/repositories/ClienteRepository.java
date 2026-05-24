package com.example.RestauranteSpringboot.repositories;

import com.example.RestauranteSpringboot.entities.Cliente;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends BaseRepository<Cliente, Long> {
}