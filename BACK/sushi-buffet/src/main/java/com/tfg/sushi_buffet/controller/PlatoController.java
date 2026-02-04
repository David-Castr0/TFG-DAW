package com.tfg.sushi_buffet.controller;

import com.tfg.sushi_buffet.entity.Plato;
import com.tfg.sushi_buffet.service.PlatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/platos")
public class PlatoController {
    
    @Autowired
    private PlatoService platoService;
    
    // GET /api/platos - Obtener todos los platos
    @GetMapping
    public List<Plato> obtenerTodos() {
        return platoService.obtenerTodosLosPlatos();
    }
    
    // GET /api/platos/disponibles - Obtener platos disponibles
    @GetMapping("/disponibles")
    public List<Plato> obtenerDisponibles() {
        return platoService.obtenerPlatosDisponibles();
    }
    
    // GET /api/platos/{id} - Obtener plato por ID
    @GetMapping("/{id}")
    public ResponseEntity<Plato> obtenerPorId(@PathVariable Integer id) {
        Optional<Plato> plato = platoService.obtenerPlatoPorId(id);
        return plato.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/platos/categoria/{idCategoria} - Obtener platos de una categoría
    @GetMapping("/categoria/{idCategoria}")
    public List<Plato> obtenerPorCategoria(@PathVariable Integer idCategoria) {
        return platoService.obtenerPlatosPorCategoria(idCategoria);
    }
    
    // GET /api/platos/categoria/{idCategoria}/disponibles - Obtener platos disponibles de una categoría
    @GetMapping("/categoria/{idCategoria}/disponibles")
    public List<Plato> obtenerDisponiblesPorCategoria(@PathVariable Integer idCategoria) {
        return platoService.obtenerPlatosDisponiblesPorCategoria(idCategoria);
    }
    
    // POST /api/platos - Crear nuevo plato
    @PostMapping
    public Plato crear(@RequestBody Plato plato) {
        return platoService.guardarPlato(plato);
    }
    
    // PUT /api/platos/{id} - Actualizar plato
    @PutMapping("/{id}")
    public ResponseEntity<Plato> actualizar(@PathVariable Integer id, @RequestBody Plato plato) {
        Optional<Plato> platoExistente = platoService.obtenerPlatoPorId(id);
        if (platoExistente.isPresent()) {
            plato.setIdPlato(id);
            return ResponseEntity.ok(platoService.guardarPlato(plato));
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE /api/platos/{id} - Eliminar plato
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<Plato> plato = platoService.obtenerPlatoPorId(id);
        if (plato.isPresent()) {
            platoService.eliminarPlato(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}