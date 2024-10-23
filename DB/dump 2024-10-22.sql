-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: airline_reservation_db
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `airline_reservation_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `airline_reservation_db` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `airline_reservation_db`;

--
-- Table structure for table `airplane`
--

DROP TABLE IF EXISTS `airplane`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airplane` (
  `tail_number` varchar(6) NOT NULL,
  `status` enum('available','pending') NOT NULL DEFAULT 'available',
  `model_id` int NOT NULL,
  PRIMARY KEY (`tail_number`),
  KEY `fk_airplane_airplane_model1_idx` (`model_id`),
  CONSTRAINT `fk_airplane_airplane_model1` FOREIGN KEY (`model_id`) REFERENCES `airplane_model` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airplane`
--

LOCK TABLES `airplane` WRITE;
/*!40000 ALTER TABLE `airplane` DISABLE KEYS */;
INSERT INTO `airplane` VALUES ('PK-AAA','available',3),('PK-BAA','available',1),('PK-BAB','available',1),('PK-BAC','available',1),('PK-BBA','available',2),('PK-BBB','available',2),('PK-BBC','available',2),('PK-BBD','available',2);
/*!40000 ALTER TABLE `airplane` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airplane_model`
--

DROP TABLE IF EXISTS `airplane_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airplane_model` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `capacity` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airplane_model`
--

LOCK TABLES `airplane_model` WRITE;
/*!40000 ALTER TABLE `airplane_model` DISABLE KEYS */;
INSERT INTO `airplane_model` VALUES (1,'Boeing 737-800',160),(2,'Boeing 757-200',180),(3,'Airbus A380',489);
/*!40000 ALTER TABLE `airplane_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airport`
--

DROP TABLE IF EXISTS `airport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airport` (
  `code` varchar(3) NOT NULL,
  `name` varchar(60) NOT NULL,
  `city_id` int NOT NULL,
  PRIMARY KEY (`code`),
  KEY `fk_airport_location1_idx` (`city_id`),
  CONSTRAINT `fk_airport_location1` FOREIGN KEY (`city_id`) REFERENCES `location` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airport`
--

LOCK TABLES `airport` WRITE;
/*!40000 ALTER TABLE `airport` DISABLE KEYS */;
INSERT INTO `airport` VALUES ('BKK','Suvarnabhumi Airport',12),('BOM','Chhatrapati Shivaji Maharaj International Airport',9),('CGK','Soekarno-Hatta International Airport',4),('CMB','Bandaranaike International Airport',1),('DEL','Indira Gandhi International Airport',8),('DMK','Don Mueang International Airport',12),('DPS','Ngurah Rai International Airport',6),('HRI','Mattala Rajapaksa International Airport',3),('MAA','Chennai International Airport',10),('SIN','Changi Airport',15);
/*!40000 ALTER TABLE `airport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `registered_user_id` int DEFAULT NULL,
  `date` datetime NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `schedule_id` int NOT NULL,
  `seat_id` int NOT NULL,
  `passenger_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_booking_user1_idx` (`registered_user_id`),
  KEY `fk_booking_schedule1_idx` (`schedule_id`),
  KEY `fk_booking_seat1_idx` (`seat_id`),
  KEY `fk_booking_passenger1_idx` (`passenger_id`),
  CONSTRAINT `fk_booking_passenger1` FOREIGN KEY (`passenger_id`) REFERENCES `passenger` (`id`),
  CONSTRAINT `fk_booking_schedule1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`),
  CONSTRAINT `fk_booking_seat1` FOREIGN KEY (`seat_id`) REFERENCES `seat` (`id`),
  CONSTRAINT `fk_booking_user1` FOREIGN KEY (`registered_user_id`) REFERENCES `registered_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (15,NULL,'2024-10-15 10:30:00',99821175,3,1313,14),(16,2,'2024-10-15 12:00:00',75939800,4,100,7),(17,3,'2024-10-15 14:15:00',62928150,5,173,8),(18,NULL,'2024-10-16 16:00:00',99821175,3,1314,18),(19,NULL,'2024-10-16 18:45:00',115939800,4,177,17),(20,NULL,'2024-10-16 20:30:00',62928150,5,69,16),(21,2,'2024-10-16 09:15:00',99821175,3,1315,7),(22,3,'2024-10-17 11:30:00',75939800,4,88,8),(23,4,'2024-10-17 13:45:00',62928150,5,93,9),(24,2,'2024-10-17 15:00:00',85225250,6,100,7);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `code` varchar(3) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES ('IDN','Indonesia'),('IND','India'),('LKA','Sri Lanka'),('SGP','Singapore'),('THA','Thailand'),('USA','United States of America');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_location_location1_idx` (`parent_id`),
  CONSTRAINT `fk_location_location1` FOREIGN KEY (`parent_id`) REFERENCES `location` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Colombo',14),(2,'Sri Lanka',NULL),(3,'Hambanthota',2),(4,'Jakarta',5),(5,'Indonesia',NULL),(6,'Denpasar',5),(7,'India',NULL),(8,'Delhi',7),(9,'Mumbai',7),(10,'Chennai',7),(11,'Thailand',NULL),(12,'Bangkok',11),(13,'Singapore',NULL),(14,'Western Province',2),(15,'Changi',13);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `locationhierarchy`
--

DROP TABLE IF EXISTS `locationhierarchy`;
/*!50001 DROP VIEW IF EXISTS `locationhierarchy`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `locationhierarchy` AS SELECT 
 1 AS `code`,
 1 AS `Airport_Name`,
 1 AS `Full_Hierarchy`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `loyalty_type`
--

DROP TABLE IF EXISTS `loyalty_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loyalty_type` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `discount` double NOT NULL COMMENT 'Can write a trigger to check if number is between 0 and 100 when inserting',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loyalty_type`
--

LOCK TABLES `loyalty_type` WRITE;
/*!40000 ALTER TABLE `loyalty_type` DISABLE KEYS */;
INSERT INTO `loyalty_type` VALUES (1,'frequent',5),(2,'gold',9);
/*!40000 ALTER TABLE `loyalty_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passenger`
--

DROP TABLE IF EXISTS `passenger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passenger` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `age` int NOT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `passport_number` varchar(15) NOT NULL,
  `NIC` varchar(45) DEFAULT NULL,
  `country_code` varchar(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NIC_UNIQUE` (`NIC`),
  KEY `fk_passenger_country1_idx` (`country_code`),
  CONSTRAINT `fk_passenger_country1` FOREIGN KEY (`country_code`) REFERENCES `country` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passenger`
--

LOCK TABLES `passenger` WRITE;
/*!40000 ALTER TABLE `passenger` DISABLE KEYS */;
INSERT INTO `passenger` VALUES (7,'John Doe',30,'male','123456789','200212345672','IDN'),(8,'Jane Smith',28,'female','987654321','202276543212','IND'),(9,'Ali Khan',35,'male','123987654','220298765455','IND'),(10,'Maria Garcia',26,'female','456123789','199923456782','LKA'),(11,'Chen Wei',15,'other','321456987',NULL,'SGP'),(12,'Sara Johnson',32,'female','654321987','123454321672','THA'),(13,'Raj Patel',17,'male','789456123',NULL,'IND'),(14,'Fatima Al-Farsi',25,'female','135792468','199713579242','IDN'),(15,'David Brown',45,'male','246801357','292224680132','LKA'),(16,'Elena Petrova',16,'female','369258147',NULL,'SGP'),(17,'Carlos Mendez',31,'male','258147369','222225814732','IND'),(18,'Linda Nguyen',27,'female','147258369','321214725832','THA');
/*!40000 ALTER TABLE `passenger` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `passenger_BEFORE_INSERT` BEFORE INSERT ON `passenger` FOR EACH ROW BEGIN
	IF NEW.age <= 0 OR NEW.age >= 150 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid age: must be greater than 0 and less than 150';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `pending_booking`
--

DROP TABLE IF EXISTS `pending_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pending_booking` (
  `schedule_id` int NOT NULL,
  `seat_id` int NOT NULL,
  `registered_user_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`schedule_id`,`seat_id`),
  KEY `fk_pending_bookings_schedule1_idx` (`schedule_id`),
  KEY `fk_pending_bookings_user1_idx` (`registered_user_id`),
  KEY `fk_pending_bookings_seat1_idx` (`seat_id`),
  CONSTRAINT `fk_pending_bookings_schedule1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`),
  CONSTRAINT `fk_pending_bookings_seat1` FOREIGN KEY (`seat_id`) REFERENCES `seat` (`id`),
  CONSTRAINT `fk_pending_bookings_user1` FOREIGN KEY (`registered_user_id`) REFERENCES `registered_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pending_booking`
--

LOCK TABLES `pending_booking` WRITE;
/*!40000 ALTER TABLE `pending_booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `pending_booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registered_user`
--

DROP TABLE IF EXISTS `registered_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registered_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(45) NOT NULL,
  `loyalty_type_id` int NOT NULL,
  `role_id` int NOT NULL,
  `passenger_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_user_loyalty_type1_idx` (`loyalty_type_id`),
  KEY `fk_user_role1_idx` (`role_id`),
  KEY `fk_registered_user_passenger1_idx` (`passenger_id`),
  CONSTRAINT `fk_registered_user_passenger1` FOREIGN KEY (`passenger_id`) REFERENCES `passenger` (`id`),
  CONSTRAINT `fk_user_loyalty_type1` FOREIGN KEY (`loyalty_type_id`) REFERENCES `loyalty_type` (`id`),
  CONSTRAINT `fk_user_role1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registered_user`
--

LOCK TABLES `registered_user` WRITE;
/*!40000 ALTER TABLE `registered_user` DISABLE KEYS */;
INSERT INTO `registered_user` VALUES (2,'johndoe','$2b$10$7ORfyX5Fzsrx81Uofv0W5uN0DMOiqziHD1onOWcYPYzdKqZBDbZxS','john.doe@gmail.com',1,1,7),(3,'janesmith12','$2b$10$w7wl7txG4bS/2RjEm9e/Remi3WZuLyfSN95hDhbv3iR5h0iBlJaea','jane.smith28@icloud.com',1,1,8),(4,'ali.khan35','$2b$10$t0GztPnS3or753eM9aanXudTxpXsrl7XUfQo1qT3yMjYuuakihrCq','ali.khan35@example.com',1,1,9),(5,'maria.garcia26','$2b$10$LQmy3eZeRu6hCxKY0XmEt.LvBRXv5vihhnRKDzFX77zrIs.ZKJLl6','maria.garcia26@yahoo.com',1,1,10),(6,'himath','$2b$10$AmDxRc7OmMh.q69oa0lET.z1SVghB.VMKoAjcMwv8Yn7wPb3aUKpS','himathsamarakoon@gmail.com',1,1,NULL),(7,'test1','$2b$10$QJQnzgPcGkkCshjp7tUgUu4nBw86ByIXEJ3tPj9OPPdtw0F3L6RWa','test@gmail2.com',1,1,NULL);
/*!40000 ALTER TABLE `registered_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL,
  `role` varchar(10) NOT NULL,
  `perm_level` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'guest',0),(2,'admin',1);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route` (
  `flight_code` varchar(10) NOT NULL,
  `departure_time` time NOT NULL,
  `duration` time NOT NULL,
  `distance` int NOT NULL COMMENT 'Messured in km',
  `departure` varchar(3) NOT NULL,
  `arrival` varchar(3) NOT NULL,
  PRIMARY KEY (`flight_code`),
  KEY `fk_route_airport1_idx` (`departure`),
  KEY `fk_route_airport2_idx` (`arrival`),
  CONSTRAINT `fk_route_airport1` FOREIGN KEY (`departure`) REFERENCES `airport` (`code`),
  CONSTRAINT `fk_route_airport2` FOREIGN KEY (`arrival`) REFERENCES `airport` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES ('VB3811','08:00:00','07:00:00',4647,'CGK','BOM'),('VB3812','14:00:00','08:00:00',5574,'BOM','DPS'),('VB3813','19:00:00','08:30:00',5822,'DPS','DEL'),('VB7371','08:00:00','03:30:00',2392,'BKK','CMB'),('VB7372','15:30:00','02:00:00',1526,'CMB','BOM'),('VB7373','19:00:00','04:00:00',3010,'BOM','DMK'),('VB7374','10:00:00','01:00:00',883,'SIN','CGK'),('VB7375','13:00:00','02:40:00',2298,'CGK','BKK'),('VB7376','18:00:00','02:40:00',2300,'BKK','HRI'),('VB7377','05:00:00','01:20:00',983,'DPS','CGK'),('VB7378','09:00:00','02:40:00',2326,'CGK','DMK'),('VB7379','15:30:00','02:40:00',2212,'DMK','MAA'),('VB7571','07:00:00','01:30:00',1446,'DMK','SIN'),('VB7572','11:30:00','03:00:00',2926,'SIN','MAA'),('VB7573','17:00:00','04:00:00',3617,'MAA','CGK'),('VB7574','10:00:00','02:00:00',1761,'MAA','DEL'),('VB7575','14:00:00','02:30:00',2396,'DEL','CMB'),('VB7576','19:30:00','04:30:00',4293,'CMB','DPS'),('VB7577','09:00:00','04:40:00',4990,'DEL','CGK'),('VB7578','15:00:00','03:40:00',3617,'CGK','MAA'),('VB7579','21:00:00','02:20:00',1967,'MAA','SIN'),('VB7580','04:00:00','02:30:00',2396,'CMB','DEL'),('VB7581','10:00:00','06:00:00',5822,'DEL','DPS'),('VB7582','18:00:00','03:30:00',2953,'DPS','BKK');
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `delay` time NOT NULL DEFAULT '00:00:00',
  `date` date NOT NULL,
  `airplane_number` varchar(6) NOT NULL,
  `flight_code` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_schedule_airplane1_idx` (`airplane_number`),
  KEY `fk_schedule_route1_idx` (`flight_code`),
  CONSTRAINT `fk_schedule_airplane1` FOREIGN KEY (`airplane_number`) REFERENCES `airplane` (`tail_number`),
  CONSTRAINT `fk_schedule_route1` FOREIGN KEY (`flight_code`) REFERENCES `route` (`flight_code`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (3,'00:00:00','2024-10-15','PK-AAA','VB3811'),(4,'02:00:00','2024-10-15','PK-BAA','VB7371'),(5,'00:00:00','2024-10-15','PK-BAA','VB7372'),(6,'01:00:00','2024-10-15','PK-BAA','VB7373'),(7,'00:45:00','2024-10-15','PK-BBA','VB7571'),(8,'00:00:00','2024-10-15','PK-BBA','VB7572'),(9,'01:30:00','2024-10-15','PK-BBA','VB7573');
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seat_number` varchar(10) NOT NULL,
  `seat_class_id` int NOT NULL,
  `airplane_number` varchar(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_seat_seat_class_idx` (`seat_class_id`),
  KEY `fk_seat_airplane1_idx` (`airplane_number`),
  CONSTRAINT `fk_seat_airplane1` FOREIGN KEY (`airplane_number`) REFERENCES `airplane` (`tail_number`),
  CONSTRAINT `fk_seat_seat_class` FOREIGN KEY (`seat_class_id`) REFERENCES `seat_class` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1795 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (65,'10A',6,'PK-BAA'),(66,'11A',6,'PK-BAA'),(67,'12A',6,'PK-BAA'),(68,'13A',6,'PK-BAA'),(69,'14A',6,'PK-BAA'),(70,'15A',6,'PK-BAA'),(71,'10B',6,'PK-BAA'),(72,'11B',6,'PK-BAA'),(73,'12B',6,'PK-BAA'),(74,'13B',6,'PK-BAA'),(75,'14B',6,'PK-BAA'),(76,'15B',6,'PK-BAA'),(77,'10C',6,'PK-BAA'),(78,'11C',6,'PK-BAA'),(79,'12C',6,'PK-BAA'),(80,'13C',6,'PK-BAA'),(81,'14C',6,'PK-BAA'),(82,'15C',6,'PK-BAA'),(83,'10D',6,'PK-BAA'),(84,'11D',6,'PK-BAA'),(85,'12D',6,'PK-BAA'),(86,'13D',6,'PK-BAA'),(87,'14D',6,'PK-BAA'),(88,'15D',6,'PK-BAA'),(89,'10E',6,'PK-BAA'),(90,'11E',6,'PK-BAA'),(91,'12E',6,'PK-BAA'),(92,'13E',6,'PK-BAA'),(93,'14E',6,'PK-BAA'),(94,'15E',6,'PK-BAA'),(95,'10F',6,'PK-BAA'),(96,'11F',6,'PK-BAA'),(97,'12F',6,'PK-BAA'),(98,'13F',6,'PK-BAA'),(99,'14F',6,'PK-BAA'),(100,'15F',6,'PK-BAA'),(101,'10A',6,'PK-BAB'),(102,'11A',6,'PK-BAB'),(103,'12A',6,'PK-BAB'),(104,'13A',6,'PK-BAB'),(105,'14A',6,'PK-BAB'),(106,'15A',6,'PK-BAB'),(107,'10B',6,'PK-BAB'),(108,'11B',6,'PK-BAB'),(109,'12B',6,'PK-BAB'),(110,'13B',6,'PK-BAB'),(111,'14B',6,'PK-BAB'),(112,'15B',6,'PK-BAB'),(113,'10C',6,'PK-BAB'),(114,'11C',6,'PK-BAB'),(115,'12C',6,'PK-BAB'),(116,'13C',6,'PK-BAB'),(117,'14C',6,'PK-BAB'),(118,'15C',6,'PK-BAB'),(119,'10D',6,'PK-BAB'),(120,'11D',6,'PK-BAB'),(121,'12D',6,'PK-BAB'),(122,'13D',6,'PK-BAB'),(123,'14D',6,'PK-BAB'),(124,'15D',6,'PK-BAB'),(125,'10E',6,'PK-BAB'),(126,'11E',6,'PK-BAB'),(127,'12E',6,'PK-BAB'),(128,'13E',6,'PK-BAB'),(129,'14E',6,'PK-BAB'),(130,'15E',6,'PK-BAB'),(131,'10F',6,'PK-BAB'),(132,'11F',6,'PK-BAB'),(133,'12F',6,'PK-BAB'),(134,'13F',6,'PK-BAB'),(135,'14F',6,'PK-BAB'),(136,'15F',6,'PK-BAB'),(137,'10A',6,'PK-BAC'),(138,'11A',6,'PK-BAC'),(139,'12A',6,'PK-BAC'),(140,'13A',6,'PK-BAC'),(141,'14A',6,'PK-BAC'),(142,'15A',6,'PK-BAC'),(143,'10B',6,'PK-BAC'),(144,'11B',6,'PK-BAC'),(145,'12B',6,'PK-BAC'),(146,'13B',6,'PK-BAC'),(147,'14B',6,'PK-BAC'),(148,'15B',6,'PK-BAC'),(149,'10C',6,'PK-BAC'),(150,'11C',6,'PK-BAC'),(151,'12C',6,'PK-BAC'),(152,'13C',6,'PK-BAC'),(153,'14C',6,'PK-BAC'),(154,'15C',6,'PK-BAC'),(155,'10D',6,'PK-BAC'),(156,'11D',6,'PK-BAC'),(157,'12D',6,'PK-BAC'),(158,'13D',6,'PK-BAC'),(159,'14D',6,'PK-BAC'),(160,'15D',6,'PK-BAC'),(161,'10E',6,'PK-BAC'),(162,'11E',6,'PK-BAC'),(163,'12E',6,'PK-BAC'),(164,'13E',6,'PK-BAC'),(165,'14E',6,'PK-BAC'),(166,'15E',6,'PK-BAC'),(167,'10F',6,'PK-BAC'),(168,'11F',6,'PK-BAC'),(169,'12F',6,'PK-BAC'),(170,'13F',6,'PK-BAC'),(171,'14F',6,'PK-BAC'),(172,'15F',6,'PK-BAC'),(173,'1A',7,'PK-BAA'),(174,'2A',7,'PK-BAA'),(175,'3A',7,'PK-BAA'),(176,'4A',7,'PK-BAA'),(177,'1B',7,'PK-BAA'),(178,'2B',7,'PK-BAA'),(179,'3B',7,'PK-BAA'),(180,'4B',7,'PK-BAA'),(181,'1C',7,'PK-BAA'),(182,'2C',7,'PK-BAA'),(183,'3C',7,'PK-BAA'),(184,'4C',7,'PK-BAA'),(185,'1D',7,'PK-BAA'),(186,'2D',7,'PK-BAA'),(187,'3D',7,'PK-BAA'),(188,'4D',7,'PK-BAA'),(189,'1A',7,'PK-BAB'),(190,'2A',7,'PK-BAB'),(191,'3A',7,'PK-BAB'),(192,'4A',7,'PK-BAB'),(193,'1B',7,'PK-BAB'),(194,'2B',7,'PK-BAB'),(195,'3B',7,'PK-BAB'),(196,'4B',7,'PK-BAB'),(197,'1C',7,'PK-BAB'),(198,'2C',7,'PK-BAB'),(199,'3C',7,'PK-BAB'),(200,'4C',7,'PK-BAB'),(201,'1D',7,'PK-BAB'),(202,'2D',7,'PK-BAB'),(203,'3D',7,'PK-BAB'),(204,'4D',7,'PK-BAB'),(205,'1A',7,'PK-BAC'),(206,'2A',7,'PK-BAC'),(207,'3A',7,'PK-BAC'),(208,'4A',7,'PK-BAC'),(209,'1B',7,'PK-BAC'),(210,'2B',7,'PK-BAC'),(211,'3B',7,'PK-BAC'),(212,'4B',7,'PK-BAC'),(213,'1C',7,'PK-BAC'),(214,'2C',7,'PK-BAC'),(215,'3C',7,'PK-BAC'),(216,'4C',7,'PK-BAC'),(217,'1D',7,'PK-BAC'),(218,'2D',7,'PK-BAC'),(219,'3D',7,'PK-BAC'),(220,'4D',7,'PK-BAC'),(221,'16A',5,'PK-BAA'),(222,'17A',5,'PK-BAA'),(223,'18A',5,'PK-BAA'),(224,'19A',5,'PK-BAA'),(225,'20A',5,'PK-BAA'),(226,'21A',5,'PK-BAA'),(227,'22A',5,'PK-BAA'),(228,'23A',5,'PK-BAA'),(229,'24A',5,'PK-BAA'),(230,'25A',5,'PK-BAA'),(231,'26A',5,'PK-BAA'),(232,'27A',5,'PK-BAA'),(233,'28A',5,'PK-BAA'),(234,'29A',5,'PK-BAA'),(235,'30A',5,'PK-BAA'),(236,'31A',5,'PK-BAA'),(237,'32A',5,'PK-BAA'),(238,'33A',5,'PK-BAA'),(239,'16B',5,'PK-BAA'),(240,'17B',5,'PK-BAA'),(241,'18B',5,'PK-BAA'),(242,'19B',5,'PK-BAA'),(243,'20B',5,'PK-BAA'),(244,'21B',5,'PK-BAA'),(245,'22B',5,'PK-BAA'),(246,'23B',5,'PK-BAA'),(247,'24B',5,'PK-BAA'),(248,'25B',5,'PK-BAA'),(249,'26B',5,'PK-BAA'),(250,'27B',5,'PK-BAA'),(251,'28B',5,'PK-BAA'),(252,'29B',5,'PK-BAA'),(253,'30B',5,'PK-BAA'),(254,'31B',5,'PK-BAA'),(255,'32B',5,'PK-BAA'),(256,'33B',5,'PK-BAA'),(257,'16C',5,'PK-BAA'),(258,'17C',5,'PK-BAA'),(259,'18C',5,'PK-BAA'),(260,'19C',5,'PK-BAA'),(261,'20C',5,'PK-BAA'),(262,'21C',5,'PK-BAA'),(263,'22C',5,'PK-BAA'),(264,'23C',5,'PK-BAA'),(265,'24C',5,'PK-BAA'),(266,'25C',5,'PK-BAA'),(267,'26C',5,'PK-BAA'),(268,'27C',5,'PK-BAA'),(269,'28C',5,'PK-BAA'),(270,'29C',5,'PK-BAA'),(271,'30C',5,'PK-BAA'),(272,'31C',5,'PK-BAA'),(273,'32C',5,'PK-BAA'),(274,'33C',5,'PK-BAA'),(275,'16D',5,'PK-BAA'),(276,'17D',5,'PK-BAA'),(277,'18D',5,'PK-BAA'),(278,'19D',5,'PK-BAA'),(279,'20D',5,'PK-BAA'),(280,'21D',5,'PK-BAA'),(281,'22D',5,'PK-BAA'),(282,'23D',5,'PK-BAA'),(283,'24D',5,'PK-BAA'),(284,'25D',5,'PK-BAA'),(285,'26D',5,'PK-BAA'),(286,'27D',5,'PK-BAA'),(287,'28D',5,'PK-BAA'),(288,'29D',5,'PK-BAA'),(289,'30D',5,'PK-BAA'),(290,'31D',5,'PK-BAA'),(291,'32D',5,'PK-BAA'),(292,'33D',5,'PK-BAA'),(293,'16E',5,'PK-BAA'),(294,'17E',5,'PK-BAA'),(295,'18E',5,'PK-BAA'),(296,'19E',5,'PK-BAA'),(297,'20E',5,'PK-BAA'),(298,'21E',5,'PK-BAA'),(299,'22E',5,'PK-BAA'),(300,'23E',5,'PK-BAA'),(301,'24E',5,'PK-BAA'),(302,'25E',5,'PK-BAA'),(303,'26E',5,'PK-BAA'),(304,'27E',5,'PK-BAA'),(305,'28E',5,'PK-BAA'),(306,'29E',5,'PK-BAA'),(307,'30E',5,'PK-BAA'),(308,'31E',5,'PK-BAA'),(309,'32E',5,'PK-BAA'),(310,'33E',5,'PK-BAA'),(311,'16F',5,'PK-BAA'),(312,'17F',5,'PK-BAA'),(313,'18F',5,'PK-BAA'),(314,'19F',5,'PK-BAA'),(315,'20F',5,'PK-BAA'),(316,'21F',5,'PK-BAA'),(317,'22F',5,'PK-BAA'),(318,'23F',5,'PK-BAA'),(319,'24F',5,'PK-BAA'),(320,'25F',5,'PK-BAA'),(321,'26F',5,'PK-BAA'),(322,'27F',5,'PK-BAA'),(323,'28F',5,'PK-BAA'),(324,'29F',5,'PK-BAA'),(325,'30F',5,'PK-BAA'),(326,'31F',5,'PK-BAA'),(327,'32F',5,'PK-BAA'),(328,'33F',5,'PK-BAA'),(329,'16A',5,'PK-BAB'),(330,'17A',5,'PK-BAB'),(331,'18A',5,'PK-BAB'),(332,'19A',5,'PK-BAB'),(333,'20A',5,'PK-BAB'),(334,'21A',5,'PK-BAB'),(335,'22A',5,'PK-BAB'),(336,'23A',5,'PK-BAB'),(337,'24A',5,'PK-BAB'),(338,'25A',5,'PK-BAB'),(339,'26A',5,'PK-BAB'),(340,'27A',5,'PK-BAB'),(341,'28A',5,'PK-BAB'),(342,'29A',5,'PK-BAB'),(343,'30A',5,'PK-BAB'),(344,'31A',5,'PK-BAB'),(345,'32A',5,'PK-BAB'),(346,'33A',5,'PK-BAB'),(347,'16B',5,'PK-BAB'),(348,'17B',5,'PK-BAB'),(349,'18B',5,'PK-BAB'),(350,'19B',5,'PK-BAB'),(351,'20B',5,'PK-BAB'),(352,'21B',5,'PK-BAB'),(353,'22B',5,'PK-BAB'),(354,'23B',5,'PK-BAB'),(355,'24B',5,'PK-BAB'),(356,'25B',5,'PK-BAB'),(357,'26B',5,'PK-BAB'),(358,'27B',5,'PK-BAB'),(359,'28B',5,'PK-BAB'),(360,'29B',5,'PK-BAB'),(361,'30B',5,'PK-BAB'),(362,'31B',5,'PK-BAB'),(363,'32B',5,'PK-BAB'),(364,'33B',5,'PK-BAB'),(365,'16C',5,'PK-BAB'),(366,'17C',5,'PK-BAB'),(367,'18C',5,'PK-BAB'),(368,'19C',5,'PK-BAB'),(369,'20C',5,'PK-BAB'),(370,'21C',5,'PK-BAB'),(371,'22C',5,'PK-BAB'),(372,'23C',5,'PK-BAB'),(373,'24C',5,'PK-BAB'),(374,'25C',5,'PK-BAB'),(375,'26C',5,'PK-BAB'),(376,'27C',5,'PK-BAB'),(377,'28C',5,'PK-BAB'),(378,'29C',5,'PK-BAB'),(379,'30C',5,'PK-BAB'),(380,'31C',5,'PK-BAB'),(381,'32C',5,'PK-BAB'),(382,'33C',5,'PK-BAB'),(383,'16D',5,'PK-BAB'),(384,'17D',5,'PK-BAB'),(385,'18D',5,'PK-BAB'),(386,'19D',5,'PK-BAB'),(387,'20D',5,'PK-BAB'),(388,'21D',5,'PK-BAB'),(389,'22D',5,'PK-BAB'),(390,'23D',5,'PK-BAB'),(391,'24D',5,'PK-BAB'),(392,'25D',5,'PK-BAB'),(393,'26D',5,'PK-BAB'),(394,'27D',5,'PK-BAB'),(395,'28D',5,'PK-BAB'),(396,'29D',5,'PK-BAB'),(397,'30D',5,'PK-BAB'),(398,'31D',5,'PK-BAB'),(399,'32D',5,'PK-BAB'),(400,'33D',5,'PK-BAB'),(401,'16E',5,'PK-BAB'),(402,'17E',5,'PK-BAB'),(403,'18E',5,'PK-BAB'),(404,'19E',5,'PK-BAB'),(405,'20E',5,'PK-BAB'),(406,'21E',5,'PK-BAB'),(407,'22E',5,'PK-BAB'),(408,'23E',5,'PK-BAB'),(409,'24E',5,'PK-BAB'),(410,'25E',5,'PK-BAB'),(411,'26E',5,'PK-BAB'),(412,'27E',5,'PK-BAB'),(413,'28E',5,'PK-BAB'),(414,'29E',5,'PK-BAB'),(415,'30E',5,'PK-BAB'),(416,'31E',5,'PK-BAB'),(417,'32E',5,'PK-BAB'),(418,'33E',5,'PK-BAB'),(419,'16F',5,'PK-BAB'),(420,'17F',5,'PK-BAB'),(421,'18F',5,'PK-BAB'),(422,'19F',5,'PK-BAB'),(423,'20F',5,'PK-BAB'),(424,'21F',5,'PK-BAB'),(425,'22F',5,'PK-BAB'),(426,'23F',5,'PK-BAB'),(427,'24F',5,'PK-BAB'),(428,'25F',5,'PK-BAB'),(429,'26F',5,'PK-BAB'),(430,'27F',5,'PK-BAB'),(431,'28F',5,'PK-BAB'),(432,'29F',5,'PK-BAB'),(433,'30F',5,'PK-BAB'),(434,'31F',5,'PK-BAB'),(435,'32F',5,'PK-BAB'),(436,'33F',5,'PK-BAB'),(437,'16A',5,'PK-BAC'),(438,'17A',5,'PK-BAC'),(439,'18A',5,'PK-BAC'),(440,'19A',5,'PK-BAC'),(441,'20A',5,'PK-BAC'),(442,'21A',5,'PK-BAC'),(443,'22A',5,'PK-BAC'),(444,'23A',5,'PK-BAC'),(445,'24A',5,'PK-BAC'),(446,'25A',5,'PK-BAC'),(447,'26A',5,'PK-BAC'),(448,'27A',5,'PK-BAC'),(449,'28A',5,'PK-BAC'),(450,'29A',5,'PK-BAC'),(451,'30A',5,'PK-BAC'),(452,'31A',5,'PK-BAC'),(453,'32A',5,'PK-BAC'),(454,'33A',5,'PK-BAC'),(455,'16B',5,'PK-BAC'),(456,'17B',5,'PK-BAC'),(457,'18B',5,'PK-BAC'),(458,'19B',5,'PK-BAC'),(459,'20B',5,'PK-BAC'),(460,'21B',5,'PK-BAC'),(461,'22B',5,'PK-BAC'),(462,'23B',5,'PK-BAC'),(463,'24B',5,'PK-BAC'),(464,'25B',5,'PK-BAC'),(465,'26B',5,'PK-BAC'),(466,'27B',5,'PK-BAC'),(467,'28B',5,'PK-BAC'),(468,'29B',5,'PK-BAC'),(469,'30B',5,'PK-BAC'),(470,'31B',5,'PK-BAC'),(471,'32B',5,'PK-BAC'),(472,'33B',5,'PK-BAC'),(473,'16C',5,'PK-BAC'),(474,'17C',5,'PK-BAC'),(475,'18C',5,'PK-BAC'),(476,'19C',5,'PK-BAC'),(477,'20C',5,'PK-BAC'),(478,'21C',5,'PK-BAC'),(479,'22C',5,'PK-BAC'),(480,'23C',5,'PK-BAC'),(481,'24C',5,'PK-BAC'),(482,'25C',5,'PK-BAC'),(483,'26C',5,'PK-BAC'),(484,'27C',5,'PK-BAC'),(485,'28C',5,'PK-BAC'),(486,'29C',5,'PK-BAC'),(487,'30C',5,'PK-BAC'),(488,'31C',5,'PK-BAC'),(489,'32C',5,'PK-BAC'),(490,'33C',5,'PK-BAC'),(491,'16D',5,'PK-BAC'),(492,'17D',5,'PK-BAC'),(493,'18D',5,'PK-BAC'),(494,'19D',5,'PK-BAC'),(495,'20D',5,'PK-BAC'),(496,'21D',5,'PK-BAC'),(497,'22D',5,'PK-BAC'),(498,'23D',5,'PK-BAC'),(499,'24D',5,'PK-BAC'),(500,'25D',5,'PK-BAC'),(501,'26D',5,'PK-BAC'),(502,'27D',5,'PK-BAC'),(503,'28D',5,'PK-BAC'),(504,'29D',5,'PK-BAC'),(505,'30D',5,'PK-BAC'),(506,'31D',5,'PK-BAC'),(507,'32D',5,'PK-BAC'),(508,'33D',5,'PK-BAC'),(509,'16E',5,'PK-BAC'),(510,'17E',5,'PK-BAC'),(511,'18E',5,'PK-BAC'),(512,'19E',5,'PK-BAC'),(513,'20E',5,'PK-BAC'),(514,'21E',5,'PK-BAC'),(515,'22E',5,'PK-BAC'),(516,'23E',5,'PK-BAC'),(517,'24E',5,'PK-BAC'),(518,'25E',5,'PK-BAC'),(519,'26E',5,'PK-BAC'),(520,'27E',5,'PK-BAC'),(521,'28E',5,'PK-BAC'),(522,'29E',5,'PK-BAC'),(523,'30E',5,'PK-BAC'),(524,'31E',5,'PK-BAC'),(525,'32E',5,'PK-BAC'),(526,'33E',5,'PK-BAC'),(527,'16F',5,'PK-BAC'),(528,'17F',5,'PK-BAC'),(529,'18F',5,'PK-BAC'),(530,'19F',5,'PK-BAC'),(531,'20F',5,'PK-BAC'),(532,'21F',5,'PK-BAC'),(533,'22F',5,'PK-BAC'),(534,'23F',5,'PK-BAC'),(535,'24F',5,'PK-BAC'),(536,'25F',5,'PK-BAC'),(537,'26F',5,'PK-BAC'),(538,'27F',5,'PK-BAC'),(539,'28F',5,'PK-BAC'),(540,'29F',5,'PK-BAC'),(541,'30F',5,'PK-BAC'),(542,'31F',5,'PK-BAC'),(543,'32F',5,'PK-BAC'),(544,'33F',5,'PK-BAC'),(545,'1A',11,'PK-BBA'),(546,'2A',11,'PK-BBA'),(547,'3A',11,'PK-BBA'),(548,'4A',11,'PK-BBA'),(549,'5A',11,'PK-BBA'),(550,'6A',11,'PK-BBA'),(551,'1B',11,'PK-BBA'),(552,'2B',11,'PK-BBA'),(553,'3B',11,'PK-BBA'),(554,'4B',11,'PK-BBA'),(555,'5B',11,'PK-BBA'),(556,'6B',11,'PK-BBA'),(557,'1C',11,'PK-BBA'),(558,'2C',11,'PK-BBA'),(559,'3C',11,'PK-BBA'),(560,'4C',11,'PK-BBA'),(561,'5C',11,'PK-BBA'),(562,'6C',11,'PK-BBA'),(563,'1D',11,'PK-BBA'),(564,'2D',11,'PK-BBA'),(565,'3D',11,'PK-BBA'),(566,'4D',11,'PK-BBA'),(567,'5D',11,'PK-BBA'),(568,'6D',11,'PK-BBA'),(581,'1A',11,'PK-BBB'),(582,'2A',11,'PK-BBB'),(583,'3A',11,'PK-BBB'),(584,'4A',11,'PK-BBB'),(585,'5A',11,'PK-BBB'),(586,'6A',11,'PK-BBB'),(587,'1B',11,'PK-BBB'),(588,'2B',11,'PK-BBB'),(589,'3B',11,'PK-BBB'),(590,'4B',11,'PK-BBB'),(591,'5B',11,'PK-BBB'),(592,'6B',11,'PK-BBB'),(593,'1C',11,'PK-BBB'),(594,'2C',11,'PK-BBB'),(595,'3C',11,'PK-BBB'),(596,'4C',11,'PK-BBB'),(597,'5C',11,'PK-BBB'),(598,'6C',11,'PK-BBB'),(599,'1D',11,'PK-BBB'),(600,'2D',11,'PK-BBB'),(601,'3D',11,'PK-BBB'),(602,'4D',11,'PK-BBB'),(603,'5D',11,'PK-BBB'),(604,'6D',11,'PK-BBB'),(617,'1A',11,'PK-BBC'),(618,'2A',11,'PK-BBC'),(619,'3A',11,'PK-BBC'),(620,'4A',11,'PK-BBC'),(621,'5A',11,'PK-BBC'),(622,'6A',11,'PK-BBC'),(623,'1B',11,'PK-BBC'),(624,'2B',11,'PK-BBC'),(625,'3B',11,'PK-BBC'),(626,'4B',11,'PK-BBC'),(627,'5B',11,'PK-BBC'),(628,'6B',11,'PK-BBC'),(629,'1C',11,'PK-BBC'),(630,'2C',11,'PK-BBC'),(631,'3C',11,'PK-BBC'),(632,'4C',11,'PK-BBC'),(633,'5C',11,'PK-BBC'),(634,'6C',11,'PK-BBC'),(635,'1D',11,'PK-BBC'),(636,'2D',11,'PK-BBC'),(637,'3D',11,'PK-BBC'),(638,'4D',11,'PK-BBC'),(639,'5D',11,'PK-BBC'),(640,'6D',11,'PK-BBC'),(653,'1A',11,'PK-BBD'),(654,'2A',11,'PK-BBD'),(655,'3A',11,'PK-BBD'),(656,'4A',11,'PK-BBD'),(657,'5A',11,'PK-BBD'),(658,'6A',11,'PK-BBD'),(659,'1B',11,'PK-BBD'),(660,'2B',11,'PK-BBD'),(661,'3B',11,'PK-BBD'),(662,'4B',11,'PK-BBD'),(663,'5B',11,'PK-BBD'),(664,'6B',11,'PK-BBD'),(665,'1C',11,'PK-BBD'),(666,'2C',11,'PK-BBD'),(667,'3C',11,'PK-BBD'),(668,'4C',11,'PK-BBD'),(669,'5C',11,'PK-BBD'),(670,'6C',11,'PK-BBD'),(671,'1D',11,'PK-BBD'),(672,'2D',11,'PK-BBD'),(673,'3D',11,'PK-BBD'),(674,'4D',11,'PK-BBD'),(675,'5D',11,'PK-BBD'),(676,'6D',11,'PK-BBD'),(689,'19D',10,'PK-BBA'),(690,'20D',10,'PK-BBA'),(691,'21D',10,'PK-BBA'),(692,'19E',10,'PK-BBA'),(693,'20E',10,'PK-BBA'),(694,'21E',10,'PK-BBA'),(695,'19F',10,'PK-BBA'),(696,'20F',10,'PK-BBA'),(697,'21F',10,'PK-BBA'),(698,'19D',10,'PK-BBB'),(699,'20D',10,'PK-BBB'),(700,'21D',10,'PK-BBB'),(701,'19E',10,'PK-BBB'),(702,'20E',10,'PK-BBB'),(703,'21E',10,'PK-BBB'),(704,'19F',10,'PK-BBB'),(705,'20F',10,'PK-BBB'),(706,'21F',10,'PK-BBB'),(707,'19D',10,'PK-BBC'),(708,'20D',10,'PK-BBC'),(709,'21D',10,'PK-BBC'),(710,'19E',10,'PK-BBC'),(711,'20E',10,'PK-BBC'),(712,'21E',10,'PK-BBC'),(713,'19F',10,'PK-BBC'),(714,'20F',10,'PK-BBC'),(715,'21F',10,'PK-BBC'),(716,'19D',10,'PK-BBD'),(717,'20D',10,'PK-BBD'),(718,'21D',10,'PK-BBD'),(719,'19E',10,'PK-BBD'),(720,'20E',10,'PK-BBD'),(721,'21E',10,'PK-BBD'),(722,'19F',10,'PK-BBD'),(723,'20F',10,'PK-BBD'),(724,'21F',10,'PK-BBD'),(725,'22D',10,'PK-BBA'),(726,'22E',10,'PK-BBA'),(727,'22F',10,'PK-BBA'),(728,'22D',10,'PK-BBB'),(729,'22E',10,'PK-BBB'),(730,'22F',10,'PK-BBB'),(731,'22D',10,'PK-BBC'),(732,'22E',10,'PK-BBC'),(733,'22F',10,'PK-BBC'),(734,'22D',10,'PK-BBD'),(735,'22E',10,'PK-BBD'),(736,'22F',10,'PK-BBD'),(737,'21A',10,'PK-BBA'),(738,'22A',10,'PK-BBA'),(739,'23A',10,'PK-BBA'),(740,'21B',10,'PK-BBA'),(741,'22B',10,'PK-BBA'),(742,'23B',10,'PK-BBA'),(743,'21C',10,'PK-BBA'),(744,'22C',10,'PK-BBA'),(745,'23C',10,'PK-BBA'),(746,'21A',10,'PK-BBB'),(747,'22A',10,'PK-BBB'),(748,'23A',10,'PK-BBB'),(749,'21B',10,'PK-BBB'),(750,'22B',10,'PK-BBB'),(751,'23B',10,'PK-BBB'),(752,'21C',10,'PK-BBB'),(753,'22C',10,'PK-BBB'),(754,'23C',10,'PK-BBB'),(755,'21A',10,'PK-BBC'),(756,'22A',10,'PK-BBC'),(757,'23A',10,'PK-BBC'),(758,'21B',10,'PK-BBC'),(759,'22B',10,'PK-BBC'),(760,'23B',10,'PK-BBC'),(761,'21C',10,'PK-BBC'),(762,'22C',10,'PK-BBC'),(763,'23C',10,'PK-BBC'),(764,'21A',10,'PK-BBD'),(765,'22A',10,'PK-BBD'),(766,'23A',10,'PK-BBD'),(767,'21B',10,'PK-BBD'),(768,'22B',10,'PK-BBD'),(769,'23B',10,'PK-BBD'),(770,'21C',10,'PK-BBD'),(771,'22C',10,'PK-BBD'),(772,'23C',10,'PK-BBD'),(773,'23D',9,'PK-BBA'),(774,'23E',9,'PK-BBA'),(775,'23F',9,'PK-BBA'),(776,'23D',9,'PK-BBB'),(777,'23E',9,'PK-BBB'),(778,'23F',9,'PK-BBB'),(779,'23D',9,'PK-BBC'),(780,'23E',9,'PK-BBC'),(781,'23F',9,'PK-BBC'),(782,'23D',9,'PK-BBD'),(783,'23E',9,'PK-BBD'),(784,'23F',9,'PK-BBD'),(785,'24A',9,'PK-BBA'),(786,'25A',9,'PK-BBA'),(787,'26A',9,'PK-BBA'),(788,'27A',9,'PK-BBA'),(789,'28A',9,'PK-BBA'),(790,'29A',9,'PK-BBA'),(791,'30A',9,'PK-BBA'),(792,'31A',9,'PK-BBA'),(793,'32A',9,'PK-BBA'),(794,'33A',9,'PK-BBA'),(795,'34A',9,'PK-BBA'),(796,'35A',9,'PK-BBA'),(797,'36A',9,'PK-BBA'),(798,'37A',9,'PK-BBA'),(799,'38A',9,'PK-BBA'),(800,'39A',9,'PK-BBA'),(801,'40A',9,'PK-BBA'),(802,'41A',9,'PK-BBA'),(803,'42A',9,'PK-BBA'),(804,'43A',9,'PK-BBA'),(805,'44A',9,'PK-BBA'),(806,'45A',9,'PK-BBA'),(807,'24B',9,'PK-BBA'),(808,'25B',9,'PK-BBA'),(809,'26B',9,'PK-BBA'),(810,'27B',9,'PK-BBA'),(811,'28B',9,'PK-BBA'),(812,'29B',9,'PK-BBA'),(813,'30B',9,'PK-BBA'),(814,'31B',9,'PK-BBA'),(815,'32B',9,'PK-BBA'),(816,'33B',9,'PK-BBA'),(817,'34B',9,'PK-BBA'),(818,'35B',9,'PK-BBA'),(819,'36B',9,'PK-BBA'),(820,'37B',9,'PK-BBA'),(821,'38B',9,'PK-BBA'),(822,'39B',9,'PK-BBA'),(823,'40B',9,'PK-BBA'),(824,'41B',9,'PK-BBA'),(825,'42B',9,'PK-BBA'),(826,'43B',9,'PK-BBA'),(827,'44B',9,'PK-BBA'),(828,'45B',9,'PK-BBA'),(829,'24C',9,'PK-BBA'),(830,'25C',9,'PK-BBA'),(831,'26C',9,'PK-BBA'),(832,'27C',9,'PK-BBA'),(833,'28C',9,'PK-BBA'),(834,'29C',9,'PK-BBA'),(835,'30C',9,'PK-BBA'),(836,'31C',9,'PK-BBA'),(837,'32C',9,'PK-BBA'),(838,'33C',9,'PK-BBA'),(839,'34C',9,'PK-BBA'),(840,'35C',9,'PK-BBA'),(841,'36C',9,'PK-BBA'),(842,'37C',9,'PK-BBA'),(843,'38C',9,'PK-BBA'),(844,'39C',9,'PK-BBA'),(845,'40C',9,'PK-BBA'),(846,'41C',9,'PK-BBA'),(847,'42C',9,'PK-BBA'),(848,'43C',9,'PK-BBA'),(849,'44C',9,'PK-BBA'),(850,'45C',9,'PK-BBA'),(851,'24D',9,'PK-BBA'),(852,'25D',9,'PK-BBA'),(853,'26D',9,'PK-BBA'),(854,'27D',9,'PK-BBA'),(855,'28D',9,'PK-BBA'),(856,'29D',9,'PK-BBA'),(857,'30D',9,'PK-BBA'),(858,'31D',9,'PK-BBA'),(859,'32D',9,'PK-BBA'),(860,'33D',9,'PK-BBA'),(861,'34D',9,'PK-BBA'),(862,'35D',9,'PK-BBA'),(863,'36D',9,'PK-BBA'),(864,'37D',9,'PK-BBA'),(865,'38D',9,'PK-BBA'),(866,'39D',9,'PK-BBA'),(867,'40D',9,'PK-BBA'),(868,'41D',9,'PK-BBA'),(869,'42D',9,'PK-BBA'),(870,'43D',9,'PK-BBA'),(871,'44D',9,'PK-BBA'),(872,'45D',9,'PK-BBA'),(873,'24E',9,'PK-BBA'),(874,'25E',9,'PK-BBA'),(875,'26E',9,'PK-BBA'),(876,'27E',9,'PK-BBA'),(877,'28E',9,'PK-BBA'),(878,'29E',9,'PK-BBA'),(879,'30E',9,'PK-BBA'),(880,'31E',9,'PK-BBA'),(881,'32E',9,'PK-BBA'),(882,'33E',9,'PK-BBA'),(883,'34E',9,'PK-BBA'),(884,'35E',9,'PK-BBA'),(885,'36E',9,'PK-BBA'),(886,'37E',9,'PK-BBA'),(887,'38E',9,'PK-BBA'),(888,'39E',9,'PK-BBA'),(889,'40E',9,'PK-BBA'),(890,'41E',9,'PK-BBA'),(891,'42E',9,'PK-BBA'),(892,'43E',9,'PK-BBA'),(893,'44E',9,'PK-BBA'),(894,'45E',9,'PK-BBA'),(895,'24F',9,'PK-BBA'),(896,'25F',9,'PK-BBA'),(897,'26F',9,'PK-BBA'),(898,'27F',9,'PK-BBA'),(899,'28F',9,'PK-BBA'),(900,'29F',9,'PK-BBA'),(901,'30F',9,'PK-BBA'),(902,'31F',9,'PK-BBA'),(903,'32F',9,'PK-BBA'),(904,'33F',9,'PK-BBA'),(905,'34F',9,'PK-BBA'),(906,'35F',9,'PK-BBA'),(907,'36F',9,'PK-BBA'),(908,'37F',9,'PK-BBA'),(909,'38F',9,'PK-BBA'),(910,'39F',9,'PK-BBA'),(911,'40F',9,'PK-BBA'),(912,'41F',9,'PK-BBA'),(913,'42F',9,'PK-BBA'),(914,'43F',9,'PK-BBA'),(915,'44F',9,'PK-BBA'),(916,'45F',9,'PK-BBA'),(917,'24A',9,'PK-BBB'),(918,'25A',9,'PK-BBB'),(919,'26A',9,'PK-BBB'),(920,'27A',9,'PK-BBB'),(921,'28A',9,'PK-BBB'),(922,'29A',9,'PK-BBB'),(923,'30A',9,'PK-BBB'),(924,'31A',9,'PK-BBB'),(925,'32A',9,'PK-BBB'),(926,'33A',9,'PK-BBB'),(927,'34A',9,'PK-BBB'),(928,'35A',9,'PK-BBB'),(929,'36A',9,'PK-BBB'),(930,'37A',9,'PK-BBB'),(931,'38A',9,'PK-BBB'),(932,'39A',9,'PK-BBB'),(933,'40A',9,'PK-BBB'),(934,'41A',9,'PK-BBB'),(935,'42A',9,'PK-BBB'),(936,'43A',9,'PK-BBB'),(937,'44A',9,'PK-BBB'),(938,'45A',9,'PK-BBB'),(939,'24B',9,'PK-BBB'),(940,'25B',9,'PK-BBB'),(941,'26B',9,'PK-BBB'),(942,'27B',9,'PK-BBB'),(943,'28B',9,'PK-BBB'),(944,'29B',9,'PK-BBB'),(945,'30B',9,'PK-BBB'),(946,'31B',9,'PK-BBB'),(947,'32B',9,'PK-BBB'),(948,'33B',9,'PK-BBB'),(949,'34B',9,'PK-BBB'),(950,'35B',9,'PK-BBB'),(951,'36B',9,'PK-BBB'),(952,'37B',9,'PK-BBB'),(953,'38B',9,'PK-BBB'),(954,'39B',9,'PK-BBB'),(955,'40B',9,'PK-BBB'),(956,'41B',9,'PK-BBB'),(957,'42B',9,'PK-BBB'),(958,'43B',9,'PK-BBB'),(959,'44B',9,'PK-BBB'),(960,'45B',9,'PK-BBB'),(961,'24C',9,'PK-BBB'),(962,'25C',9,'PK-BBB'),(963,'26C',9,'PK-BBB'),(964,'27C',9,'PK-BBB'),(965,'28C',9,'PK-BBB'),(966,'29C',9,'PK-BBB'),(967,'30C',9,'PK-BBB'),(968,'31C',9,'PK-BBB'),(969,'32C',9,'PK-BBB'),(970,'33C',9,'PK-BBB'),(971,'34C',9,'PK-BBB'),(972,'35C',9,'PK-BBB'),(973,'36C',9,'PK-BBB'),(974,'37C',9,'PK-BBB'),(975,'38C',9,'PK-BBB'),(976,'39C',9,'PK-BBB'),(977,'40C',9,'PK-BBB'),(978,'41C',9,'PK-BBB'),(979,'42C',9,'PK-BBB'),(980,'43C',9,'PK-BBB'),(981,'44C',9,'PK-BBB'),(982,'45C',9,'PK-BBB'),(983,'24D',9,'PK-BBB'),(984,'25D',9,'PK-BBB'),(985,'26D',9,'PK-BBB'),(986,'27D',9,'PK-BBB'),(987,'28D',9,'PK-BBB'),(988,'29D',9,'PK-BBB'),(989,'30D',9,'PK-BBB'),(990,'31D',9,'PK-BBB'),(991,'32D',9,'PK-BBB'),(992,'33D',9,'PK-BBB'),(993,'34D',9,'PK-BBB'),(994,'35D',9,'PK-BBB'),(995,'36D',9,'PK-BBB'),(996,'37D',9,'PK-BBB'),(997,'38D',9,'PK-BBB'),(998,'39D',9,'PK-BBB'),(999,'40D',9,'PK-BBB'),(1000,'41D',9,'PK-BBB'),(1001,'42D',9,'PK-BBB'),(1002,'43D',9,'PK-BBB'),(1003,'44D',9,'PK-BBB'),(1004,'45D',9,'PK-BBB'),(1005,'24E',9,'PK-BBB'),(1006,'25E',9,'PK-BBB'),(1007,'26E',9,'PK-BBB'),(1008,'27E',9,'PK-BBB'),(1009,'28E',9,'PK-BBB'),(1010,'29E',9,'PK-BBB'),(1011,'30E',9,'PK-BBB'),(1012,'31E',9,'PK-BBB'),(1013,'32E',9,'PK-BBB'),(1014,'33E',9,'PK-BBB'),(1015,'34E',9,'PK-BBB'),(1016,'35E',9,'PK-BBB'),(1017,'36E',9,'PK-BBB'),(1018,'37E',9,'PK-BBB'),(1019,'38E',9,'PK-BBB'),(1020,'39E',9,'PK-BBB'),(1021,'40E',9,'PK-BBB'),(1022,'41E',9,'PK-BBB'),(1023,'42E',9,'PK-BBB'),(1024,'43E',9,'PK-BBB'),(1025,'44E',9,'PK-BBB'),(1026,'45E',9,'PK-BBB'),(1027,'24F',9,'PK-BBB'),(1028,'25F',9,'PK-BBB'),(1029,'26F',9,'PK-BBB'),(1030,'27F',9,'PK-BBB'),(1031,'28F',9,'PK-BBB'),(1032,'29F',9,'PK-BBB'),(1033,'30F',9,'PK-BBB'),(1034,'31F',9,'PK-BBB'),(1035,'32F',9,'PK-BBB'),(1036,'33F',9,'PK-BBB'),(1037,'34F',9,'PK-BBB'),(1038,'35F',9,'PK-BBB'),(1039,'36F',9,'PK-BBB'),(1040,'37F',9,'PK-BBB'),(1041,'38F',9,'PK-BBB'),(1042,'39F',9,'PK-BBB'),(1043,'40F',9,'PK-BBB'),(1044,'41F',9,'PK-BBB'),(1045,'42F',9,'PK-BBB'),(1046,'43F',9,'PK-BBB'),(1047,'44F',9,'PK-BBB'),(1048,'45F',9,'PK-BBB'),(1049,'24A',9,'PK-BBC'),(1050,'25A',9,'PK-BBC'),(1051,'26A',9,'PK-BBC'),(1052,'27A',9,'PK-BBC'),(1053,'28A',9,'PK-BBC'),(1054,'29A',9,'PK-BBC'),(1055,'30A',9,'PK-BBC'),(1056,'31A',9,'PK-BBC'),(1057,'32A',9,'PK-BBC'),(1058,'33A',9,'PK-BBC'),(1059,'34A',9,'PK-BBC'),(1060,'35A',9,'PK-BBC'),(1061,'36A',9,'PK-BBC'),(1062,'37A',9,'PK-BBC'),(1063,'38A',9,'PK-BBC'),(1064,'39A',9,'PK-BBC'),(1065,'40A',9,'PK-BBC'),(1066,'41A',9,'PK-BBC'),(1067,'42A',9,'PK-BBC'),(1068,'43A',9,'PK-BBC'),(1069,'44A',9,'PK-BBC'),(1070,'45A',9,'PK-BBC'),(1071,'24B',9,'PK-BBC'),(1072,'25B',9,'PK-BBC'),(1073,'26B',9,'PK-BBC'),(1074,'27B',9,'PK-BBC'),(1075,'28B',9,'PK-BBC'),(1076,'29B',9,'PK-BBC'),(1077,'30B',9,'PK-BBC'),(1078,'31B',9,'PK-BBC'),(1079,'32B',9,'PK-BBC'),(1080,'33B',9,'PK-BBC'),(1081,'34B',9,'PK-BBC'),(1082,'35B',9,'PK-BBC'),(1083,'36B',9,'PK-BBC'),(1084,'37B',9,'PK-BBC'),(1085,'38B',9,'PK-BBC'),(1086,'39B',9,'PK-BBC'),(1087,'40B',9,'PK-BBC'),(1088,'41B',9,'PK-BBC'),(1089,'42B',9,'PK-BBC'),(1090,'43B',9,'PK-BBC'),(1091,'44B',9,'PK-BBC'),(1092,'45B',9,'PK-BBC'),(1093,'24C',9,'PK-BBC'),(1094,'25C',9,'PK-BBC'),(1095,'26C',9,'PK-BBC'),(1096,'27C',9,'PK-BBC'),(1097,'28C',9,'PK-BBC'),(1098,'29C',9,'PK-BBC'),(1099,'30C',9,'PK-BBC'),(1100,'31C',9,'PK-BBC'),(1101,'32C',9,'PK-BBC'),(1102,'33C',9,'PK-BBC'),(1103,'34C',9,'PK-BBC'),(1104,'35C',9,'PK-BBC'),(1105,'36C',9,'PK-BBC'),(1106,'37C',9,'PK-BBC'),(1107,'38C',9,'PK-BBC'),(1108,'39C',9,'PK-BBC'),(1109,'40C',9,'PK-BBC'),(1110,'41C',9,'PK-BBC'),(1111,'42C',9,'PK-BBC'),(1112,'43C',9,'PK-BBC'),(1113,'44C',9,'PK-BBC'),(1114,'45C',9,'PK-BBC'),(1115,'24D',9,'PK-BBC'),(1116,'25D',9,'PK-BBC'),(1117,'26D',9,'PK-BBC'),(1118,'27D',9,'PK-BBC'),(1119,'28D',9,'PK-BBC'),(1120,'29D',9,'PK-BBC'),(1121,'30D',9,'PK-BBC'),(1122,'31D',9,'PK-BBC'),(1123,'32D',9,'PK-BBC'),(1124,'33D',9,'PK-BBC'),(1125,'34D',9,'PK-BBC'),(1126,'35D',9,'PK-BBC'),(1127,'36D',9,'PK-BBC'),(1128,'37D',9,'PK-BBC'),(1129,'38D',9,'PK-BBC'),(1130,'39D',9,'PK-BBC'),(1131,'40D',9,'PK-BBC'),(1132,'41D',9,'PK-BBC'),(1133,'42D',9,'PK-BBC'),(1134,'43D',9,'PK-BBC'),(1135,'44D',9,'PK-BBC'),(1136,'45D',9,'PK-BBC'),(1137,'24E',9,'PK-BBC'),(1138,'25E',9,'PK-BBC'),(1139,'26E',9,'PK-BBC'),(1140,'27E',9,'PK-BBC'),(1141,'28E',9,'PK-BBC'),(1142,'29E',9,'PK-BBC'),(1143,'30E',9,'PK-BBC'),(1144,'31E',9,'PK-BBC'),(1145,'32E',9,'PK-BBC'),(1146,'33E',9,'PK-BBC'),(1147,'34E',9,'PK-BBC'),(1148,'35E',9,'PK-BBC'),(1149,'36E',9,'PK-BBC'),(1150,'37E',9,'PK-BBC'),(1151,'38E',9,'PK-BBC'),(1152,'39E',9,'PK-BBC'),(1153,'40E',9,'PK-BBC'),(1154,'41E',9,'PK-BBC'),(1155,'42E',9,'PK-BBC'),(1156,'43E',9,'PK-BBC'),(1157,'44E',9,'PK-BBC'),(1158,'45E',9,'PK-BBC'),(1159,'24F',9,'PK-BBC'),(1160,'25F',9,'PK-BBC'),(1161,'26F',9,'PK-BBC'),(1162,'27F',9,'PK-BBC'),(1163,'28F',9,'PK-BBC'),(1164,'29F',9,'PK-BBC'),(1165,'30F',9,'PK-BBC'),(1166,'31F',9,'PK-BBC'),(1167,'32F',9,'PK-BBC'),(1168,'33F',9,'PK-BBC'),(1169,'34F',9,'PK-BBC'),(1170,'35F',9,'PK-BBC'),(1171,'36F',9,'PK-BBC'),(1172,'37F',9,'PK-BBC'),(1173,'38F',9,'PK-BBC'),(1174,'39F',9,'PK-BBC'),(1175,'40F',9,'PK-BBC'),(1176,'41F',9,'PK-BBC'),(1177,'42F',9,'PK-BBC'),(1178,'43F',9,'PK-BBC'),(1179,'44F',9,'PK-BBC'),(1180,'45F',9,'PK-BBC'),(1181,'24A',9,'PK-BBD'),(1182,'25A',9,'PK-BBD'),(1183,'26A',9,'PK-BBD'),(1184,'27A',9,'PK-BBD'),(1185,'28A',9,'PK-BBD'),(1186,'29A',9,'PK-BBD'),(1187,'30A',9,'PK-BBD'),(1188,'31A',9,'PK-BBD'),(1189,'32A',9,'PK-BBD'),(1190,'33A',9,'PK-BBD'),(1191,'34A',9,'PK-BBD'),(1192,'35A',9,'PK-BBD'),(1193,'36A',9,'PK-BBD'),(1194,'37A',9,'PK-BBD'),(1195,'38A',9,'PK-BBD'),(1196,'39A',9,'PK-BBD'),(1197,'40A',9,'PK-BBD'),(1198,'41A',9,'PK-BBD'),(1199,'42A',9,'PK-BBD'),(1200,'43A',9,'PK-BBD'),(1201,'44A',9,'PK-BBD'),(1202,'45A',9,'PK-BBD'),(1203,'24B',9,'PK-BBD'),(1204,'25B',9,'PK-BBD'),(1205,'26B',9,'PK-BBD'),(1206,'27B',9,'PK-BBD'),(1207,'28B',9,'PK-BBD'),(1208,'29B',9,'PK-BBD'),(1209,'30B',9,'PK-BBD'),(1210,'31B',9,'PK-BBD'),(1211,'32B',9,'PK-BBD'),(1212,'33B',9,'PK-BBD'),(1213,'34B',9,'PK-BBD'),(1214,'35B',9,'PK-BBD'),(1215,'36B',9,'PK-BBD'),(1216,'37B',9,'PK-BBD'),(1217,'38B',9,'PK-BBD'),(1218,'39B',9,'PK-BBD'),(1219,'40B',9,'PK-BBD'),(1220,'41B',9,'PK-BBD'),(1221,'42B',9,'PK-BBD'),(1222,'43B',9,'PK-BBD'),(1223,'44B',9,'PK-BBD'),(1224,'45B',9,'PK-BBD'),(1225,'24C',9,'PK-BBD'),(1226,'25C',9,'PK-BBD'),(1227,'26C',9,'PK-BBD'),(1228,'27C',9,'PK-BBD'),(1229,'28C',9,'PK-BBD'),(1230,'29C',9,'PK-BBD'),(1231,'30C',9,'PK-BBD'),(1232,'31C',9,'PK-BBD'),(1233,'32C',9,'PK-BBD'),(1234,'33C',9,'PK-BBD'),(1235,'34C',9,'PK-BBD'),(1236,'35C',9,'PK-BBD'),(1237,'36C',9,'PK-BBD'),(1238,'37C',9,'PK-BBD'),(1239,'38C',9,'PK-BBD'),(1240,'39C',9,'PK-BBD'),(1241,'40C',9,'PK-BBD'),(1242,'41C',9,'PK-BBD'),(1243,'42C',9,'PK-BBD'),(1244,'43C',9,'PK-BBD'),(1245,'44C',9,'PK-BBD'),(1246,'45C',9,'PK-BBD'),(1247,'24D',9,'PK-BBD'),(1248,'25D',9,'PK-BBD'),(1249,'26D',9,'PK-BBD'),(1250,'27D',9,'PK-BBD'),(1251,'28D',9,'PK-BBD'),(1252,'29D',9,'PK-BBD'),(1253,'30D',9,'PK-BBD'),(1254,'31D',9,'PK-BBD'),(1255,'32D',9,'PK-BBD'),(1256,'33D',9,'PK-BBD'),(1257,'34D',9,'PK-BBD'),(1258,'35D',9,'PK-BBD'),(1259,'36D',9,'PK-BBD'),(1260,'37D',9,'PK-BBD'),(1261,'38D',9,'PK-BBD'),(1262,'39D',9,'PK-BBD'),(1263,'40D',9,'PK-BBD'),(1264,'41D',9,'PK-BBD'),(1265,'42D',9,'PK-BBD'),(1266,'43D',9,'PK-BBD'),(1267,'44D',9,'PK-BBD'),(1268,'45D',9,'PK-BBD'),(1269,'24E',9,'PK-BBD'),(1270,'25E',9,'PK-BBD'),(1271,'26E',9,'PK-BBD'),(1272,'27E',9,'PK-BBD'),(1273,'28E',9,'PK-BBD'),(1274,'29E',9,'PK-BBD'),(1275,'30E',9,'PK-BBD'),(1276,'31E',9,'PK-BBD'),(1277,'32E',9,'PK-BBD'),(1278,'33E',9,'PK-BBD'),(1279,'34E',9,'PK-BBD'),(1280,'35E',9,'PK-BBD'),(1281,'36E',9,'PK-BBD'),(1282,'37E',9,'PK-BBD'),(1283,'38E',9,'PK-BBD'),(1284,'39E',9,'PK-BBD'),(1285,'40E',9,'PK-BBD'),(1286,'41E',9,'PK-BBD'),(1287,'42E',9,'PK-BBD'),(1288,'43E',9,'PK-BBD'),(1289,'44E',9,'PK-BBD'),(1290,'45E',9,'PK-BBD'),(1291,'24F',9,'PK-BBD'),(1292,'25F',9,'PK-BBD'),(1293,'26F',9,'PK-BBD'),(1294,'27F',9,'PK-BBD'),(1295,'28F',9,'PK-BBD'),(1296,'29F',9,'PK-BBD'),(1297,'30F',9,'PK-BBD'),(1298,'31F',9,'PK-BBD'),(1299,'32F',9,'PK-BBD'),(1300,'33F',9,'PK-BBD'),(1301,'34F',9,'PK-BBD'),(1302,'35F',9,'PK-BBD'),(1303,'36F',9,'PK-BBD'),(1304,'37F',9,'PK-BBD'),(1305,'38F',9,'PK-BBD'),(1306,'39F',9,'PK-BBD'),(1307,'40F',9,'PK-BBD'),(1308,'41F',9,'PK-BBD'),(1309,'42F',9,'PK-BBD'),(1310,'43F',9,'PK-BBD'),(1311,'44F',9,'PK-BBD'),(1312,'45F',9,'PK-BBD'),(1313,'43A',8,'PK-AAA'),(1314,'44A',8,'PK-AAA'),(1315,'43B',8,'PK-AAA'),(1316,'44B',8,'PK-AAA'),(1317,'43C',8,'PK-AAA'),(1318,'44C',8,'PK-AAA'),(1319,'43H',8,'PK-AAA'),(1320,'44H',8,'PK-AAA'),(1321,'43J',8,'PK-AAA'),(1322,'44J',8,'PK-AAA'),(1323,'43K',8,'PK-AAA'),(1324,'44K',8,'PK-AAA'),(1325,'45A',8,'PK-AAA'),(1326,'46A',8,'PK-AAA'),(1327,'47A',8,'PK-AAA'),(1328,'48A',8,'PK-AAA'),(1329,'49A',8,'PK-AAA'),(1330,'50A',8,'PK-AAA'),(1331,'45B',8,'PK-AAA'),(1332,'46B',8,'PK-AAA'),(1333,'47B',8,'PK-AAA'),(1334,'48B',8,'PK-AAA'),(1335,'49B',8,'PK-AAA'),(1336,'50B',8,'PK-AAA'),(1337,'45C',8,'PK-AAA'),(1338,'46C',8,'PK-AAA'),(1339,'47C',8,'PK-AAA'),(1340,'48C',8,'PK-AAA'),(1341,'49C',8,'PK-AAA'),(1342,'50C',8,'PK-AAA'),(1343,'45D',8,'PK-AAA'),(1344,'46D',8,'PK-AAA'),(1345,'47D',8,'PK-AAA'),(1346,'48D',8,'PK-AAA'),(1347,'49D',8,'PK-AAA'),(1348,'50D',8,'PK-AAA'),(1349,'45E',8,'PK-AAA'),(1350,'46E',8,'PK-AAA'),(1351,'47E',8,'PK-AAA'),(1352,'48E',8,'PK-AAA'),(1353,'49E',8,'PK-AAA'),(1354,'50E',8,'PK-AAA'),(1355,'45F',8,'PK-AAA'),(1356,'46F',8,'PK-AAA'),(1357,'47F',8,'PK-AAA'),(1358,'48F',8,'PK-AAA'),(1359,'49F',8,'PK-AAA'),(1360,'50F',8,'PK-AAA'),(1361,'45G',8,'PK-AAA'),(1362,'46G',8,'PK-AAA'),(1363,'47G',8,'PK-AAA'),(1364,'48G',8,'PK-AAA'),(1365,'49G',8,'PK-AAA'),(1366,'50G',8,'PK-AAA'),(1367,'45H',8,'PK-AAA'),(1368,'46H',8,'PK-AAA'),(1369,'47H',8,'PK-AAA'),(1370,'48H',8,'PK-AAA'),(1371,'49H',8,'PK-AAA'),(1372,'50H',8,'PK-AAA'),(1373,'45J',8,'PK-AAA'),(1374,'46J',8,'PK-AAA'),(1375,'47J',8,'PK-AAA'),(1376,'48J',8,'PK-AAA'),(1377,'49J',8,'PK-AAA'),(1378,'50J',8,'PK-AAA'),(1379,'45K',8,'PK-AAA'),(1380,'46K',8,'PK-AAA'),(1381,'47K',8,'PK-AAA'),(1382,'48K',8,'PK-AAA'),(1383,'49K',8,'PK-AAA'),(1384,'50K',8,'PK-AAA'),(1385,'51D',8,'PK-AAA'),(1386,'51E',8,'PK-AAA'),(1387,'51F',8,'PK-AAA'),(1388,'51G',8,'PK-AAA'),(1389,'52A',1,'PK-AAA'),(1390,'53A',1,'PK-AAA'),(1391,'52B',1,'PK-AAA'),(1392,'53B',1,'PK-AAA'),(1393,'52C',1,'PK-AAA'),(1394,'53C',1,'PK-AAA'),(1395,'52H',1,'PK-AAA'),(1396,'53H',1,'PK-AAA'),(1397,'52J',1,'PK-AAA'),(1398,'53J',1,'PK-AAA'),(1399,'52K',1,'PK-AAA'),(1400,'53K',1,'PK-AAA'),(1401,'54A',1,'PK-AAA'),(1402,'55A',1,'PK-AAA'),(1403,'56A',1,'PK-AAA'),(1404,'57A',1,'PK-AAA'),(1405,'58A',1,'PK-AAA'),(1406,'59A',1,'PK-AAA'),(1407,'60A',1,'PK-AAA'),(1408,'61A',1,'PK-AAA'),(1409,'62A',1,'PK-AAA'),(1410,'63A',1,'PK-AAA'),(1411,'64A',1,'PK-AAA'),(1412,'65A',1,'PK-AAA'),(1413,'54B',1,'PK-AAA'),(1414,'55B',1,'PK-AAA'),(1415,'56B',1,'PK-AAA'),(1416,'57B',1,'PK-AAA'),(1417,'58B',1,'PK-AAA'),(1418,'59B',1,'PK-AAA'),(1419,'60B',1,'PK-AAA'),(1420,'61B',1,'PK-AAA'),(1421,'62B',1,'PK-AAA'),(1422,'63B',1,'PK-AAA'),(1423,'64B',1,'PK-AAA'),(1424,'65B',1,'PK-AAA'),(1425,'54C',1,'PK-AAA'),(1426,'55C',1,'PK-AAA'),(1427,'56C',1,'PK-AAA'),(1428,'57C',1,'PK-AAA'),(1429,'58C',1,'PK-AAA'),(1430,'59C',1,'PK-AAA'),(1431,'60C',1,'PK-AAA'),(1432,'61C',1,'PK-AAA'),(1433,'62C',1,'PK-AAA'),(1434,'63C',1,'PK-AAA'),(1435,'64C',1,'PK-AAA'),(1436,'65C',1,'PK-AAA'),(1437,'54D',1,'PK-AAA'),(1438,'55D',1,'PK-AAA'),(1439,'56D',1,'PK-AAA'),(1440,'57D',1,'PK-AAA'),(1441,'58D',1,'PK-AAA'),(1442,'59D',1,'PK-AAA'),(1443,'60D',1,'PK-AAA'),(1444,'61D',1,'PK-AAA'),(1445,'62D',1,'PK-AAA'),(1446,'63D',1,'PK-AAA'),(1447,'64D',1,'PK-AAA'),(1448,'65D',1,'PK-AAA'),(1449,'54E',1,'PK-AAA'),(1450,'55E',1,'PK-AAA'),(1451,'56E',1,'PK-AAA'),(1452,'57E',1,'PK-AAA'),(1453,'58E',1,'PK-AAA'),(1454,'59E',1,'PK-AAA'),(1455,'60E',1,'PK-AAA'),(1456,'61E',1,'PK-AAA'),(1457,'62E',1,'PK-AAA'),(1458,'63E',1,'PK-AAA'),(1459,'64E',1,'PK-AAA'),(1460,'65E',1,'PK-AAA'),(1461,'54F',1,'PK-AAA'),(1462,'55F',1,'PK-AAA'),(1463,'56F',1,'PK-AAA'),(1464,'57F',1,'PK-AAA'),(1465,'58F',1,'PK-AAA'),(1466,'59F',1,'PK-AAA'),(1467,'60F',1,'PK-AAA'),(1468,'61F',1,'PK-AAA'),(1469,'62F',1,'PK-AAA'),(1470,'63F',1,'PK-AAA'),(1471,'64F',1,'PK-AAA'),(1472,'65F',1,'PK-AAA'),(1473,'54G',1,'PK-AAA'),(1474,'55G',1,'PK-AAA'),(1475,'56G',1,'PK-AAA'),(1476,'57G',1,'PK-AAA'),(1477,'58G',1,'PK-AAA'),(1478,'59G',1,'PK-AAA'),(1479,'60G',1,'PK-AAA'),(1480,'61G',1,'PK-AAA'),(1481,'62G',1,'PK-AAA'),(1482,'63G',1,'PK-AAA'),(1483,'64G',1,'PK-AAA'),(1484,'65G',1,'PK-AAA'),(1485,'54H',1,'PK-AAA'),(1486,'55H',1,'PK-AAA'),(1487,'56H',1,'PK-AAA'),(1488,'57H',1,'PK-AAA'),(1489,'58H',1,'PK-AAA'),(1490,'59H',1,'PK-AAA'),(1491,'60H',1,'PK-AAA'),(1492,'61H',1,'PK-AAA'),(1493,'62H',1,'PK-AAA'),(1494,'63H',1,'PK-AAA'),(1495,'64H',1,'PK-AAA'),(1496,'65H',1,'PK-AAA'),(1497,'54J',1,'PK-AAA'),(1498,'55J',1,'PK-AAA'),(1499,'56J',1,'PK-AAA'),(1500,'57J',1,'PK-AAA'),(1501,'58J',1,'PK-AAA'),(1502,'59J',1,'PK-AAA'),(1503,'60J',1,'PK-AAA'),(1504,'61J',1,'PK-AAA'),(1505,'62J',1,'PK-AAA'),(1506,'63J',1,'PK-AAA'),(1507,'64J',1,'PK-AAA'),(1508,'65J',1,'PK-AAA'),(1509,'54K',1,'PK-AAA'),(1510,'55K',1,'PK-AAA'),(1511,'56K',1,'PK-AAA'),(1512,'57K',1,'PK-AAA'),(1513,'58K',1,'PK-AAA'),(1514,'59K',1,'PK-AAA'),(1515,'60K',1,'PK-AAA'),(1516,'61K',1,'PK-AAA'),(1517,'62K',1,'PK-AAA'),(1518,'63K',1,'PK-AAA'),(1519,'64K',1,'PK-AAA'),(1520,'65K',1,'PK-AAA'),(1521,'66H',1,'PK-AAA'),(1522,'66J',1,'PK-AAA'),(1523,'66K',1,'PK-AAA'),(1524,'67B',1,'PK-AAA'),(1525,'67C',1,'PK-AAA'),(1526,'67D',1,'PK-AAA'),(1527,'67E',1,'PK-AAA'),(1528,'67F',1,'PK-AAA'),(1529,'67G',1,'PK-AAA'),(1530,'67H',1,'PK-AAA'),(1531,'67J',1,'PK-AAA'),(1532,'68A',1,'PK-AAA'),(1533,'69A',1,'PK-AAA'),(1534,'70A',1,'PK-AAA'),(1535,'71A',1,'PK-AAA'),(1536,'72A',1,'PK-AAA'),(1537,'73A',1,'PK-AAA'),(1538,'74A',1,'PK-AAA'),(1539,'75A',1,'PK-AAA'),(1540,'76A',1,'PK-AAA'),(1541,'77A',1,'PK-AAA'),(1542,'78A',1,'PK-AAA'),(1543,'68B',1,'PK-AAA'),(1544,'69B',1,'PK-AAA'),(1545,'70B',1,'PK-AAA'),(1546,'71B',1,'PK-AAA'),(1547,'72B',1,'PK-AAA'),(1548,'73B',1,'PK-AAA'),(1549,'74B',1,'PK-AAA'),(1550,'75B',1,'PK-AAA'),(1551,'76B',1,'PK-AAA'),(1552,'77B',1,'PK-AAA'),(1553,'78B',1,'PK-AAA'),(1554,'68C',1,'PK-AAA'),(1555,'69C',1,'PK-AAA'),(1556,'70C',1,'PK-AAA'),(1557,'71C',1,'PK-AAA'),(1558,'72C',1,'PK-AAA'),(1559,'73C',1,'PK-AAA'),(1560,'74C',1,'PK-AAA'),(1561,'75C',1,'PK-AAA'),(1562,'76C',1,'PK-AAA'),(1563,'77C',1,'PK-AAA'),(1564,'78C',1,'PK-AAA'),(1565,'68D',1,'PK-AAA'),(1566,'69D',1,'PK-AAA'),(1567,'70D',1,'PK-AAA'),(1568,'71D',1,'PK-AAA'),(1569,'72D',1,'PK-AAA'),(1570,'73D',1,'PK-AAA'),(1571,'74D',1,'PK-AAA'),(1572,'75D',1,'PK-AAA'),(1573,'76D',1,'PK-AAA'),(1574,'77D',1,'PK-AAA'),(1575,'78D',1,'PK-AAA'),(1576,'68E',1,'PK-AAA'),(1577,'69E',1,'PK-AAA'),(1578,'70E',1,'PK-AAA'),(1579,'71E',1,'PK-AAA'),(1580,'72E',1,'PK-AAA'),(1581,'73E',1,'PK-AAA'),(1582,'74E',1,'PK-AAA'),(1583,'75E',1,'PK-AAA'),(1584,'76E',1,'PK-AAA'),(1585,'77E',1,'PK-AAA'),(1586,'78E',1,'PK-AAA'),(1587,'68F',1,'PK-AAA'),(1588,'69F',1,'PK-AAA'),(1589,'70F',1,'PK-AAA'),(1590,'71F',1,'PK-AAA'),(1591,'72F',1,'PK-AAA'),(1592,'73F',1,'PK-AAA'),(1593,'74F',1,'PK-AAA'),(1594,'75F',1,'PK-AAA'),(1595,'76F',1,'PK-AAA'),(1596,'77F',1,'PK-AAA'),(1597,'78F',1,'PK-AAA'),(1598,'68G',1,'PK-AAA'),(1599,'69G',1,'PK-AAA'),(1600,'70G',1,'PK-AAA'),(1601,'71G',1,'PK-AAA'),(1602,'72G',1,'PK-AAA'),(1603,'73G',1,'PK-AAA'),(1604,'74G',1,'PK-AAA'),(1605,'75G',1,'PK-AAA'),(1606,'76G',1,'PK-AAA'),(1607,'77G',1,'PK-AAA'),(1608,'78G',1,'PK-AAA'),(1609,'68H',1,'PK-AAA'),(1610,'69H',1,'PK-AAA'),(1611,'70H',1,'PK-AAA'),(1612,'71H',1,'PK-AAA'),(1613,'72H',1,'PK-AAA'),(1614,'73H',1,'PK-AAA'),(1615,'74H',1,'PK-AAA'),(1616,'75H',1,'PK-AAA'),(1617,'76H',1,'PK-AAA'),(1618,'77H',1,'PK-AAA'),(1619,'78H',1,'PK-AAA'),(1620,'68J',1,'PK-AAA'),(1621,'69J',1,'PK-AAA'),(1622,'70J',1,'PK-AAA'),(1623,'71J',1,'PK-AAA'),(1624,'72J',1,'PK-AAA'),(1625,'73J',1,'PK-AAA'),(1626,'74J',1,'PK-AAA'),(1627,'75J',1,'PK-AAA'),(1628,'76J',1,'PK-AAA'),(1629,'77J',1,'PK-AAA'),(1630,'78J',1,'PK-AAA'),(1631,'79A',1,'PK-AAA'),(1632,'79B',1,'PK-AAA'),(1633,'79C',1,'PK-AAA'),(1634,'79H',1,'PK-AAA'),(1635,'79J',1,'PK-AAA'),(1636,'79K',1,'PK-AAA'),(1637,'80B',1,'PK-AAA'),(1638,'80C',1,'PK-AAA'),(1639,'80H',1,'PK-AAA'),(1640,'80J',1,'PK-AAA'),(1641,'80B',1,'PK-AAA'),(1642,'80C',1,'PK-AAA'),(1643,'80H',1,'PK-AAA'),(1644,'80J',1,'PK-AAA'),(1645,'81A',1,'PK-AAA'),(1646,'81B',1,'PK-AAA'),(1647,'81C',1,'PK-AAA'),(1648,'81H',1,'PK-AAA'),(1649,'81J',1,'PK-AAA'),(1650,'81K',1,'PK-AAA'),(1651,'82A',1,'PK-AAA'),(1652,'83A',1,'PK-AAA'),(1653,'84A',1,'PK-AAA'),(1654,'82B',1,'PK-AAA'),(1655,'83B',1,'PK-AAA'),(1656,'84B',1,'PK-AAA'),(1657,'82C',1,'PK-AAA'),(1658,'83C',1,'PK-AAA'),(1659,'84C',1,'PK-AAA'),(1660,'82D',1,'PK-AAA'),(1661,'83D',1,'PK-AAA'),(1662,'84D',1,'PK-AAA'),(1663,'82E',1,'PK-AAA'),(1664,'83E',1,'PK-AAA'),(1665,'84E',1,'PK-AAA'),(1666,'82F',1,'PK-AAA'),(1667,'83F',1,'PK-AAA'),(1668,'84F',1,'PK-AAA'),(1669,'82G',1,'PK-AAA'),(1670,'83G',1,'PK-AAA'),(1671,'84G',1,'PK-AAA'),(1672,'82H',1,'PK-AAA'),(1673,'83H',1,'PK-AAA'),(1674,'84H',1,'PK-AAA'),(1675,'82J',1,'PK-AAA'),(1676,'83J',1,'PK-AAA'),(1677,'84J',1,'PK-AAA'),(1678,'82K',1,'PK-AAA'),(1679,'83K',1,'PK-AAA'),(1680,'84K',1,'PK-AAA'),(1681,'85A',1,'PK-AAA'),(1682,'86A',1,'PK-AAA'),(1683,'87A',1,'PK-AAA'),(1684,'88A',1,'PK-AAA'),(1685,'85B',1,'PK-AAA'),(1686,'86B',1,'PK-AAA'),(1687,'87B',1,'PK-AAA'),(1688,'88B',1,'PK-AAA'),(1689,'85C',1,'PK-AAA'),(1690,'86C',1,'PK-AAA'),(1691,'87C',1,'PK-AAA'),(1692,'88C',1,'PK-AAA'),(1693,'85H',1,'PK-AAA'),(1694,'86H',1,'PK-AAA'),(1695,'87H',1,'PK-AAA'),(1696,'88H',1,'PK-AAA'),(1697,'85J',1,'PK-AAA'),(1698,'86J',1,'PK-AAA'),(1699,'87J',1,'PK-AAA'),(1700,'88J',1,'PK-AAA'),(1701,'85K',1,'PK-AAA'),(1702,'86K',1,'PK-AAA'),(1703,'87K',1,'PK-AAA'),(1704,'88K',1,'PK-AAA'),(1705,'1A',3,'PK-AAA'),(1706,'3A',3,'PK-AAA'),(1707,'1E',3,'PK-AAA'),(1708,'3E',3,'PK-AAA'),(1709,'1F',3,'PK-AAA'),(1710,'3F',3,'PK-AAA'),(1711,'1K',3,'PK-AAA'),(1712,'3K',3,'PK-AAA'),(1713,'2A',3,'PK-AAA'),(1714,'2E',3,'PK-AAA'),(1715,'2F',3,'PK-AAA'),(1716,'2K',3,'PK-AAA'),(1717,'4A',3,'PK-AAA'),(1718,'4K',3,'PK-AAA'),(1719,'6D',2,'PK-AAA'),(1720,'6G',2,'PK-AAA'),(1721,'7A',2,'PK-AAA'),(1722,'7E',2,'PK-AAA'),(1723,'7F',2,'PK-AAA'),(1724,'7K',2,'PK-AAA'),(1725,'8B',2,'PK-AAA'),(1726,'8D',2,'PK-AAA'),(1727,'8G',2,'PK-AAA'),(1728,'8J',2,'PK-AAA'),(1729,'9A',2,'PK-AAA'),(1730,'9E',2,'PK-AAA'),(1731,'9F',2,'PK-AAA'),(1732,'9K',2,'PK-AAA'),(1733,'10B',2,'PK-AAA'),(1734,'10D',2,'PK-AAA'),(1735,'10G',2,'PK-AAA'),(1736,'10J',2,'PK-AAA'),(1737,'11A',2,'PK-AAA'),(1738,'11E',2,'PK-AAA'),(1739,'11F',2,'PK-AAA'),(1740,'11K',2,'PK-AAA'),(1741,'12B',2,'PK-AAA'),(1742,'12D',2,'PK-AAA'),(1743,'12G',2,'PK-AAA'),(1744,'12J',2,'PK-AAA'),(1745,'14A',2,'PK-AAA'),(1746,'14E',2,'PK-AAA'),(1747,'14F',2,'PK-AAA'),(1748,'14K',2,'PK-AAA'),(1749,'15B',2,'PK-AAA'),(1750,'15D',2,'PK-AAA'),(1751,'15G',2,'PK-AAA'),(1752,'15J',2,'PK-AAA'),(1753,'16A',2,'PK-AAA'),(1754,'16E',2,'PK-AAA'),(1755,'16F',2,'PK-AAA'),(1756,'16K',2,'PK-AAA'),(1757,'17B',2,'PK-AAA'),(1758,'17D',2,'PK-AAA'),(1759,'17G',2,'PK-AAA'),(1760,'17J',2,'PK-AAA'),(1761,'18A',2,'PK-AAA'),(1762,'18E',2,'PK-AAA'),(1763,'18F',2,'PK-AAA'),(1764,'18K',2,'PK-AAA'),(1765,'19B',2,'PK-AAA'),(1766,'19D',2,'PK-AAA'),(1767,'19G',2,'PK-AAA'),(1768,'19J',2,'PK-AAA'),(1769,'20A',2,'PK-AAA'),(1770,'20E',2,'PK-AAA'),(1771,'20F',2,'PK-AAA'),(1772,'20K',2,'PK-AAA'),(1773,'21B',2,'PK-AAA'),(1774,'21D',2,'PK-AAA'),(1775,'21G',2,'PK-AAA'),(1776,'21J',2,'PK-AAA'),(1777,'22D',2,'PK-AAA'),(1778,'22G',2,'PK-AAA'),(1779,'23A',2,'PK-AAA'),(1780,'23E',2,'PK-AAA'),(1781,'23F',2,'PK-AAA'),(1782,'23K',2,'PK-AAA'),(1783,'24B',2,'PK-AAA'),(1784,'24D',2,'PK-AAA'),(1785,'24G',2,'PK-AAA'),(1786,'24J',2,'PK-AAA'),(1787,'25A',2,'PK-AAA'),(1788,'25E',2,'PK-AAA'),(1789,'25F',2,'PK-AAA'),(1790,'25K',2,'PK-AAA'),(1791,'26B',2,'PK-AAA'),(1792,'26D',2,'PK-AAA'),(1793,'26G',2,'PK-AAA'),(1794,'26J',2,'PK-AAA');
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat_class`
--

DROP TABLE IF EXISTS `seat_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat_class` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `price` double NOT NULL,
  `model_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_seat_class_airplane_model1_idx` (`model_id`),
  CONSTRAINT `fk_seat_class_airplane_model1` FOREIGN KEY (`model_id`) REFERENCES `airplane_model` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat_class`
--

LOCK TABLES `seat_class` WRITE;
/*!40000 ALTER TABLE `seat_class` DISABLE KEYS */;
INSERT INTO `seat_class` VALUES (1,'economy',20000000,3),(2,'business',50000000,3),(3,'first',100000000,3),(5,'economy',17000000,1),(6,'business',40000000,1),(7,'first',80000000,1),(8,'premium economy',30000000,3),(9,'economy',18500000,2),(10,'business',45000000,2),(11,'first',90000000,2);
/*!40000 ALTER TABLE `seat_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'airline_reservation_db'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `delete_expired_pending_bookings` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `delete_expired_pending_bookings` ON SCHEDULE EVERY 60 SECOND STARTS '2024-10-16 01:48:01' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
  DELETE FROM `pending_booking`
  WHERE `created_at` < (NOW() - INTERVAL 5 MINUTE);
END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'airline_reservation_db'
--
/*!50003 DROP FUNCTION IF EXISTS `reservation_priceCalculate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `reservation_priceCalculate`(scheduleID INT, seatID INT) RETURNS int
    READS SQL DATA
BEGIN
	DECLARE multiplier INT;
    DECLARE flightCode VARCHAR(10);
    DECLARE seatClassID INT;
    DECLARE basePrice INT;
    DECLARE dist INT;
    SET multiplier = 15025;
    
    SELECT `flight_code` INTO flightCode FROM `schedule` WHERE `id`=scheduleID;
    SELECT `distance` INTO dist FROM `route` WHERE `flight_code`=flightCode;
    SELECT `seat_class_id` INTO seatClassID FROM `seat` WHERE `id`=seatID;
    SELECT `price` INTO basePrice FROM `seat_class` WHERE `id`=seatClassID;
    
    RETURN (basePrice + (multiplier * dist));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `reservation_validateSeat` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `reservation_validateSeat`(seat_num VARCHAR(10), schdl_id INT, registered_usr_id INT) RETURNS int
    READS SQL DATA
BEGIN
	DECLARE scount INT;
    DECLARE sid INT;
    DECLARE airplane_n VARCHAR(10);
    DECLARE bcount INT;
    DECLARE rbcount INT;
    
    SELECT `airplane_number` INTO airplane_n FROM `schedule` WHERE `id`=schdl_id;
    
    -- Check if valid airplane seat
    SELECT id INTO sid FROM `seat` WHERE `seat_number`=seat_num AND `airplane_number`=airplane_n;
    IF sid IS NULL THEN
		RETURN -1;
	END IF;
    
    -- If someone else has this as pending booking
    SELECT COUNT(*) INTO rbcount FROM `pending_booking` WHERE `seat_id`=sid AND `schedule_id`=schdl_id AND (registered_usr_id IS NULL OR `registered_user_id` != registered_usr_id);
    IF rbcount != 0 THEN
		RETURN -2;
	END IF;
    
    -- If the seat is confirmed in booking for that schedule
    SELECT COUNT(*) INTO bcount FROM `booking` WHERE `seat_id`=sid AND `schedule_id`=schdl_id;
    IF bcount != 0 THEN
		RETURN -3;
	END IF;
    
    RETURN sid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reservation_confirmBooking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservation_confirmBooking`(userID INT, newName VARCHAR(80), newAge INT, newGender VARCHAR(10), newCountryCode VARCHAR(3), newPassportNumber VARCHAR(20), newNIC VARCHAR(20), scheduleID INT, seatNumber VARCHAR(10))
    MODIFIES SQL DATA
BEGIN
	DECLARE errMsg VARCHAR(40);
	DECLARE airplaneNumber VARCHAR(10);
    DECLARE seatID INT;
    DECLARE validUserID INT;
    DECLARE passengerID INT;
    DECLARE pendingSc INT;
    
    DECLARE oldName VARCHAR(80);
    DECLARE oldAge INT;
    DECLARE oldGender VARCHAR(10);
    DECLARE oldPassportNumber VARCHAR(20);
    DECLARE oldNIC VARCHAR(20);
    DECLARE oldCountryCode VARCHAR(10);
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = errMsg;
    END;
    
    START TRANSACTION;
	SET errMsg = 'Transaction Failed.';
    -- Check validity of seat.
    -- Check if booking is already there for said seat.
    SET seatID = reservation_validateSeat(seatNumber, scheduleID, userID);
    
    IF seatID < 0 THEN
		SET errMsg = 'Invalid Seat.';
		SIGNAL SQLSTATE '45000';
    END IF;
	
	-- validate
    -- add passanger if guest, add details if new user without data, if old data is there fetch from that. (maybe update if new data input)
    IF userID IS NOT NULL THEN
		SELECT `id` INTO validUserID FROM `registered_user` WHERE `id`=userID;
		IF validUserID IS NULL THEN
			SET errMsg = 'Invalid User.';
			SIGNAL SQLSTATE '45000';
		END IF;
        -- see if existing passenger details, modify to new stuff, add booking, remove pending booking if exists
        SELECT `passenger_id` INTO passengerID FROM `registered_user` WHERE `id`=userID;
        IF passengerID IS NULL THEN
			INSERT INTO `passenger` (`name`,`age`,`gender`,`passport_number`,`NIC`,`country_code`) VALUES (newName, newAge, newGender, newPassportNumber, newNIC, newCountryCode);
            SELECT LAST_INSERT_ID() INTO passengerID;
            UPDATE `registered_user` SET `passenger_id`=passengerID WHERE `id`=userID;
        ELSE
			SELECT `name`, `age`, `gender`, `passport_number`,`NIC`,`country_code`
			INTO oldName, oldAge, oldGender, oldPassportNumber, oldNIC, oldCountryCode
			FROM `passenger` WHERE `id`=passengerID;
            UPDATE passenger
			SET 
				name = IF(oldName != newName, newName, oldName),                     
				age = IF(oldAge != newAge, newAge, oldAge),                          
				gender = IF(oldGender != newGender, newGender, oldGender),          
				passport_number = IF(oldPassportNumber != newPassportNumber, newPassportNumber, oldPassportNumber),
                NIC = IF(oldNIC != newNIC, newNIC, oldNIC),
                country_code = IF(oldCountryCode != newCountryCode, newCountryCode, oldCountryCode)
			WHERE id = passengerID;
        END IF;
        INSERT INTO `booking` (`registered_user_id`,`date`,`price`,`schedule_id`,`seat_id`,`passenger_id`) VALUES (userID,NOW(),reservation_priceCalculate(scheduleID, seatID),scheduleID,seatID,passengerID);
        SELECT COUNT(*) INTO pendingSc FROM `pending_booking` WHERE `schedule_id`=scheduleID AND `seat_id`=seatID AND `registered_user_id`=userID;
		IF pendingSc = 1 THEN
			DELETE FROM `pending_booking` WHERE `schedule_id`=scheduleID AND `seat_id`=seatID AND `registered_user_id`=userID;
		END IF;
    ELSE
		-- create new passenger with guest details, and confirm booking
		INSERT INTO `passenger` (`name`,`age`,`gender`,`passport_number`,`NIC`,`country_code`) VALUES (newName, newAge, newGender, newPassportNumber, newNIC, newCountryCode);
        SELECT LAST_INSERT_ID() INTO passengerID;
        INSERT INTO `booking` (`registered_user_id`,`date`,`price`,`schedule_id`,`seat_id`,`passenger_id`) VALUES (null,NOW(),reservation_priceCalculate(scheduleID, seatID),scheduleID,seatID,passengerID);
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reservation_flightSearch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservation_flightSearch`(departure_airprt VARCHAR(5), arrival_airprt VARCHAR(5), departure_date VARCHAR(10))
BEGIN
	SELECT 
	schedule.date,
	schedule.delay,
	route.distance,
	route.duration,
	route.departure AS 'departure_airport',
	route.arrival AS 'arrival_airport',
	SUBSTRING_INDEX(departure_location.Full_Hierarchy, ">",1) AS 'arrival_country',
	SUBSTRING_INDEX(arrival_location.Full_Hierarchy, ">",1) AS 'departure_country' 
	FROM schedule 
	LEFT JOIN route ON route.flight_code = schedule.flight_code
	LEFT JOIN locationhierarchy as arrival_location ON route.arrival=arrival_location.code
	LEFT JOIN locationhierarchy AS departure_location ON route.departure=departure_location.code
	WHERE
	schedule.date=departure_date AND
	route.departure=departure_airprt AND
	route.arrival=arrival_airprt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Current Database: `airline_reservation_db`
--

USE `airline_reservation_db`;

--
-- Final view structure for view `locationhierarchy`
--

/*!50001 DROP VIEW IF EXISTS `locationhierarchy`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `locationhierarchy` AS with recursive `locationhierarchy` as (select `location`.`id` AS `id`,`location`.`name` AS `name`,`location`.`parent_id` AS `parent_id`,`location`.`name` AS `location_path` from `location` where (`location`.`parent_id` is null) union all select `l`.`id` AS `id`,`l`.`name` AS `name`,`l`.`parent_id` AS `parent_id`,concat(`lh`.`location_path`,' > ',`l`.`name`) AS `location_path` from (`location` `l` join `locationhierarchy` `lh` on((`l`.`parent_id` = `lh`.`id`)))) select `a`.`code` AS `code`,`a`.`name` AS `Airport_Name`,`lh`.`location_path` AS `Full_Hierarchy` from (`airport` `a` join `locationhierarchy` `lh` on((`a`.`city_id` = `lh`.`id`))) order by `lh`.`location_path` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-22 10:36:22
