package com.example.RestauranteSpringboot.services;

import com.example.RestauranteSpringboot.entities.Alimento;
import com.example.RestauranteSpringboot.repositories.AlimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlimentoServiceImpl extends BaseServiceImpl<Alimento, Long> implements AlimentoService {

    @Autowired
    public AlimentoServiceImpl(AlimentoRepository alimentoRepository) {
        super(alimentoRepository);
    }
}