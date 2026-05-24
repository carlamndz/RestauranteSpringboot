package com.example.RestauranteSpringboot.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ingrediente {

    private int cantidadStock;
    private String descripcion;
}