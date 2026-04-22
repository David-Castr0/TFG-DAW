package com.tfg.sushi_buffet.controller;

import com.tfg.sushi_buffet.dto.AuthResponse;
import com.tfg.sushi_buffet.dto.LoginRequest;
import com.tfg.sushi_buffet.dto.RegisterRequest;
import com.tfg.sushi_buffet.entity.Usuario;
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
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Usuario user = userService.obtenerUsuarioPorEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new BadCredentialsException("Usuario no encontrado"));

            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    user.getUsername(),
                    loginRequest.getPassword()
                )
            );

            final UserDetails userDetails = userService.loadUserByUsername(user.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new AuthResponse(
                jwt,
                user.getUsername(),
                user.getNombre(),
                user.getRol().name(),
                user.getEmail(),
                "Login exitoso",
                user.getTelefono()
            ));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Email o contraseña incorrectos");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error en el servidor: " + e.getMessage());
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            if (userService.existeUsername(registerRequest.getUsername())) {
                return ResponseEntity.badRequest().body("El username ya está en uso");
            }
            if (userService.existeEmail(registerRequest.getEmail())) {
                return ResponseEntity.badRequest().body("El email ya está en uso");
            }

            Usuario nuevoUsuario = new Usuario();
            nuevoUsuario.setUsername(registerRequest.getUsername());
            nuevoUsuario.setPassword(registerRequest.getPassword());
            nuevoUsuario.setNombre(registerRequest.getNombre());
            nuevoUsuario.setEmail(registerRequest.getEmail());
            nuevoUsuario.setTelefono(registerRequest.getTelefono());
            nuevoUsuario.setRol(registerRequest.getRol());

            Usuario usuarioGuardado = userService.registrarUsuario(nuevoUsuario);

            final UserDetails userDetails = userService.loadUserByUsername(usuarioGuardado.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new AuthResponse(
                jwt,
                usuarioGuardado.getUsername(),
                usuarioGuardado.getNombre(),
                usuarioGuardado.getRol().name(),
                usuarioGuardado.getEmail(),
                "Registro exitoso",
                usuarioGuardado.getTelefono()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al registrar usuario: " + e.getMessage());
        }
    }
}