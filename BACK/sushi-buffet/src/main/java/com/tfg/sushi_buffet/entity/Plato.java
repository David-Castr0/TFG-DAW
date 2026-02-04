package com.tfg.sushi_buffet.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

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
    
    // Constructor vacío
    public Plato() {
    }
    
    // Getters y Setters
    public Integer getIdPlato() {
        return idPlato;
    }
    
    public void setIdPlato(Integer idPlato) {
        this.idPlato = idPlato;
    }
    
    public Categoria getCategoria() {
        return categoria;
    }
    
    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public BigDecimal getPrecio() {
        return precio;
    }
    
    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }
    
    public String getImagenUrl() {
        return imagenUrl;
    }
    
    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }
    
    public Boolean getDisponible() {
        return disponible;
    }
    
    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
    }
}