package com.example.RestauranteSpringboot.controllers;

import com.example.RestauranteSpringboot.entities.Cliente;
import com.example.RestauranteSpringboot.services.ClienteServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/clientes")
public class ClienteController extends BaseControllerImpl<Cliente, ClienteServiceImpl> {
}