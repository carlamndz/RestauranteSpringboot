package com.example.RestauranteSpringboot.controllers;

import com.example.RestauranteSpringboot.entities.Alimento;
import com.example.RestauranteSpringboot.services.AlimentoServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/alimentos")
public class AlimentoController extends BaseControllerImpl<Alimento, AlimentoServiceImpl> {
}