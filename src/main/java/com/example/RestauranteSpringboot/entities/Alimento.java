package com.example.RestauranteSpringboot.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "alimento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Alimento extends Base {

    @Column(name = "nombre", length = 120, nullable = false)
    private String nombre;

    @Column(name = "precio", nullable = false)
    private double precio;
}