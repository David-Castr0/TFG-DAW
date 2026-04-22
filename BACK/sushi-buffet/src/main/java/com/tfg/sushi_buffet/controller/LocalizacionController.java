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
    
    @GetMapping
    public List<Localizacion> obtenerTodas() {
        return localizacionService.obtenerTodasLasLocalizaciones();
    }
    
    @GetMapping("/activas")
    public List<Localizacion> obtenerActivas() {
        return localizacionService.obtenerLocalizacionesActivas();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Localizacion> obtenerPorId(@PathVariable Integer id) {
        Optional<Localizacion> localizacion = localizacionService.obtenerLocalizacionPorId(id);
        return localizacion.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/ciudad/{ciudad}")
    public List<Localizacion> obtenerPorCiudad(@PathVariable String ciudad) {
        return localizacionService.obtenerLocalizacionesPorCiudad(ciudad);
    }
    
    @PostMapping
    public Localizacion crear(@RequestBody Localizacion localizacion) {
        return localizacionService.guardarLocalizacion(localizacion);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Localizacion> actualizar(@PathVariable Integer id, @RequestBody Localizacion localizacion) {
        Optional<Localizacion> localizacionExistente = localizacionService.obtenerLocalizacionPorId(id);
        if (localizacionExistente.isPresent()) {
            localizacion.setIdLocalizacion(id);
            return ResponseEntity.ok(localizacionService.guardarLocalizacion(localizacion));
        }
        return ResponseEntity.notFound().build();
    }

    // NUEVO: cambiar estado activo
    @PutMapping("/{id}/activo")
    public ResponseEntity<Localizacion> cambiarActivo(@PathVariable Integer id, @RequestBody Boolean activo) {
        Optional<Localizacion> locOpt = localizacionService.obtenerLocalizacionPorId(id);
        if (locOpt.isPresent()) {
            Localizacion loc = locOpt.get();
            loc.setActivo(activo);
            return ResponseEntity.ok(localizacionService.guardarLocalizacion(loc));
        }
        return ResponseEntity.notFound().build();
    }
    
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