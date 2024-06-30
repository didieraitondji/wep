<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wep_db";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Insert default data into Departement table
    $departementQuery = "INSERT INTO Departement (name) VALUES (:name)";
    $stmt = $conn->prepare($departementQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([':name' => 'Departement' . $i]);
    }

    // Insert default data into Enseignant table
    $enseignantQuery = "INSERT INTO Enseignant (firstName, surName, email, motDePasse, telephone, id_Departement, photoPath, id_Admin) 
                        VALUES (:firstName, :surName, :email, :motDePasse, :telephone, :id_Departement, :photoPath, :id_Admin)";
    $stmt = $conn->prepare($enseignantQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([
            ':firstName' => 'EnseignantFirst' . $i,
            ':surName' => 'EnseignantLast' . $i,
            ':email' => 'enseignant' . $i . '@example.com',
            ':motDePasse' => password_hash('enseignant123', PASSWORD_DEFAULT), // Hash the password for security
            ':telephone' => '23456789' . $i,
            ':id_Departement' => $i,
            ':photoPath' => 'path/to/photo' . $i,
            ':id_Admin' => 1
        ]);
    }

    // Insert default data into Etudiant table
    $etudiantQuery = "INSERT INTO Etudiant (firstName, surName, email, motDePasse, telephone, id_filiere, photoPath, id_Admin) 
                      VALUES (:firstName, :surName, :email, :motDePasse, :telephone, :id_filiere, :photoPath, :id_Admin)";
    $stmt = $conn->prepare($etudiantQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([
            ':firstName' => 'EtudiantFirst' . $i,
            ':surName' => 'EtudiantLast' . $i,
            ':email' => 'etudiant' . $i . '@example.com',
            ':motDePasse' => password_hash('etudiant123', PASSWORD_DEFAULT), // Hash the password for security
            ':telephone' => '34567890' . $i,
            ':id_filiere' => $i,
            ':photoPath' => 'path/to/photo' . $i,
            ':id_Admin' => 1
        ]);
    }

    // Insert default data into Ecu table
    $ecuQuery = "INSERT INTO Ecu (name, credit, id_Enseignant, id_Ue) VALUES (:name, :credit, :id_Enseignant, :id_Ue)";
    $stmt = $conn->prepare($ecuQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([
            ':name' => 'Ecu' . $i,
            ':credit' => 3,
            ':id_Enseignant' => $i,
            ':id_Ue' => $i
        ]);
    }

    // Insert default data into Ue table
    $ueQuery = "INSERT INTO Ue (name, credit) VALUES (:name, :credit)";
    $stmt = $conn->prepare($ueQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([
            ':name' => 'Ue' . $i,
            ':credit' => 6
        ]);
    }

    // Insert default data into Filiere table
    $filiereQuery = "INSERT INTO Filiere (name) VALUES (:name)";
    $stmt = $conn->prepare($filiereQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([':name' => 'Filiere' . $i]);
    }

    // Insert default data into Travail table
    $travailQuery = "INSERT INTO Travail (filePath, dateSoumission, note, limiteNote, lien, id_Etudiant, id_travailPratique, id_Enseignant) 
                     VALUES (:filePath, :dateSoumission, :note, :limiteNote, :lien, :id_Etudiant, :id_travailPratique, :id_Enseignant)";
    $stmt = $conn->prepare($travailQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([
            ':filePath' => 'path/to/file' . $i,
            ':dateSoumission' => date('Y-m-d'),
            ':note' => rand(0, 20),
            ':limiteNote' => 20,
            ':lien' => 'http://example.com/travail' . $i,
            ':id_Etudiant' => $i,
            ':id_travailPratique' => $i,
            ':id_Enseignant' => $i
        ]);
    }

    // Insert default data into TravailPratique table
    $travailPratiqueQuery = "INSERT INTO TravailPratique (title, description, datePublier, dateSoumission, filePath, id_Enseignant, id_Ecu, id_filiere) 
                             VALUES (:title, :description, :datePublier, :dateSoumission, :filePath, :id_Enseignant, :id_Ecu, :id_filiere)";
    $stmt = $conn->prepare($travailPratiqueQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([
            ':title' => 'Travail Pratique ' . $i,
            ':description' => 'Description of Travail Pratique ' . $i,
            ':datePublier' => date('Y-m-d'),
            ':dateSoumission' => date('Y-m-d', strtotime('+1 week')),
            ':filePath' => 'path/to/travailpratique' . $i,
            ':id_Enseignant' => $i,
            ':id_Ecu' => $i,
            ':id_filiere' => $i
        ]);
    }

    // Insert default data into Messages table
    $messagesQuery = "INSERT INTO Messages (description, filePath, id_travailPratique, id_Etudiant, id_Enseignant, id_Travail) 
                      VALUES (:description, :filePath, :id_travailPratique, :id_Etudiant, :id_Enseignant, :id_Travail)";
    $stmt = $conn->prepare($messagesQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([
            ':description' => 'Message ' . $i,
            ':filePath' => 'path/to/message' . $i,
            ':id_travailPratique' => $i,
            ':id_Etudiant' => $i,
            ':id_Enseignant' => $i,
            ':id_Travail' => $i
        ]);
    }

    echo "<br /><br /> Default data inserted successfully";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$conn = null;
