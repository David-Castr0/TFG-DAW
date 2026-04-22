package com.tfg.sushi_buffet.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "pedidos")
public class Pedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Integer idPedido;
    
    @ManyToOne
    @JoinColumn(name = "id_mesa", nullable = true)
    private Mesa mesa;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = true)
    private Usuario usuario;
    
    @Column(name = "fecha_hora_inicio", updatable = false)
    private LocalDateTime fechaHoraInicio;
    
    @Column(name = "fecha_hora_fin")
    private LocalDateTime fechaHoraFin;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Estado estado = Estado.recibido;

    @Column(name = "nombre_cliente", length = 100)
    private String nombreCliente;

    @Column(name = "telefono_cliente", length = 20)
    private String telefonoCliente;

    @Column(name = "direccion_entrega", length = 255)
    private String direccionEntrega;

    @Column(name = "notas_pedido", columnDefinition = "TEXT")
    private String notasPedido;

    @Enumerated(EnumType.STRING)
    @Column(name = "metodo_pago")
    private MetodoPago metodoPago;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pedido")
    private TipoPedido tipoPedido = TipoPedido.domicilio;

    public enum Estado {
        recibido, en_preparacion, en_camino, entregado, finalizado
    }

    public enum MetodoPago {
        efectivo, tarjeta
    }

    public enum TipoPedido {
        mesa, domicilio
    }
}