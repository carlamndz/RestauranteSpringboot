package com.example.RestauranteSpringboot.controllers;

import com.example.RestauranteSpringboot.entities.Mesero;
import com.example.RestauranteSpringboot.services.MeseroServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/meseros")
public class MeseroController extends BaseControllerImpl<Mesero, MeseroServiceImpl> {
}