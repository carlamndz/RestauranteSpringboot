package com.example.RestauranteSpringboot.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cliente extends Base {

    @Column(name = "nombre", length = 80, nullable = false)
    private String nombre;

    @Column(name = "apellido", length = 80, nullable = false)
    private String apellido;

    @Column(name = "cedula", length = 30)
    private String cedula;

    @Column(name = "telefono", length = 30)
    private String telefono;

    @Column(name = "correo", length = 80)
    private String correo;
}