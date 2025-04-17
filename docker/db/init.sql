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