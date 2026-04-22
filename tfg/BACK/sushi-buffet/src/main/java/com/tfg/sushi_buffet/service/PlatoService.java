package com.tfg.sushi_buffet.service;

import com.tfg.sushi_buffet.entity.Plato;
import com.tfg.sushi_buffet.repository.PlatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlatoService {
    
    @Autowired
    private PlatoRepository platoRepository;
    
    public List<Plato> obtenerTodosLosPlatos() {
        return platoRepository.findAll();
    }
    
    public List<Plato> obtenerPlatosDisponibles() {
        return platoRepository.findByDisponibleTrue();
    }
    
    public Optional<Plato> obtenerPlatoPorId(Integer id) {
        return platoRepository.findById(id);
    }
    
    public List<Plato> obtenerPlatosPorCategoria(Integer idCategoria) {
        return platoRepository.findByCategoriaIdCategoria(idCategoria);
    }
    
    // Obtener platos disponibles de una categoría
    public List<Plato> obtenerPlatosDisponiblesPorCategoria(Integer idCategoria) {
        return platoRepository.findByCategoriaIdCategoriaAndDisponibleTrue(idCategoria);
    }
    
    // Crear o actualizar plato
    public Plato guardarPlato(Plato plato) {
        return platoRepository.save(plato);
    }
    
    public void eliminarPlato(Integer id) {
        platoRepository.deleteById(id);
    }
}