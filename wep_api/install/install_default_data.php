<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wep_db";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Insert default data into departement table
    $departementQuery = "INSERT INTO departement (name) VALueS (:name)";
    $stmt = $conn->prepare($departementQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([':name' => 'departement' . $i]);
    }

    // Insert default data into enseignant table
    $enseignantQuery = "INSERT INTO enseignant (firstName, surName, email, motDePasse, telephone, id_departement, photoPath, id_Admin) 
                        VALueS (:firstName, :surName, :email, :motDePasse, :telephone, :id_departement, :photoPath, :id_Admin)";
    $stmt = $conn->prepare($enseignantQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([
            ':firstName' => 'enseignantFirst' . $i,
            ':surName' => 'enseignantLast' . $i,
            ':email' => 'enseignant' . $i . '@example.com',
            ':motDePasse' => password_hash('enseignant123', PASSWORD_DEFAULT), // Hash the password for security
            ':telephone' => '23456789' . $i,
            ':id_departement' => $i,
            ':photoPath' => 'path/to/photo' . $i,
            ':id_Admin' => 1
        ]);
    }

    // Insert default data into etudiant table
    $etudiantQuery = "INSERT INTO etudiant (firstName, surName, email, motDePasse, telephone, id_filiere, photoPath, id_Admin) 
                      VALueS (:firstName, :surName, :email, :motDePasse, :telephone, :id_filiere, :photoPath, :id_Admin)";
    $stmt = $conn->prepare($etudiantQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([
            ':firstName' => 'etudiantFirst' . $i,
            ':surName' => 'etudiantLast' . $i,
            ':email' => 'etudiant' . $i . '@example.com',
            ':motDePasse' => password_hash('etudiant123', PASSWORD_DEFAULT), // Hash the password for security
            ':telephone' => '34567890' . $i,
            ':id_filiere' => $i,
            ':photoPath' => 'path/to/photo' . $i,
            ':id_Admin' => 1
        ]);
    }

    // Insert default data into ecu table
    $ecuQuery = "INSERT INTO ecu (name, credit, id_enseignant, id_ue) VALueS (:name, :credit, :id_enseignant, :id_ue)";
    $stmt = $conn->prepare($ecuQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([
            ':name' => 'ecu' . $i,
            ':credit' => 3,
            ':id_enseignant' => $i,
            ':id_ue' => $i
        ]);
    }

    // Insert default data into ue table
    $ueQuery = "INSERT INTO ue (name, credit) VALueS (:name, :credit)";
    $stmt = $conn->prepare($ueQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([
            ':name' => 'ue' . $i,
            ':credit' => 6
        ]);
    }

    // Insert default data into Filiere table
    $filiereQuery = "INSERT INTO Filiere (name) VALueS (:name)";
    $stmt = $conn->prepare($filiereQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([':name' => 'Filiere' . $i]);
    }

    // Insert default data into travail table
    $travailQuery = "INSERT INTO travail (filePath, dateSoumission, note, limiteNote, lien, id_etudiant, id_travailpratique, id_enseignant) 
                     VALueS (:filePath, :dateSoumission, :note, :limiteNote, :lien, :id_etudiant, :id_travailpratique, :id_enseignant)";
    $stmt = $conn->prepare($travailQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([
            ':filePath' => 'path/to/file' . $i,
            ':dateSoumission' => date('Y-m-d'),
            ':note' => rand(0, 20),
            ':limiteNote' => 20,
            ':lien' => 'http://example.com/travail' . $i,
            ':id_etudiant' => $i,
            ':id_travailpratique' => $i,
            ':id_enseignant' => $i
        ]);
    }

    // Insert default data into travailpratique table
    $travailpratiqueQuery = "INSERT INTO travailpratique (title, description, datePublier, dateSoumission, filePath, id_enseignant, id_ecu, id_filiere) 
                             VALueS (:title, :description, :datePublier, :dateSoumission, :filePath, :id_enseignant, :id_ecu, :id_filiere)";
    $stmt = $conn->prepare($travailpratiqueQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([
            ':title' => 'travail Pratique ' . $i,
            ':description' => 'Description of travail Pratique ' . $i,
            ':datePublier' => date('Y-m-d'),
            ':dateSoumission' => date('Y-m-d', strtotime('+1 week')),
            ':filePath' => 'path/to/travailpratique' . $i,
            ':id_enseignant' => $i,
            ':id_ecu' => $i,
            ':id_filiere' => $i
        ]);
    }

    // Insert default data into messages table
    $messagesQuery = "INSERT INTO messages (description, filePath, id_travailpratique, id_etudiant, id_enseignant, id_travail) 
                      VALueS (:description, :filePath, :id_travailpratique, :id_etudiant, :id_enseignant, :id_travail)";
    $stmt = $conn->prepare($messagesQuery);
    for ($i = 1; $i <= 4; $i++) {
        $stmt->execute([
            ':description' => 'Message ' . $i,
            ':filePath' => 'path/to/message' . $i,
            ':id_travailpratique' => $i,
            ':id_etudiant' => $i,
            ':id_enseignant' => $i,
            ':id_travail' => $i
        ]);
    }

    echo "<br /><br /> Default data inserted successfully";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$conn = null;
