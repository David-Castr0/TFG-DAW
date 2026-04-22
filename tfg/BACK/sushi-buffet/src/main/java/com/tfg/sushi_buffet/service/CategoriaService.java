package com.tfg.sushi_buffet.service;

import com.tfg.sushi_buffet.entity.Categoria;
import com.tfg.sushi_buffet.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    

    public List<Categoria> obtenerTodasLasCategorias() {
        return categoriaRepository.findAll();
    }
    
    // Obtener categorías ordenadas por orden de visualización
    public List<Categoria> obtenerCategoriasOrdenadas() {
        return categoriaRepository.findAllByOrderByOrdenVisualizacionAsc();
    }
    

    public Optional<Categoria> obtenerCategoriaPorId(Integer id) {
        return categoriaRepository.findById(id);
    }
    
    // Crear o actualizar categoría
    public Categoria guardarCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }
    

    public void eliminarCategoria(Integer id) {
        categoriaRepository.deleteById(id);
    }
}