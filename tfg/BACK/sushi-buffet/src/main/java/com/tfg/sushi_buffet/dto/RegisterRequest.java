package com.tfg.sushi_buffet.dto;

import com.tfg.sushi_buffet.entity.User;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String nombre;
    private String email;
    private User.Rol rol = User.Rol.CLIENTE; // Por defecto CLIENTE
}
