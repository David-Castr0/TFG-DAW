package com.tfg.sushi_buffet.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "mesas")
public class Mesa {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mesa")
    private Integer idMesa;
    
    @ManyToOne
    @JoinColumn(name = "id_localizacion", nullable = false)
    private Localizacion localizacion;
    
    @Column(name = "numero_mesa", nullable = false, length = 10)
    private String numeroMesa;
    
    @Column(nullable = false)
    private Integer capacidad;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Estado estado = Estado.libre;
    
    // Enum para el estado de la mesa
    public enum Estado {
        libre, ocupada, reservada
    }
    
}