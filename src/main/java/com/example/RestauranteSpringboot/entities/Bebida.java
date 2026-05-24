package com.example.RestauranteSpringboot.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class Bebida extends Alimento {

    public Bebida(String nombre, double precio) {
        super(nombre, precio);
    }
}