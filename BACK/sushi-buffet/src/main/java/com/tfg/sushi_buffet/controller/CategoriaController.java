package com.tfg.sushi_buffet.controller;

import com.tfg.sushi_buffet.entity.Categoria;
import com.tfg.sushi_buffet.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
    
    @Autowired
    private CategoriaService categoriaService;
    
    // GET /api/categorias - Obtener todas las categorías
    @GetMapping
    public List<Categoria> obtenerTodas() {
        return categoriaService.obtenerTodasLasCategorias();
    }
    
    // GET /api/categorias/ordenadas - Obtener categorías ordenadas
    @GetMapping("/ordenadas")
    public List<Categoria> obtenerOrdenadas() {
        return categoriaService.obtenerCategoriasOrdenadas();
    }
    
    // GET /api/categorias/{id} - Obtener categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerPorId(@PathVariable Integer id) {
        Optional<Categoria> categoria = categoriaService.obtenerCategoriaPorId(id);
        return categoria.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
    }
    
    // POST /api/categorias - Crear nueva categoría
    @PostMapping
    public Categoria crear(@RequestBody Categoria categoria) {
        return categoriaService.guardarCategoria(categoria);
    }
    
    // PUT /api/categorias/{id} - Actualizar categoría
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizar(@PathVariable Integer id, @RequestBody Categoria categoria) {
        Optional<Categoria> categoriaExistente = categoriaService.obtenerCategoriaPorId(id);
        if (categoriaExistente.isPresent()) {
            categoria.setIdCategoria(id);
            return ResponseEntity.ok(categoriaService.guardarCategoria(categoria));
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE /api/categorias/{id} - Eliminar categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<Categoria> categoria = categoriaService.obtenerCategoriaPorId(id);
        if (categoria.isPresent()) {
            categoriaService.eliminarCategoria(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}