package com.example.RestauranteSpringboot.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Despensa {

    private List<Ingrediente> ingredientes = new ArrayList<>();
    private Gerente gerente;

    public Despensa(Gerente gerente) {
        this.gerente = gerente;
    }

    public void agregarIngrediente(Ingrediente ingrediente) {
        this.ingredientes.add(ingrediente);
    }
}