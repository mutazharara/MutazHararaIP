-- MySQL dump 10.13  Distrib 9.6.0, for macos15 (arm64)
--
-- Host: localhost    Database: mamo_family_expense_tracker
-- ------------------------------------------------------
-- Server version	9.6.0

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
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `date` date NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (3,'Water','Bills',400,'2026-04-30','Water bill for Apr','2026-04-08 20:45:14'),(4,'Rent','Housing',800,'2026-04-19','ASD','2026-04-08 20:46:34'),(5,'Cinema','Food',70,'2026-02-08','asd','2026-04-08 20:47:54'),(6,'Shopping','Shopping',600,'2026-01-01','aswwww','2026-04-08 20:53:26'),(7,'Uber','Transport',60,'2026-04-09','Car to UTS ttt','2026-04-08 22:38:46'),(8,'Youtube','Subscriptions',20,'2026-04-25','','2026-04-08 22:40:38'),(9,'Water Bill','Bills',200,'2026-04-13','This bill for three months','2026-04-13 12:24:08'),(10,'Water','Bills',123,'2026-04-13','asdasd','2026-04-13 12:31:12'),(13,'Paying spring water 600 ML','Shopping',1,'2026-05-12','600 ML ..\n','2026-05-12 19:44:26'),(14,'Buy new TV LG','Shopping',950,'2026-05-14','LG TV from HIGIBI','2026-05-14 19:12:02'),(15,'Pizza','Food',25,'2026-05-14','sipasdasd asds','2026-05-14 22:01:30'),(16,'Renew Youtube subscribition','Subscriptions',24,'2026-05-15','oooo','2026-05-14 23:25:10'),(17,'Bottle of Water','Food',6,'2026-05-16','I purchased a bottle of water for 6','2026-05-16 21:39:41'),(18,'Cake','Food',5,'2026-05-16','','2026-05-16 21:42:56'),(19,'Chips','Food',3,'2026-05-16','I bought chips for $3','2026-05-16 22:16:02'),(20,'YouTube','Subscriptions',30,'2026-05-16','','2026-05-16 23:33:06'),(21,'Car Fuel','Transport',60,'2026-05-16','Fuel for car','2026-05-16 23:53:26'),(22,'Chocolate','Food',5,'2026-05-17','','2026-05-17 15:18:41');
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_user_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Mutaz S Harara','mutaz@test.com','$2b$12$MKrzma2O1lgTyehMwWeoluUVn0Jjmyb/egwR6h1OBxygNBzeXyX.6','user',1,'2026-05-04 21:24:46'),(2,'ali harara','ali@test.com','$2b$12$XqajIb3z18kk45mJn2R/j.QJAYGkyNDi9KZs1TvnUyhwmwjWqtbzC','user',1,'2026-05-13 01:30:10'),(3,'Ahmed','ahmed@test.com','$2b$12$9enhPLXOjnIBT7t.SccVC.4ajefkWB04MRWSTLotG7PrclMFDIfQ.','user',1,'2026-05-13 19:41:33'),(4,'admin','admin@admin.com','$2b$12$Dsk6GtDl8XT7ZM24grfLRu1cOpAAg.o.DK0wlMd8pMqvd9UQf.3NG','admin',1,'2026-05-13 23:10:15'),(5,'baraa','baraa@test.com','$2b$12$gwJUJgD8znL0bCk5w3fZ/.McNNRzzsZlivQY1HJc53a0oIwKKsJnC','user',1,'2026-05-16 18:44:30'),(6,'Tareq Harara','tareq@test.com','$2b$12$XIlQDo2IwHrZVwamBS8M7uhXRwI3MMBVySAaByu2HNnhXqYjSkPOm','user',0,'2026-05-16 18:52:22');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useractivity`
--

DROP TABLE IF EXISTS `useractivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useractivity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `action` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useractivity`
--

LOCK TABLES `useractivity` WRITE;
/*!40000 ALTER TABLE `useractivity` DISABLE KEYS */;
INSERT INTO `useractivity` VALUES (1,1,'LOGIN','Mutaz logged in','2026-05-04 21:26:02'),(2,1,'LOGIN','Mutaz logged in','2026-05-04 21:28:16'),(3,1,'LOGIN','Mutaz logged in','2026-05-12 19:39:21'),(4,1,'LOGIN','Mutaz logged in','2026-05-13 01:20:44'),(5,2,'LOGIN','ali logged in','2026-05-13 01:30:17'),(6,1,'LOGIN','Mutaz harara logged in','2026-05-13 19:16:45'),(7,3,'LOGIN','Ahmed logged in','2026-05-13 19:41:42'),(8,1,'LOGIN','Mutaz harara logged in','2026-05-13 21:38:37'),(9,1,'LOGIN','Mutaz Harara logged in','2026-05-13 12:18:04'),(10,1,'UPDATE_EXPENSE','Updated expense: Gas','2026-05-13 12:18:51'),(11,1,'UPDATE_EXPENSE','Updated expense: Cinema','2026-05-13 12:19:11'),(12,1,'UPDATE_EXPENSE','Updated expense: Shopping','2026-05-13 12:32:41'),(13,1,'UPDATE_EXPENSE','Updated expense: Shopping','2026-05-13 12:33:54'),(14,1,'UPDATE_EXPENSE','Updated expense: Cinema','2026-05-13 12:45:23'),(15,1,'UPDATE_EXPENSE','Updated expense: Cinema','2026-05-13 13:05:20'),(16,1,'UPDATE_EXPENSE','Updated expense: Cinema','2026-05-13 13:05:30'),(17,4,'LOGIN','admin logged in','2026-05-13 13:16:46'),(18,4,'LOGIN','admin logged in','2026-05-13 13:29:50'),(19,1,'LOGIN','Mutaz Harara logged in','2026-05-13 14:50:18'),(20,4,'LOGIN','admin logged in','2026-05-13 14:51:19'),(21,1,'LOGIN','Mutaz Harara logged in','2026-05-14 03:07:31'),(22,1,'UPDATE_EXPENSE','Updated expense: Shopping','2026-05-14 03:07:56'),(23,1,'DELETE_EXPENSE','Deleted expense: Gas','2026-05-14 03:08:06'),(24,4,'LOGIN','admin logged in','2026-05-14 03:24:57'),(25,4,'LOGIN','admin logged in','2026-05-14 03:26:01'),(26,1,'LOGIN','Mutaz Harara logged in','2026-05-14 04:08:26'),(27,1,'LOGIN','Mutaz Harara logged in','2026-05-14 04:08:35'),(28,1,'LOGIN','Mutaz Harara logged in','2026-05-14 04:13:00'),(29,1,'LOGIN','Mutaz Harara logged in','2026-05-14 04:15:11'),(30,4,'LOGIN','admin logged in','2026-05-14 04:21:10'),(31,4,'UPDATE_EXPENSE','Updated expense: Uber','2026-05-14 04:21:26'),(32,4,'DELETE_EXPENSE','Deleted expense: Power Bill','2026-05-14 04:21:38'),(33,4,'LOGIN','admin logged in','2026-05-14 05:35:59'),(34,4,'LOGIN','admin logged in','2026-05-14 09:02:59'),(35,1,'LOGIN','Mutaz Harara logged in','2026-05-14 09:03:52'),(36,1,'UPDATE_EXPENSE','Updated expense: Paying spring water 600 ML','2026-05-14 09:04:33'),(37,1,'CREATE_EXPENSE','Created expense: Buy new TV','2026-05-14 09:12:02'),(38,4,'LOGIN','admin logged in','2026-05-14 11:59:22'),(39,4,'UPDATE_EXPENSE','Updated expense: Buy new TV LG','2026-05-14 11:59:52'),(40,4,'CREATE_EXPENSE','Created expense: Pizza','2026-05-14 12:01:30'),(41,4,'UPDATE_EXPENSE','Updated expense: Pizza','2026-05-14 12:13:37'),(42,4,'UPDATE_EXPENSE','Updated expense: Pizza','2026-05-14 12:13:44'),(43,4,'LOGIN','admin logged in','2026-05-14 13:15:14'),(44,4,'CREATE_EXPENSE','Created expense: Renew Youtube subscribition','2026-05-14 13:25:10'),(45,4,'UPDATE_EXPENSE','Updated expense: Pizza','2026-05-14 14:13:21'),(46,4,'UPDATE_EXPENSE','Updated expense: Pizza','2026-05-14 14:13:47'),(47,4,'LOGIN','admin logged in','2026-05-15 03:25:35'),(48,4,'LOGIN','admin logged in','2026-05-15 12:30:59'),(49,4,'LOGIN','admin logged in','2026-05-15 12:32:21'),(50,1,'LOGIN','Mutaz Harara logged in','2026-05-15 12:35:16'),(51,1,'LOGIN','Mutaz Harara logged in','2026-05-15 12:35:27'),(52,4,'LOGIN','admin logged in','2026-05-16 06:54:19'),(53,4,'LOGIN','admin logged in','2026-05-16 07:57:09'),(54,1,'LOGIN','Mutaz Harara logged in','2026-05-16 08:08:09'),(55,4,'LOGIN','admin logged in','2026-05-16 08:08:20'),(56,4,'LOGIN','admin logged in','2026-05-16 08:54:36'),(57,4,'LOGIN','admin logged in','2026-05-16 10:46:52'),(58,4,'LOGIN','admin logged in','2026-05-16 11:38:38'),(59,4,'CREATE_EXPENSE','Created expense: Bottle of Water','2026-05-16 11:39:41'),(60,4,'LOGIN','admin logged in','2026-05-16 11:42:10'),(61,4,'CREATE_EXPENSE','Created expense: Cake','2026-05-16 11:42:56'),(62,4,'CREATE_EXPENSE','Created expense: Chips','2026-05-16 12:16:02'),(63,4,'LOGIN','admin logged in','2026-05-16 13:22:26'),(64,4,'LOGIN','admin logged in','2026-05-16 13:30:32'),(65,4,'CREATE_EXPENSE','Created expense: YouTube','2026-05-16 13:33:06'),(66,4,'CREATE_EXPENSE','Created expense: Car Fuel','2026-05-16 13:53:26'),(67,4,'LOGIN','admin logged in','2026-05-17 01:17:50'),(68,4,'LOGIN','admin logged in','2026-05-17 03:31:19'),(69,4,'LOGIN','admin logged in','2026-05-17 04:53:18'),(70,1,'LOGIN','Mutaz Harara logged in','2026-05-17 05:17:42'),(71,1,'CREATE_EXPENSE','Created expense: Chocolate','2026-05-17 05:18:41'),(72,1,'LOGIN','Mutaz Harara logged in','2026-05-17 05:33:45'),(73,4,'LOGIN','admin logged in','2026-05-17 05:33:50'),(74,1,'LOGIN','Mutaz Harara logged in','2026-05-17 05:34:13'),(75,1,'LOGIN','Mutaz Harara logged in','2026-05-17 05:34:26'),(76,1,'LOGIN','Mutaz Harara logged in','2026-05-17 05:36:59'),(77,4,'LOGIN','admin logged in','2026-05-17 05:37:12'),(78,1,'LOGIN','Mutaz Harara logged in','2026-05-17 05:44:45'),(79,1,'LOGIN','Mutaz S Harara logged in','2026-05-17 06:40:24'),(80,4,'LOGIN','admin logged in','2026-05-17 06:40:47'),(81,4,'LOGIN','admin logged in','2026-05-17 07:13:02'),(82,4,'LOGIN','admin logged in','2026-05-17 07:13:08'),(83,1,'LOGIN','Mutaz S Harara logged in','2026-05-17 07:16:48'),(84,4,'LOGIN','admin logged in','2026-05-17 07:46:43');
/*!40000 ALTER TABLE `useractivity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-17 18:34:57
