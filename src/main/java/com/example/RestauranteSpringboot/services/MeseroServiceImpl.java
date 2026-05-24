package com.example.RestauranteSpringboot.services;

import com.example.RestauranteSpringboot.entities.Mesero;
import com.example.RestauranteSpringboot.repositories.MeseroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeseroServiceImpl extends BaseServiceImpl<Mesero, Long> implements MeseroService {

    @Autowired
    public MeseroServiceImpl(MeseroRepository meseroRepository) {
        super(meseroRepository);
    }
}