package com.tfg.sushi_buffet.service;

import com.tfg.sushi_buffet.entity.Pedido;
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
    
    public List<Pedido> obtenerTodosLosPedidos() {
        return pedidoRepository.findAll();
    }
    
    public Optional<Pedido> obtenerPedidoPorId(Integer id) {
        return pedidoRepository.findById(id);
    }
    
    public List<Pedido> obtenerPedidosActivos() {
        return pedidoRepository.findByEstado(Pedido.Estado.recibido);
    }
    
    public Optional<Pedido> obtenerPedidoActivoDeMesa(Integer idMesa) {
        return pedidoRepository.findByMesaIdMesaAndEstado(idMesa, Pedido.Estado.recibido);
    }
    
    public List<Pedido> obtenerHistorialPedidosDeMesa(Integer idMesa) {
        return pedidoRepository.findByMesaIdMesa(idMesa);
    }

    public List<Pedido> obtenerPedidosPorUsuario(Integer idUsuario) {
        return pedidoRepository.findByUsuarioIdUsuarioOrderByFechaHoraInicioDesc(idUsuario);
    }
    
    public Pedido guardarPedido(Pedido pedido) {
        if (pedido.getFechaHoraInicio() == null) {
            pedido.setFechaHoraInicio(LocalDateTime.now());
        }
        return pedidoRepository.save(pedido);
    }
    
    public Pedido finalizarPedido(Integer id) {
        Optional<Pedido> pedidoOpt = pedidoRepository.findById(id);
        if (pedidoOpt.isPresent()) {
            Pedido pedido = pedidoOpt.get();
            pedido.setEstado(Pedido.Estado.finalizado);
            pedido.setFechaHoraFin(LocalDateTime.now());
            return pedidoRepository.save(pedido);
        }
        return null;
    }
    
    public void eliminarPedido(Integer id) {
        pedidoRepository.deleteById(id);
    }
}