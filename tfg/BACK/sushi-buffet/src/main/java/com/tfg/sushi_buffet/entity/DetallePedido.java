package com.tfg.sushi_buffet.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "detalle_pedidos")
public class DetallePedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle")
    private Integer idDetalle;
    
    @ManyToOne
    @JoinColumn(name = "id_pedido", nullable = false)
    private Pedido pedido;
    
    @ManyToOne
    @JoinColumn(name = "id_plato", nullable = false)
    private Plato plato;
    
    @Column(nullable = false)
    private Integer cantidad = 1;
    
    @Column(name = "fecha_hora_solicitud", updatable = false)
    private LocalDateTime fechaHoraSolicitud;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Estado estado = Estado.pendiente;
    
    @Column(name = "notas_especiales", columnDefinition = "TEXT")
    private String notasEspeciales;
    
    // Enum para el estado del detalle del pedido
    public enum Estado {
        pendiente, en_preparacion, listo, entregado
    }
    
    
}