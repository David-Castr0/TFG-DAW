package com.tfg.sushi_buffet.controller;

import com.tfg.sushi_buffet.dto.AuthResponse;
import com.tfg.sushi_buffet.dto.LoginRequest;
import com.tfg.sushi_buffet.dto.RegisterRequest;
import com.tfg.sushi_buffet.entity.User;
import com.tfg.sushi_buffet.security.JwtUtil;
import com.tfg.sushi_buffet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    // POST /api/auth/login - Iniciar sesión
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Autenticar usuario
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );
            
            // Cargar detalles del usuario
            final UserDetails userDetails = userService.loadUserByUsername(loginRequest.getUsername());
            
            // Generar token JWT
            final String jwt = jwtUtil.generateToken(userDetails);
            
            // Obtener información adicional del usuario
            User user = userService.obtenerUsuarioPorUsername(loginRequest.getUsername()).get();
            
            // Devolver respuesta con el token
            return ResponseEntity.ok(new AuthResponse(
                jwt,
                user.getUsername(),
                user.getNombre(),
                user.getRol().name(),
                user.getEmail(),
                "Login exitoso"
            ));
            
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Usuario o contraseña incorrectos");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error en el servidor: " + e.getMessage());
        }
    }
    
    // POST /api/auth/register - Registrar nuevo usuario
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            // Verificar si el username ya existe
            if (userService.existeUsername(registerRequest.getUsername())) {
                return ResponseEntity.badRequest().body("El username ya está en uso");
            }
            
            // Verificar si el email ya existe
            if (userService.existeEmail(registerRequest.getEmail())) {
                return ResponseEntity.badRequest().body("El email ya está en uso");
            }
            
            // Crear nuevo usuario
            User nuevoUsuario = new User();
            nuevoUsuario.setUsername(registerRequest.getUsername());
            nuevoUsuario.setPassword(registerRequest.getPassword()); // Se encriptará en el service
            nuevoUsuario.setNombre(registerRequest.getNombre());
            nuevoUsuario.setEmail(registerRequest.getEmail());
            nuevoUsuario.setRol(registerRequest.getRol());
            
            // Guardar usuario
            User usuarioGuardado = userService.registrarUsuario(nuevoUsuario);
            
            // Generar token automáticamente
            final UserDetails userDetails = userService.loadUserByUsername(usuarioGuardado.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails);
            
            // Devolver respuesta
            return ResponseEntity.ok(new AuthResponse(
                jwt,
                usuarioGuardado.getUsername(),
                usuarioGuardado.getNombre(),
                usuarioGuardado.getRol().name(),
                usuarioGuardado.getEmail(),
                "Registro exitoso"
            ));
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al registrar usuario: " + e.getMessage());
        }
    }


    // Endpoint temporal para encriptar contraseñas existentes (BORRAR EN PRODUCCIÓN)
@GetMapping("/encrypt-passwords")
public ResponseEntity<?> encryptExistingPasswords() {
    try {
        // Obtener usuarios
        User admin = userService.obtenerUsuarioPorUsername("admin").orElse(null);
        User cliente = userService.obtenerUsuarioPorUsername("cliente").orElse(null);
        
        if (admin != null) {
            admin.setPassword(userService.registrarUsuario(admin).getPassword());
        }
        
        if (cliente != null) {
            cliente.setPassword(userService.registrarUsuario(cliente).getPassword());
        }
        
        return ResponseEntity.ok("Contraseñas encriptadas correctamente");
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error: " + e.getMessage());
    }
}
}