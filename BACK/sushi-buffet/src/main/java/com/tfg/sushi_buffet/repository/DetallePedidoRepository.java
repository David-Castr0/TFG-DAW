package com.tfg.sushi_buffet.repository;

import com.tfg.sushi_buffet.entity.DetallePedido;
import com.tfg.sushi_buffet.entity.DetallePedido.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Integer> {
    
    List<DetallePedido> findByPedidoIdPedido(Integer idPedido);
    List<DetallePedido> findByEstado(Estado estado);
    List<DetallePedido> findByEstadoIn(List<Estado> estados);
}