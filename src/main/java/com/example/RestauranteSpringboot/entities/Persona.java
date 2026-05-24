package com.example.RestauranteSpringboot.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Persona {

    private String nombre;
    private String cedula;
    private String telefono;
    private String usuario;
    private String contrasenia;

    public Persona(String nombre, String cedula, String telefono) {
        this.nombre = nombre;
        this.cedula = cedula;
        this.telefono = telefono;
    }

    public void iniciarSesion() {
        System.out.println("Se inició sesión");
    }

    public void restablecerContrasenia() {
        System.out.println("Se restableció la contraseña");
    }
}