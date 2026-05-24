package com.example.RestauranteSpringboot.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class PlatoFuerte extends Alimento {

    public PlatoFuerte(String nombre, double precio) {
        super(nombre, precio);
    }
}