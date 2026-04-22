package com.tfg.sushi_buffet.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "reservas")
public class Reserva {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reserva")
    private Integer idReserva;
    
    @ManyToOne
    @JoinColumn(name = "id_mesa", nullable = false)
    private Mesa mesa;
    
    @ManyToOne
    @JoinColumn(name = "id_localizacion", nullable = false)
    private Localizacion localizacion;
    
    @Column(name = "nombre_cliente", nullable = false, length = 100)
    private String nombreCliente;
    
    @Column(name = "telefono_cliente", nullable = false, length = 20)
    private String telefonoCliente;
    
    @Column(name = "email_cliente", length = 100)
    private String emailCliente;
    
    @Column(name = "fecha_reserva", nullable = false)
    private LocalDate fechaReserva;
    
    @Column(name = "hora_reserva", nullable = false)
    private LocalTime horaReserva;
    
    @Column(name = "num_personas", nullable = false)
    private Integer numPersonas;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Estado estado = Estado.pendiente;
    
    @Column(columnDefinition = "TEXT")
    private String notas;
    
    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;
    
    // Enum para el estado de la reserva
    public enum Estado {
        pendiente, confirmada, cancelada, completada
    }
    
    
}