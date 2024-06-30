<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wep_db";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $queries = [
        "CREATE TABLE IF NOT EXISTS Enseignant (
            id BIGINT NOT NULL AUTO_INCREMENT,
            firstName VARCHAR(255),
            surName VARCHAR(255),
            email VARCHAR(255),
            motDePasse TEXT,
            telephone VARCHAR(20),
            id_Departement INT,
            photoPath VARCHAR(255),
            id_Admin INT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "CREATE TABLE IF NOT EXISTS Departement (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "CREATE TABLE IF NOT EXISTS Etudiant (
            id BIGINT NOT NULL AUTO_INCREMENT,
            firstName VARCHAR(255),
            surName VARCHAR(255),
            email VARCHAR(255),
            motDePasse TEXT,
            telephone VARCHAR(20),
            id_filiere BIGINT,
            photoPath VARCHAR(255),
            id_Admin INT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "CREATE TABLE IF NOT EXISTS Ecu (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            credit INT,
            id_Enseignant BIGINT,
            id_Ue INT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "CREATE TABLE IF NOT EXISTS Ue (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            credit INT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "CREATE TABLE IF NOT EXISTS filiere (
            id BIGINT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "CREATE TABLE IF NOT EXISTS Travail (
            id BIGINT NOT NULL AUTO_INCREMENT,
            filePath VARCHAR(255),
            dateSoumission DATE,
            note FLOAT,
            limiteNote INT,
            lien VARCHAR(255),
            id_Etudiant BIGINT,
            id_travailPratique BIGINT,
            id_Enseignant BIGINT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "CREATE TABLE IF NOT EXISTS travailPratique (
            id BIGINT NOT NULL AUTO_INCREMENT,
            title VARCHAR(255),
            description TEXT,
            datePublier DATE,
            dateSoumission DATE,
            filePath VARCHAR(255),
            id_Enseignant BIGINT,
            id_Ecu INT,
            id_filiere BIGINT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "CREATE TABLE IF NOT EXISTS Messages (
            id BIGINT NOT NULL AUTO_INCREMENT,
            description TEXT,
            filePath VARCHAR(255),
            id_travailPratique BIGINT,
            id_Etudiant BIGINT,
            id_Enseignant BIGINT,
            id_Travail BIGINT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "ALTER TABLE Enseignant ADD CONSTRAINT Departement_fk FOREIGN KEY (id_Departement)
        REFERENCES Departement (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE travailPratique ADD CONSTRAINT Enseignant_fk FOREIGN KEY (id_Enseignant)
        REFERENCES Enseignant (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE Ecu ADD CONSTRAINT Enseignant_fk FOREIGN KEY (id_Enseignant)
        REFERENCES Enseignant (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE travailPratique ADD CONSTRAINT Ecu_fk FOREIGN KEY (id_Ecu)
        REFERENCES Ecu (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE travailPratique ADD CONSTRAINT filiere_fk FOREIGN KEY (id_filiere)
        REFERENCES filiere (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE Ecu ADD CONSTRAINT Ue_fk FOREIGN KEY (id_Ue)
        REFERENCES Ue (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "CREATE TABLE IF NOT EXISTS ueFiliere (
            id_Ue INT NOT NULL,
            id_filiere BIGINT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id_Ue, id_filiere)
        )",
        "ALTER TABLE ueFiliere ADD CONSTRAINT Ue_fk FOREIGN KEY (id_Ue)
        REFERENCES Ue (id) ON DELETE RESTRICT ON UPDATE CASCADE",
        "ALTER TABLE ueFiliere ADD CONSTRAINT filiere_fk FOREIGN KEY (id_filiere)
        REFERENCES filiere (id) ON DELETE RESTRICT ON UPDATE CASCADE",
        "ALTER TABLE Travail ADD CONSTRAINT Etudiant_fk FOREIGN KEY (id_Etudiant)
        REFERENCES Etudiant (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE Travail ADD CONSTRAINT travailPratique_fk FOREIGN KEY (id_travailPratique)
        REFERENCES travailPratique (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE Travail ADD CONSTRAINT Travail_uq UNIQUE (id_travailPratique)",
        "ALTER TABLE Travail ADD CONSTRAINT Enseignant_fk FOREIGN KEY (id_Enseignant)
        REFERENCES Enseignant (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE Messages ADD CONSTRAINT travailPratique_fk FOREIGN KEY (id_travailPratique)
        REFERENCES travailPratique (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE Messages ADD CONSTRAINT Etudiant_fk FOREIGN KEY (id_Etudiant)
        REFERENCES Etudiant (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE Messages ADD CONSTRAINT Enseignant_fk FOREIGN KEY (id_Enseignant)
        REFERENCES Enseignant (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE Etudiant ADD CONSTRAINT filiere_fk FOREIGN KEY (id_filiere)
        REFERENCES filiere (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "CREATE TABLE IF NOT EXISTS enseignantFiliere (
            id_filiere BIGINT NOT NULL,
            id_Enseignant BIGINT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id_filiere, id_Enseignant)
        )",
        "ALTER TABLE enseignantFiliere ADD CONSTRAINT filiere_fk FOREIGN KEY (id_filiere)
        REFERENCES filiere (id) ON DELETE RESTRICT ON UPDATE CASCADE",
        "ALTER TABLE enseignantFiliere ADD CONSTRAINT Enseignant_fk FOREIGN KEY (id_Enseignant)
        REFERENCES Enseignant (id) ON DELETE RESTRICT ON UPDATE CASCADE",
        "ALTER TABLE Messages ADD CONSTRAINT Travail_fk FOREIGN KEY (id_Travail)
        REFERENCES Travail (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "CREATE TABLE IF NOT EXISTS Admin (
            id INT NOT NULL AUTO_INCREMENT,
            firstName VARCHAR(255),
            surName VARCHAR(255),
            motDePasse TEXT,
            email VARCHAR(255),
            telephone VARCHAR(20),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "ALTER TABLE Etudiant ADD CONSTRAINT Admin_fk FOREIGN KEY (id_Admin)
        REFERENCES Admin (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE Enseignant ADD CONSTRAINT Admin_fk FOREIGN KEY (id_Admin)
        REFERENCES Admin (id) ON DELETE SET NULL ON UPDATE CASCADE"
    ];

    // Execute each query
    foreach ($queries as $query) {
        $stmt = $conn->prepare($query);
        $stmt->execute();
    }

    echo "Tables created successfully !<br />";

    $adminQuery = "INSERT INTO Admin (firstName, surName, motDePasse, email, telephone) 
                   VALUES (:firstName, :surName, :motDePasse, :email, :telephone)";
    $stmt = $conn->prepare($adminQuery);
    $stmt->execute([
        ':firstName' => 'Admin',
        ':surName' => 'IMSP',
        ':motDePasse' => password_hash('admin123', PASSWORD_DEFAULT),
        ':email' => 'admin@wep-imsp.com',
        ':telephone' => '+229 97 24 62 27'
    ]);

    echo "<br />Admin created successfully !";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$conn = null;
