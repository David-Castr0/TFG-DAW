package com.tfg.sushi_buffet.repository;

import com.tfg.sushi_buffet.entity.Mesa;
import com.tfg.sushi_buffet.entity.Mesa.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MesaRepository extends JpaRepository<Mesa, Integer> {
    
    List<Mesa> findByLocalizacionIdLocalizacion(Integer idLocalizacion);
    List<Mesa> findByEstado(Estado estado);
    List<Mesa> findByLocalizacionIdLocalizacionAndEstado(Integer idLocalizacion, Estado estado);

    //Localizacion de entity mesa, y IdLocalizacion de entity localizacion
}