package com.tfg.sushi_buffet.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@Entity
@Table(name = "platos")
public class Plato {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_plato")
    private Integer idPlato;
    
    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal precio = BigDecimal.ZERO;
    
    @Column(name = "imagen_url", length = 255)
    private String imagenUrl;
    
    @Column(columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean disponible = true;
    
   
}