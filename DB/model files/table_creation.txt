-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema airline_reservation_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema airline_reservation_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `airline_reservation_db` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `airline_reservation_db` ;

-- -----------------------------------------------------
-- Table `airline_reservation_db`.`airplane_model`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`airplane_model` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`airplane_model` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `capacity` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `name_UNIQUE` ON `airline_reservation_db`.`airplane_model` (`name` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `airline_reservation_db`.`seat_class`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`seat_class` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`seat_class` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `price` DOUBLE NOT NULL,
  `model_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_seat_class_airplane_model1`
    FOREIGN KEY (`model_id`)
    REFERENCES `airline_reservation_db`.`airplane_model` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_seat_class_airplane_model1_idx` ON `airline_reservation_db`.`seat_class` (`model_id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `airline_reservation_db`.`airplane`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`airplane` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`airplane` (
  `tail_number` VARCHAR(6) NOT NULL,
  `status` ENUM('available', 'pending') NOT NULL DEFAULT 'available',
  `model_id` INT NOT NULL,
  PRIMARY KEY (`tail_number`),
  CONSTRAINT `fk_airplane_airplane_model1`
    FOREIGN KEY (`model_id`)
    REFERENCES `airline_reservation_db`.`airplane_model` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_airplane_airplane_model1_idx` ON `airline_reservation_db`.`airplane` (`model_id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `airline_reservation_db`.`seat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`seat` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`seat` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `seat_number` VARCHAR(10) NOT NULL,
  `seat_class_id` INT NOT NULL,
  `airplane_number` VARCHAR(6) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_seat_seat_class`
    FOREIGN KEY (`seat_class_id`)
    REFERENCES `airline_reservation_db`.`seat_class` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_seat_airplane1`
    FOREIGN KEY (`airplane_number`)
    REFERENCES `airline_reservation_db`.`airplane` (`tail_number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_seat_seat_class_idx` ON `airline_reservation_db`.`seat` (`seat_class_id` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_seat_airplane1_idx` ON `airline_reservation_db`.`seat` (`airplane_number` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `airline_reservation_db`.`location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`location` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`location` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `parent_id` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_location_location1`
    FOREIGN KEY (`parent_id`)
    REFERENCES `airline_reservation_db`.`location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_location_location1_idx` ON `airline_reservation_db`.`location` (`parent_id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `airline_reservation_db`.`airport`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`airport` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`airport` (
  `code` VARCHAR(3) NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  `city_id` INT NOT NULL,
  PRIMARY KEY (`code`),
  CONSTRAINT `fk_airport_location1`
    FOREIGN KEY (`city_id`)
    REFERENCES `airline_reservation_db`.`location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_airport_location1_idx` ON `airline_reservation_db`.`airport` (`city_id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `airline_reservation_db`.`route`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`route` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`route` (
  `flight_code` VARCHAR(10) NOT NULL,
  `departure_time` TIME NOT NULL,
  `duration` TIME NOT NULL,
  `distance` INT NOT NULL COMMENT 'Messured in km',
  `departure` VARCHAR(3) NOT NULL,
  `arrival` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`flight_code`),
  CONSTRAINT `fk_route_airport1`
    FOREIGN KEY (`departure`)
    REFERENCES `airline_reservation_db`.`airport` (`code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_route_airport2`
    FOREIGN KEY (`arrival`)
    REFERENCES `airline_reservation_db`.`airport` (`code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_route_airport1_idx` ON `airline_reservation_db`.`route` (`departure` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_route_airport2_idx` ON `airline_reservation_db`.`route` (`arrival` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `airline_reservation_db`.`schedule`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`schedule` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`schedule` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `delay` TIME NOT NULL DEFAULT "00:00:00",
  `date` DATE NOT NULL,
  `airplane_number` VARCHAR(6) NOT NULL,
  `flight_code` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_schedule_airplane1`
    FOREIGN KEY (`airplane_number`)
    REFERENCES `airline_reservation_db`.`airplane` (`tail_number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_schedule_route1`
    FOREIGN KEY (`flight_code`)
    REFERENCES `airline_reservation_db`.`route` (`flight_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_schedule_airplane1_idx` ON `airline_reservation_db`.`schedule` (`airplane_number` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_schedule_route1_idx` ON `airline_reservation_db`.`schedule` (`flight_code` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `airline_reservation_db`.`loyalty_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`loyalty_type` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`loyalty_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `discount` DOUBLE NOT NULL COMMENT 'Can write a trigger to check if number is between 0 and 100 when inserting',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `airline_reservation_db`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`role` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`role` (
  `id` INT NOT NULL,
  `role` VARCHAR(10) NOT NULL,
  `perm_level` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `airline_reservation_db`.`country`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`country` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`country` (
  `code` VARCHAR(3) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`code`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `airline_reservation_db`.`passenger`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`passenger` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`passenger` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `age` INT NOT NULL,
  `gender` ENUM('male', 'female', 'other') NOT NULL,
  `passport_number` VARCHAR(15) NOT NULL,
  `NIC` VARCHAR(45) NULL,
  `country_code` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_passenger_country1`
    FOREIGN KEY (`country_code`)
    REFERENCES `airline_reservation_db`.`country` (`code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `NIC_UNIQUE` ON `airline_reservation_db`.`passenger` (`NIC` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_passenger_country1_idx` ON `airline_reservation_db`.`passenger` (`country_code` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `airline_reservation_db`.`registered_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`registered_user` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`registered_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `loyalty_type_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `passenger_id` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_loyalty_type1`
    FOREIGN KEY (`loyalty_type_id`)
    REFERENCES `airline_reservation_db`.`loyalty_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `airline_reservation_db`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_registered_user_passenger1`
    FOREIGN KEY (`passenger_id`)
    REFERENCES `airline_reservation_db`.`passenger` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `username_UNIQUE` ON `airline_reservation_db`.`registered_user` (`username` ASC) VISIBLE;

SHOW WARNINGS;
CREATE UNIQUE INDEX `email_UNIQUE` ON `airline_reservation_db`.`registered_user` (`email` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_user_loyalty_type1_idx` ON `airline_reservation_db`.`registered_user` (`loyalty_type_id` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_user_role1_idx` ON `airline_reservation_db`.`registered_user` (`role_id` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_registered_user_passenger1_idx` ON `airline_reservation_db`.`registered_user` (`passenger_id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `airline_reservation_db`.`booking`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`booking` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`booking` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `registered_user_id` INT NULL,
  `date` DATETIME NOT NULL,
  `price` DECIMAL NOT NULL,
  `schedule_id` INT NOT NULL,
  `seat_id` INT NOT NULL,
  `passenger_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_booking_user1`
    FOREIGN KEY (`registered_user_id`)
    REFERENCES `airline_reservation_db`.`registered_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_schedule1`
    FOREIGN KEY (`schedule_id`)
    REFERENCES `airline_reservation_db`.`schedule` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_seat1`
    FOREIGN KEY (`seat_id`)
    REFERENCES `airline_reservation_db`.`seat` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_passenger1`
    FOREIGN KEY (`passenger_id`)
    REFERENCES `airline_reservation_db`.`passenger` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_booking_user1_idx` ON `airline_reservation_db`.`booking` (`registered_user_id` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_booking_schedule1_idx` ON `airline_reservation_db`.`booking` (`schedule_id` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_booking_seat1_idx` ON `airline_reservation_db`.`booking` (`seat_id` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_booking_passenger1_idx` ON `airline_reservation_db`.`booking` (`passenger_id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `airline_reservation_db`.`pending_booking`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`pending_booking` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`pending_booking` (
  `schedule_id` INT NOT NULL,
  `seat_id` INT NOT NULL,
  `registered_user_id` INT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`schedule_id`, `seat_id`),
  CONSTRAINT `fk_pending_bookings_schedule1`
    FOREIGN KEY (`schedule_id`)
    REFERENCES `airline_reservation_db`.`schedule` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pending_bookings_user1`
    FOREIGN KEY (`registered_user_id`)
    REFERENCES `airline_reservation_db`.`registered_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pending_bookings_seat1`
    FOREIGN KEY (`seat_id`)
    REFERENCES `airline_reservation_db`.`seat` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_pending_bookings_schedule1_idx` ON `airline_reservation_db`.`pending_booking` (`schedule_id` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_pending_bookings_user1_idx` ON `airline_reservation_db`.`pending_booking` (`registered_user_id` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_pending_bookings_seat1_idx` ON `airline_reservation_db`.`pending_booking` (`seat_id` ASC) VISIBLE;

SHOW WARNINGS;
USE `airline_reservation_db` ;

-- -----------------------------------------------------
-- Placeholder table for view `airline_reservation_db`.`LocationHierarchy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `airline_reservation_db`.`LocationHierarchy` (`id` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- function reservation_validateSeat
-- -----------------------------------------------------

USE `airline_reservation_db`;
DROP function IF EXISTS `airline_reservation_db`.`reservation_validateSeat`;
SHOW WARNINGS;

DELIMITER $$
USE `airline_reservation_db`$$
CREATE FUNCTION `reservation_validateSeat` (seat_num VARCHAR(10), schdl_id INT, registered_usr_id INT)
RETURNS INT
NOT DETERMINISTIC
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
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure reservation_confirmBooking
-- -----------------------------------------------------

USE `airline_reservation_db`;
DROP procedure IF EXISTS `airline_reservation_db`.`reservation_confirmBooking`;
SHOW WARNINGS;

DELIMITER $$
USE `airline_reservation_db`$$
CREATE PROCEDURE `reservation_confirmBooking` (userID INT, newName VARCHAR(80), newAge INT, newGender VARCHAR(10), newCountryCode VARCHAR(3), newPassportNumber VARCHAR(20), newNIC VARCHAR(20), scheduleID INT, seatNumber VARCHAR(10))
NOT DETERMINISTIC
READS SQL DATA
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
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- function reservation_priceCalculate
-- -----------------------------------------------------

USE `airline_reservation_db`;
DROP function IF EXISTS `airline_reservation_db`.`reservation_priceCalculate`;
SHOW WARNINGS;

DELIMITER $$
USE `airline_reservation_db`$$
CREATE FUNCTION `reservation_priceCalculate` (scheduleID INT, seatID INT)
RETURNS INT
NOT DETERMINISTIC
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
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure reservation_flightSearch
-- -----------------------------------------------------

USE `airline_reservation_db`;
DROP procedure IF EXISTS `airline_reservation_db`.`reservation_flightSearch`;
SHOW WARNINGS;

DELIMITER $$
USE `airline_reservation_db`$$
CREATE PROCEDURE `reservation_flightSearch` (departure_airprt VARCHAR(5), arrival_airprt VARCHAR(5), departure_date VARCHAR(10))
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
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `airline_reservation_db`.`LocationHierarchy`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `airline_reservation_db`.`LocationHierarchy`;
SHOW WARNINGS;
DROP VIEW IF EXISTS `airline_reservation_db`.`LocationHierarchy` ;
SHOW WARNINGS;
USE `airline_reservation_db`;
CREATE  OR REPLACE VIEW `LocationHierarchy` AS
WITH RECURSIVE LocationHierarchy AS (
    SELECT 
        id, 
        name, 
        parent_id,
        name AS location_path 
    FROM location
    WHERE parent_id IS NULL

    UNION ALL
    
    SELECT 
        l.id, 
        l.name, 
        l.parent_id,
        CONCAT(lh.location_path, ' > ', l.name) AS location_path
    FROM location l
    INNER JOIN LocationHierarchy lh ON l.parent_id = lh.id
)

SELECT 
    a.code, 
    a.name AS Airport_Name,
    lh.location_path AS Full_Hierarchy
FROM airport a  
JOIN LocationHierarchy lh ON a.city_id = lh.id
ORDER BY lh.location_path;
SHOW WARNINGS;
USE `airline_reservation_db`;

DELIMITER $$

USE `airline_reservation_db`$$
DROP TRIGGER IF EXISTS `airline_reservation_db`.`passenger_BEFORE_INSERT` $$
SHOW WARNINGS$$
USE `airline_reservation_db`$$
CREATE DEFINER = CURRENT_USER TRIGGER `airline_reservation_db`.`passenger_BEFORE_INSERT` BEFORE INSERT ON `passenger` FOR EACH ROW
BEGIN
	IF NEW.age <= 0 OR NEW.age >= 150 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid age: must be greater than 0 and less than 150';
    END IF;
END$$

SHOW WARNINGS$$

DELIMITER ;
SET SQL_MODE = '';
DROP USER IF EXISTS bAir_dbadmin;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SHOW WARNINGS;
CREATE USER 'bAir_dbadmin' IDENTIFIED BY '12341234';

GRANT ALL ON `airline_reservation_db`.* TO 'bAir_dbadmin';
SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
