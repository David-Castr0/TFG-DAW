package com.tfg.sushi_buffet.dto;

import com.tfg.sushi_buffet.entity.Usuario;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String nombre;
    private String email;
    private String telefono;
    private Usuario.Rol rol = Usuario.Rol.CLIENTE;
}