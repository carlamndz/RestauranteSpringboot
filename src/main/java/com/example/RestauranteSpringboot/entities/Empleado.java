package com.example.RestauranteSpringboot.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class Empleado extends Persona {

    private String fechaVinculacion;
    private String horaIngreso;
    private String horaSalida;

    public Empleado(String fechaVinculacion, String horaIngreso, String horaSalida) {
        this.fechaVinculacion = fechaVinculacion;
        this.horaIngreso = horaIngreso;
        this.horaSalida = horaSalida;
    }

    public Empleado(String fechaVinculacion, String horaIngreso, String horaSalida,
                    String nombre, String cedula, String telefono) {
        super(nombre, cedula, telefono);
        this.fechaVinculacion = fechaVinculacion;
        this.horaIngreso = horaIngreso;
        this.horaSalida = horaSalida;
    }

    public void registrarEntrada(String horaIngreso) {
        System.out.println("La hora de ingreso es " + horaIngreso);
    }

    public void registrarSalida(String horaSalida) {
        System.out.println("La hora de salida es " + horaSalida);
    }
}