package com.tfg.sushi_buffet.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

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
    
    // Constructor vacío
    public Reserva() {
    }
    
    // Getters y Setters
    public Integer getIdReserva() {
        return idReserva;
    }
    
    public void setIdReserva(Integer idReserva) {
        this.idReserva = idReserva;
    }
    
    public Mesa getMesa() {
        return mesa;
    }
    
    public void setMesa(Mesa mesa) {
        this.mesa = mesa;
    }
    
    public Localizacion getLocalizacion() {
        return localizacion;
    }
    
    public void setLocalizacion(Localizacion localizacion) {
        this.localizacion = localizacion;
    }
    
    public String getNombreCliente() {
        return nombreCliente;
    }
    
    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }
    
    public String getTelefonoCliente() {
        return telefonoCliente;
    }
    
    public void setTelefonoCliente(String telefonoCliente) {
        this.telefonoCliente = telefonoCliente;
    }
    
    public String getEmailCliente() {
        return emailCliente;
    }
    
    public void setEmailCliente(String emailCliente) {
        this.emailCliente = emailCliente;
    }
    
    public LocalDate getFechaReserva() {
        return fechaReserva;
    }
    
    public void setFechaReserva(LocalDate fechaReserva) {
        this.fechaReserva = fechaReserva;
    }
    
    public LocalTime getHoraReserva() {
        return horaReserva;
    }
    
    public void setHoraReserva(LocalTime horaReserva) {
        this.horaReserva = horaReserva;
    }
    
    public Integer getNumPersonas() {
        return numPersonas;
    }
    
    public void setNumPersonas(Integer numPersonas) {
        this.numPersonas = numPersonas;
    }
    
    public Estado getEstado() {
        return estado;
    }
    
    public void setEstado(Estado estado) {
        this.estado = estado;
    }
    
    public String getNotas() {
        return notas;
    }
    
    public void setNotas(String notas) {
        this.notas = notas;
    }
    
    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }
    
    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }
    
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
    }
}