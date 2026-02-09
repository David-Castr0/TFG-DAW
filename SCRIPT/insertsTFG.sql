USE sushi_tfg;

-- ========================================
-- 1. CATEGORÍAS
-- ========================================

INSERT INTO categorias (nombre, descripcion, orden_visualizacion) VALUES
('Entrantes', 'Platos para comenzar', 1),
('Sushi', 'Variedades de sushi', 2),
('Sashimi', 'Pescado fresco sin arroz', 3),
('Makis', 'Rollos de sushi', 4),
('Tempuras', 'Fritura japonesa', 5),
('Postres', 'Dulces japoneses', 6),
('Bebidas', 'Bebidas frías y calientes', 7),
('Ensaladas', 'Ensaladas frescas', 8),
('Especiales', 'Platos especiales de la casa', 9);

-- ========================================
-- 2. PLATOS (50 platos)
-- ========================================

INSERT INTO platos (nombre, descripcion, precio, id_categoria, imagen_url, disponible) VALUES
-- ENTRANTES (Categoría 1)
('Edamame', 'Vainas de soja al vapor con sal marina', 4.50, 1, 'https://images.unsplash.com/photo-1583202077592-c123c4c2b4d5?w=400', TRUE),
('Gyozas', 'Empanadillas japonesas rellenas de cerdo y vegetales', 6.50, 1, 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400', TRUE),
('Takoyaki', 'Bolitas de pulpo con salsa takoyaki', 7.00, 1, 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400', TRUE),
('Yakitori', 'Brochetas de pollo a la parrilla', 8.50, 1, 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400', TRUE),
('Agedashi Tofu', 'Tofu frito en caldo dashi', 5.50, 1, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', TRUE),

-- SUSHI (Categoría 2)
('Nigiri de Salmón', 'Dos piezas de arroz con salmón fresco', 5.50, 2, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', TRUE),
('Nigiri de Atún', 'Dos piezas de arroz con atún rojo', 6.50, 2, 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=400', TRUE),
('Nigiri de Anguila', 'Dos piezas con anguila glaseada', 7.00, 2, 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400', TRUE),
('Nigiri de Pulpo', 'Dos piezas con pulpo cocido', 6.00, 2, 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400', TRUE),
('Nigiri de Langostino', 'Dos piezas con langostino', 6.50, 2, 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400', TRUE),

-- SASHIMI (Categoría 3)
('Sashimi de Salmón', 'Láminas de salmón fresco', 12.00, 3, 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400', TRUE),
('Sashimi de Atún', 'Láminas de atún rojo premium', 14.00, 3, 'https://images.unsplash.com/photo-1559058922-94834f0d1b5b?w=400', TRUE),
('Sashimi Mixto', 'Variedad de pescados frescos', 16.00, 3, 'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=400', TRUE),
('Sashimi de Hamachi', 'Láminas de pez limón japonés', 13.50, 3, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', TRUE),
('Sashimi de Vieira', 'Vieiras frescas en láminas', 15.00, 3, 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=400', TRUE),

-- MAKIS (Categoría 4)
('California Roll', 'Rollo con cangrejo, aguacate y pepino', 8.50, 4, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', TRUE),
('Spicy Tuna Roll', 'Rollo picante de atún', 9.00, 4, 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=400', TRUE),
('Philadelphia Roll', 'Rollo con salmón, queso crema y pepino', 9.50, 4, 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400', TRUE),
('Dragon Roll', 'Rollo especial con anguila y aguacate', 12.00, 4, 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400', TRUE),
('Rainbow Roll', 'Rollo arcoíris con pescados variados', 13.00, 4, 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400', TRUE),
('Veggie Roll', 'Rollo vegetariano con aguacate y pepino', 7.00, 4, 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400', TRUE),

-- TEMPURAS (Categoría 5)
('Tempura de Langostinos', 'Langostinos rebozados y fritos', 10.50, 5, 'https://images.unsplash.com/photo-1604908815546-9199327f9ca4?w=400', TRUE),
('Tempura de Verduras', 'Verduras variadas en tempura', 8.00, 5, 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400', TRUE),
('Tempura Mixta', 'Combinación de langostinos y verduras', 11.50, 5, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', TRUE),
('Tempura de Pollo', 'Trozos de pollo en tempura', 9.50, 5, 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400', TRUE),
('Tempura de Champiñones', 'Champiñones frescos rebozados', 7.50, 5, 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400', TRUE),

-- POSTRES (Categoría 6)
('Mochi', 'Dulce japonés de arroz glutinoso (3 piezas)', 5.50, 6, 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=400', TRUE),
('Dorayaki', 'Tortitas rellenas de pasta de judía dulce', 4.50, 6, 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400', TRUE),
('Helado Tempura', 'Helado rebozado y frito', 6.50, 6, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', TRUE),
('Matcha Cheesecake', 'Tarta de queso con té verde matcha', 6.00, 6, 'https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=400', TRUE),
('Daifuku', 'Mochi relleno de fruta (3 piezas)', 5.00, 6, 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=400', TRUE),

-- BEBIDAS (Categoría 7)
('Té Verde', 'Té verde japonés caliente', 2.50, 7, 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400', TRUE),
('Sake Caliente', 'Sake tradicional servido caliente', 6.00, 7, 'https://images.unsplash.com/photo-1551538827-9c037cb5a53a?w=400', TRUE),
('Sake Frío', 'Sake premium frío', 7.00, 7, 'https://images.unsplash.com/photo-1551538827-9c037cb5a53a?w=400', TRUE),
('Ramune', 'Refresco japonés de sabores', 3.50, 7, 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400', TRUE),
('Cerveza Asahi', 'Cerveza japonesa premium', 4.50, 7, 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400', TRUE),
('Agua Mineral', 'Agua mineral natural', 2.00, 7, 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400', TRUE),

-- ENSALADAS (Categoría 8)
('Ensalada Wakame', 'Algas wakame con sésamo', 5.50, 8, 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=400', TRUE),
('Ensalada de Algas', 'Mezcla de algas marinas', 6.00, 8, 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400', TRUE),
('Ensalada de Pepino', 'Pepino japonés con vinagre de arroz', 4.50, 8, 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', TRUE),
('Ensalada de Cangrejo', 'Cangrejo con mayonesa japonesa', 8.00, 8, 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400', TRUE),

-- ESPECIALES (Categoría 9)
('Ramen', 'Sopa de fideos con cerdo chashu', 11.50, 9, 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400', TRUE),
('Udon', 'Fideos gruesos en caldo caliente', 10.00, 9, 'https://images.unsplash.com/photo-1618841557871-b9a8ea8e3874?w=400', TRUE),
('Teppanyaki de Ternera', 'Ternera a la plancha estilo japonés', 18.00, 9, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', TRUE),
('Katsu Curry', 'Cerdo empanado con curry japonés', 12.50, 9, 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400', TRUE),
('Sushi Boat', 'Barco de sushi variado (30 piezas)', 45.00, 9, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', TRUE),
('Chirashi Don', 'Bol de arroz con sashimi variado', 14.50, 9, 'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=400', TRUE),
('Okonomiyaki', 'Tortilla japonesa estilo Osaka', 9.50, 9, 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400', TRUE);

-- ========================================
-- 3. LOCALIZACIONES
-- ========================================

INSERT INTO localizaciones (nombre, direccion, telefono, ciudad, horario_apertura, horario_cierre, activo) VALUES
('Sushimi Pinar de Chamartin', 'Calle Mayor 123', '912345678', 'Madrid', '12:00:00', '23:30:00', TRUE),
('Sushimi Palacio de Hielo', 'Calle Silvano 77', '934567890', 'Madrid', '12:00:00', '23:30:00', TRUE),
('Sushimi Plaza España', 'Plaza de España 18', '963456789', 'Madrid', '13:00:00', '00:00:00', TRUE),
('Sushimi Nuevos Ministerios', 'Paseo de la Castellana 67', '954123456', 'Madrid', '12:30:00', '23:00:00', TRUE),
('Sushimi Diego De Leon', 'Calle Diego de León 45', '915678901', 'Madrid', '12:00:00', '00:30:00', TRUE),
('Sushimi Velilla de San Antonio', 'Avenida de Madrid 12', '985412369', 'Velilla de San Antonio', '12:00:00', '00:00:00', TRUE),
('Sushimi Alcala de Henares', 'Calle Mayor 23', '985412369', 'Alcalá de Henares', '12:00:00', '00:00:00', TRUE),
('Sushimi Torrejón de Ardoz', 'Avenida de la Constitución 25', '985412369', 'Torrejón de Ardoz', '12:00:00', '00:00:00', TRUE),
('Sushimi Juan de La Cierva', 'Calle Juan de La Cierva 9', '985412369', 'Getafe', '12:00:00', '00:00:00', TRUE);

-- ========================================
-- 4. MESAS (8 por cada localización)
-- ========================================

-- Localización 1
INSERT INTO mesas (id_localizacion, numero_mesa, capacidad, estado) VALUES
(1, 'M01', 2, 'libre'), (1, 'M02', 2, 'libre'), (1, 'M03', 4, 'libre'), (1, 'M04', 4, 'libre'),
(1, 'M05', 6, 'libre'), (1, 'M06', 6, 'libre'), (1, 'M07', 8, 'libre'), (1, 'M08', 4, 'libre');

-- Localización 2
INSERT INTO mesas (id_localizacion, numero_mesa, capacidad, estado) VALUES
(2, 'M01', 2, 'libre'), (2, 'M02', 2, 'libre'), (2, 'M03', 4, 'libre'), (2, 'M04', 4, 'libre'),
(2, 'M05', 6, 'libre'), (2, 'M06', 6, 'libre'), (2, 'M07', 8, 'libre'), (2, 'M08', 4, 'libre');

-- Localización 3
INSERT INTO mesas (id_localizacion, numero_mesa, capacidad, estado) VALUES
(3, 'M01', 2, 'libre'), (3, 'M02', 2, 'libre'), (3, 'M03', 4, 'libre'), (3, 'M04', 4, 'libre'),
(3, 'M05', 6, 'libre'), (3, 'M06', 6, 'libre'), (3, 'M07', 8, 'libre'), (3, 'M08', 4, 'libre');

-- Localización 4
INSERT INTO mesas (id_localizacion, numero_mesa, capacidad, estado) VALUES
(4, 'M01', 2, 'libre'), (4, 'M02', 2, 'libre'), (4, 'M03', 4, 'libre'), (4, 'M04', 4, 'libre'),
(4, 'M05', 6, 'libre'), (4, 'M06', 6, 'libre'), (4, 'M07', 8, 'libre'), (4, 'M08', 4, 'libre');

-- Localización 5
INSERT INTO mesas (id_localizacion, numero_mesa, capacidad, estado) VALUES
(5, 'M01', 2, 'libre'), (5, 'M02', 2, 'libre'), (5, 'M03', 4, 'libre'), (5, 'M04', 4, 'libre'),
(5, 'M05', 6, 'libre'), (5, 'M06', 6, 'libre'), (5, 'M07', 8, 'libre'), (5, 'M08', 4, 'libre');

-- Localización 6
INSERT INTO mesas (id_localizacion, numero_mesa, capacidad, estado) VALUES
(6, 'M01', 2, 'libre'), (6, 'M02', 2, 'libre'), (6, 'M03', 4, 'libre'), (6, 'M04', 4, 'libre'),
(6, 'M05', 6, 'libre'), (6, 'M06', 6, 'libre'), (6, 'M07', 8, 'libre'), (6, 'M08', 4, 'libre');

-- Localización 7
INSERT INTO mesas (id_localizacion, numero_mesa, capacidad, estado) VALUES
(7, 'M01', 2, 'libre'), (7, 'M02', 2, 'libre'), (7, 'M03', 4, 'libre'), (7, 'M04', 4, 'libre'),
(7, 'M05', 6, 'libre'), (7, 'M06', 6, 'libre'), (7, 'M07', 8, 'libre'), (7, 'M08', 4, 'libre');

-- Localización 8
INSERT INTO mesas (id_localizacion, numero_mesa, capacidad, estado) VALUES
(8, 'M01', 2, 'libre'), (8, 'M02', 2, 'libre'), (8, 'M03', 4, 'libre'), (8, 'M04', 4, 'libre'),
(8, 'M05', 6, 'libre'), (8, 'M06', 6, 'libre'), (8, 'M07', 8, 'libre'), (8, 'M08', 4, 'libre');

-- Localización 9
INSERT INTO mesas (id_localizacion, numero_mesa, capacidad, estado) VALUES
(9, 'M01', 2, 'libre'), (9, 'M02', 2, 'libre'), (9, 'M03', 4, 'libre'), (9, 'M04', 4, 'libre'),
(9, 'M05', 6, 'libre'), (9, 'M06', 6, 'libre'), (9, 'M07', 8, 'libre'), (9, 'M08', 4, 'libre');

-- ========================================
-- VERIFICACIÓN
-- ========================================

SELECT 'Datos insertados correctamente' AS mensaje;
SELECT COUNT(*) AS total_categorias FROM categorias;
SELECT COUNT(*) AS total_platos FROM platos;
SELECT COUNT(*) AS total_localizaciones FROM localizaciones;
SELECT COUNT(*) AS total_mesas FROM mesas;