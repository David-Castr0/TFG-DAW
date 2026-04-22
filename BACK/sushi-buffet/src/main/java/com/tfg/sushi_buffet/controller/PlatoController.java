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
    
    @GetMapping
    public List<Plato> obtenerTodos() {
        return platoService.obtenerTodosLosPlatos();
    }
    
    @GetMapping("/disponibles")
    public List<Plato> obtenerDisponibles() {
        return platoService.obtenerPlatosDisponibles();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Plato> obtenerPorId(@PathVariable Integer id) {
        Optional<Plato> plato = platoService.obtenerPlatoPorId(id);
        return plato.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/categoria/{idCategoria}")
    public List<Plato> obtenerPorCategoria(@PathVariable Integer idCategoria) {
        return platoService.obtenerPlatosPorCategoria(idCategoria);
    }
    
    @GetMapping("/categoria/{idCategoria}/disponibles")
    public List<Plato> obtenerDisponiblesPorCategoria(@PathVariable Integer idCategoria) {
        return platoService.obtenerPlatosDisponiblesPorCategoria(idCategoria);
    }
    
    @PostMapping
    public Plato crear(@RequestBody Plato plato) {
        return platoService.guardarPlato(plato);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Plato> actualizar(@PathVariable Integer id, @RequestBody Plato plato) {
        Optional<Plato> platoExistente = platoService.obtenerPlatoPorId(id);
        if (platoExistente.isPresent()) {
            plato.setIdPlato(id);
            return ResponseEntity.ok(platoService.guardarPlato(plato));
        }
        return ResponseEntity.notFound().build();
    }

    // NUEVO: cambiar disponibilidad
    @PutMapping("/{id}/disponibilidad")
    public ResponseEntity<Plato> cambiarDisponibilidad(@PathVariable Integer id, @RequestBody Boolean disponible) {
        Optional<Plato> platoOpt = platoService.obtenerPlatoPorId(id);
        if (platoOpt.isPresent()) {
            Plato plato = platoOpt.get();
            plato.setDisponible(disponible);
            return ResponseEntity.ok(platoService.guardarPlato(plato));
        }
        return ResponseEntity.notFound().build();
    }
    
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