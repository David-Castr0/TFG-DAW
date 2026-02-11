CREATE DATABASE IF NOT EXISTS sushi_tfg;
USE sushi_tfg;


CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    rol ENUM('ADMIN', 'COCINERO', 'RECEPCIONISTA', 'CLIENTE') NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE localizaciones (
    id_localizacion INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    ciudad VARCHAR(100),
    horario_apertura TIME,
    horario_cierre TIME,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE mesas (
    id_mesa INT AUTO_INCREMENT PRIMARY KEY,
    id_localizacion INT NOT NULL,
    numero_mesa VARCHAR(10) NOT NULL,
    capacidad INT NOT NULL,
    estado ENUM('libre', 'ocupada', 'reservada') DEFAULT 'libre',
    FOREIGN KEY (id_localizacion) REFERENCES localizaciones(id_localizacion) ON DELETE CASCADE,
    UNIQUE KEY unique_mesa_localizacion (id_localizacion, numero_mesa)
);

CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    orden_visualizacion INT DEFAULT 0
);

CREATE TABLE platos (
    id_plato INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) DEFAULT 0.00,
    imagen_url VARCHAR(500),
    disponible BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE CASCADE
);

CREATE TABLE reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_mesa INT NOT NULL,
    id_localizacion INT NOT NULL,
    nombre_cliente VARCHAR(100) NOT NULL,
    telefono_cliente VARCHAR(20) NOT NULL,
    email_cliente VARCHAR(100),
    fecha_reserva DATE NOT NULL,
    hora_reserva TIME NOT NULL,
    num_personas INT NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'cancelada', 'completada') DEFAULT 'pendiente',
    notas TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_mesa) REFERENCES mesas(id_mesa) ON DELETE CASCADE,
    FOREIGN KEY (id_localizacion) REFERENCES localizaciones(id_localizacion) ON DELETE CASCADE
);

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_mesa INT NOT NULL,
    fecha_hora_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_hora_fin TIMESTAMP NULL,
    estado ENUM('activo', 'finalizado') DEFAULT 'activo',
    FOREIGN KEY (id_mesa) REFERENCES mesas(id_mesa) ON DELETE CASCADE
);

CREATE TABLE detalle_pedidos (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_plato INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    fecha_hora_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'en_preparacion', 'listo', 'entregado') DEFAULT 'pendiente',
    notas_especiales TEXT,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_plato) REFERENCES platos(id_plato) ON DELETE CASCADE
);

CREATE INDEX idx_mesas_estado ON mesas(estado);
CREATE INDEX idx_reservas_fecha ON reservas(fecha_reserva, hora_reserva);
CREATE INDEX idx_pedidos_estado ON pedidos(estado);
CREATE INDEX idx_detalle_estado ON detalle_pedidos(estado);
CREATE INDEX idx_platos_disponible ON platos(disponible);

SELECT 'Base de datos creada exitosamente' AS mensaje;