package com.tfg.sushi_buffet.controller;

import com.tfg.sushi_buffet.entity.Mesa;
import com.tfg.sushi_buffet.entity.Mesa.Estado;
import com.tfg.sushi_buffet.service.MesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mesas")
public class MesaController {
    
    @Autowired
    private MesaService mesaService;
    
    // GET /api/mesas - Obtener todas las mesas
    @GetMapping
    public List<Mesa> obtenerTodas() {
        return mesaService.obtenerTodasLasMesas();
    }
    
    // GET /api/mesas/{id} - Obtener mesa por ID
    @GetMapping("/{id}")
    public ResponseEntity<Mesa> obtenerPorId(@PathVariable Integer id) {
        Optional<Mesa> mesa = mesaService.obtenerMesaPorId(id);
        return mesa.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/mesas/localizacion/{idLocalizacion} - Obtener mesas de una localización
    @GetMapping("/localizacion/{idLocalizacion}")
    public List<Mesa> obtenerPorLocalizacion(@PathVariable Integer idLocalizacion) {
        return mesaService.obtenerMesasPorLocalizacion(idLocalizacion);
    }
    
    // GET /api/mesas/localizacion/{idLocalizacion}/libres - Obtener mesas libres de una localización
    @GetMapping("/localizacion/{idLocalizacion}/libres")
    public List<Mesa> obtenerLibresPorLocalizacion(@PathVariable Integer idLocalizacion) {
        return mesaService.obtenerMesasLibresPorLocalizacion(idLocalizacion);
    }
    
    // GET /api/mesas/localizacion/{idLocalizacion}/ocupadas - Obtener mesas ocupadas
    @GetMapping("/localizacion/{idLocalizacion}/ocupadas")
    public List<Mesa> obtenerOcupadasPorLocalizacion(@PathVariable Integer idLocalizacion) {
        return mesaService.obtenerMesasOcupadasPorLocalizacion(idLocalizacion);
    }
    
    // GET /api/mesas/localizacion/{idLocalizacion}/reservadas - Obtener mesas reservadas
    @GetMapping("/localizacion/{idLocalizacion}/reservadas")
    public List<Mesa> obtenerReservadasPorLocalizacion(@PathVariable Integer idLocalizacion) {
        return mesaService.obtenerMesasReservadasPorLocalizacion(idLocalizacion);
    }
    
    // POST /api/mesas - Crear nueva mesa
    @PostMapping
    public Mesa crear(@RequestBody Mesa mesa) {
        return mesaService.guardarMesa(mesa);
    }
    
    // PUT /api/mesas/{id} - Actualizar mesa
    @PutMapping("/{id}")
    public ResponseEntity<Mesa> actualizar(@PathVariable Integer id, @RequestBody Mesa mesa) {
        Optional<Mesa> mesaExistente = mesaService.obtenerMesaPorId(id);
        if (mesaExistente.isPresent()) {
            mesa.setIdMesa(id);
            return ResponseEntity.ok(mesaService.guardarMesa(mesa));
        }
        return ResponseEntity.notFound().build();
    }
    
    // PUT /api/mesas/{id}/estado - Cambiar estado de una mesa
    @PutMapping("/{id}/estado")
    public ResponseEntity<Mesa> cambiarEstado(@PathVariable Integer id, @RequestBody Estado estado) {
        Mesa mesa = mesaService.cambiarEstadoMesa(id, estado);
        if (mesa != null) {
            return ResponseEntity.ok(mesa);
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE /api/mesas/{id} - Eliminar mesa
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<Mesa> mesa = mesaService.obtenerMesaPorId(id);
        if (mesa.isPresent()) {
            mesaService.eliminarMesa(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
