package com.tfg.sushi_buffet.repository;

import com.tfg.sushi_buffet.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
    
    List<Categoria> findAllByOrderByOrdenVisualizacionAsc();
}