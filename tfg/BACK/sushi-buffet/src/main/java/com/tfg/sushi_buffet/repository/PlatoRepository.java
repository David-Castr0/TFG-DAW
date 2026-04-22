package com.tfg.sushi_buffet.repository;

import com.tfg.sushi_buffet.entity.Plato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlatoRepository extends JpaRepository<Plato, Integer> {
    
    List<Plato> findByDisponibleTrue();
    List<Plato> findByCategoriaIdCategoria(Integer idCategoria);
    List<Plato> findByCategoriaIdCategoriaAndDisponibleTrue(Integer idCategoria);
}