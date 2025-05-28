CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE roles(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    role_id uuid REFERENCES roles(id) ON DELETE SET NULL
);

CREATE TYPE quote_status AS ENUM ('pendiente', 'pagada', 'cotizada', 'cancelada', 'rechazada');

CREATE TABLE quotes(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    status quote_status NOT NULL DEFAULT 'pendiente',
    price INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE materials(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE quotes_materials(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id uuid REFERENCES quotes(id) ON DELETE CASCADE,
    material_id uuid REFERENCES materials(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    price INT NOT NULL DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE
);

INSERT INTO roles (name, description) VALUES
('admin', 'Administrador'),
('user', 'Usuario');



-- Función que asigna el rol 'user' si no se proporciona uno
CREATE OR REPLACE FUNCTION set_default_user_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.role_id IS NULL THEN
        SELECT id INTO NEW.role_id FROM roles WHERE name = 'user' LIMIT 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger que ejecuta la función antes de insertar en la tabla users
CREATE TRIGGER before_insert_user_set_role
BEFORE INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION set_default_user_role();

-- Insertando un usuario administrador con contraseña encriptada con bcrypt
-- La contraseña "2212" encriptada con bcrypt
INSERT INTO users (username, password, email, role_id)
VALUES ('admin', '$2a$10$UPUzpQX/7tyh/U4r0GRGGOIGQxS3GOCfGMausHYrWpPxm0qKVbF9a', 'admin@gmail.com', 
        (SELECT id FROM roles WHERE name = 'admin'));

-- Insertando usuarios regulares
INSERT INTO users (username, password, email) VALUES
('usuario1', '$2a$10$CvyNsLhFmAF7OWIA9VGrru8eJ/VTIikx3KXK5bXwhyT9VLkgRdmOC', 'usuario1@example.com'),
('usuario2', '$2a$10$ZkMB7bNHeJ5P.XDqNfGDQeHpPK8xPLm/bKbK2BGGsWHqOZXncID8.', 'usuario2@example.com'),
('usuario3', '$2a$10$1Ub7rGHj.wajTL8huWKqQO6Ykp5U0ATAWZMyfpXhR0YU8VfPCa5wu', 'usuario3@example.com'),
('usuario4', '$2a$10$UYKpmBOJiqm3NTxfx6YbPu1yoqI5L6BodjvLYw6vxQpBAjsqKFKwe', 'usuario4@example.com'),
('usuario5', '$2a$10$mL1VpvWyK5zD4zdQu.CEYuFkMMlY2IHkg0.DsFOa1MkPm21Dvx4DO', 'usuario5@example.com'),
('usuario6', '$2a$10$buRXDxDVfGAe4v2sGMTLre9eQ3jsVJBHRtgBDsxbNbY3zS0IDx6F2', 'usuario6@example.com'),
('usuario7', '$2a$10$hqRLl9FdAEx6dEcuDMgWDuKwIpuLSbz/nGVdm8l1YIMgZ.DDxrgX2', 'usuario7@example.com'),
('usuario8', '$2a$10$wGM9A8Psd057UeJXopw.nOQ0qOiTUFDRuRj/oMMQwvtZoDs1Fe6ry', 'usuario8@example.com'),
('usuario9', '$2a$10$uxRnmyRic1Fu8wQZdPcoHOSnavRfpP6iGDrQMoOyzzBMjJxO3hZX.', 'usuario9@example.com'),
('usuario10', '$2a$10$ntP795P9IbB3NUO1uUNVxeBscok0E3peIoBqK4ZwlVDLRk3MJoTCe', 'usuario10@example.com'),
('usuario11', '$2a$10$2JdTIDG5aI7PpED0C2Xsj.LB0VxHJ4YvnJQCuvPXJTFDYaXC5BdJO', 'usuario11@example.com'),
('usuario12', '$2a$10$m.MmC79tb4qzlVKVnT6heOHXcz2fXC46wI4eXW5i5oE.SQ2zO4pY6', 'usuario12@example.com'),
('usuario13', '$2a$10$Smk5Dm53ESWi1BQFe9zBcug6KnlhYZkQfBM4.oWc/IfB85LW5zA86', 'usuario13@example.com'),
('usuario14', '$2a$10$SBtKZjrpswLpQoT9/OoPDeN6vapFMgWLAVXFFdvZj3HYDgS77RHea', 'usuario14@example.com'),
('usuario15', '$2a$10$ys9.VcKU3JslM6kxrVSKQeiQIxFzlXKEmgcojD3THKe09VMbHbNaS', 'usuario15@example.com'),
('usuario16', '$2a$10$VZb/uHLXsKQeNkGa6BzOwOkbzijggghhcYOS8ff1mAxQu925ttm/e', 'usuario16@example.com'),
('usuario17', '$2a$10$CsC3xJVATFWsXTu4MHKURO/LWhjP2V5K65K1VBoxgYm1wO/8GaHgO', 'usuario17@example.com'),
('usuario18', '$2a$10$N97dXHRftMvy0pNKZPtgXO1/k1NTn5h1aKYILuwj5bdFmDSba2nPq', 'usuario18@example.com'),
('usuario19', '$2a$10$9xMHpBaF/a8YSC8TdCWT4.RZ/ZkjciCBpCR7jtjAdxREW7NuAG./G', 'usuario19@example.com');

-- Insertando materiales
INSERT INTO materials (name, description) VALUES
('Cemento', 'Cemento Portland tipo I para construcción general'),
('Arena', 'Arena fina para mezclas'),
('Grava', 'Grava de 3/4" para concreto'),
('Varilla', 'Varilla de acero corrugada de 3/8"'),
('Ladrillo', 'Ladrillo rojo de 6 huecos'),
('Madera', 'Madera de pino tratada'),
('Pintura', 'Pintura vinílica para interiores'),
('Tubería PVC', 'Tubería PVC hidráulica de 1/2"'),
('Cable eléctrico', 'Cable eléctrico calibre 12 THW'),
('Lámina', 'Lámina galvanizada acanalada');

-- Insertando cotizaciones
INSERT INTO quotes (user_id, title, text, address, status, price) VALUES
((SELECT id FROM users WHERE email = 'usuario1@example.com'), 'Remodelación cocina', 'Necesito remodelar mi cocina completamente, incluyendo gabinetes, piso y plomería', 'Av. Principal 123, Colonia Centro', 'pendiente', 0),
((SELECT id FROM users WHERE email = 'usuario2@example.com'), 'Construcción de muro', 'Muro perimetral de 20 metros de largo por 2.5 metros de altura', 'Calle 45 #890, Residencial Las Palmas', 'cotizada', 45000),
((SELECT id FROM users WHERE email = 'usuario3@example.com'), 'Instalación eléctrica', 'Instalación eléctrica para casa nueva de 120m²', 'Av. Los Pinos 567, Fracc. Los Álamos', 'pagada', 28000),
((SELECT id FROM users WHERE email = 'usuario4@example.com'), 'Pintura exterior', 'Pintar fachada de casa de dos pisos', 'Blvd. Las Torres 782, Col. Moderna', 'pendiente', 0),
((SELECT id FROM users WHERE email = 'usuario5@example.com'), 'Impermeabilización', 'Impermeabilizar azotea de 80m²', 'Privada Magnolias 45, Jardines del Sur', 'rechazada', 12000),
((SELECT id FROM users WHERE email = 'usuario6@example.com'), 'Construcción de baño', 'Construcción de baño completo, incluye plomería y acabados', 'Calle Robles 123, Fracc. Las Arboledas', 'cotizada', 38000),
((SELECT id FROM users WHERE email = 'usuario7@example.com'), 'Instalación de piso', 'Instalación de 60m² de piso cerámico', 'Av. Central 456, Unidad Habitacional El Mirador', 'pagada', 15000),
((SELECT id FROM users WHERE email = 'usuario8@example.com'), 'Construcción de cochera', 'Cochera para dos autos con techo de lámina', 'Calle 67 #321, Col. Reforma', 'cancelada', 32000),
((SELECT id FROM users WHERE email = 'usuario9@example.com'), 'Remodelación sala', 'Remodelación completa de sala, incluye pisos y acabados', 'Blvd. Principal 890, Residencial El Bosque', 'pendiente', 0),
((SELECT id FROM users WHERE email = 'usuario10@example.com'), 'Instalación de ventanas', 'Instalación de 8 ventanas de aluminio', 'Av. Las Flores 234, Fracc. Jardines', 'cotizada', 24000),
((SELECT id FROM users WHERE email = 'usuario11@example.com'), 'Construcción de escalera', 'Escalera de concreto para segundo piso', 'Calle Industrial 567, Col. Trabajadores', 'pagada', 18000),
((SELECT id FROM users WHERE email = 'usuario12@example.com'), 'Instalación de cisterna', 'Cisterna de 5000 litros con sistema de bombeo', 'Privada Los Pinos 789, Residencial Las Cumbres', 'pendiente', 0),
((SELECT id FROM users WHERE email = 'usuario13@example.com'), 'Renovación de fachada', 'Renovación completa de fachada de casa estilo colonial', 'Av. Constitución 123, Centro Histórico', 'cotizada', 56000),
((SELECT id FROM users WHERE email = 'usuario14@example.com'), 'Construcción de pergolado', 'Pergolado de madera tratada para jardín', 'Calle Jacarandas 456, Fracc. Las Flores', 'pagada', 14500),
((SELECT id FROM users WHERE email = 'usuario15@example.com'), 'Instalación de drenaje', 'Sistema de drenaje para casa nueva', 'Blvd. Las Américas 789, Col. Moderna', 'rechazada', 22000),
((SELECT id FROM users WHERE email = 'usuario16@example.com'), 'Remodelación oficina', 'Remodelación de oficina de 50m²', 'Av. Reforma 234, Zona Financiera', 'pendiente', 0),
((SELECT id FROM users WHERE email = 'usuario17@example.com'), 'Construcción de barda', 'Barda perimetral de 30 metros lineales', 'Calle Nogal 567, Fracc. Árboles', 'cotizada', 35000),
((SELECT id FROM users WHERE email = 'usuario18@example.com'), 'Instalación de techo', 'Techo de lámina para área de 40m²', 'Privada Girasoles 890, Col. Jardín', 'pagada', 19500),
((SELECT id FROM users WHERE email = 'usuario19@example.com'), 'Construcción de alberca', 'Alberca de 6x3 metros con sistema de filtración', 'Av. Del Sol 123, Residencial Las Palmas', 'cotizada', 85000),
((SELECT id FROM users WHERE email = 'admin@gmail.com'), 'Proyecto de demostración', 'Proyecto completo para mostrar funcionalidades del sistema', 'Oficina Central, Av. Principal 1000', 'pendiente', 0);

-- Insertando materiales para las cotizaciones
-- Cotización 1 (pendiente)
INSERT INTO quotes_materials (quote_id, material_id, quantity, price) VALUES
((SELECT id FROM quotes WHERE title = 'Remodelación cocina'), (SELECT id FROM materials WHERE name = 'Cemento'), 10, 1800),
((SELECT id FROM quotes WHERE title = 'Remodelación cocina'), (SELECT id FROM materials WHERE name = 'Arena'), 5, 1250),
((SELECT id FROM quotes WHERE title = 'Remodelación cocina'), (SELECT id FROM materials WHERE name = 'Tubería PVC'), 15, 2250);

-- Cotización 2 (cotizada)
INSERT INTO quotes_materials (quote_id, material_id, quantity, price) VALUES
((SELECT id FROM quotes WHERE title = 'Construcción de muro'), (SELECT id FROM materials WHERE name = 'Cemento'), 25, 4500),
((SELECT id FROM quotes WHERE title = 'Construcción de muro'), (SELECT id FROM materials WHERE name = 'Arena'), 15, 3750),
((SELECT id FROM quotes WHERE title = 'Construcción de muro'), (SELECT id FROM materials WHERE name = 'Grava'), 10, 3000),
((SELECT id FROM quotes WHERE title = 'Construcción de muro'), (SELECT id FROM materials WHERE name = 'Varilla'), 30, 4500),
((SELECT id FROM quotes WHERE title = 'Construcción de muro'), (SELECT id FROM materials WHERE name = 'Ladrillo'), 1000, 9000);

-- Cotización 3 (pagada)
INSERT INTO quotes_materials (quote_id, material_id, quantity, price) VALUES
((SELECT id FROM quotes WHERE title = 'Instalación eléctrica'), (SELECT id FROM materials WHERE name = 'Cable eléctrico'), 500, 7500),
((SELECT id FROM quotes WHERE title = 'Instalación eléctrica'), (SELECT id FROM materials WHERE name = 'Tubería PVC'), 30, 4500);

-- Cotización 4 (pendiente)
INSERT INTO quotes_materials (quote_id, material_id, quantity, price) VALUES
((SELECT id FROM quotes WHERE title = 'Pintura exterior'), (SELECT id FROM materials WHERE name = 'Pintura'), 8, 3200);

-- Cotización 5 (rechazada)
INSERT INTO quotes_materials (quote_id, material_id, quantity, price) VALUES
((SELECT id FROM quotes WHERE title = 'Impermeabilización'), (SELECT id FROM materials WHERE name = 'Pintura'), 5, 2000);

-- Cotización 6 (cotizada)
INSERT INTO quotes_materials (quote_id, material_id, quantity, price) VALUES
((SELECT id FROM quotes WHERE title = 'Construcción de baño'), (SELECT id FROM materials WHERE name = 'Cemento'), 15, 2700),
((SELECT id FROM quotes WHERE title = 'Construcción de baño'), (SELECT id FROM materials WHERE name = 'Arena'), 8, 2000),
((SELECT id FROM quotes WHERE title = 'Construcción de baño'), (SELECT id FROM materials WHERE name = 'Tubería PVC'), 20, 3000),
((SELECT id FROM quotes WHERE title = 'Construcción de baño'), (SELECT id FROM materials WHERE name = 'Ladrillo'), 300, 2700);

-- Cotización 7 (pagada)
INSERT INTO quotes_materials (quote_id, material_id, quantity, price) VALUES
((SELECT id FROM quotes WHERE title = 'Instalación de piso'), (SELECT id FROM materials WHERE name = 'Cemento'), 8, 1440),
((SELECT id FROM quotes WHERE title = 'Instalación de piso'), (SELECT id FROM materials WHERE name = 'Arena'), 5, 1250);

-- Cotización 8 (cancelada)
INSERT INTO quotes_materials (quote_id, material_id, quantity, price) VALUES
((SELECT id FROM quotes WHERE title = 'Construcción de cochera'), (SELECT id FROM materials WHERE name = 'Cemento'), 20, 3600),
((SELECT id FROM quotes WHERE title = 'Construcción de cochera'), (SELECT id FROM materials WHERE name = 'Arena'), 10, 2500),
((SELECT id FROM quotes WHERE title = 'Construcción de cochera'), (SELECT id FROM materials WHERE name = 'Grava'), 8, 2400),
((SELECT id FROM quotes WHERE title = 'Construcción de cochera'), (SELECT id FROM materials WHERE name = 'Varilla'), 25, 3750),
((SELECT id FROM quotes WHERE title = 'Construcción de cochera'), (SELECT id FROM materials WHERE name = 'Lámina'), 15, 4500);

-- Cotización 9 (pendiente)
INSERT INTO quotes_materials (quote_id, material_id, quantity, price) VALUES
((SELECT id FROM quotes WHERE title = 'Remodelación sala'), (SELECT id FROM materials WHERE name = 'Cemento'), 12, 2160),
((SELECT id FROM quotes WHERE title = 'Remodelación sala'), (SELECT id FROM materials WHERE name = 'Arena'), 6, 1500),
((SELECT id FROM quotes WHERE title = 'Remodelación sala'), (SELECT id FROM materials WHERE name = 'Pintura'), 4, 1600);

-- Cotización 10 (cotizada)
INSERT INTO quotes_materials (quote_id, material_id, quantity, price) VALUES
((SELECT id FROM quotes WHERE title = 'Instalación de ventanas'), (SELECT id FROM materials WHERE name = 'Varilla'), 10, 1500);

-- Las demás cotizaciones (11-20)
INSERT INTO quotes_materials (quote_id, material_id, quantity, price) VALUES
((SELECT id FROM quotes WHERE title = 'Construcción de escalera'), (SELECT id FROM materials WHERE name = 'Cemento'), 18, 3240),
((SELECT id FROM quotes WHERE title = 'Construcción de escalera'), (SELECT id FROM materials WHERE name = 'Arena'), 9, 2250),
((SELECT id FROM quotes WHERE title = 'Construcción de escalera'), (SELECT id FROM materials WHERE name = 'Grava'), 6, 1800),
((SELECT id FROM quotes WHERE title = 'Construcción de escalera'), (SELECT id FROM materials WHERE name = 'Varilla'), 20, 3000),
((SELECT id FROM quotes WHERE title = 'Instalación de cisterna'), (SELECT id FROM materials WHERE name = 'Cemento'), 15, 2700),
((SELECT id FROM quotes WHERE title = 'Instalación de cisterna'), (SELECT id FROM materials WHERE name = 'Arena'), 8, 2000),
((SELECT id FROM quotes WHERE title = 'Instalación de cisterna'), (SELECT id FROM materials WHERE name = 'Grava'), 5, 1500),
((SELECT id FROM quotes WHERE title = 'Instalación de cisterna'), (SELECT id FROM materials WHERE name = 'Tubería PVC'), 10, 1500),
((SELECT id FROM quotes WHERE title = 'Renovación de fachada'), (SELECT id FROM materials WHERE name = 'Cemento'), 30, 5400),
((SELECT id FROM quotes WHERE title = 'Renovación de fachada'), (SELECT id FROM materials WHERE name = 'Arena'), 15, 3750),
((SELECT id FROM quotes WHERE title = 'Renovación de fachada'), (SELECT id FROM materials WHERE name = 'Pintura'), 12, 4800),
((SELECT id FROM quotes WHERE title = 'Construcción de pergolado'), (SELECT id FROM materials WHERE name = 'Madera'), 25, 7500),
((SELECT id FROM quotes WHERE title = 'Instalación de drenaje'), (SELECT id FROM materials WHERE name = 'Tubería PVC'), 30, 4500),
((SELECT id FROM quotes WHERE title = 'Instalación de drenaje'), (SELECT id FROM materials WHERE name = 'Cemento'), 10, 1800),
((SELECT id FROM quotes WHERE title = 'Instalación de drenaje'), (SELECT id FROM materials WHERE name = 'Arena'), 6, 1500),
((SELECT id FROM quotes WHERE title = 'Remodelación oficina'), (SELECT id FROM materials WHERE name = 'Pintura'), 6, 2400),
((SELECT id FROM quotes WHERE title = 'Remodelación oficina'), (SELECT id FROM materials WHERE name = 'Cable eléctrico'), 200, 3000),
((SELECT id FROM quotes WHERE title = 'Construcción de barda'), (SELECT id FROM materials WHERE name = 'Cemento'), 35, 6300),
((SELECT id FROM quotes WHERE title = 'Construcción de barda'), (SELECT id FROM materials WHERE name = 'Arena'), 18, 4500),
((SELECT id FROM quotes WHERE title = 'Construcción de barda'), (SELECT id FROM materials WHERE name = 'Grava'), 12, 3600),
((SELECT id FROM quotes WHERE title = 'Construcción de barda'), (SELECT id FROM materials WHERE name = 'Varilla'), 40, 6000),
((SELECT id FROM quotes WHERE title = 'Construcción de barda'), (SELECT id FROM materials WHERE name = 'Ladrillo'), 1500, 13500),
((SELECT id FROM quotes WHERE title = 'Instalación de techo'), (SELECT id FROM materials WHERE name = 'Lámina'), 20, 6000),
((SELECT id FROM quotes WHERE title = 'Instalación de techo'), (SELECT id FROM materials WHERE name = 'Madera'), 15, 4500),
((SELECT id FROM quotes WHERE title = 'Construcción de alberca'), (SELECT id FROM materials WHERE name = 'Cemento'), 50, 9000),
((SELECT id FROM quotes WHERE title = 'Construcción de alberca'), (SELECT id FROM materials WHERE name = 'Arena'), 25, 6250),
((SELECT id FROM quotes WHERE title = 'Construcción de alberca'), (SELECT id FROM materials WHERE name = 'Grava'), 20, 6000),
((SELECT id FROM quotes WHERE title = 'Construcción de alberca'), (SELECT id FROM materials WHERE name = 'Varilla'), 60, 9000),
((SELECT id FROM quotes WHERE title = 'Construcción de alberca'), (SELECT id FROM materials WHERE name = 'Tubería PVC'), 25, 3750),
((SELECT id FROM quotes WHERE title = 'Proyecto de demostración'), (SELECT id FROM materials WHERE name = 'Cemento'), 25, 4500),
((SELECT id FROM quotes WHERE title = 'Proyecto de demostración'), (SELECT id FROM materials WHERE name = 'Arena'), 15, 3750),
((SELECT id FROM quotes WHERE title = 'Proyecto de demostración'), (SELECT id FROM materials WHERE name = 'Grava'), 10, 3000),
((SELECT id FROM quotes WHERE title = 'Proyecto de demostración'), (SELECT id FROM materials WHERE name = 'Varilla'), 20, 3000),
((SELECT id FROM quotes WHERE title = 'Proyecto de demostración'), (SELECT id FROM materials WHERE name = 'Ladrillo'), 500, 4500),
((SELECT id FROM quotes WHERE title = 'Proyecto de demostración'), (SELECT id FROM materials WHERE name = 'Madera'), 10, 3000),
((SELECT id FROM quotes WHERE title = 'Proyecto de demostración'), (SELECT id FROM materials WHERE name = 'Pintura'), 8, 3200),
((SELECT id FROM quotes WHERE title = 'Proyecto de demostración'), (SELECT id FROM materials WHERE name = 'Tubería PVC'), 15, 2250),
((SELECT id FROM quotes WHERE title = 'Proyecto de demostración'), (SELECT id FROM materials WHERE name = 'Cable eléctrico'), 200, 3000),
((SELECT id FROM quotes WHERE title = 'Proyecto de demostración'), (SELECT id FROM materials WHERE name = 'Lámina'), 10, 3000);

-- Actualizar los precios totales de las cotizaciones con estado pagado, cotizado o rechazado
UPDATE quotes
SET price = (
    SELECT COALESCE(SUM(price), 0)
    FROM quotes_materials
    WHERE quotes_materials.quote_id = quotes.id AND quotes_materials.is_deleted = FALSE
)
WHERE status IN ('pagada', 'cotizada', 'rechazada', 'cancelada');