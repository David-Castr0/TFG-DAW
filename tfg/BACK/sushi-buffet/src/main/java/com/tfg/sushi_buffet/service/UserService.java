package com.tfg.sushi_buffet.service;

import com.tfg.sushi_buffet.entity.User;
import com.tfg.sushi_buffet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    // Método requerido por Spring Security para cargar usuarios
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
        
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.getActivo(),
                true,
                true,
                true,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRol().name()))
        );
    }
    
    // Registrar nuevo usuario
    public User registrarUsuario(User user) {
        // Encriptar la contraseña
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setFechaCreacion(LocalDateTime.now());
        user.setActivo(true);
        return userRepository.save(user);
    }
    
    public List<User> obtenerTodosLosUsuarios() {
        return userRepository.findAll();
    }
    
    public Optional<User> obtenerUsuarioPorUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> obtenerUsuarioPorEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    // Verificar si existe username
    public Boolean existeUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    
    // Verificar si existe email
    public Boolean existeEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}