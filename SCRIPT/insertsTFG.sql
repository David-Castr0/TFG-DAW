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
('Edamame', 'Vainas de soja al vapor con sal marina', 4.50, 1, 'https://plus.unsplash.com/premium_photo-1666318300348-a4d0226d81ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWRhbWFtZXxlbnwwfHwwfHx8MA%3D%3D', TRUE),
('Gyozas', 'Empanadillas japonesas rellenas de cerdo y vegetales', 6.50, 1, 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400', TRUE),
('Takoyaki', 'Bolitas de pulpo con salsa takoyaki', 7.00, 1, 'https://images.unsplash.com/photo-1742633882704-41ec3a57dbb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGFrb3lha2l8ZW58MHx8MHx8fDA%3D', TRUE),
('Yakitori', 'Brochetas de pollo a la parrilla', 8.50, 1, 'https://images.unsplash.com/photo-1727281970324-4bda7bab3073?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eWFraXRvcml8ZW58MHx8MHx8fDA%3D', TRUE),
('Agedashi Tofu', 'Tofu frito en caldo dashi', 5.50, 1, 'https://images.unsplash.com/photo-1765295218809-784d6c2fe39c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWdlZGFzaGl8ZW58MHx8MHx8fDA%3D', TRUE),

-- SUSHI (Categoría 2)
('Nigiri de Salmón', 'Dos piezas de arroz con salmón fresco', 5.50, 2, 'https://images.unsplash.com/photo-1637074930269-089fde202b57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlnaXJpfGVufDB8fDB8fHww', TRUE),
('Nigiri de Atún', 'Dos piezas de arroz con atún rojo', 6.50, 2, 'https://images.unsplash.com/photo-1562707786-7d2b807961c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnaXJpfGVufDB8fDB8fHww', TRUE),
('Nigiri de Anguila', 'Dos piezas con anguila glaseada', 7.00, 2, 'https://images.unsplash.com/photo-1711480023277-9f27496f10e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5pZ2lyaXxlbnwwfHwwfHx8MA%3D%3D', TRUE),
('Nigiri de Pulpo', 'Dos piezas con pulpo cocido', 6.00, 2, 'https://img.freepik.com/fotos-premium/sushi-nigiri-pulpo_70216-720.jpg?w=1480', TRUE),
('Nigiri de Langostino', 'Dos piezas con langostino', 6.50, 2, 'https://recetadesushi.com/wp-content/uploads/2023/08/Nigiri-de-langostinos.jpg', TRUE),

-- SASHIMI (Categoría 3)
('Sashimi de Salmón', 'Láminas de salmón fresco', 12.00, 3, 'https://plus.unsplash.com/premium_photo-1726797716122-b99bb67352ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FzaGltaXxlbnwwfHwwfHx8MA%3D%3D', TRUE),
('Sashimi de Atún', 'Láminas de atún rojo premium', 14.00, 3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxXft8ymqNzeR2dwzOxvQjVS9_J2OLmSm3_Q&s', TRUE),
('Sashimi Mixto', 'Variedad de pescados frescos', 16.00, 3, 'https://images.unsplash.com/photo-1638866381709-071747b518c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FzaGltaXxlbnwwfHwwfHx8MA%3D%3D', TRUE),
('Sashimi de Hamachi', 'Láminas de pez limón japonés', 13.50, 3, 'https://honest-food.net/wp-content/uploads/2022/08/hamachi-sashimi-recipe.jpg', TRUE),
('Sashimi de Vieira', 'Vieiras frescas en láminas', 15.00, 3, 'https://kaisensushibar.es/wp-content/uploads/2022/08/Sashimivieira003copia.jpg', TRUE),

-- MAKIS (Categoría 4)
('California Roll', 'Rollo con cangrejo, aguacate y pepino', 8.50, 4, 'https://images.unsplash.com/photo-1662675116548-aa1a7246db20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FsaWZvcm5pYSUyMHJvbGwlMjBzdXNoaXxlbnwwfHwwfHx8MA%3D%3D', TRUE),
('Spicy Tuna Roll', 'Rollo picante de atún', 9.00, 4, 'https://plus.unsplash.com/premium_photo-1755705514674-6f1eaa447e3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHVuYSUyMHJvbGx8ZW58MHx8MHx8fDA%3D', TRUE),
('Philadelphia Roll', 'Rollo con salmón, queso crema y pepino', 9.50, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxYA7ZS4siDkcBWuDgbHjUf4mfbAfC4nOGAA&s', TRUE),
('Dragon Roll', 'Rollo especial con anguila y aguacate', 12.00, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScyFXfQpGycAI9BLo1vuGkFXJom98daourOQ&s', TRUE),
('Rainbow Roll', 'Rollo arcoíris con pescados variados', 13.00, 4, 'https://comerjapones.com/wp-content/uploads/rainbow-roll.jpg', TRUE),
('Veggie Roll', 'Rollo vegetariano con aguacate y pepino', 7.00, 4, 'https://cdn.pickuplimes.com/cache/a6/7d/a67d95e8044769cf96d551c0ad09f7f9.jpg', TRUE),

-- TEMPURAS (Categoría 5)
('Tempura de Langostinos', 'Langostinos rebozados y fritos', 10.50, 5, 'https://images.unsplash.com/photo-1677743537607-f7fc9273ec4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVtcHVyYXxlbnwwfHwwfHx8MA%3D%3D', TRUE),
('Tempura de Verduras', 'Verduras variadas en tempura', 8.00, 5, 'https://cocina-familiar.com/wp-content/uploads/2024/10/1627.-Tempura-de-verduras.jpg', TRUE),
('Tempura Mixta', 'Combinación de langostinos y verduras', 11.50, 5, 'https://images.unsplash.com/photo-1570078362689-c57c33cca104?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlbXB1cmElMjB2ZWdnaWV8ZW58MHx8MHx8fDA%3D', TRUE),
('Tempura de Pollo', 'Trozos de pollo en tempura', 9.50, 5, 'https://i.ytimg.com/vi/4me9TWXxdtw/sddefault.jpg?v=60319521', TRUE),
('Tempura de Champiñones', 'Champiñones frescos rebozados', 7.50, 5, 'https://hips.hearstapps.com/diezminutos/assets/16/23/1465584267-tempura-de-champinones-rellenos.jpg', TRUE),

-- POSTRES (Categoría 6)
('Mochi', 'Dulce japonés de arroz glutinoso (3 piezas)', 5.50, 6, 'https://plus.unsplash.com/premium_photo-1700590072629-c051ca7ce0f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9jaGl8ZW58MHx8MHx8fDA%3D', TRUE),
('Dorayaki', 'Tortitas rellenas de pasta de judía dulce', 4.50, 6, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Dorayaki_001_%282%29.jpg/960px-Dorayaki_001_%282%29.jpg?20210914113946', TRUE),
('Helado Tempura', 'Helado rebozado y frito', 6.50, 6, 'https://plus.unsplash.com/premium_photo-1666920428771-68fc46bb6f0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGVsYWRvJTIwdGVtcHVyYXxlbnwwfHwwfHx8MA%3D%3D', TRUE),
('Matcha Cheesecake', 'Tarta de queso con té verde matcha', 6.00, 6, 'https://plus.unsplash.com/premium_photo-1694599324074-d5479407e7c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWF0Y2hhJTIwY2hlZXNlY2FrZXxlbnwwfHwwfHx8MA%3D%3D', TRUE),
('Daifuku', 'Mochi relleno de fruta (3 piezas)', 5.00, 6, 'https://plus.unsplash.com/premium_photo-1700590072657-f6ace3c55a6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGFpZnVrdXxlbnwwfHwwfHx8MA%3D%3D', TRUE),

-- BEBIDAS (Categoría 7)
('Té Verde', 'Té verde japonés caliente', 2.50, 7, 'https://plus.unsplash.com/premium_photo-1694540110881-84add98c0a75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGUlMjB2ZXJkZXxlbnwwfHwwfHx8MA%3D%3D', TRUE),
('Sake Caliente', 'Sake tradicional servido caliente', 6.00, 7, 'https://images.unsplash.com/photo-1589961546603-d4281f3cfdfa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2FrZXxlbnwwfHwwfHx8MA%3D%3D', TRUE),
('Sake Frío', 'Sake premium frío', 7.00, 7, 'https://images.unsplash.com/photo-1691432633040-c31b6086742c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNha2V8ZW58MHx8MHx8fDA%3D', TRUE),
('Ramune', 'Refresco japonés de sabores', 3.50, 7, 'https://images.unsplash.com/photo-1604259596747-2377448d916d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFtdW5lfGVufDB8fDB8fHww', TRUE),
('Cerveza Asahi', 'Cerveza japonesa premium', 4.50, 7, 'https://www.cervezasonline.com/5409-large_default/asahi-33cl.jpg', TRUE),
('Agua Mineral', 'Agua mineral natural', 2.00, 7, 'https://m.media-amazon.com/images/I/61OBCib82UL.jpg', TRUE),

-- ENSALADAS (Categoría 8)
('Ensalada Wakame', 'Algas wakame con sésamo', 5.50, 8, 'https://plus.unsplash.com/premium_photo-1700840833259-9910be1b588f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FrYW1lfGVufDB8fDB8fHww', TRUE),
('Ensalada de Algas', 'Mezcla de algas marinas', 6.00, 8, 'https://cdn.shopify.com/s/files/1/0605/9720/7189/files/20241021091555-salade-20wakame-20roquette.jpg?v=1729502159&width=1600&height=900', TRUE),
('Ensalada de Pepino', 'Pepino japonés con vinagre de arroz', 4.50, 8, 'https://womenoftoday.com/app/uploads/2019/09/cucumber-avocado-and-feta-salad-645x840.jpg', TRUE),
('Ensalada de Cangrejo', 'Cangrejo con mayonesa japonesa', 8.00, 8, 'https://i.ytimg.com/vi/5QBGJSNNpoU/hqdefault.jpg', TRUE),

-- ESPECIALES (Categoría 9)
('Ramen', 'Sopa de fideos con cerdo chashu', 11.50, 9, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFtZW58ZW58MHx8MHx8fDA%3D', TRUE),
('Udon', 'Fideos gruesos en caldo caliente', 10.00, 9, 'https://images.unsplash.com/photo-1558985212-324add95595a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dWRvbnxlbnwwfHwwfHx8MA%3D%3D', TRUE),
('Teppanyaki de Ternera', 'Ternera a la plancha estilo japonés', 18.00, 9, 'https://media-cdn.tripadvisor.com/media/photo-s/1c/f5/ef/47/teppanyaki-ternera.jpg', TRUE),
('Katsu Curry', 'Cerdo empanado con curry japonés', 12.50, 9, 'https://images.unsplash.com/photo-1695977723082-dcf5ebbead9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0c3UlMjBjdXJyeXxlbnwwfHwwfHx8MA%3D%3D', TRUE),
('Sushi Boat', 'Barco de sushi variado (30 piezas)', 45.00, 9, 'https://images.unsplash.com/photo-1663334038419-71e6f82e333f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VzaGklMjBib2F0fGVufDB8fDB8fHww', TRUE),
('Chirashi Don', 'Bol de arroz con sashimi variado', 14.50, 9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQspopT55_gfgtu_9ksJC52H2OC58YFmpRPrw&s', TRUE),
('Okonomiyaki', 'Tortilla japonesa estilo Osaka', 9.50, 9, 'https://images.unsplash.com/photo-1629579436553-6b34e5ddd9de?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', TRUE);

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