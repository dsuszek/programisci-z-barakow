CREATE TABLE IF NOT EXISTS UserRoles (
id TINYINT PRIMARY KEY AUTO_INCREMENT,
name varchar(30) UNIQUE
);

CREATE TABLE IF NOT EXISTS Users (
id SMALLINT PRIMARY KEY AUTO_INCREMENT,
email varchar(50) UNIQUE,
password varchar(80),
roleId TINYINT,
FOREIGN KEY (roleId) REFERENCES UserRoles (id)
);

CREATE TABLE IF NOT EXISTS JobRoles(
id SMALLINT PRIMARY KEY AUTO_INCREMENT,
name varchar(50) UNIQUE,
description varchar(3000),
link varchar(1000)
);

CREATE TABLE IF NOT EXISTS Bands (
 id SMALLINT PRIMARY KEY AUTO_INCREMENT,
 name varchar(50) UNIQUE NOT NULL,
 level TINYINT NOT NULL
 );
 
CREATE TABLE Token (
id SMALLINT PRIMARY KEY AUTO_INCREMENT,
email varchar(50) NOT NULL,
token varchar(64) NOT NULL,
expiry DATETIME NOT NULL,
FOREIGN KEY (email) REFERENCES Users(email)
);