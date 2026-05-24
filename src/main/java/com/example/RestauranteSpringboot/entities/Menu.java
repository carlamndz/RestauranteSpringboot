package com.example.RestauranteSpringboot.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Menu {

    private List<Alimento> alimentos = new ArrayList<>();
    private Gerente gerente;

    public Menu(Gerente gerente) {
        this.gerente = gerente;
    }
}