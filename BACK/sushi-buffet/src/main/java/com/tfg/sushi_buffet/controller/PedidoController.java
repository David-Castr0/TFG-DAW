package com.tfg.sushi_buffet.controller;

import com.tfg.sushi_buffet.entity.DetallePedido;
import com.tfg.sushi_buffet.entity.Pedido;
import com.tfg.sushi_buffet.entity.Plato;
import com.tfg.sushi_buffet.entity.Usuario;
import com.tfg.sushi_buffet.repository.UsuarioRepository;
import com.tfg.sushi_buffet.service.DetallePedidoService;
import com.tfg.sushi_buffet.service.PedidoService;
import com.tfg.sushi_buffet.service.PlatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private DetallePedidoService detallePedidoService;

    @Autowired
    private PlatoService platoService;

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @GetMapping
    public List<Pedido> obtenerTodos() {
        return pedidoService.obtenerTodosLosPedidos();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obtenerPorId(@PathVariable Integer id) {
        Optional<Pedido> pedido = pedidoService.obtenerPedidoPorId(id);
        return pedido.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/activos")
    public List<Pedido> obtenerActivos() {
        return pedidoService.obtenerPedidosActivos();
    }
    
    @GetMapping("/mesa/{idMesa}/activo")
    public ResponseEntity<Pedido> obtenerActivoDeMesa(@PathVariable Integer idMesa) {
        Optional<Pedido> pedido = pedidoService.obtenerPedidoActivoDeMesa(idMesa);
        return pedido.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/mesa/{idMesa}/historial")
    public List<Pedido> obtenerHistorialDeMesa(@PathVariable Integer idMesa) {
        return pedidoService.obtenerHistorialPedidosDeMesa(idMesa);
    }

    // Pedidos del usuario logueado
    @GetMapping("/mis-pedidos")
    public ResponseEntity<?> obtenerMisPedidos() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(username);
            if (usuarioOpt.isEmpty()) return ResponseEntity.status(404).body("Usuario no encontrado");
            List<Pedido> pedidos = pedidoService.obtenerPedidosPorUsuario(usuarioOpt.get().getIdUsuario());
            return ResponseEntity.ok(pedidos);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
    
    @PostMapping
    public Pedido crear(@RequestBody Pedido pedido) {
        return pedidoService.guardarPedido(pedido);
    }

    @PostMapping("/domicilio")
    public ResponseEntity<?> crearPedidoDomicilio(@RequestBody Map<String, Object> body) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(username);

            Pedido pedido = new Pedido();
            pedido.setNombreCliente((String) body.get("nombreCliente"));
            pedido.setTelefonoCliente((String) body.get("telefonoCliente"));
            pedido.setDireccionEntrega((String) body.get("direccionEntrega"));
            pedido.setNotasPedido((String) body.get("notas"));
            pedido.setMetodoPago(Pedido.MetodoPago.valueOf((String) body.get("metodoPago")));
            pedido.setTipoPedido(Pedido.TipoPedido.domicilio);
            pedido.setFechaHoraInicio(LocalDateTime.now());
            pedido.setEstado(Pedido.Estado.recibido);
            usuarioOpt.ifPresent(pedido::setUsuario);

            Pedido pedidoGuardado = pedidoService.guardarPedido(pedido);

            List<Map<String, Object>> items = (List<Map<String, Object>>) body.get("items");
            for (Map<String, Object> item : items) {
                Integer idPlato = (Integer) item.get("idPlato");
                Integer cantidad = (Integer) item.get("cantidad");
                Optional<Plato> platoOpt = platoService.obtenerPlatoPorId(idPlato);
                if (platoOpt.isPresent()) {
                    DetallePedido detalle = new DetallePedido();
                    detalle.setPedido(pedidoGuardado);
                    detalle.setPlato(platoOpt.get());
                    detalle.setCantidad(cantidad);
                    detalle.setFechaHoraSolicitud(LocalDateTime.now());
                    detalle.setEstado(DetallePedido.Estado.pendiente);
                    detallePedidoService.guardarDetalle(detalle);
                }
            }

            return ResponseEntity.ok(pedidoGuardado);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al crear el pedido: " + e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Pedido> actualizar(@PathVariable Integer id, @RequestBody Pedido pedido) {
        Optional<Pedido> pedidoExistente = pedidoService.obtenerPedidoPorId(id);
        if (pedidoExistente.isPresent()) {
            pedido.setIdPedido(id);
            return ResponseEntity.ok(pedidoService.guardarPedido(pedido));
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Pedido> cambiarEstado(@PathVariable Integer id, @RequestBody String estado) {
        Optional<Pedido> pedidoOpt = pedidoService.obtenerPedidoPorId(id);
        if (pedidoOpt.isPresent()) {
            Pedido pedido = pedidoOpt.get();
            pedido.setEstado(Pedido.Estado.valueOf(estado.replace("\"", "")));
            if (pedido.getEstado() == Pedido.Estado.entregado || pedido.getEstado() == Pedido.Estado.finalizado) {
                pedido.setFechaHoraFin(LocalDateTime.now());
            }
            return ResponseEntity.ok(pedidoService.guardarPedido(pedido));
        }
        return ResponseEntity.notFound().build();
    }
    
    @PutMapping("/{id}/finalizar")
    public ResponseEntity<Pedido> finalizar(@PathVariable Integer id) {
        Pedido pedido = pedidoService.finalizarPedido(id);
        if (pedido != null) return ResponseEntity.ok(pedido);
        return ResponseEntity.notFound().build();
    }
    
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