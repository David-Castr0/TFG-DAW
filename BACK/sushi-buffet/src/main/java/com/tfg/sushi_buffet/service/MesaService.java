package com.tfg.sushi_buffet.service;

import com.tfg.sushi_buffet.entity.Mesa;
import com.tfg.sushi_buffet.entity.Mesa.Estado;
import com.tfg.sushi_buffet.repository.MesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MesaService {
    
    @Autowired
    private MesaRepository mesaRepository;
    

    public List<Mesa> obtenerTodasLasMesas() {
        return mesaRepository.findAll();
    }
    
    public Optional<Mesa> obtenerMesaPorId(Integer id) {
        return mesaRepository.findById(id);
    }

    public List<Mesa> obtenerMesasPorLocalizacion(Integer idLocalizacion) {
        return mesaRepository.findByLocalizacionIdLocalizacion(idLocalizacion);
    }

    public List<Mesa> obtenerMesasPorEstado(Estado estado) {
        return mesaRepository.findByEstado(estado);
    }
    
    // Obtener mesas libres de una localización
    public List<Mesa> obtenerMesasLibresPorLocalizacion(Integer idLocalizacion) {
        return mesaRepository.findByLocalizacionIdLocalizacionAndEstado(idLocalizacion, Estado.libre);
    }
    
    // Obtener mesas ocupadas de una localización
    public List<Mesa> obtenerMesasOcupadasPorLocalizacion(Integer idLocalizacion) {
        return mesaRepository.findByLocalizacionIdLocalizacionAndEstado(idLocalizacion, Estado.ocupada);
    }
    
    // Obtener mesas reservadas de una localización
    public List<Mesa> obtenerMesasReservadasPorLocalizacion(Integer idLocalizacion) {
        return mesaRepository.findByLocalizacionIdLocalizacionAndEstado(idLocalizacion, Estado.reservada);
    }
    
    // Crear o actualizar mesa
    public Mesa guardarMesa(Mesa mesa) {
        return mesaRepository.save(mesa);
    }
    
    // Cambiar estado de una mesa
    public Mesa cambiarEstadoMesa(Integer id, Estado nuevoEstado) {
        Optional<Mesa> mesaOpt = mesaRepository.findById(id);
        if (mesaOpt.isPresent()) {
            Mesa mesa = mesaOpt.get();
            mesa.setEstado(nuevoEstado);
            return mesaRepository.save(mesa);
        }
        return null;
    }
    

    public void eliminarMesa(Integer id) {
        mesaRepository.deleteById(id);
    }
}