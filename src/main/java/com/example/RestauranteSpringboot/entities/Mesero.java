package com.example.RestauranteSpringboot.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mesero")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Mesero extends Base {

    @Column(name = "nombre", length = 60, nullable = false)
    private String nombre;

    @Column(name = "apellido", length = 60, nullable = false)
    private String apellido;

    @Column(name = "cedula", length = 30)
    private String cedula;

    @Column(name = "telefono", length = 30)
    private String telefono;

    @Column(name = "salario")
    private double salario;

    @Column(name = "hora_ingreso", length = 10)
    private String horaIngreso;
}