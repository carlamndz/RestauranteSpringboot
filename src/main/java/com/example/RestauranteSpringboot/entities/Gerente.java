package com.example.RestauranteSpringboot.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class Gerente extends Persona {

    public Gerente(String nombre, String cedula, String telefono) {
        super(nombre, cedula, telefono);
    }

    public void agregarEmpleado() {
        System.out.println("Se agregó al empleado");
    }

    public void borrarEmpleado() {
        System.out.println("Se borró al empleado");
    }

    public void modificarEmpleado() {
        System.out.println("Se modificó al empleado");
    }

    public void visualizarVentas() {
        System.out.println("Se visualizan las ventas");
    }
}