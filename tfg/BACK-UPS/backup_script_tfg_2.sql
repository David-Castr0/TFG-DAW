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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedidos`
--

LOCK TABLES `detalle_pedidos` WRITE;
/*!40000 ALTER TABLE `detalle_pedidos` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `id_mesa` int NOT NULL,
  `fecha_hora_inicio` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_hora_fin` timestamp NULL DEFAULT NULL,
  `estado` enum('activo','finalizado') DEFAULT 'activo',
  PRIMARY KEY (`id_pedido`),
  KEY `id_mesa` (`id_mesa`),
  KEY `idx_pedidos_estado` (`estado`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_mesa`) REFERENCES `mesas` (`id_mesa`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platos`
--

LOCK TABLES `platos` WRITE;
/*!40000 ALTER TABLE `platos` DISABLE KEYS */;
INSERT INTO `platos` VALUES (1,1,'Edamame','Vainas de soja al vapor con sal marina',4.50,'https://images.unsplash.com/photo-1583202077592-c123c4c2b4d5?w=400',1),(2,1,'Gyozas','Empanadillas japonesas rellenas de cerdo y vegetales',6.50,'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400',1),(3,1,'Takoyaki','Bolitas de pulpo con salsa takoyaki',7.00,'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400',1),(4,1,'Yakitori','Brochetas de pollo a la parrilla',8.50,'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400',1),(5,1,'Agedashi Tofu','Tofu frito en caldo dashi',5.50,'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',1),(6,2,'Nigiri de Salmón','Dos piezas de arroz con salmón fresco',5.50,'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',1),(7,2,'Nigiri de Atún','Dos piezas de arroz con atún rojo',6.50,'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=400',1),(8,2,'Nigiri de Anguila','Dos piezas con anguila glaseada',7.00,'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400',1),(9,2,'Nigiri de Pulpo','Dos piezas con pulpo cocido',6.00,'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400',1),(10,2,'Nigiri de Langostino','Dos piezas con langostino',6.50,'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400',1),(11,3,'Sashimi de Salmón','Láminas de salmón fresco',12.00,'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400',1),(12,3,'Sashimi de Atún','Láminas de atún rojo premium',14.00,'https://images.unsplash.com/photo-1559058922-94834f0d1b5b?w=400',1),(13,3,'Sashimi Mixto','Variedad de pescados frescos',16.00,'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=400',1),(14,3,'Sashimi de Hamachi','Láminas de pez limón japonés',13.50,'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',1),(15,3,'Sashimi de Vieira','Vieiras frescas en láminas',15.00,'https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=400',1),(16,4,'California Roll','Rollo con cangrejo, aguacate y pepino',8.50,'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',1),(17,4,'Spicy Tuna Roll','Rollo picante de atún',9.00,'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=400',1),(18,4,'Philadelphia Roll','Rollo con salmón, queso crema y pepino',9.50,'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400',1),(19,4,'Dragon Roll','Rollo especial con anguila y aguacate',12.00,'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400',1),(20,4,'Rainbow Roll','Rollo arcoíris con pescados variados',13.00,'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400',1),(21,4,'Veggie Roll','Rollo vegetariano con aguacate y pepino',7.00,'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400',1),(22,5,'Tempura de Langostinos','Langostinos rebozados y fritos',10.50,'https://images.unsplash.com/photo-1604908815546-9199327f9ca4?w=400',1),(23,5,'Tempura de Verduras','Verduras variadas en tempura',8.00,'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400',1),(24,5,'Tempura Mixta','Combinación de langostinos y verduras',11.50,'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',1),(25,5,'Tempura de Pollo','Trozos de pollo en tempura',9.50,'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400',1),(26,5,'Tempura de Champiñones','Champiñones frescos rebozados',7.50,'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400',1),(27,6,'Mochi','Dulce japonés de arroz glutinoso (3 piezas)',5.50,'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=400',1),(28,6,'Dorayaki','Tortitas rellenas de pasta de judía dulce',4.50,'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400',1),(29,6,'Helado Tempura','Helado rebozado y frito',6.50,'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',1),(30,6,'Matcha Cheesecake','Tarta de queso con té verde matcha',6.00,'https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=400',1),(31,6,'Daifuku','Mochi relleno de fruta (3 piezas)',5.00,'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=400',1),(32,7,'Té Verde','Té verde japonés caliente',2.50,'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',1),(33,7,'Sake Caliente','Sake tradicional servido caliente',6.00,'https://images.unsplash.com/photo-1551538827-9c037cb5a53a?w=400',1),(34,7,'Sake Frío','Sake premium frío',7.00,'https://images.unsplash.com/photo-1551538827-9c037cb5a53a?w=400',1),(35,7,'Ramune','Refresco japonés de sabores',3.50,'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400',1),(36,7,'Cerveza Asahi','Cerveza japonesa premium',4.50,'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400',1),(37,7,'Agua Mineral','Agua mineral natural',2.00,'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',1),(38,8,'Ensalada Wakame','Algas wakame con sésamo',5.50,'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=400',1),(39,8,'Ensalada de Algas','Mezcla de algas marinas',6.00,'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400',1),(40,8,'Ensalada de Pepino','Pepino japonés con vinagre de arroz',4.50,'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',1),(41,8,'Ensalada de Cangrejo','Cangrejo con mayonesa japonesa',8.00,'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400',1),(42,9,'Ramen','Sopa de fideos con cerdo chashu',11.50,'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400',1),(43,9,'Udon','Fideos gruesos en caldo caliente',10.00,'https://images.unsplash.com/photo-1618841557871-b9a8ea8e3874?w=400',1),(44,9,'Teppanyaki de Ternera','Ternera a la plancha estilo japonés',18.00,'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',1),(45,9,'Katsu Curry','Cerdo empanado con curry japonés',12.50,'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400',1),(46,9,'Sushi Boat','Barco de sushi variado (30 piezas)',45.00,'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',1),(47,9,'Chirashi Don','Bol de arroz con sashimi variado',14.50,'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=400',1),(48,9,'Okonomiyaki','Tortilla japonesa estilo Osaka',9.50,'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,36,5,'Jose Luis Castro','451236945','JoseLuis@gmail.com','2026-02-12','21:30:00',3,'cancelada',NULL,'2026-02-11 19:41:00'),(2,56,7,'David Castro Romero','481236594','David@gmail.com','2026-02-16','15:00:00',4,'pendiente',NULL,'2026-02-15 17:25:03'),(3,18,3,'Amin  Hourag','884792387','aminhourag@gmail.com','2026-02-20','16:15:00',2,'pendiente',NULL,NULL);
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
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin','$2a$10$bknckTpW9nIVpBAGRzIc1.IMgi8xiDtwE/KPe6uKOj86uaBiPw/0.','Administrador','admin@sushimi.com','ADMIN',1,'2026-02-11 19:07:38'),(2,'Amin','$2a$10$ON62GXc7Bje2.jaVmxMUh.U2bVTVbZBesMVFfDPF7keZzt2xgpdlq','Amin Hourag','aminhourag@gmail.com','CLIENTE',1,'2026-02-18 17:02:45');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-19 19:15:43
