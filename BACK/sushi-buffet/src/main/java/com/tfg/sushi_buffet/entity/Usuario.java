package com.tfg.sushi_buffet.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "usuarios")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;
    
    @Column(nullable = false, unique = true, length = 50)
    private String username;
    
    @Column(nullable = false, length = 255)
    private String password;
    
    @Column(nullable = false, length = 20)
    private String nombre;
    
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol;
    
    @Column(columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean activo = true;
    
    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;
    
    // Enum para los roles
    public enum Rol {
        admin, cocinero, recepcionista
    }
    
    // Método para establecer automáticamente la fecha de creación
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
    }
}