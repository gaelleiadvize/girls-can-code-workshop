# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Hôte: 127.0.0.1 (MySQL 5.5.5-10.3.7-MariaDB-1:10.3.7+maria~jessie)
# Base de données: movies
# Temps de génération: 2018-06-26 09:30:34 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Affichage de la table favoris
# ------------------------------------------------------------

DROP TABLE IF EXISTS `favoris`;

CREATE TABLE `favoris` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `year` char(10) DEFAULT NULL,
  `director` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


# Affichage de la table movies
# ------------------------------------------------------------

DROP TABLE IF EXISTS `movies`;

CREATE TABLE `movies` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `year` char(10) DEFAULT NULL,
  `picture` varchar(512) DEFAULT NULL,
  `favorite` boolean DEFAULT FALSE ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `movies` (`id`, `title`, `year`, `picture`, `favorite`)
VALUES
  (1,'La grande vadrouille','1966','http://fr.web.img6.acsta.net/c_215_290/pictures/16/06/16/12/01/072037.jpg',false),
  (2,'Avengers','2012','http://fr.web.img2.acsta.net/r_1280_720/medias/nmedia/18/85/31/58/20042068.jpg',true);
