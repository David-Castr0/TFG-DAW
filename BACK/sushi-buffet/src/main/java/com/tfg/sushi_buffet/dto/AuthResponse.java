package com.tfg.sushi_buffet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String username;
    private String nombre;
    private String rol;
    private String mensaje;
}