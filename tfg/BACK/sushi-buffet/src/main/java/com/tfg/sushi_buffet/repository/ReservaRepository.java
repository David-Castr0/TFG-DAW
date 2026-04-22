package com.tfg.sushi_buffet.repository;

import com.tfg.sushi_buffet.entity.Reserva;
import com.tfg.sushi_buffet.entity.Reserva.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
    
    List<Reserva> findByFechaReserva(LocalDate fechaReserva);
    List<Reserva> findByLocalizacionIdLocalizacionAndFechaReserva(Integer idLocalizacion, LocalDate fechaReserva);
    List<Reserva> findByEstado(Estado estado);
    List<Reserva> findByMesaIdMesaAndFechaReserva(Integer idMesa, LocalDate fechaReserva);
}