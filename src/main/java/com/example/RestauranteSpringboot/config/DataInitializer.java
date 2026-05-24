package com.example.RestauranteSpringboot.config;

import com.example.RestauranteSpringboot.entities.*;
import com.example.RestauranteSpringboot.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private MeseroRepository meseroRepository;
    @Autowired
    private AlimentoRepository alimentoRepository;
    @Autowired
    private PedidoRepository pedidoRepository;

    @Override
    public void run(String... args) throws Exception {

        // Solo carga si las tablas están vacías
        if (clienteRepository.count() == 0) {
            clienteRepository.saveAll(List.of(
                    new Cliente("Juan", "Pérez", "20-11111111-1", "2614001001", "juan@mail.com"),
                    new Cliente("María", "González", "27-22222222-2", "2614002002", "maria@mail.com"),
                    new Cliente("Carlos", "Rodríguez", "20-33333333-3", "2614003003", "carlos@mail.com"),
                    new Cliente("Laura", "Martínez", "27-44444444-4", "2614004004", "laura@mail.com")
            ));
        }

        if (meseroRepository.count() == 0) {
            meseroRepository.saveAll(List.of(
                    new Mesero("Diego", "López", "20-55555555-5", "2614005005", 150000, "08:00"),
                    new Mesero("Sofía", "Fernández", "27-66666666-6", "2614006006", 150000, "12:00"),
                    new Mesero("Martín", "García", "20-77777777-7", "2614007007", 160000, "16:00")
            ));
        }

        if (alimentoRepository.count() == 0) {
            alimentoRepository.saveAll(List.of(
                    new Alimento("Milanesa con papas", 3500),
                    new Alimento("Bife de chorizo", 5200),
                    new Alimento("Ensalada mixta", 1800),
                    new Alimento("Empanadas x6", 2400),
                    new Alimento("Agua mineral", 800),
                    new Alimento("Gaseosa", 1000),
                    new Alimento("Vino de la casa (copa)", 1500),
                    new Alimento("Postre del día", 1200)
            ));
        }

        if (pedidoRepository.count() == 0) {
            Cliente c1 = clienteRepository.findById(1L).get();
            Cliente c2 = clienteRepository.findById(2L).get();
            Mesero m1 = meseroRepository.findById(1L).get();
            Mesero m2 = meseroRepository.findById(2L).get();
            Alimento a1 = alimentoRepository.findById(1L).get();
            Alimento a2 = alimentoRepository.findById(5L).get();
            Alimento a3 = alimentoRepository.findById(2L).get();
            Alimento a4 = alimentoRepository.findById(6L).get();

            Pedido p1 = new Pedido();
            p1.setCliente(c1);
            p1.setMesero(m1);
            p1.setFecha(LocalDate.now());
            p1.setHora(LocalTime.of(12, 30));
            p1.setAlimentos(List.of(a1, a2));
            p1.setTotal(a1.getPrecio() + a2.getPrecio());

            Pedido p2 = new Pedido();
            p2.setCliente(c2);
            p2.setMesero(m2);
            p2.setFecha(LocalDate.now());
            p2.setHora(LocalTime.of(13, 15));
            p2.setAlimentos(List.of(a3, a4));
            p2.setTotal(a3.getPrecio() + a4.getPrecio());

            pedidoRepository.saveAll(List.of(p1, p2));
        }
    }
}