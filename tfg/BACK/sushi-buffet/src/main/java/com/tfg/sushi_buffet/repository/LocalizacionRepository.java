package com.tfg.sushi_buffet.repository;

import com.tfg.sushi_buffet.entity.Localizacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LocalizacionRepository extends JpaRepository<Localizacion, Integer> {
    
    List<Localizacion> findByActivoTrue();
    List<Localizacion> findByCiudad(String ciudad);

    //he utilizado aqui list en ves de opcional porque puede haber varias, no como en UsuarioRepository
}