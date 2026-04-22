package com.tfg.sushi_buffet.service;

import com.tfg.sushi_buffet.entity.Reserva;
import com.tfg.sushi_buffet.entity.Reserva.Estado;
import com.tfg.sushi_buffet.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {
    
    @Autowired
    private ReservaRepository reservaRepository;
    
    public List<Reserva> obtenerTodasLasReservas() {
        return reservaRepository.findAll();
    }
    
    public Optional<Reserva> obtenerReservaPorId(Integer id) {
        return reservaRepository.findById(id);
    }
    
    public List<Reserva> obtenerReservasPorFecha(LocalDate fecha) {
        return reservaRepository.findByFechaReserva(fecha);
    }
    
    // Obtener reservas de una localización en una fecha
    public List<Reserva> obtenerReservasPorLocalizacionYFecha(Integer idLocalizacion, LocalDate fecha) {
        return reservaRepository.findByLocalizacionIdLocalizacionAndFechaReserva(idLocalizacion, fecha);
    }
    
    // Obtener reservas por estado
    public List<Reserva> obtenerReservasPorEstado(Estado estado) {
        return reservaRepository.findByEstado(estado);
    }
    
    // Verificar si una mesa tiene reserva en una fecha
    public List<Reserva> verificarReservaMesa(Integer idMesa, LocalDate fecha) {
        return reservaRepository.findByMesaIdMesaAndFechaReserva(idMesa, fecha);
    }
    
    // Crear o actualizar reserva
    public Reserva guardarReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }
    
    // Cambiar estado de una reserva
    public Reserva cambiarEstadoReserva(Integer id, Estado nuevoEstado) {
        Optional<Reserva> reservaOpt = reservaRepository.findById(id);
        if (reservaOpt.isPresent()) {
            Reserva reserva = reservaOpt.get();
            reserva.setEstado(nuevoEstado);
            return reservaRepository.save(reserva);
        }
        return null;
    }
    
    public void eliminarReserva(Integer id) {
        reservaRepository.deleteById(id);
    }
}