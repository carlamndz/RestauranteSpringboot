package com.example.RestauranteSpringboot.services;

import com.example.RestauranteSpringboot.entities.Pedido;
import com.example.RestauranteSpringboot.repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoServiceImpl extends BaseServiceImpl<Pedido, Long> implements PedidoService {

    @Autowired
    public PedidoServiceImpl(PedidoRepository pedidoRepository) {
        super(pedidoRepository);
    }
}