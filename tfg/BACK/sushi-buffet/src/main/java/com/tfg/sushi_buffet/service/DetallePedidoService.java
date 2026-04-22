package com.tfg.sushi_buffet.service;

import com.tfg.sushi_buffet.entity.DetallePedido;
import com.tfg.sushi_buffet.entity.DetallePedido.Estado;
import com.tfg.sushi_buffet.repository.DetallePedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class DetallePedidoService {
    
    @Autowired
    private DetallePedidoRepository detallePedidoRepository;
    
    // Obtener todos los detalles de pedido
    public List<DetallePedido> obtenerTodosLosDetalles() {
        return detallePedidoRepository.findAll();
    }
    
    public Optional<DetallePedido> obtenerDetallePorId(Integer id) {
        return detallePedidoRepository.findById(id);
    }
    
    public List<DetallePedido> obtenerPlatosDePedido(Integer idPedido) {
        return detallePedidoRepository.findByPedidoIdPedido(idPedido);
    }
    
    public List<DetallePedido> obtenerDetallesPorEstado(Estado estado) {
        return detallePedidoRepository.findByEstado(estado);
    }
    
    // Obtener platos pendientes para cocina
    public List<DetallePedido> obtenerPlatosPendientes() {
        return detallePedidoRepository.findByEstado(Estado.pendiente);
    }
    
    public List<DetallePedido> obtenerPlatosEnPreparacion() {
        return detallePedidoRepository.findByEstado(Estado.en_preparacion);
    }
    
    // Obtener platos listos para servir
    public List<DetallePedido> obtenerPlatosListos() {
        return detallePedidoRepository.findByEstado(Estado.listo);
    }
    
    // Obtener platos que están en cocina (pendientes + en preparación)
    public List<DetallePedido> obtenerPlatosEnCocina() {
        List<Estado> estadosCocina = Arrays.asList(Estado.pendiente, Estado.en_preparacion);
        return detallePedidoRepository.findByEstadoIn(estadosCocina);
    }
    
    // Crear o actualizar detalle de pedido
    public DetallePedido guardarDetalle(DetallePedido detallePedido) {
        return detallePedidoRepository.save(detallePedido);
    }
    
    // Cambiar estado de un plato
    public DetallePedido cambiarEstadoPlato(Integer id, Estado nuevoEstado) {
        Optional<DetallePedido> detalleOpt = detallePedidoRepository.findById(id);
        if (detalleOpt.isPresent()) {
            DetallePedido detalle = detalleOpt.get();
            detalle.setEstado(nuevoEstado);
            return detallePedidoRepository.save(detalle);
        }
        return null;
    }
    

    public void eliminarDetalle(Integer id) {
        detallePedidoRepository.deleteById(id);
    }
}