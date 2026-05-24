package com.example.RestauranteSpringboot.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Receta {

    private Chef chef;
    private String nombreReceta;
    private List<Ingrediente> ingredientes = new ArrayList<>();

    public Receta(Chef chef, String nombreReceta) {
        this.chef = chef;
        this.nombreReceta = nombreReceta;
    }

    public void agregarIngrediente(Ingrediente ingrediente) {
        this.ingredientes.add(ingrediente);
    }
}