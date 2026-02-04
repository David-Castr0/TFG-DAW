package com.tfg.sushi_buffet.service;

import com.tfg.sushi_buffet.entity.Usuario;
import com.tfg.sushi_buffet.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    // Obtener todos los usuarios
    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }
    
    // Obtener usuario por ID
    public Optional<Usuario> obtenerUsuarioPorId(Integer id) {
        return usuarioRepository.findById(id);
    }
    
    // Obtener usuario por username
    public Optional<Usuario> obtenerUsuarioPorUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }
    
    // Crear o actualizar usuario
    public Usuario guardarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    
    // Eliminar usuario
    public void eliminarUsuario(Integer id) {
        usuarioRepository.deleteById(id);
    }
    
    // Verificar si existe un usuario por username
    public boolean existeUsername(String username) {
        return usuarioRepository.findByUsername(username).isPresent();
    }
    
    // Verificar si existe un usuario por email
    public boolean existeEmail(String email) {
        return usuarioRepository.findByEmail(email).isPresent();
    }
}