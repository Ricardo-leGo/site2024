CREATE DATABASE MiSitio2024 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE Usuarios (
    Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Usuario VARCHAR(255),
    Name VARCHAR(60),
    LastName VARCHAR(500),
    IdRolFK VARCHAR(3),
    Fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Active TINYINT(1) NOT NULL DEFAULT 1,
    PassWord text NOT NULL,
    CONSTRAINT FK_Usuarios_Roles FOREIGN KEY (IdRolFK) REFERENCES Roles(Id)
);



Crate Table Roles (
    Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Rol varchar(128),


    
)