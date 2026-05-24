package com.example.RestauranteSpringboot.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class Chef extends Empleado {

    private double salario;

    public Chef(double salario) {
        this.salario = salario;
    }

    public Chef(double salario, String fechaVinculacion, String horaIngreso, String horaSalida) {
        super(fechaVinculacion, horaIngreso, horaSalida);
        this.salario = salario;
    }

    public Chef(double salario, String fechaVinculacion, String horaIngreso, String horaSalida,
                String nombre, String cedula, String telefono) {
        super(fechaVinculacion, horaIngreso, horaSalida, nombre, cedula, telefono);
        this.salario = salario;
    }
}