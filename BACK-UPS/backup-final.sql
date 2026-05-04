-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: sushi_tfg
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text,
  `orden_visualizacion` int DEFAULT '0',
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Entrantes','Platos para comenzar',1),(2,'Sushi','Variedades de sushi',2),(3,'Sashimi','Pescado fresco sin arroz',3),(4,'Makis','Rollos de sushi',4),(5,'Tempuras','Fritura japonesa',5),(6,'Postres','Dulces japoneses',6),(7,'Bebidas','Bebidas frías y calientes',7),(8,'Ensaladas','Ensaladas frescas',8),(9,'Especiales','Platos especiales de la casa',9);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_pedidos`
--

DROP TABLE IF EXISTS `detalle_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_pedidos` (
  `id_detalle` int NOT NULL AUTO_INCREMENT,
  `id_pedido` int NOT NULL,
  `id_plato` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `fecha_hora_solicitud` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('pendiente','en_preparacion','listo','entregado') DEFAULT 'pendiente',
  `notas_especiales` text,
  PRIMARY KEY (`id_detalle`),
  KEY `id_pedido` (`id_pedido`),
  KEY `id_plato` (`id_plato`),
  KEY `idx_detalle_estado` (`estado`),
  CONSTRAINT `detalle_pedidos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE,
  CONSTRAINT `detalle_pedidos_ibfk_2` FOREIGN KEY (`id_plato`) REFERENCES `platos` (`id_plato`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedidos`
--

LOCK TABLES `detalle_pedidos` WRITE;
/*!40000 ALTER TABLE `detalle_pedidos` DISABLE KEYS */;
INSERT INTO `detalle_pedidos` VALUES (28,5,53,1,'2026-04-30 12:05:18','pendiente',NULL),(29,5,54,2,'2026-04-30 12:05:18','pendiente',NULL),(30,5,56,1,'2026-04-30 12:05:18','pendiente',NULL),(31,5,58,2,'2026-04-30 12:05:18','pendiente',NULL),(32,5,57,1,'2026-04-30 12:05:18','pendiente',NULL);
/*!40000 ALTER TABLE `detalle_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localizaciones`
--

DROP TABLE IF EXISTS `localizaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localizaciones` (
  `id_localizacion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `horario_apertura` time DEFAULT NULL,
  `horario_cierre` time DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_localizacion`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localizaciones`
--

LOCK TABLES `localizaciones` WRITE;
/*!40000 ALTER TABLE `localizaciones` DISABLE KEYS */;
INSERT INTO `localizaciones` VALUES (1,'Sushimi Pinar de Chamartin','Calle Mayor 123','912345678','Madrid','12:00:00','23:30:00',1),(2,'Sushimi Palacio de Hielo','Calle Silvano 77','934567890','Madrid','12:00:00','23:30:00',1),(3,'Sushimi Plaza España','Plaza de España 18','963456789','Madrid','13:00:00','00:00:00',1),(4,'Sushimi Nuevos Ministerios','Paseo de la Castellana 67','954123456','Madrid','12:30:00','23:00:00',1),(5,'Sushimi Diego De Leon','Calle Diego de León 45','915678901','Madrid','12:00:00','00:30:00',1),(6,'Sushimi Velilla de San Antonio','Avenida de Madrid 12','985412369','Velilla de San Antonio','12:00:00','00:00:00',1),(7,'Sushimi Alcala de Henares','Calle Mayor 23','985412369','Alcalá de Henares','12:00:00','00:00:00',1),(8,'Sushimi Torrejón de Ardoz','Avenida de la Constitución 25','985412369','Torrejón de Ardoz','12:00:00','00:00:00',1),(9,'Sushimi Juan de La Cierva','Calle Juan de La Cierva 9','985412369','Getafe','12:00:00','00:00:00',1);
/*!40000 ALTER TABLE `localizaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesas`
--

DROP TABLE IF EXISTS `mesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesas` (
  `id_mesa` int NOT NULL AUTO_INCREMENT,
  `id_localizacion` int NOT NULL,
  `numero_mesa` varchar(10) NOT NULL,
  `capacidad` int NOT NULL,
  `estado` enum('libre','ocupada','reservada') DEFAULT 'libre',
  PRIMARY KEY (`id_mesa`),
  UNIQUE KEY `unique_mesa_localizacion` (`id_localizacion`,`numero_mesa`),
  KEY `idx_mesas_estado` (`estado`),
  CONSTRAINT `mesas_ibfk_1` FOREIGN KEY (`id_localizacion`) REFERENCES `localizaciones` (`id_localizacion`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesas`
--

LOCK TABLES `mesas` WRITE;
/*!40000 ALTER TABLE `mesas` DISABLE KEYS */;
INSERT INTO `mesas` VALUES (1,1,'M01',2,'libre'),(2,1,'M02',2,'libre'),(3,1,'M03',4,'libre'),(4,1,'M04',4,'libre'),(5,1,'M05',6,'libre'),(6,1,'M06',6,'libre'),(7,1,'M07',8,'libre'),(8,1,'M08',4,'libre'),(9,2,'M01',2,'libre'),(10,2,'M02',2,'libre'),(11,2,'M03',4,'libre'),(12,2,'M04',4,'libre'),(13,2,'M05',6,'libre'),(14,2,'M06',6,'libre'),(15,2,'M07',8,'libre'),(16,2,'M08',4,'libre'),(17,3,'M01',2,'libre'),(18,3,'M02',2,'libre'),(19,3,'M03',4,'libre'),(20,3,'M04',4,'libre'),(21,3,'M05',6,'libre'),(22,3,'M06',6,'libre'),(23,3,'M07',8,'libre'),(24,3,'M08',4,'libre'),(25,4,'M01',2,'libre'),(26,4,'M02',2,'libre'),(27,4,'M03',4,'libre'),(28,4,'M04',4,'libre'),(29,4,'M05',6,'libre'),(30,4,'M06',6,'libre'),(31,4,'M07',8,'libre'),(32,4,'M08',4,'libre'),(33,5,'M01',2,'libre'),(34,5,'M02',2,'libre'),(35,5,'M03',4,'libre'),(36,5,'M04',4,'libre'),(37,5,'M05',6,'libre'),(38,5,'M06',6,'libre'),(39,5,'M07',8,'libre'),(40,5,'M08',4,'libre'),(41,6,'M01',2,'libre'),(42,6,'M02',2,'libre'),(43,6,'M03',4,'libre'),(44,6,'M04',4,'libre'),(45,6,'M05',6,'libre'),(46,6,'M06',6,'libre'),(47,6,'M07',8,'libre'),(48,6,'M08',4,'libre'),(49,7,'M01',2,'libre'),(50,7,'M02',2,'libre'),(51,7,'M03',4,'libre'),(52,7,'M04',4,'libre'),(53,7,'M05',6,'libre'),(54,7,'M06',6,'libre'),(55,7,'M07',8,'libre'),(56,7,'M08',4,'libre'),(57,8,'M01',2,'libre'),(58,8,'M02',2,'libre'),(59,8,'M03',4,'libre'),(60,8,'M04',4,'libre'),(61,8,'M05',6,'libre'),(62,8,'M06',6,'libre'),(63,8,'M07',8,'libre'),(64,8,'M08',4,'libre'),(65,9,'M01',2,'libre'),(66,9,'M02',2,'libre'),(67,9,'M03',4,'libre'),(68,9,'M04',4,'libre'),(69,9,'M05',6,'libre'),(70,9,'M06',6,'libre'),(71,9,'M07',8,'libre'),(72,9,'M08',4,'libre');
/*!40000 ALTER TABLE `mesas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `id_mesa` int DEFAULT NULL,
  `fecha_hora_inicio` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_hora_fin` timestamp NULL DEFAULT NULL,
  `estado` enum('recibido','en_preparacion','en_camino','entregado','finalizado') NOT NULL DEFAULT 'recibido',
  `nombre_cliente` varchar(100) DEFAULT NULL,
  `telefono_cliente` varchar(20) DEFAULT NULL,
  `direccion_entrega` varchar(255) DEFAULT NULL,
  `notas_pedido` text,
  `metodo_pago` enum('efectivo','tarjeta') DEFAULT NULL,
  `tipo_pedido` enum('mesa','domicilio') DEFAULT 'domicilio',
  `id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `id_mesa` (`id_mesa`),
  KEY `idx_pedidos_estado` (`estado`),
  KEY `fk_pedido_usuario` (`id_usuario`),
  CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_mesa`) REFERENCES `mesas` (`id_mesa`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,NULL,'2026-04-21 11:12:23',NULL,'finalizado',NULL,NULL,NULL,NULL,NULL,'domicilio',NULL),(2,NULL,'2026-04-21 11:22:56',NULL,'entregado',NULL,NULL,NULL,NULL,NULL,'domicilio',NULL),(3,NULL,'2026-04-22 10:28:23',NULL,'entregado',NULL,NULL,NULL,NULL,NULL,'domicilio',NULL),(4,NULL,'2026-04-23 22:03:36',NULL,'entregado',NULL,NULL,NULL,NULL,NULL,'domicilio',NULL),(5,NULL,'2026-04-30 12:05:18',NULL,'entregado',NULL,NULL,NULL,NULL,NULL,'domicilio',NULL);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platos`
--

DROP TABLE IF EXISTS `platos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platos` (
  `id_plato` int NOT NULL AUTO_INCREMENT,
  `id_categoria` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) DEFAULT '0.00',
  `imagen_url` varchar(500) DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_plato`),
  KEY `id_categoria` (`id_categoria`),
  KEY `idx_platos_disponible` (`disponible`),
  CONSTRAINT `platos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platos`
--

LOCK TABLES `platos` WRITE;
/*!40000 ALTER TABLE `platos` DISABLE KEYS */;
INSERT INTO `platos` VALUES (53,1,'yakitori de pollo','brocheta de pollo y verduras',4.50,'http://localhost:8080/api/imagenes/941a9b08-8c91-48ea-830c-2627f80d1dbc.jpg',1),(54,1,'takoyaki','pelota de pulo a la tempura',3.00,'http://localhost:8080/api/imagenes/1a245377-6fec-477c-8b5d-c5b7a8d52698.avif',1),(55,1,'Pollo teriyaki','Pollo con salsa teriyaki',4.50,'http://localhost:8080/api/imagenes/6fd83131-23f8-4362-ba49-34a3cea7689b.jpg',1),(56,2,'nigiri pulpo 2U','nigiri de pulpo',4.50,'http://localhost:8080/api/imagenes/475ccba7-0854-4198-a2d4-21389befd06e.jpg',1),(57,2,'nigiri anguila 2U','nigiri de anguila',4.00,'http://localhost:8080/api/imagenes/e2daf90e-b1b7-4472-bc7a-212771b9f46f.png',1),(58,2,'nigiri salmon 4U','nigiri de salmon',3.50,'http://localhost:8080/api/imagenes/9f0e7f10-7a0a-4d32-9718-0a99c73da6f9.jpg',1),(59,2,'nigiri langostino 2U','nigiri langostino',4.50,'http://localhost:8080/api/imagenes/9fd8bc9c-09d6-4a76-94c2-c8bda0ea3664.jpg',1),(60,2,'nigiri atun 2U','nigiri de atun',4.50,'http://localhost:8080/api/imagenes/435c8384-b153-4c6e-bbcf-2c9a2c38fc5b.jpg',1),(61,1,'gyozas 8U','gyozas de pollo',6.00,'http://localhost:8080/api/imagenes/0d824b7a-f065-485a-a5fd-e8422316fef0.jpg',1),(62,1,'edamame','edamame',2.50,'http://localhost:8080/api/imagenes/5e7d1ff3-763c-4642-bbb1-e3da8af9f482.jpg',1),(63,3,'Sashimi de vieira 12U','sashimi de vieira',15.00,'http://localhost:8080/api/imagenes/5b9bc8a5-c739-42c2-a46c-e8e3cc5cc13c.jpg',1),(64,3,'sashimi mixto','sashimi mixti',9.50,'http://localhost:8080/api/imagenes/fe8dec3e-f9d3-4473-996b-6734aa43f5df.jpg',1),(65,9,'sushi boat','barco con sushi variado',45.00,'http://localhost:8080/api/imagenes/7e4f4cb8-05be-4423-9781-88651d96c2d8.jpg',1),(66,7,'sake frio','sake frio',4.00,'http://localhost:8080/api/imagenes/33019161-4562-4299-b912-348011eded0e.jpg',1),(67,7,'sake caliente','sake caliente',4.00,'http://localhost:8080/api/imagenes/2db8ab02-e099-49b0-b861-8202ee7afee6.jpg',1),(68,5,'tempura de verduras','verduras variadas a la tempura',4.00,'http://localhost:8080/api/imagenes/4c964b46-0f37-4b5c-903e-0d2ea6a944f9.jpg',1),(69,5,'tempura de champiñones','tempura de champiñones',3.50,'http://localhost:8080/api/imagenes/c0a9de7a-8b7d-4e80-81a4-62e61b7a2e83.avif',1),(70,5,'tempura de pollo','tempura de pollo',4.50,'http://localhost:8080/api/imagenes/1ced28cc-4ae5-402c-9a39-6afe1ac825e1.jpg',1),(71,5,'tempura mixta','verduras, carne y langostinos a la tempura',6.50,'http://localhost:8080/api/imagenes/9d980ff8-6220-4cbd-98dc-36a0e6e6671e.avif',1),(72,5,'tempura de langostinos','tempura de langostinos',5.00,'http://localhost:8080/api/imagenes/ea1681f4-0e20-4fc1-83df-49791168cc91.jpg',1),(73,7,'cerveza asashi','cerveca japonesa',3.00,'http://localhost:8080/api/imagenes/0b43556a-9d7e-4209-8104-94f5a932aca4.jpg',1),(74,7,'ramune','remune',3.00,'http://localhost:8080/api/imagenes/b48204b0-1880-460b-8cfc-e391f91fbed1.jpg',1),(75,7,'te verde','te verde',2.50,'http://localhost:8080/api/imagenes/34c37281-8d4b-4cd5-b3a7-9577d16f033c.webp',1),(76,6,'dorayaki','dorayaki',3.00,'http://localhost:8080/api/imagenes/837199de-6027-4bd4-a6e1-3247e8e1c896.jpg',1),(77,6,'matcha cheesecake','matcha cheesecake',3.50,'http://localhost:8080/api/imagenes/7918b28e-4602-439d-a218-69bce99dc0c4.jpg',1),(78,6,'helado de tempura','helado de tempura',3.00,'http://localhost:8080/api/imagenes/e0a80942-8d0b-42b5-826a-05bc4e193aa3.jpg',1);
/*!40000 ALTER TABLE `platos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id_reserva` int NOT NULL AUTO_INCREMENT,
  `id_mesa` int NOT NULL,
  `id_localizacion` int NOT NULL,
  `nombre_cliente` varchar(100) NOT NULL,
  `telefono_cliente` varchar(20) NOT NULL,
  `email_cliente` varchar(100) DEFAULT NULL,
  `fecha_reserva` date NOT NULL,
  `hora_reserva` time NOT NULL,
  `num_personas` int NOT NULL,
  `estado` enum('pendiente','confirmada','cancelada','completada') DEFAULT 'pendiente',
  `notas` text,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_reserva`),
  KEY `id_mesa` (`id_mesa`),
  KEY `id_localizacion` (`id_localizacion`),
  KEY `idx_reservas_fecha` (`fecha_reserva`,`hora_reserva`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_mesa`) REFERENCES `mesas` (`id_mesa`) ON DELETE CASCADE,
  CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`id_localizacion`) REFERENCES `localizaciones` (`id_localizacion`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,36,5,'Jose Luis Castro','451236945','JoseLuis@gmail.com','2026-02-12','21:30:00',3,'cancelada',NULL,'2026-02-11 19:41:00'),(2,56,7,'David Castro Romero','481236594','David@gmail.com','2026-02-16','15:00:00',4,'cancelada',NULL,'2026-02-15 17:25:03'),(3,18,3,'Amin  Hourag','884792387','aminhourag@gmail.com','2026-02-20','16:15:00',2,'cancelada',NULL,NULL),(4,55,7,'Maxi expresidiario','243752805','koala@gmail.com','2043-01-13','22:00:00',7,'pendiente','mujeres gordas',NULL),(5,13,2,'Alvaro Castro Portillo','982763459','alvaro@gmail.com','2026-05-05','15:00:00',6,'pendiente',NULL,NULL);
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `rol` enum('ADMIN','COCINERO','RECEPCIONISTA','CLIENTE') NOT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `telefono` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin','$2a$10$bknckTpW9nIVpBAGRzIc1.IMgi8xiDtwE/KPe6uKOj86uaBiPw/0.','Administrador','admin@sushimi.com','ADMIN',1,'2026-02-11 19:07:38',NULL),(2,'Amin','$2a$10$ON62GXc7Bje2.jaVmxMUh.U2bVTVbZBesMVFfDPF7keZzt2xgpdlq','Amin Hourag','aminhourag@gmail.com','CLIENTE',1,'2026-02-18 17:02:45',NULL),(3,'Juan','$2a$10$u8gbubH7.avFFXXTMWk.M.GrLWCo25YOOxCn.YwzIlqSdJpjB6BO6','Juan Guevara','juan@gmail.com','CLIENTE',1,'2026-03-05 13:33:49',NULL),(4,'koala','$2a$10$MGGWOk0OdUqldrMp3.PHwuzNpsDWBdz9SeezaJ6rbQvvg13cGcOX6','koala','koala@gmail.com','CLIENTE',1,'2026-04-20 11:10:13',NULL),(5,'daisy','$2a$10$I5zhFaUhJe.XbpeQhttPLeFSt7O359plu0qTR.2vhbWpUZBAVbS0q','daisy','daisy@gmail.com','CLIENTE',1,'2026-04-22 11:27:53','123876459'),(6,'alvaro','$2a$10$DtcfWWHcJxQwn7Wm3DtrouQ3iWYt6w51EmuWKAYE4h2NQavU69U9K','Alvaro Castro Portillo','alvaro@gmail.com','CLIENTE',1,'2026-05-04 20:44:10','098765432');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sushi_tfg'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-05  0:00:00
