package com.tfg.sushi_buffet.repository;

import com.tfg.sushi_buffet.entity.Pedido;
import com.tfg.sushi_buffet.entity.Pedido.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    
    // Buscar pedidos activos
    List<Pedido> findByEstado(Estado estado);
    
    // Buscar pedido activo de una mesa
    Optional<Pedido> findByMesaIdMesaAndEstado(Integer idMesa, Estado estado);

    List<Pedido> findByMesaIdMesa(Integer idMesa);
}