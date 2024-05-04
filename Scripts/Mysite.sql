CREATE DATABASE MiSitio2024 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE Usuarios (
    Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Usuario VARCHAR(255),
    `Name` VARCHAR(60),
    LastName VARCHAR(500),
    IdRolFK VARCHAR(3),
    Fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `Active` TINYINT(1) NOT NULL DEFAULT 1,
    PassWord text NOT NULL,
    CONSTRAINT FK_Usuarios_Roles FOREIGN KEY (IdRolFK) REFERENCES Roles(Id)
);



Create Table Roles (
    Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Rol varchar(128)
);

Create Table Permisos (

    Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Permiso text null
)

Create Table RolesPermisos(
    Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    IdRolFK int not null,
    IdPermisoFK int not  null
    CONSTRAINT Fk_RolesPermisos_Roles FOREIGN KEY ( IdRolFK ) REFERENCES Roles(ID),
    CONSTRAINT Fk_RolesPermisos_Permisos FOREIGN KEY ( IdPermisoFK ) REFERENCES Permisos(ID)
)


Create Table UsuariosRoles(
    
    Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    IdRolFK int not null,
    IdUsuarioFK int not null, 
    CONSTRAINT Fk_UsuariosRoles_Roles FOREIGN KEY ( IdRolFK ) REFERENCES Roles(ID),
    CONSTRAINT Fk_UsuariosRoles_Usuarios FOREIGN KEY ( IdUsuarioFK ) REFERENCES Usuarios(ID)

)

Create Table Menu(
    Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Position int null, 
    `Name` Varchar(30) null, 
    `Type` varchar(30) null default  "Container", 
    Active bit not null default 1
);


Create Table SubMenu(
    Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `Name` Varchar(30) null,
    `Order` varchar(20) null
    
);








