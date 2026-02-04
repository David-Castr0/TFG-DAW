package com.tfg.sushi_buffet.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

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
    
    // Constructor vacío
    public DetallePedido() {
    }
    
    // Getters y Setters
    public Integer getIdDetalle() {
        return idDetalle;
    }
    
    public void setIdDetalle(Integer idDetalle) {
        this.idDetalle = idDetalle;
    }
    
    public Pedido getPedido() {
        return pedido;
    }
    
    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }
    
    public Plato getPlato() {
        return plato;
    }
    
    public void setPlato(Plato plato) {
        this.plato = plato;
    }
    
    public Integer getCantidad() {
        return cantidad;
    }
    
    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
    
    public LocalDateTime getFechaHoraSolicitud() {
        return fechaHoraSolicitud;
    }
    
    public void setFechaHoraSolicitud(LocalDateTime fechaHoraSolicitud) {
        this.fechaHoraSolicitud = fechaHoraSolicitud;
    }
    
    public Estado getEstado() {
        return estado;
    }
    
    public void setEstado(Estado estado) {
        this.estado = estado;
    }
    
    public String getNotasEspeciales() {
        return notasEspeciales;
    }
    
    public void setNotasEspeciales(String notasEspeciales) {
        this.notasEspeciales = notasEspeciales;
    }
    
    @PrePersist
    protected void onCreate() {
        fechaHoraSolicitud = LocalDateTime.now();
    }
}