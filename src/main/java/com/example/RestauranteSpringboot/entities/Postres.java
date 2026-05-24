package com.example.RestauranteSpringboot.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class Postres extends Alimento {

    public Postres(String nombre, double precio) {
        super(nombre, precio);
    }
}