package com.tfg.sushi_buffet.service;

import com.tfg.sushi_buffet.entity.Localizacion;
import com.tfg.sushi_buffet.repository.LocalizacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocalizacionService {
    
    @Autowired
    private LocalizacionRepository localizacionRepository;
    

    public List<Localizacion> obtenerTodasLasLocalizaciones() {
        return localizacionRepository.findAll();
    }
    
    public List<Localizacion> obtenerLocalizacionesActivas() {
        return localizacionRepository.findByActivoTrue();
    }
    
    public Optional<Localizacion> obtenerLocalizacionPorId(Integer id) {
        return localizacionRepository.findById(id);
    }
    
    public List<Localizacion> obtenerLocalizacionesPorCiudad(String ciudad) {
        return localizacionRepository.findByCiudad(ciudad);
    }
    
    // Crear o actualizar localización
    public Localizacion guardarLocalizacion(Localizacion localizacion) {
        return localizacionRepository.save(localizacion);
    }
    
    public void eliminarLocalizacion(Integer id) {
        localizacionRepository.deleteById(id);
    }
}