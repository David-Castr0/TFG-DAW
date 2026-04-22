package com.tfg.sushi_buffet.controller;

import com.tfg.sushi_buffet.entity.Pedido;
import com.tfg.sushi_buffet.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;
    
    // GET /api/pedidos - Obtener todos los pedidos
    @GetMapping
    public List<Pedido> obtenerTodos() {
        return pedidoService.obtenerTodosLosPedidos();
    }
    
    // GET /api/pedidos/{id} - Obtener pedido por ID
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obtenerPorId(@PathVariable Integer id) {
        Optional<Pedido> pedido = pedidoService.obtenerPedidoPorId(id);
        return pedido.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/pedidos/activos - Obtener pedidos activos
    @GetMapping("/activos")
    public List<Pedido> obtenerActivos() {
        return pedidoService.obtenerPedidosActivos();
    }
    
    // GET /api/pedidos/mesa/{idMesa}/activo - Obtener pedido activo de una mesa
    @GetMapping("/mesa/{idMesa}/activo")
    public ResponseEntity<Pedido> obtenerActivoDeMesa(@PathVariable Integer idMesa) {
        Optional<Pedido> pedido = pedidoService.obtenerPedidoActivoDeMesa(idMesa);
        return pedido.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/pedidos/mesa/{idMesa}/historial - Obtener historial de pedidos de una mesa
    @GetMapping("/mesa/{idMesa}/historial")
    public List<Pedido> obtenerHistorialDeMesa(@PathVariable Integer idMesa) {
        return pedidoService.obtenerHistorialPedidosDeMesa(idMesa);
    }
    
    // POST /api/pedidos - Crear nuevo pedido
    @PostMapping
    public Pedido crear(@RequestBody Pedido pedido) {
        return pedidoService.guardarPedido(pedido);
    }
    
    // PUT /api/pedidos/{id} - Actualizar pedido
    @PutMapping("/{id}")
    public ResponseEntity<Pedido> actualizar(@PathVariable Integer id, @RequestBody Pedido pedido) {
        Optional<Pedido> pedidoExistente = pedidoService.obtenerPedidoPorId(id);
        if (pedidoExistente.isPresent()) {
            pedido.setIdPedido(id);
            return ResponseEntity.ok(pedidoService.guardarPedido(pedido));
        }
        return ResponseEntity.notFound().build();
    }
    
    // PUT /api/pedidos/{id}/finalizar - Finalizar un pedido
    @PutMapping("/{id}/finalizar")
    public ResponseEntity<Pedido> finalizar(@PathVariable Integer id) {
        Pedido pedido = pedidoService.finalizarPedido(id);
        if (pedido != null) {
            return ResponseEntity.ok(pedido);
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE /api/pedidos/{id} - Eliminar pedido
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<Pedido> pedido = pedidoService.obtenerPedidoPorId(id);
        if (pedido.isPresent()) {
            pedidoService.eliminarPedido(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}