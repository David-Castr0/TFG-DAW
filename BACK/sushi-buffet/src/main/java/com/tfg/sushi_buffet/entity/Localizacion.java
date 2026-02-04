package com.tfg.sushi_buffet.entity;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "localizaciones")
public class Localizacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_localizacion")
    private Integer idLocalizacion;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(nullable = false, length = 255)
    private String direccion;
    
    @Column(length = 20)
    private String telefono;
    
    @Column(length = 100)
    private String ciudad;
    
    @Column(name = "horario_apertura")
    private LocalTime horarioApertura;
    
    @Column(name = "horario_cierre")
    private LocalTime horarioCierre;
    
    @Column(columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean activo = true;
    
    // Constructor vacío
    public Localizacion() {
    }
    
    // Getters y Setters
    public Integer getIdLocalizacion() {
        return idLocalizacion;
    }
    
    public void setIdLocalizacion(Integer idLocalizacion) {
        this.idLocalizacion = idLocalizacion;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getDireccion() {
        return direccion;
    }
    
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
    
    public String getTelefono() {
        return telefono;
    }
    
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    
    public String getCiudad() {
        return ciudad;
    }
    
    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }
    
    public LocalTime getHorarioApertura() {
        return horarioApertura;
    }
    
    public void setHorarioApertura(LocalTime horarioApertura) {
        this.horarioApertura = horarioApertura;
    }
    
    public LocalTime getHorarioCierre() {
        return horarioCierre;
    }
    
    public void setHorarioCierre(LocalTime horarioCierre) {
        this.horarioCierre = horarioCierre;
    }
    
    public Boolean getActivo() {
        return activo;
    }
    
    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}