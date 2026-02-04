package com.tfg.sushi_buffet.entity;

import jakarta.persistence.*;

@Entity
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
    
    // Constructor vacío
    public Mesa() {
    }
    
    // Getters y Setters
    public Integer getIdMesa() {
        return idMesa;
    }
    
    public void setIdMesa(Integer idMesa) {
        this.idMesa = idMesa;
    }
    
    public Localizacion getLocalizacion() {
        return localizacion;
    }
    
    public void setLocalizacion(Localizacion localizacion) {
        this.localizacion = localizacion;
    }
    
    public String getNumeroMesa() {
        return numeroMesa;
    }
    
    public void setNumeroMesa(String numeroMesa) {
        this.numeroMesa = numeroMesa;
    }
    
    public Integer getCapacidad() {
        return capacidad;
    }
    
    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }
    
    public Estado getEstado() {
        return estado;
    }
    
    public void setEstado(Estado estado) {
        this.estado = estado;
    }
}