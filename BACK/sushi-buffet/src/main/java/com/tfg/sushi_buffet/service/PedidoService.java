package com.tfg.sushi_buffet.service;

import com.tfg.sushi_buffet.entity.Pedido;
import com.tfg.sushi_buffet.entity.Pedido.Estado;
import com.tfg.sushi_buffet.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {
    
    @Autowired
    private PedidoRepository pedidoRepository;
    
    // Obtener todos los pedidos
    public List<Pedido> obtenerTodosLosPedidos() {
        return pedidoRepository.findAll();
    }
    
    // Obtener pedido por ID
    public Optional<Pedido> obtenerPedidoPorId(Integer id) {
        return pedidoRepository.findById(id);
    }
    
    // Obtener pedidos por estado
    public List<Pedido> obtenerPedidosPorEstado(Estado estado) {
        return pedidoRepository.findByEstado(estado);
    }
    
    // Obtener pedidos activos
    public List<Pedido> obtenerPedidosActivos() {
        return pedidoRepository.findByEstado(Estado.activo);
    }
    
    // Obtener pedido activo de una mesa específica
    public Optional<Pedido> obtenerPedidoActivoDeMesa(Integer idMesa) {
        return pedidoRepository.findByMesaIdMesaAndEstado(idMesa, Estado.activo);
    }
    
    // Obtener todos los pedidos de una mesa (historial)
    public List<Pedido> obtenerHistorialPedidosDeMesa(Integer idMesa) {
        return pedidoRepository.findByMesaIdMesa(idMesa);
    }
    
    // Crear o actualizar pedido
    public Pedido guardarPedido(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }
    
    // Finalizar un pedido
    public Pedido finalizarPedido(Integer id) {
        Optional<Pedido> pedidoOpt = pedidoRepository.findById(id);
        if (pedidoOpt.isPresent()) {
            Pedido pedido = pedidoOpt.get();
            pedido.setEstado(Estado.finalizado);
            pedido.setFechaHoraFin(LocalDateTime.now());
            return pedidoRepository.save(pedido);
        }
        return null;
    }
    
    // Eliminar pedido
    public void eliminarPedido(Integer id) {
        pedidoRepository.deleteById(id);
    }
}