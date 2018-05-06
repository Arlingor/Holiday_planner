-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	5.7.16-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Comment` varchar(500) NOT NULL,
  `Nickname` varchar(30) NOT NULL,
  `HolidayID` int(11) NOT NULL,
  `DateTime` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Nickname_idx` (`Nickname`),
  KEY `HolidayID_idx` (`HolidayID`),
  CONSTRAINT `NN` FOREIGN KEY (`Nickname`) REFERENCES `users` (`Nickname`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `commentsHolidayID` FOREIGN KEY (`HolidayID`) REFERENCES `holidays` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Test comment','test',3,'2018-01-27 18:08:45'),(2,'Another comment.','test',3,'2018-08-04 23:04:45'),(3,'Още един коментар.','test',3,'2018-08-08 17:47:29'),(4,'Много готино място за почивка!','test',2,'2018-08-08 17:51:53'),(5,'Много хубаво местенце за отдих! Всичко е перфектно! :)','I.Ivanov',1,'2018-08-08 17:53:25'),(6,'Идеално място за почивка далеч от шумния град.','I.Ivanov',3,'2018-08-08 17:55:20');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holidays`
--

DROP TABLE IF EXISTS `holidays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `holidays` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `HolidayName` varchar(45) NOT NULL,
  `Destinations` varchar(200) NOT NULL,
  `Days` int(11) NOT NULL,
  `Price` double NOT NULL,
  `StartDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDate` datetime NOT NULL,
  `PicturesURL` varchar(3000) NOT NULL DEFAULT 'Pictures\\Holidays\\HolidayNotAvailable.jpg',
  `ShortDescription` varchar(150) NOT NULL,
  `Description` varchar(10000) NOT NULL,
  `VoteUpCount` int(11) NOT NULL DEFAULT '0',
  `VoteDownCount` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holidays`
--

LOCK TABLES `holidays` WRITE;
/*!40000 ALTER TABLE `holidays` DISABLE KEYS */;
INSERT INTO `holidays` VALUES (1,'Chateau Windy Hills','Chateau Windy Hills** край Сливенски минерални бани',2,95,'2018-03-03 14:00:00','2018-08-30 23:59:59','Pictures\\Holidays\\Chateau Windy Hills\\1.jpeg;Pictures\\Holidays\\Chateau Windy Hills\\2.png;Pictures\\Holidays\\Chateau Windy Hills\\3.jpeg;Pictures\\Holidays\\Chateau Windy Hills\\4.png;Pictures\\Holidays\\Chateau Windy Hills\\5.png;Pictures\\Holidays\\Chateau Windy Hills\\6.png;Pictures\\Holidays\\Chateau Windy Hills\\7.jpeg;Pictures\\Holidays\\Chateau Windy Hills\\8.png;Pictures\\Holidays\\Chateau Windy Hills\\9.jpeg;Pictures\\Holidays\\Chateau Windy Hills\\10.png;Pictures\\Holidays\\Chateau Windy Hills\\11.jpeg;Pictures\\Holidays\\Chateau Windy Hills\\12.png','Почивка край Сливенски минерални бани. Две нощувки със закуски и вечери за двама, от Chateau Windy Hills**','	Мечтаете си за романтично бягство от града? Chateau Windy Hills** ви очаква до Сливенски минерални бани, с възможност да опитате отбрани сортове вино от собствената му изба!\nОфертата включва още разходка с екскурзовод из производствените зали, цеха за бутилиране на вината, избата за съхранението им и атракционната кула.\n\n	С предварителна резервация на: 0886 467 444, 0886 977 933.\n	Един ваучер е за двама, настанени в двойна стая.\n	Вечерята е по двустепенно сет меню (основно ястие и десерт), плюс чаша вино (бяло или червено).\n	Офертата включва още разходка с екскурзовод из производствените зали, цеха за бутилиране на вината, избата за съхранението им и атракционната кула.\n\n	Дете до 3 ненавършени години се настанява безплатно.\n	За дете от 3 до 12 ненавършени години, настанено на допълнително легло, се доплащат на рецепция 10лв на ден, на база нощувка със закуска.\n	За дете на и над 12г или трети възрастен на допълнително легло се доплащат на рецепция 20лв на ден, на база нощувка със закуска.\n\n	Chateau Windy Hills е разположено на 12км западно от Сливен на главен път София - Бургас в непосредствена близост до Сливенски минерални бани. Разполага с масив от 420 декара лозови насаждения от висококачествен френски посадъчен материал от сортовете \"Мерло\", \"Каберне Совиньон\", \"Сира\" и \"Александрийски Мускат\". Избата е проектирана за преработка на 500 тона грозде при затворен технологичен цикъл.\n\n	Сградата е разположена в центъра на лозовия масив, а от нейната атракционна кула се открива прекрасна гледка към масива и околностите. Комплекс \"Windy Hills\" разполага с ресторант със зимна и лятна градина с по 80 места. В специално обособената дегустационна зала с 25 места нашите гости могат да дегустират уникалния вкус на вината.\n\n	В четиризвездната хотелска част в Chateau Windy Hills** има 11 уютни двойни стаи за двама, където гостите ни биха могли да прекарат истински релаксиращ уикенд. За посетителите се организира разходка с екскурзовод (технолог винар) из производствените зали, цеха за бутилиране на вината, избата за съхранението им, атракционната кула и други.',2,0),(2,'Хотел Снежанка','Хотел Снежанка*** в центъра на Пампорово',5,215,'2018-03-03 14:00:00','2018-08-30 23:59:59','Pictures\\Holidays\\Снежанка\\1.jpeg;Pictures\\Holidays\\Снежанка\\2.jpeg;Pictures\\Holidays\\Снежанка\\3.jpeg;Pictures\\Holidays\\Снежанка\\4.jpeg;Pictures\\Holidays\\Снежанка\\5.jpeg;Pictures\\Holidays\\Снежанка\\6.jpeg;Pictures\\Holidays\\Снежанка\\7.jpeg;Pictures\\Holidays\\Снежанка\\8.jpeg;Pictures\\Holidays\\Снежанка\\9.jpeg;Pictures\\Holidays\\Снежанка\\10.jpeg;Pictures\\Holidays\\Снежанка\\11.jpeg;Pictures\\Holidays\\Снежанка\\12.jpeg;Pictures\\Holidays\\Снежанка\\13.jpeg;Pictures\\Holidays\\Снежанка\\14.jpeg;Pictures\\Holidays\\Снежанка\\15.jpeg;Pictures\\Holidays\\Снежанка\\16.jpeg','Прохладно лято в Пампорово! 2, 3 или 5 нощувки на база All Inclusive, от Хотел Снежанка***','	Отдайте се на прохлада и релакс през горещото лято в Пампорово! Хотел Снежанка*** ви очаква със страхотно предложение в центъра на любимия ви курорт!\n\n	5 нощувки на база All Inclusive - за 215лв на човек.\n\n	All Inclusive пакетът включва:\n\n		• Закуска от 7:30 - 10:00ч - блок маса в основния ресторант на хотела с включени топли напитки;\n		• Обяд от 12:30 - 14:00ч - блок маса в основния ресторант на хотела с включени напитки - кафе и чай, безалкохолно, минерална вода и българско вино бяло/червено и бира; Обядът може да бъде \"сух пакет\" при заявка на рецепция един ден предварително;\n		• Следобедна закуска от 16:00 - 17:00ч - основния ресторант - пици, сандвичи, дребни сладки, кроасанчета и кекс;\n		• Вечеря от 19:00 - 21:30ч - блок маса в основния ресторант на хотела - кафе и чай, безалкохолно, минерална вода и български алкохолни напитки, вино, бира;\n		• Напитки от 14:00 - 22:00ч - в основния ресторанта на хотела - кафе, чай, безалкохолни напитки, минерална вода, български алкохолни напитки, вино бяло/червено и бира.\n\n	Изхранването е на блок маса при повече от 20 гости.\n\n	С предварителна резервация на: 03095/83 16, 0885 838 410, 02/878 010 и 0887 08 2050.\n\n	Един ваучер е за 1 човек, настанен в двойна стая при двама настанени пълноплащащи.\nОфертата включва още ползване на вътрешен басейн, сауна, Wi-fi, застраховка, туристическа такса, 9% ДДС.\n\n	Дете до 6 ненавършени години се на допълнително легло в двойна стая с двама възрастни се настанява безплатно.\n	За дете от 6 до 12 ненавършени години на допълнително легло в двойна стая се доплащат на рецепция 16лв/ден, на база пакета.\n	За дете от 2 до 12 ненавършени години на редовно легло в двойна стая се доплащат на рецепция 50% от стойността на ваучера за съответния вариант.\n	Възрастен (на и над 12г) на допълнително легло в двойна стая доплаща на рецепция 75% от стойността на ваучера за съответния вариант.\n\n	За настаняване в апартамент е необходимо да се грабнат 3 ваучера.\n\n\n	Хотел Снежанка*** e елегантен хотел с идеално местоположение в центъра на ски курорта Пампорово. Хотелът разполага с 67 двойни стаи и 86 апартамента с общ капацитет oколо 250 гости. Гостите могат да релаксират с питие в модерния 80 местен лоби-бар.\n\n	Ресторантът на хотела предлага уютна атмосфера и разнообразие от ястия с капацитет от 280 места. Може да се насладите на закуска на блок-масата или в комфорта на вашата стая. 80 местната механа е с автентичен родопски интериор. Комплексът включва още дискотека, магазин, детски кът, игрална зала, компютърен клуб, безплатен паркинг и Wi-Fi интернет на своите посетители.',2,0),(3,'Комплекс Старосел','Комплекс Старосел*** в с. Старосел',1,135,'2018-03-03 14:00:00','2018-08-30 23:59:59','Pictures\\Holidays\\Старосел\\1.jpeg;Pictures\\Holidays\\Старосел\\2.jpeg;Pictures\\Holidays\\Старосел\\3.jpeg;Pictures\\Holidays\\Старосел\\4.jpeg;Pictures\\Holidays\\Старосел\\5.jpeg;Pictures\\Holidays\\Старосел\\6.jpeg;Pictures\\Holidays\\Старосел\\7.jpeg;Pictures\\Holidays\\Старосел\\8.jpeg;Pictures\\Holidays\\Старосел\\9.jpeg;Pictures\\Holidays\\Старосел\\10.jpeg;Pictures\\Holidays\\Старосел\\11.jpeg;Pictures\\Holidays\\Старосел\\12.jpeg;Pictures\\Holidays\\Старосел\\13.jpeg;Pictures\\Holidays\\Старосел\\14.jpeg;Pictures\\Holidays\\Старосел\\15.jpeg;Pictures\\Holidays\\Старосел\\16.jpeg','SPA релакс край Хисаря! Нощувка със закуска за трима, от Комплекс Старосел***, с. Старосел','	Чували ли сте за винарска изба Старосел, за останките от тракийска култура по тези места? Дайте си глътка релакс в хотел Старосел***, а може и да отскочите до Хисаря да си налеете лековита вода!\n\n	Делничен пакет: 1 нощувка със закуска в апартамент за трима възрастни, или двама възрастни и две деца до 12г - за 135лв.\n\n	Офертата включва още:\n		• открит и закрит минерален басейн;\n		• джакузи с минерална вода;\n		• парна баня, сауна, релакс зона;\n		• паркинг, интернет;\n		• винен тур.\n\n	Офертата важи за настаняване от Неделя до Четвъртък.\n	С предварителна резервация на: 0897 870 908.\n\n	Анулации, промени по резервации и неявяванане:\n		• Повече от 10 дни от датата на пристигане - 0% от стойността на стаите;\n		• Между 10-тия и до ден преди пристигането - 50% от стойността на стаите;\n		• Анулиране на деня или непристигане се заплаща 100% от стойността на стаите.\n\n	Един ваучер е за трима възрастни или двама възрастни и две деца до 12 ненавършени години, настанени в апартамент в апартхотел Старосел.\n\n	Офертата включва още:\n		• открит и закрит минерален басейн;\n		• джакузи с минерална вода;\n		• парна баня, сауна, релакс зона;\n		• паркинг, интернет;\n		• винен тур.\n\n	Деца до 2 ненавършени години се настаняват безплатно.\n	За едно дете от 2 до 12 ненавършени години се доплащат на рецепция 25лв на ден, на база пакета.\n	За второ дете от 2 до 12 ненавършени години в студио се доплащат на рецепция 15лв на ден, на база пакета.\n\n	Апартамент \"Приятели\" е с две спални за настаняване на четирима възрастни или двама възрастни и две деца.\n\n	За домашни любимци се заплащат 15лв на нощувка, с предварително одобрение на любимеца от ръководството на хотела. Моля да уведомите предварително, ако възнамерявате да посетите хотела с домашен любимец.\n\n\n	Комплексът за винен и SPA туризъм Старосел*** разполага общо с 42 места за настаняване. Интериорът на хотела е изпълнен с естествените материали и ръчно изработените мебели и тъкани, които представят магията на българския фолклор. Съчетанието на топлите цветове с природните извивки на дървото предлагат на гостите едно незабравимо преживяване.\n\n	Винарска изба Старосел е разположена в подножието на древен тракийски храм. Разкритите в и около храма винарски съдове и пособия за правене на вино категорично доказват, че траките са преработвали грозде и пиели вино в околностите на село Старосел още V-VІ век преди Христа.\n\n	Наред с безценните исторически паметници това е още едно наследство, с което като българи трябва да се гордеем. Направените от екипа на д-р Китов археологически разкрития с право нареждат Старосел между най-старите винени тероари в света. ',2,0);
/*!40000 ALTER TABLE `holidays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(200) NOT NULL,
  `TotalPrice` double NOT NULL,
  `DateOrdered` datetime NOT NULL,
  `Nickname` varchar(30) NOT NULL,
  `HolidayID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `UserName_idx` (`Nickname`),
  KEY `ordersHolidayID_idx` (`HolidayID`),
  CONSTRAINT `UserName` FOREIGN KEY (`Nickname`) REFERENCES `users` (`Nickname`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ordersHolidayID` FOREIGN KEY (`HolidayID`) REFERENCES `holidays` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'SPA релакс край Хисаря! Нощувка със закуска за трима, от Комплекс Старосел***, с. Старосел',135,'2018-08-08 17:32:36','I.Ivanov',3),(2,'Прохладно лято в Пампорово! 2, 3 или 5 нощувки на база All Inclusive, от Хотел Снежанка***',215,'2018-08-08 17:33:24','I.Ivanov',2),(3,'Почивка край Сливенски минерални бани. Две нощувки със закуски и вечери за двама, от Chateau Windy Hills**',95,'2018-08-08 17:33:58','test',1),(4,'SPA релакс край Хисаря! Нощувка със закуска за трима, от Комплекс Старосел***, с. Старосел',135,'2018-08-08 17:47:57','test',3);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `Role` varchar(30) NOT NULL,
  `EditSite` bit(1) NOT NULL DEFAULT b'0',
  `WriteComments` bit(1) NOT NULL DEFAULT b'0',
  `VoteHolidays` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('Admin','','',''),('Member','\0','','');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `Nickname` varchar(30) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `Role` varchar(30) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `Surname` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) NOT NULL,
  `Country` varchar(45) NOT NULL,
  `Town` varchar(45) NOT NULL,
  `Address` varchar(200) NOT NULL,
  PRIMARY KEY (`Nickname`),
  KEY `_idx` (`Role`),
  CONSTRAINT `Role` FOREIGN KEY (`Role`) REFERENCES `roles` (`Role`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('I.Ivanov','Admin123','Admin','ivanov@gmail.com','Iskren','I.','Ivanov','Bulgaria','Gabrovo','ul. \"Studentska\" 71, 211'),('test','testQ1','Member','test@asd.bg','test','test','test','test','test','test');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `votes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `HolidayID` int(11) NOT NULL,
  `VoteValue` bit(2) NOT NULL DEFAULT b'1',
  `Nickname` varchar(30) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Nickname_idx` (`Nickname`),
  KEY `votesHolidayID_idx` (`HolidayID`),
  CONSTRAINT `HolidayID` FOREIGN KEY (`HolidayID`) REFERENCES `holidays` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Nickname` FOREIGN KEY (`Nickname`) REFERENCES `users` (`Nickname`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
INSERT INTO `votes` VALUES (6,5,'\0','test'),(8,6,'\0','test'),(9,7,'','test'),(10,8,'\0','test'),(11,1,'','test'),(12,2,'','test'),(13,3,'','test'),(14,4,'\0','test'),(16,1,'','I.Ivanov'),(17,2,'','I.Ivanov'),(18,3,'','I.Ivanov'),(19,4,'\0','I.Ivanov'),(20,6,'','I.Ivanov');
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'mydb'
--

--
-- Dumping routines for database 'mydb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-09  2:12:25