package com.example.RestauranteSpringboot.controllers;

import com.example.RestauranteSpringboot.entities.Pedido;
import com.example.RestauranteSpringboot.services.PedidoServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/pedidos")
public class PedidoController extends BaseControllerImpl<Pedido, PedidoServiceImpl> {
}