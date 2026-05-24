package com.example.RestauranteSpringboot.services;

import com.example.RestauranteSpringboot.entities.Cliente;
import com.example.RestauranteSpringboot.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteServiceImpl extends BaseServiceImpl<Cliente, Long> implements ClienteService {

    @Autowired
    public ClienteServiceImpl(ClienteRepository clienteRepository) {
        super(clienteRepository);
    }
}