-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: affiliate
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `f_name` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `contact` varchar(225) NOT NULL,
  `position` enum('L','R') DEFAULT 'L',
  `role` enum('user','admin') DEFAULT 'user',
  `ref_id` varchar(225) DEFAULT NULL,
  `password` varchar(225) NOT NULL,
  `isActive` tinyint(1) DEFAULT '0',
  `l_name` varchar(255) NOT NULL,
  `state` varchar(255) DEFAULT NULL,
  `pin` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `profile_image` longblob,
  `profile_image_name` varchar(225) DEFAULT NULL,
  `aadhar_card` blob,
  `pan_card` blob,
  `address_proof` blob,
  `aadhar_image_name` varchar(225) DEFAULT NULL,
  `pan_image_name` varchar(225) DEFAULT NULL,
  `address_image_name` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `contact` (`contact`),
  KEY `email_2` (`email`),
  KEY `contact_2` (`contact`)
) ENGINE=InnoDB AUTO_INCREMENT=1048 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1001,'Bikram','samalbikram1999@gmail.com','7077866322','L','admin','aff98hj','$2b$10$jdxGidcgSGvzPDSaMoh.EeEEDmXkbth2ORStl17Sr1GyLOfkJQYR6',1,'Samal','OR','751015','BBSR','Jaydev Vihar, Nayapalli, IRC Village',_binary 'Screenshot 2024-04-13 130248.png','1001Screenshot 2024-04-13 130248.png',_binary 'Screenshot 2024-04-26 162610.png',NULL,NULL,'1001aadhar1714739783520Screenshot 2024-04-26 162610.png',NULL,NULL),(1012,'Lipun Dora','dora@explorer.com','8908160343','L','user','','$2b$10$hUZNlYij2ipECEEoEE8kGep8z/hMg1fKDBiqGp0EvDok7MypKSYAW',1,'','null','null','null','null',_binary 'Screenshot 2024-04-13 130248.png','1012Screenshot 2024-04-13 130248.png',NULL,_binary 'Screenshot 2024-04-23 124610.png',_binary 'User Listing.png',NULL,'1012pan1714745961983Screenshot 2024-04-23 124610.png','1012address1714745110748User Listing.png'),(1014,'S. Lipun Dora','dora@theexplorer.com','8908160349','L','user',NULL,'$2b$10$6G8NznJICxJBLxwm0nVIx.Hv/9Kuv54IQYNSbt7TnZrMdQQTXWdQa',0,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1037,'Bikram','sambik@gmail.com','7077890902','L','user','null','$2b$10$CVbsUEP5iaFT0Cd1Hor3HuNksnqrn6EpPbP6BHUxmuHmKM9ua0hI.',0,'','null','null','null','null',NULL,NULL,NULL,_binary 'Screenshot 2024-04-30 200125.png',NULL,NULL,'1037pan1714744302308Screenshot 2024-04-30 200125.png',NULL),(1040,'Mrs. Manasi','manasi@gmail.com','7077866321','R','user','ref_1','$2b$10$RV6NN2/AcmRLrh2qETJWm.2bEiCPPfuVNORSY3.vWePrYokVXQ18.',1,'Samal','OR','751013','BBSR','Jaydev Vihar, Nayapalli, IRC Village',_binary 'cupponstar.png','1040cupponstar.png',_binary 'Registration.png',_binary 'Screenshot 2024-04-23 124610.png',_binary 'User Listing.png','1040aadhar1714739873106Registration.png','1040pan1714741198735Screenshot 2024-04-23 124610.png','1040address1714741429796User Listing.png'),(1046,'Manasi','manasijena@outlook.com','707786632','L','user','','$2b$10$TNWFGDNhi/eE1n8.SHfI.utS5UPpqeH7bZl6A.a4/HP/xiKSBXnma',1,'Jena',NULL,NULL,NULL,NULL,_binary 'bapa.jpg','1046bapa.jpg',NULL,NULL,NULL,NULL,NULL,NULL),(1047,'Bijaya Kumar','bijaya77@outlook.com','7064950078','L','user',NULL,'$2b$10$jXmsS.KvkSHZXKvakUOk9.7pb6VFFlYNeuykWQrW7/q1OyqJ1i8kG',0,'Samal',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-12 19:27:29
