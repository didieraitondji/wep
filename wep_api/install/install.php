<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wep_db";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $queries = [
        "CREATE TABLE IF NOT EXISTS enseignant (
            id BIGINT NOT NULL AUTO_INCREMENT,
            firstName VARCHAR(255),
            surName VARCHAR(255),
            email VARCHAR(255),
            motDePasse TEXT,
            telephone VARCHAR(20),
            id_departement INT,
            photoPath VARCHAR(255),
            id_Admin INT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "CREATE TABLE IF NOT EXISTS departement (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "CREATE TABLE IF NOT EXISTS etudiant (
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
        "CREATE TABLE IF NOT EXISTS ecu (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            credit INT,
            id_enseignant BIGINT,
            id_ue INT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "CREATE TABLE IF NOT EXISTS ue (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            credit INT,
            id_filiere INT,
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
        "CREATE TABLE IF NOT EXISTS travail (
            id BIGINT NOT NULL AUTO_INCREMENT,
            filePath VARCHAR(255),
            dateSoumission DATE,
            note FLOAT,
            limiteNote INT,
            lien VARCHAR(255),
            id_etudiant BIGINT,
            id_travailpratique BIGINT,
            id_enseignant BIGINT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "CREATE TABLE IF NOT EXISTS travailpratique (
            id BIGINT NOT NULL AUTO_INCREMENT,
            title VARCHAR(255),
            description TEXT,
            datePublier DATE,
            dateSoumission DATE,
            filePath VARCHAR(255),
            id_enseignant BIGINT,
            id_ecu INT,
            id_filiere BIGINT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "CREATE TABLE IF NOT EXISTS messages (
            id BIGINT NOT NULL AUTO_INCREMENT,
            description TEXT,
            filePath VARCHAR(255),
            id_travailpratique BIGINT,
            id_etudiant BIGINT,
            id_enseignant BIGINT,
            id_travail BIGINT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )",
        "ALTER TABLE enseignant ADD CONSTRAINT departement_fk FOREIGN KEY (id_departement)
        REFERENCES departement (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE travailpratique ADD CONSTRAINT enseignant_fk FOREIGN KEY (id_enseignant)
        REFERENCES enseignant (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE ecu ADD CONSTRAINT enseignant_fk FOREIGN KEY (id_enseignant)
        REFERENCES enseignant (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE travailpratique ADD CONSTRAINT ecu_fk FOREIGN KEY (id_ecu)
        REFERENCES ecu (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE travailpratique ADD CONSTRAINT filiere_fk FOREIGN KEY (id_filiere)
        REFERENCES filiere (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE ecu ADD CONSTRAINT ue_fk FOREIGN KEY (id_ue)
        REFERENCES ue (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE ue ADD CONSTRAINT filiere_fk FOREIGN KEY (id_filiere)
        REFERENCES filiere (id) ON DELETE RESTRICT ON UPDATE CASCADE",
        "ALTER TABLE travail ADD CONSTRAINT etudiant_fk FOREIGN KEY (id_etudiant)
        REFERENCES etudiant (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE travail ADD CONSTRAINT travailpratique_fk FOREIGN KEY (id_travailpratique)
        REFERENCES travailpratique (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE travail ADD CONSTRAINT travail_uq UNIQue (id_travailpratique)",
        "ALTER TABLE travail ADD CONSTRAINT enseignant_fk FOREIGN KEY (id_enseignant)
        REFERENCES enseignant (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE messages ADD CONSTRAINT travailpratique_fk FOREIGN KEY (id_travailpratique)
        REFERENCES travailpratique (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE messages ADD CONSTRAINT etudiant_fk FOREIGN KEY (id_etudiant)
        REFERENCES etudiant (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE messages ADD CONSTRAINT enseignant_fk FOREIGN KEY (id_enseignant)
        REFERENCES enseignant (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE etudiant ADD CONSTRAINT filiere_fk FOREIGN KEY (id_filiere)
        REFERENCES filiere (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "CREATE TABLE IF NOT EXISTS enseignantFiliere (
            id_filiere BIGINT NOT NULL,
            id_enseignant BIGINT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id_filiere, id_enseignant)
        )",
        "ALTER TABLE enseignantFiliere ADD CONSTRAINT filiere_fk FOREIGN KEY (id_filiere)
        REFERENCES filiere (id) ON DELETE RESTRICT ON UPDATE CASCADE",
        "ALTER TABLE enseignantFiliere ADD CONSTRAINT enseignant_fk FOREIGN KEY (id_enseignant)
        REFERENCES enseignant (id) ON DELETE RESTRICT ON UPDATE CASCADE",
        "ALTER TABLE messages ADD CONSTRAINT travail_fk FOREIGN KEY (id_travail)
        REFERENCES travail (id) ON DELETE SET NULL ON UPDATE CASCADE",
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
        "ALTER TABLE etudiant ADD CONSTRAINT Admin_fk FOREIGN KEY (id_Admin)
        REFERENCES Admin (id) ON DELETE SET NULL ON UPDATE CASCADE",
        "ALTER TABLE enseignant ADD CONSTRAINT Admin_fk FOREIGN KEY (id_Admin)
        REFERENCES Admin (id) ON DELETE SET NULL ON UPDATE CASCADE"
    ];

    // Execute each query
    foreach ($queries as $query) {
        $stmt = $conn->prepare($query);
        $stmt->execute();
    }

    echo "Tables created successfully !<br />";

    $adminQuery = "INSERT INTO Admin (firstName, surName, motDePasse, email, telephone) 
                   VALueS (:firstName, :surName, :motDePasse, :email, :telephone)";
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
