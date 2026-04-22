package com.tfg.sushi_buffet.controller;

import com.tfg.sushi_buffet.entity.Reserva;
import com.tfg.sushi_buffet.entity.Reserva.Estado;
import com.tfg.sushi_buffet.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {
    
    @Autowired
    private ReservaService reservaService;
    
    // GET /api/reservas - Obtener todas las reservas
    @GetMapping
    public List<Reserva> obtenerTodas() {
        return reservaService.obtenerTodasLasReservas();
    }
    
    // GET /api/reservas/{id} - Obtener reserva por ID
    @GetMapping("/{id}")
    public ResponseEntity<Reserva> obtenerPorId(@PathVariable Integer id) {
        Optional<Reserva> reserva = reservaService.obtenerReservaPorId(id);
        return reserva.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/reservas/fecha/{fecha} - Obtener reservas por fecha
    @GetMapping("/fecha/{fecha}")
    public List<Reserva> obtenerPorFecha(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return reservaService.obtenerReservasPorFecha(fecha);
    }
    
    // GET /api/reservas/localizacion/{idLocalizacion}/fecha/{fecha} - Reservas de un restaurante en una fecha
    @GetMapping("/localizacion/{idLocalizacion}/fecha/{fecha}")
    public List<Reserva> obtenerPorLocalizacionYFecha(
            @PathVariable Integer idLocalizacion,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return reservaService.obtenerReservasPorLocalizacionYFecha(idLocalizacion, fecha);
    }
    
    // GET /api/reservas/estado/{estado} - Obtener reservas por estado
    @GetMapping("/estado/{estado}")
    public List<Reserva> obtenerPorEstado(@PathVariable Estado estado) {
        return reservaService.obtenerReservasPorEstado(estado);
    }
    
    // POST /api/reservas - Crear nueva reserva
    @PostMapping
    public Reserva crear(@RequestBody Reserva reserva) {
        return reservaService.guardarReserva(reserva);
    }
    
    // PUT /api/reservas/{id} - Actualizar reserva
    @PutMapping("/{id}")
    public ResponseEntity<Reserva> actualizar(@PathVariable Integer id, @RequestBody Reserva reserva) {
        Optional<Reserva> reservaExistente = reservaService.obtenerReservaPorId(id);
        if (reservaExistente.isPresent()) {
            reserva.setIdReserva(id);
            return ResponseEntity.ok(reservaService.guardarReserva(reserva));
        }
        return ResponseEntity.notFound().build();
    }
    
    // PUT /api/reservas/{id}/estado - Cambiar estado de una reserva
    @PutMapping("/{id}/estado")
    public ResponseEntity<Reserva> cambiarEstado(@PathVariable Integer id, @RequestBody Estado estado) {
        Reserva reserva = reservaService.cambiarEstadoReserva(id, estado);
        if (reserva != null) {
            return ResponseEntity.ok(reserva);
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE /api/reservas/{id} - Eliminar reserva
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<Reserva> reserva = reservaService.obtenerReservaPorId(id);
        if (reserva.isPresent()) {
            reservaService.eliminarReserva(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}