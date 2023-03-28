-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2023 at 10:35 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tienda`
--
CREATE DATABASE IF NOT EXISTS `tienda` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `tienda`;

-- --------------------------------------------------------

--
-- Table structure for table `articulos`
--

CREATE TABLE `articulos` (
  `idArticulos` int(11) NOT NULL,
  `nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `fecha` date NOT NULL,
  `precioVenta` float NOT NULL,
  `precioCompra` float NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `articulos`
--

INSERT INTO `articulos` (`idArticulos`, `nombre`, `descripcion`, `fecha`, `precioVenta`, `precioCompra`, `activo`) VALUES
(4, 'Clavos', 'Clavos Truper de acero', '2023-01-17', 7, 5, 1),
(7, 'Cinta', 'Cinta aislante premium', '2023-01-31', 25, 12, 1),
(8, 'Pinzas de punta', 'Pinzas Truper para electricista', '2023-01-31', 449, 342, 1),
(10, 'Tuercas', 'Tuercas de mariposa', '2023-02-07', 6, 3, 1),
(11, 'Destornillador', 'Destornillador phillips Truper', '2023-03-03', 200, 150, 1),
(12, 'Martillo', 'Martillo de acero Truper', '2023-03-27', 209, 152, 1);

-- --------------------------------------------------------

--
-- Table structure for table `compra`
--

CREATE TABLE `compra` (
  `idCompra` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `totalCompra` double NOT NULL,
  `claveProveedor` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `nombreProveedor` varchar(30) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `compra`
--

INSERT INTO `compra` (`idCompra`, `fecha`, `totalCompra`, `claveProveedor`, `nombreProveedor`) VALUES
(29, '2023-03-07', 74, '153284', 'Paquito Metales'),
(30, '2023-03-09', 180, '123', 'Truper'),
(31, '2023-03-27', 1520, '54862', 'Truper');

-- --------------------------------------------------------

--
-- Table structure for table `compraarticulos`
--

CREATE TABLE `compraarticulos` (
  `idCompra` int(11) NOT NULL,
  `idArticulos` int(11) NOT NULL,
  `cantidadCompra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `compraarticulos`
--

INSERT INTO `compraarticulos` (`idCompra`, `idArticulos`, `cantidadCompra`) VALUES
(29, 4, 10),
(29, 7, 2),
(30, 7, 0),
(31, 12, 0);

-- --------------------------------------------------------

--
-- Table structure for table `inventario`
--

CREATE TABLE `inventario` (
  `idInventario` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `idArticulos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `inventario`
--

INSERT INTO `inventario` (`idInventario`, `cantidad`, `idArticulos`) VALUES
(3, 300, 4),
(6, 317, 7),
(7, 23, 8),
(9, 1000, 10),
(10, 155, 11),
(11, 10, 12);

-- --------------------------------------------------------

--
-- Table structure for table `persona`
--

CREATE TABLE `persona` (
  `idPersona` int(11) NOT NULL,
  `nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `correo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `persona`
--

INSERT INTO `persona` (`idPersona`, `nombre`, `correo`, `activo`) VALUES
(1, 'Administrador', 'NA', 1),
(2, 'Armando', 'armando@gamer.com', 1),
(5, 'Roberto Jimenez', 'rob15@gmail.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `usuario` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `psw` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `tipoUsuario` tinyint(1) NOT NULL,
  `idPersona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `usuario`, `psw`, `activo`, `tipoUsuario`, `idPersona`) VALUES
(1, 'admin', 'admin', 1, 1, 1),
(5, 'robbie15', '12345', 1, 0, 5);

-- --------------------------------------------------------

--
-- Table structure for table `venta`
--

CREATE TABLE `venta` (
  `idVenta` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cantidadArticulos` int(11) NOT NULL,
  `costoVenta` float NOT NULL,
  `idArticulos` int(11) NOT NULL,
  `idPersona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`idArticulos`);

--
-- Indexes for table `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`idCompra`);

--
-- Indexes for table `compraarticulos`
--
ALTER TABLE `compraarticulos`
  ADD KEY `idArticulos` (`idArticulos`),
  ADD KEY `compraarticulos_ibfk_2` (`idCompra`);

--
-- Indexes for table `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`idInventario`),
  ADD KEY `idArticulos` (`idArticulos`);

--
-- Indexes for table `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`idPersona`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `idPersona` (`idPersona`);

--
-- Indexes for table `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`idVenta`),
  ADD KEY `idArticulo` (`idArticulos`),
  ADD KEY `idPersona` (`idPersona`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articulos`
--
ALTER TABLE `articulos`
  MODIFY `idArticulos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `compra`
--
ALTER TABLE `compra`
  MODIFY `idCompra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `inventario`
--
ALTER TABLE `inventario`
  MODIFY `idInventario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `persona`
--
ALTER TABLE `persona`
  MODIFY `idPersona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `venta`
--
ALTER TABLE `venta`
  MODIFY `idVenta` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `compraarticulos`
--
ALTER TABLE `compraarticulos`
  ADD CONSTRAINT `compraarticulos_ibfk_1` FOREIGN KEY (`idArticulos`) REFERENCES `articulos` (`idArticulos`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compraarticulos_ibfk_2` FOREIGN KEY (`idCompra`) REFERENCES `compra` (`idCompra`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`idArticulos`) REFERENCES `articulos` (`idArticulos`);

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`idPersona`);

--
-- Constraints for table `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`idArticulos`) REFERENCES `articulos` (`idArticulos`),
  ADD CONSTRAINT `venta_ibfk_2` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`idPersona`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
