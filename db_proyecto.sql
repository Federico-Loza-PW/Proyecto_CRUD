-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-06-2025 a las 06:01:01
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `id_nombre` int(20) NOT NULL,
  `Nombre` varchar(20) NOT NULL,
  `imagen_marca` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`id_nombre`, `Nombre`, `imagen_marca`) VALUES
(1, 'Chevrolet', 'https://res.cloudinary.com/dq3ap2190/image/upload/'),
(2, 'Fiat', 'https://res.cloudinary.com/dq3ap2190/image/upload/'),
(3, 'Ford', 'https://res.cloudinary.com/dq3ap2190/image/upload/'),
(4, 'Peugeot', 'https://res.cloudinary.com/dq3ap2190/image/upload/'),
(5, 'Renault', 'https://res.cloudinary.com/dq3ap2190/image/upload/'),
(6, 'Volkswagen', 'https://res.cloudinary.com/dq3ap2190/image/upload/');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelo`
--

CREATE TABLE `modelo` (
  `id_modelo` int(20) NOT NULL,
  `modelo` varchar(20) NOT NULL,
  `id_marca` int(20) NOT NULL,
  `modelo_imagen` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modelo`
--

INSERT INTO `modelo` (`id_modelo`, `modelo`, `id_marca`, `modelo_imagen`) VALUES
(1, 'Corsa', 1, 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/corsa_xs3nyw'),
(2, 'Prisma', 2, 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/prisma_udqrkd'),
(3, 'Uno', 3, 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/uno_uhiutk'),
(4, 'Siena', 4, 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/siena_j8lzsz'),
(5, 'Falcon', 5, 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/falcon_tnhrsd'),
(6, 'Ecosport', 6, 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/ecosport_nlaimp'),
(7, '504', 7, 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/504_exu4jv'),
(8, '505', 8, 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/505_t96jiv'),
(9, 'R19', 9, 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/19_unl0tb'),
(10, 'Logan', 10, 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/logan_hvavbl'),
(11, 'Gol', 11, 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/gol_adz9ha'),
(12, 'Suran', 12, 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/suran_tat8tp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id` int(11) NOT NULL,
  `action` varchar(100) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`id`, `action`, `description`) VALUES
(1, 'product:view', 'Ver productos'),
(2, 'product:edit', 'Crear, editar y eliminar productos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `id_modelo` int(11) NOT NULL,
  `producto` varchar(20) NOT NULL,
  `imagen_producto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `id_modelo`, `producto`, `imagen_producto`) VALUES
(1, 1, 'Cable de bujia', 'https://res.cloudinary.com/dhcpoh2z4/image/upload/t_cable/sie_hdhpfq'),
(2, 1, 'Bujia de encendido', 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/bujias_lmkq7b'),
(3, 2, 'Cable de bujia', 'https://res.cloudinary.com/dhcpoh2z4/image/upload/t_cable/sie_hdhpfq'),
(4, 2, 'Bujia de encendido', 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/bujias_lmkq7b'),
(5, 3, 'Cable de bujia', 'https://res.cloudinary.com/dhcpoh2z4/image/upload/t_cable/sie_hdhpfq'),
(6, 3, 'Bujia de encendido', 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/bujias_lmkq7b'),
(7, 4, 'Cable de bujia', 'https://res.cloudinary.com/dhcpoh2z4/image/upload/t_cable/sie_hdhpfq'),
(8, 4, 'Bujia de encendido', 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/bujias_lmkq7b'),
(9, 5, 'Cable de bujia', 'https://res.cloudinary.com/dhcpoh2z4/image/upload/t_cable/sie_hdhpfq'),
(10, 5, 'Bujia de encendido', 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/bujias_lmkq7b'),
(11, 6, 'Cable de bujia', 'https://res.cloudinary.com/dhcpoh2z4/image/upload/t_cable/sie_hdhpfq'),
(12, 6, 'Bujia de encendido', 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/bujias_lmkq7b'),
(13, 7, 'Cable de bujia', 'https://res.cloudinary.com/dhcpoh2z4/image/upload/t_cable/sie_hdhpfq'),
(14, 7, 'Bujia de encendido', 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/bujias_lmkq7b'),
(15, 8, 'Cable de bujia', 'https://res.cloudinary.com/dhcpoh2z4/image/upload/t_cable/sie_hdhpfq'),
(16, 8, 'Bujia de encendido', 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/bujias_lmkq7b'),
(17, 9, 'Cable de bujia', 'https://res.cloudinary.com/dhcpoh2z4/image/upload/t_cable/sie_hdhpfq'),
(18, 9, 'Bujia de encendido', 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/bujias_lmkq7b'),
(19, 10, 'Cable de bujia', 'https://res.cloudinary.com/dhcpoh2z4/image/upload/t_cable/sie_hdhpfq'),
(20, 10, 'Bujia de encendido', 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/bujias_lmkq7b'),
(21, 11, 'Cable de bujia', 'https://res.cloudinary.com/dhcpoh2z4/image/upload/t_cable/sie_hdhpfq'),
(22, 11, 'Bujia de encendido', 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/bujias_lmkq7b'),
(23, 12, 'Cable de bujia', 'https://res.cloudinary.com/dhcpoh2z4/image/upload/t_cable/sie_hdhpfq'),
(24, 12, 'Bujia de encendido', 'https://res.cloudinary.com/dq3ap2190/image/upload/t_400/bujias_lmkq7b');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles_permisos`
--

CREATE TABLE `roles_permisos` (
  `role_id` int(11) NOT NULL,
  `permiso_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles_permisos`
--

INSERT INTO `roles_permisos` (`role_id`, `permiso_id`) VALUES
(1, 1),
(1, 2),
(2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stock_modelo_producto`
--

CREATE TABLE `stock_modelo_producto` (
  `id` int(11) NOT NULL,
  `id_modelo` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `stock_modelo_producto`
--

INSERT INTO `stock_modelo_producto` (`id`, `id_modelo`, `id_producto`, `precio`, `stock`) VALUES
(100, 1, 1, 25000.00, 20),
(101, 2, 1, 25000.00, 20),
(102, 3, 1, 25000.00, 20),
(103, 4, 1, 25000.00, 20),
(104, 5, 1, 25000.00, 20),
(105, 6, 1, 25000.00, 20),
(106, 7, 1, 25000.00, 20),
(107, 8, 1, 25000.00, 20),
(108, 9, 1, 25000.00, 20),
(109, 10, 1, 25000.00, 20),
(110, 11, 1, 25000.00, 20),
(111, 12, 1, 25000.00, 20),
(10055, 8, 2, 32000.00, 20),
(10056, 7, 2, 36000.00, 20),
(11035, 9, 2, 27000.00, 20),
(11200, 10, 2, 26000.00, 20),
(12025, 5, 2, 24000.00, 20),
(12103, 6, 2, 22000.00, 20),
(13050, 1, 2, 28000.00, 20),
(13052, 2, 2, 27000.00, 20),
(14100, 3, 2, 30000.00, 20),
(14116, 4, 2, 30000.00, 20),
(15130, 11, 2, 28000.00, 20),
(15131, 12, 2, 33000.00, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'usuario@correo.com', '$2b$10$JawSBrg9KTkyozv4rXL26OfnxnQDvGbxQq4ERL6ujEodQOe.cBvIy'),
(2, 'admin@correo.com', '$2b$10$WrDMHBPocj64vQvfbvAseeOtMtLBNugvi3m48AVQbaQimVDjLJGc6');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 2),
(2, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`id_nombre`),
  ADD UNIQUE KEY `id_marca` (`id_nombre`) USING BTREE;

--
-- Indices de la tabla `modelo`
--
ALTER TABLE `modelo`
  ADD PRIMARY KEY (`id_modelo`),
  ADD KEY `Clave foránea` (`id_marca`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `action` (`action`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_modelo` (`id_modelo`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `roles_permisos`
--
ALTER TABLE `roles_permisos`
  ADD PRIMARY KEY (`role_id`,`permiso_id`),
  ADD KEY `permiso_id` (`permiso_id`);

--
-- Indices de la tabla `stock_modelo_producto`
--
ALTER TABLE `stock_modelo_producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_modelo` (`id_modelo`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `id_nombre` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `modelo`
--
ALTER TABLE `modelo`
  MODIFY `id_modelo` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `stock_modelo_producto`
--
ALTER TABLE `stock_modelo_producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15132;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `modelo`
--
ALTER TABLE `modelo`
  ADD CONSTRAINT `Clave foránea` FOREIGN KEY (`id_marca`) REFERENCES `modelo` (`id_modelo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_modelo` FOREIGN KEY (`id_modelo`) REFERENCES `modelo` (`id_modelo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `roles_permisos`
--
ALTER TABLE `roles_permisos`
  ADD CONSTRAINT `roles_permisos_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `roles_permisos_ibfk_2` FOREIGN KEY (`permiso_id`) REFERENCES `permisos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `stock_modelo_producto`
--
ALTER TABLE `stock_modelo_producto`
  ADD CONSTRAINT `stock_modelo_producto_ibfk_1` FOREIGN KEY (`id_modelo`) REFERENCES `modelo` (`id_modelo`) ON DELETE CASCADE,
  ADD CONSTRAINT `stock_modelo_producto_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
