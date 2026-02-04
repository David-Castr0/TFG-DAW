package com.tfg.sushi_buffet.controller;

import com.tfg.sushi_buffet.entity.Localizacion;
import com.tfg.sushi_buffet.service.LocalizacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/localizaciones")
public class LocalizacionController {
    
    @Autowired
    private LocalizacionService localizacionService;
    
    // GET /api/localizaciones - Obtener todas las localizaciones
    @GetMapping
    public List<Localizacion> obtenerTodas() {
        return localizacionService.obtenerTodasLasLocalizaciones();
    }
    
    // GET /api/localizaciones/activas - Obtener localizaciones activas
    @GetMapping("/activas")
    public List<Localizacion> obtenerActivas() {
        return localizacionService.obtenerLocalizacionesActivas();
    }
    
    // GET /api/localizaciones/{id} - Obtener localización por ID
    @GetMapping("/{id}")
    public ResponseEntity<Localizacion> obtenerPorId(@PathVariable Integer id) {
        Optional<Localizacion> localizacion = localizacionService.obtenerLocalizacionPorId(id);
        return localizacion.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/localizaciones/ciudad/{ciudad} - Obtener localizaciones por ciudad
    @GetMapping("/ciudad/{ciudad}")
    public List<Localizacion> obtenerPorCiudad(@PathVariable String ciudad) {
        return localizacionService.obtenerLocalizacionesPorCiudad(ciudad);
    }
    
    // POST /api/localizaciones - Crear nueva localización
    @PostMapping
    public Localizacion crear(@RequestBody Localizacion localizacion) {
        return localizacionService.guardarLocalizacion(localizacion);
    }
    
    // PUT /api/localizaciones/{id} - Actualizar localización
    @PutMapping("/{id}")
    public ResponseEntity<Localizacion> actualizar(@PathVariable Integer id, @RequestBody Localizacion localizacion) {
        Optional<Localizacion> localizacionExistente = localizacionService.obtenerLocalizacionPorId(id);
        if (localizacionExistente.isPresent()) {
            localizacion.setIdLocalizacion(id);
            return ResponseEntity.ok(localizacionService.guardarLocalizacion(localizacion));
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE /api/localizaciones/{id} - Eliminar localización
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<Localizacion> localizacion = localizacionService.obtenerLocalizacionPorId(id);
        if (localizacion.isPresent()) {
            localizacionService.eliminarLocalizacion(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}