package com.tfg.sushi_buffet.controller;

import com.tfg.sushi_buffet.entity.DetallePedido;
import com.tfg.sushi_buffet.entity.DetallePedido.Estado;
import com.tfg.sushi_buffet.service.DetallePedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/detalle-pedidos")
public class DetallePedidoController {
    
    @Autowired
    private DetallePedidoService detallePedidoService;
    
    // GET /api/detalle-pedidos - Obtener todos los detalles
    @GetMapping
    public List<DetallePedido> obtenerTodos() {
        return detallePedidoService.obtenerTodosLosDetalles();
    }
    
    // GET /api/detalle-pedidos/{id} - Obtener detalle por ID
    @GetMapping("/{id}")
    public ResponseEntity<DetallePedido> obtenerPorId(@PathVariable Integer id) {
        Optional<DetallePedido> detalle = detallePedidoService.obtenerDetallePorId(id);
        return detalle.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/detalle-pedidos/pedido/{idPedido} - Obtener platos de un pedido
    @GetMapping("/pedido/{idPedido}")
    public List<DetallePedido> obtenerPlatosDePedido(@PathVariable Integer idPedido) {
        return detallePedidoService.obtenerPlatosDePedido(idPedido);
    }
    
    // GET /api/detalle-pedidos/pendientes - Obtener platos pendientes
    @GetMapping("/pendientes")
    public List<DetallePedido> obtenerPendientes() {
        return detallePedidoService.obtenerPlatosPendientes();
    }
    
    // GET /api/detalle-pedidos/en-preparacion - Obtener platos en preparación
    @GetMapping("/en-preparacion")
    public List<DetallePedido> obtenerEnPreparacion() {
        return detallePedidoService.obtenerPlatosEnPreparacion();
    }
    
    // GET /api/detalle-pedidos/listos - Obtener platos listos
    @GetMapping("/listos")
    public List<DetallePedido> obtenerListos() {
        return detallePedidoService.obtenerPlatosListos();
    }
    
    // GET /api/detalle-pedidos/cocina - Obtener platos en cocina (pendientes + en preparación)
    @GetMapping("/cocina")
    public List<DetallePedido> obtenerEnCocina() {
        return detallePedidoService.obtenerPlatosEnCocina();
    }
    
    // POST /api/detalle-pedidos - Crear nuevo detalle (añadir plato al pedido)
    @PostMapping
    public DetallePedido crear(@RequestBody DetallePedido detallePedido) {
        return detallePedidoService.guardarDetalle(detallePedido);
    }
    
    // PUT /api/detalle-pedidos/{id} - Actualizar detalle
    @PutMapping("/{id}")
    public ResponseEntity<DetallePedido> actualizar(@PathVariable Integer id, @RequestBody DetallePedido detallePedido) {
        Optional<DetallePedido> detalleExistente = detallePedidoService.obtenerDetallePorId(id);
        if (detalleExistente.isPresent()) {
            detallePedido.setIdDetalle(id);
            return ResponseEntity.ok(detallePedidoService.guardarDetalle(detallePedido));
        }
        return ResponseEntity.notFound().build();
    }
    
    // PUT /api/detalle-pedidos/{id}/estado - Cambiar estado de un plato
    @PutMapping("/{id}/estado")
    public ResponseEntity<DetallePedido> cambiarEstado(@PathVariable Integer id, @RequestBody Estado estado) {
        DetallePedido detalle = detallePedidoService.cambiarEstadoPlato(id, estado);
        if (detalle != null) {
            return ResponseEntity.ok(detalle);
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE /api/detalle-pedidos/{id} - Eliminar detalle
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<DetallePedido> detalle = detallePedidoService.obtenerDetallePorId(id);
        if (detalle.isPresent()) {
            detallePedidoService.eliminarDetalle(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}   