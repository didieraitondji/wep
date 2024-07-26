<?php

require("./vendor/autoload.php");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = "chancelle@didier@eliel-2024";

// fonction pour créer un token
function generateJWT($userId, $secretKey)
{
    $issuedAt = time();
    $expirationTime = $issuedAt + 3600;  // jwt valide pour 1 heure
    $payload = array(
        'iat' => $issuedAt,
        'exp' => $expirationTime,
        'id' => $userId
    );

    $jwt = JWT::encode($payload, $secretKey, 'HS256');
    return $jwt;
}

// fonction pour vérifier un token
/* function verifyJWT($jwt, $secretKey)
{
    try {
        $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
        return (array) $decoded;
    } catch (Exception $e) {
        return false;
    }
} */

function verifyJWT()
{
    global $secretKey;
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    if ($authHeader) {
        list($jwt) = sscanf($authHeader, 'Bearer %s');

        if ($jwt) {
            try {

                $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));

                // Décoder le JWT retourne un objet, le convertir en tableau
                $decodedArray = (array) $decoded;

                // Vérifier si l'ID existe dans les données décodées
                if (isset($decodedArray['id'])) {
                    return $decodedArray['id'];
                } else {
                    http_response_code(400);
                    echo json_encode(["message" => "ID non trouvé dans le token"]);
                    exit;
                }
            } catch (Exception $e) {
                http_response_code(401);
                echo json_encode(["message" => "Token invalide"]);
                exit;
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Token manquant"]);
            exit;
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Authorization header manquant"]);
        exit;
    }
}


// quelques fonctions

function connectToDB()
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "wep_db";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo $e->getMessage();
    }

    return $conn;
}


// les classes de mon programme.

class Utilisateur
{
    protected $firstName;
    protected $surName;
    protected $email;
    protected $motDePasse;
    protected $telephone;
    protected $typeUtilisateur;
    protected $photoPath;


    public function __construct($firstName = null, $surName = null, $email = null, $motDePasse = null, $typeUtilisateur = null, $photoPath = null, $telephone = null)
    {
        if ($firstName != null) {
            $this->firstName = $firstName;
        }
        if ($surName != null) {
            $this->surName = $surName;
        }
        if ($email != null) {
            $this->email = $email;
        }
        if ($motDePasse != null) {
            $this->motDePasse = $motDePasse;
        }
        if ($typeUtilisateur != null) {
            $this->typeUtilisateur = $typeUtilisateur;
        }
        if ($photoPath != null) {
            $this->photoPath = $photoPath;
        }
        if ($telephone != null) {
            $this->telephone = $telephone;
        }
    }

    public function seConnecter()
    {
    }
    public function seDeconnecter()
    {
    }
    public function afficherProfil()
    {
    }
    public function modifierProfil()
    {
    }
}

class Enseignant extends Utilisateur
{
    protected $departement;

    public function __construct($departement = null, $firstName = null, $surName = null, $email = null, $motDePasse = null, $typeUtilisateur = null, $photoPath = null, $telephone = null)
    {
        parent::__construct($firstName, $surName, $email, $motDePasse, $typeUtilisateur, $photoPath, $telephone);
        if ($departement != null) {
            $this->departement = $departement;
        }
    }

    public function toutLesEnseignants()
    {
        $pdo = connectToDB();
        $sql = 'SELECT E.id, E.firstName, E.surName, E.email, E.telephone, D.name AS dname FROM enseignant E, departement D WHERE E.id_Departement = D.id ORDER BY E.id DESC';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        echo $jsonData;
        $pdo = null;
    }

    public function unEnseignant($id)
    {
        $pdo = connectToDB();
        $sql = 'SELECT * FROM enseignant WHERE enseignant.id =' . $id . '';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);
        $jsonData = json_encode($reqs);
        echo $jsonData;
        $pdo = null;
    }

    public function addEnseignant(int $id = 1)
    {
        $pdo = connectToDB();
        $checkQuery = "SELECT COUNT(*) FROM enseignant WHERE email = :email";
        $insertQuery = "INSERT INTO enseignant (firstName, surName, email, motDePasse, telephone, id_Departement, photoPath, id_Admin) 
                    VALUES (:firstName, :surName, :email, :motDePasse, :telephone, :id_Departement, :photoPath, :id_Admin)";

        try {
            // Préparer la requête de vérification
            $checkStmt = $pdo->prepare($checkQuery);
            $checkStmt->execute([':email' => $this->email]);
            $count = $checkStmt->fetchColumn();

            if ($count > 0) {
                // Si l'enseignant existe déjà
                $response = array(
                    "status" => "Erreur !",
                    "message" => "Cet enseignant existe déjà.",
                    "code" => 0
                );
            } else {
                // Préparer la requête d'insertion
                $stmt = $pdo->prepare($insertQuery);
                $stmt->execute([
                    ':firstName' => $this->firstName,
                    ':surName' => $this->surName,
                    ':email' => $this->email,
                    ':motDePasse' => password_hash($this->motDePasse, PASSWORD_DEFAULT),
                    ':telephone' => $this->telephone,
                    ':id_Departement' => $this->departement,
                    ':photoPath' => $this->photoPath,
                    ':id_Admin' => $id
                ]);

                $response = array(
                    "status" => "Sucess !",
                    "message" => "Donnée enregistrées avec succès !",
                    "code" => 1
                );
            }
        } catch (PDOException $e) {
            $response = array(
                "status" => "Erreur !",
                "message" => "Echec d'enregistrement de données !",
                "code" => 0,
                "pdoMessage" => $e->getMessage(),
                "pdoCode" => $e->getCode()
            );
        }

        $pdo = null;
        echo json_encode($response);
    }

    public function filieresEnseignants($id)
    {
        try {
            $pdo = connectToDB();

            $sql = 'SELECT F.id, F.name AS fname FROM filiere F
                INNER JOIN enseignantfiliere EF ON EF.id_filiere = F.id
                INNER JOIN enseignant E ON E.id = EF.id_Enseignant
                WHERE E.id = :id_f';

            $req = $pdo->prepare($sql);
            $req->execute([':id_f' => $id]);

            // Récupérer le résultat
            $reqs = $req->fetchAll(PDO::FETCH_ASSOC);
            $req->closeCursor();

            // Encoder en JSON et envoyer la réponse
            $jsonData = json_encode($reqs);

            header('Content-Type: application/json');
            echo $jsonData;
        } catch (Exception $e) {
            // Gérer les exceptions
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['error' => $e->getMessage()]);
        } finally {
            // Fermer la connexion à la base de données
            if (isset($pdo)) {
                $pdo = null;
            }
        }
    }

    public function enseignantEcues($id)
    {
        try {
            $pdo = connectToDB();

            $sql = 'SELECT E.id, E.id_Enseignant, EF.id_Enseignant AS efId, E.name AS ename, U.name AS uname, F.name AS fname FROM ecu E
                    INNER JOIN ue U ON E.id_Ue = U.id
                    INNER JOIN filiere F ON U.id_filiere = F.id
                    INNER JOIN enseignantfiliere EF ON F.id = EF.id_filiere
                    WHERE E.id_Enseignant IS NOT NULL AND EF.id_Enseignant = :id_f1';

            $req = $pdo->prepare($sql);
            $req->execute([':id_f1' => $id]);

            // Récupérer le résultat
            $reqs = $req->fetchAll(PDO::FETCH_ASSOC);
            $req->closeCursor();

            // Encoder en JSON et envoyer la réponse
            $jsonData = json_encode($reqs);

            header('Content-Type: application/json');
            echo $jsonData;
        } catch (Exception $e) {
            // Gérer les exceptions
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['error' => $e->getMessage()]);
        } finally {
            // Fermer la connexion à la base de données
            if (isset($pdo)) {
                $pdo = null;
            }
        }
    }

    public function ecusEnseignants($id1, $id2)
    {
        try {
            $pdo = connectToDB();

            $sql = 'SELECT E.id, E.id_Enseignant, EF.id_Enseignant AS efId, E.name AS ename, U.name AS uname, F.name AS fname FROM ecu E
                    INNER JOIN ue U ON E.id_Ue = U.id
                    INNER JOIN filiere F ON U.id_filiere = F.id
                    INNER JOIN enseignantfiliere EF ON F.id = EF.id_filiere
                    WHERE E.id_Enseignant IS NOT NULL AND EF.id_Enseignant = :id_f1 AND F.id = :id_f2';

            $req = $pdo->prepare($sql);
            $req->execute([':id_f1' => $id1, ':id_f2' => $id2]);

            // Récupérer le résultat
            $reqs = $req->fetchAll(PDO::FETCH_ASSOC);
            $req->closeCursor();

            // Encoder en JSON et envoyer la réponse
            $jsonData = json_encode($reqs);

            header('Content-Type: application/json');
            echo $jsonData;
        } catch (Exception $e) {
            // Gérer les exceptions
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['error' => $e->getMessage()]);
        } finally {
            // Fermer la connexion à la base de données
            if (isset($pdo)) {
                $pdo = null;
            }
        }
    }
    public function necusEnseignants($id_en, $id_filiere)
    {
        try {
            $pdo = connectToDB();

            $sql = 'SELECT E.id, E.id_Enseignant, EF.id_Enseignant AS efId, E.name AS ename, U.name AS uname, F.name AS fname FROM ecu E
                    INNER JOIN ue U ON E.id_Ue = U.id
                    INNER JOIN filiere F ON U.id_filiere = F.id
                    INNER JOIN enseignantfiliere EF ON F.id = EF.id_filiere
                    WHERE E.id_Enseignant IS NULL AND EF.id_Enseignant = :id_f1 AND F.id = :id_f2';

            $req = $pdo->prepare($sql);
            //$req->execute([':id_f1' => $id1, ':id_f2' => $id2]);
            $req->execute([':id_f1' => $id_en, ':id_f2' => $id_filiere]);
            //$req->execute([':id_f1' => $id_en]);
            $req->execute();

            // Récupérer le résultat
            $reqs = $req->fetchAll(PDO::FETCH_ASSOC);
            $req->closeCursor();

            // Encoder en JSON et envoyer la réponse
            $jsonData = json_encode($reqs);

            header('Content-Type: application/json');
            echo $jsonData;
        } catch (Exception $e) {
            // Gérer les exceptions
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['error' => $e->getMessage()]);
        } finally {
            // Fermer la connexion à la base de données
            if (isset($pdo)) {
                $pdo = null;
            }
        }
    }

    public function nfilieresEnseignants($id)
    {
        try {
            $pdo = connectToDB();

            $sql = 'SELECT F.id, F.name AS fname 
                FROM filiere F
                WHERE F.id NOT IN (
                    SELECT EF.id_filiere 
                    FROM enseignantfiliere EF
                    WHERE EF.id_Enseignant = :id_f
                )';

            $req = $pdo->prepare($sql);
            $req->execute([':id_f' => $id]);

            // Récupérer le résultat
            $reqs = $req->fetchAll(PDO::FETCH_ASSOC);
            $req->closeCursor();

            // Encoder en JSON et envoyer la réponse
            $jsonData = json_encode($reqs);

            header('Content-Type: application/json');
            echo $jsonData;
        } catch (Exception $e) {
            // Gérer les exceptions
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['error' => $e->getMessage()]);
        } finally {
            // Fermer la connexion à la base de données
            if (isset($pdo)) {
                $pdo = null;
            }
        }
    }


    public function logEnseignant($email, $motDePasse)
    {
        $pdo = connectToDB();

        // Préparer la requête pour récupérer l'étudiant par email
        $sql = 'SELECT * FROM enseignant WHERE email = :email';
        $req = $pdo->prepare($sql);
        $req->bindParam(':email', $email);
        $req->execute();

        // Récupérer le résultat
        $enseignant = $req->fetch(PDO::FETCH_ASSOC);

        // Vérifier si l'étudiant existe et vérifier le mot de passe
        if ($enseignant && password_verify($motDePasse, $enseignant['motDePasse'])) {
            global $secretKey;
            $jwt = generateJWT($enseignant["id"], $secretKey);
            header('Content-Type: application/json');
            echo json_encode(["code" => 1, "type" => "enseignant", "data" => $enseignant, "token" => $jwt]);
        } else {
            header('Content-Type: application/json');
            echo json_encode(["code" => 0, "type" => "enseignant", "message" => 'Invalid email or password']);
        }

        $pdo = null; // Fermer la connexion
    }

    public function totalEnseignant()
    {
        $pdo = connectToDB();

        // Préparer la requête pour récupérer l'étudiant par email
        $sql = 'SELECT * FROM enseignant';
        $req = $pdo->prepare($sql);
        $req->execute();

        // Récupérer le résultat
        $enseignant = $req->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode(["total" => count($enseignant), "type" => "enseignant (s) "]);
        $pdo = null; // Fermer la connexion
    }

    public function addEcueEnseignant($id_enseignant, $id_ecue)
    {
        $pdo = connectToDB();

        $sql = "UPDATE ecu E SET E.id_Enseignant = :id_f1 WHERE E.id = :id_f2";
        $checkStmt = $pdo->prepare($sql);

        try {
            $checkStmt->execute([":id_f1" => $id_enseignant, ":id_f2" => $id_ecue]);
            $response = array(
                "status" => "Sucess !",
                "message" => "Donnée enregistrées avec succès !",
                "code" => 1
            );
        } catch (PDOException $e) {
            $response = array(
                "status" => "Erreur !",
                "message" => "Echec d'enregistrement de données !",
                "code" => 0,
                "pdoMessage" => $e->getMessage(),
                "pdoCode" => $e->getCode()
            );
        }

        $pdo = null;
        echo json_encode($response);
    }

    public function deleteEcueEnseignant($id_enseignant, $id_ecue)
    {
        $pdo = connectToDB();

        // Préparation de la requête de mise à jour
        $sql = "UPDATE ecu E SET E.id_Enseignant = NULL WHERE E.id = :id_ecue AND E.id_Enseignant = :id_enseignant";
        $checkStmt = $pdo->prepare($sql);

        try {
            // Exécution de la requête avec les paramètres
            $checkStmt->bindParam(':id_ecue', $id_ecue, PDO::PARAM_INT);
            $checkStmt->bindParam(':id_enseignant', $id_enseignant, PDO::PARAM_INT);
            $checkStmt->execute();

            // Vérification du nombre de lignes affectées
            if ($checkStmt->rowCount() > 0) {
                $response = array(
                    "status" => "Success",
                    "message" => "Donnée mise à jour avec succès !",
                    "code" => 1
                );
            } else {
                $response = array(
                    "status" => "Erreur",
                    "message" => "Aucune donnée mise à jour. Vérifiez les identifiants fournis.",
                    "code" => 0
                );
            }
        } catch (PDOException $e) {
            $response = array(
                "status" => "Erreur",
                "message" => "Echec de la mise à jour des données !",
                "code" => 0,
                "pdoMessage" => $e->getMessage(),
                "pdoCode" => $e->getCode()
            );
        }

        // Fermeture de la connexion à la base de données
        $pdo = null;
        echo json_encode($response);
    }
}

class Etudiant extends Utilisateur
{
    protected $matricule;
    protected $filiere;

    public function __construct($matricule = null, $firstName = null, $surName = null, $email = null, $motDePasse = null, $typeUtilisateur = null, $photoPath = null, $telephone = null, $filiere = null)
    {
        parent::__construct($firstName, $surName, $email, $motDePasse, $typeUtilisateur, $photoPath, $telephone);
        if ($matricule != null) {
            $this->matricule = $matricule;
        }
        if ($filiere != null) {
            $this->filiere = $filiere;
        }
    }

    public function toutLesEtudiants()
    {
        $pdo = connectToDB();

        $sql = 'SELECT E.id, E.firstName, E.surName, E.email, E.telephone, F.name AS fname FROM etudiant E, filiere F WHERE E.id_filiere = F.id ORDER BY E.id DESC';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }

    public function toutLesEtudiantsFiliere(int $id = null)
    {
        try {
            $pdo = connectToDB();

            if ($id === null) {
                throw new Exception('L\'ID de la filière ne peut pas être nul.');
            }

            $sql = 'SELECT E.id, E.firstName, E.surName, E.email, E.telephone, F.name as fname FROM etudiant E, filiere F WHERE E.id_filiere = :id_d AND F.id=:id_d ORDER BY E.surName';
            $req = $pdo->prepare($sql);
            $req->execute([
                ':id_d' => $id,
            ]);
            $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

            $jsonData = json_encode($reqs);

            header('Content-Type: application/json');
            echo $jsonData;
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        } finally {
            if (isset($pdo)) {
                $pdo = null;
            }
        }
    }


    public function unEtudiant($id)
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM etudiant WHERE etudiant.id =' . $id . '';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }

    public function addEtudiant(int $id = 1)
    {
        $pdo = connectToDB();
        $checkQuery = "SELECT COUNT(*) FROM etudiant WHERE email = :email";
        $insertQuery = "INSERT INTO etudiant (firstName, surName, email, motDePasse, telephone, id_filiere, photoPath, id_Admin) 
                    VALUES (:firstName, :surName, :email, :motDePasse, :telephone, :id_filiere, :photoPath, :id_Admin)";

        try {
            // Préparer la requête de vérification
            $checkStmt = $pdo->prepare($checkQuery);
            $checkStmt->execute([':email' => $this->email]);
            $count = $checkStmt->fetchColumn();

            if ($count > 0) {
                // Si l'étudiant existe déjà
                $response = array(
                    "status" => "Erreur !",
                    "message" => "Cet étudiant existe déjà.",
                    "code" => 0
                );
            } else {
                // Préparer la requête d'insertion
                $stmt = $pdo->prepare($insertQuery);
                $stmt->execute([
                    ':firstName' => $this->firstName,
                    ':surName' => $this->surName,
                    ':email' => $this->email,
                    ':motDePasse' => password_hash($this->motDePasse, PASSWORD_DEFAULT),
                    ':telephone' => $this->telephone,
                    ':id_filiere' => $this->filiere,
                    ':photoPath' => $this->photoPath,
                    ':id_Admin' => $id
                ]);

                $response = array(
                    "status" => "Sucess !",
                    "message" => "Donnée enregistrées avec succès !",
                    "code" => 1
                );
            }
        } catch (PDOException $e) {
            $response = array(
                "status" => "Erreur !",
                "message" => "Echec d'enregistrement de données !",
                "code" => 0,
                "pdoMessage" => $e->getMessage(),
                "pdoCode" => $e->getCode()
            );
        }

        $pdo = null;
        echo json_encode($response);
    }


    public function logEtudiant($email, $motDePasse)
    {
        $pdo = connectToDB();

        // Préparer la requête pour récupérer l'étudiant par email
        $sql = 'SELECT * FROM etudiant WHERE email = :email';
        $req = $pdo->prepare($sql);
        $req->bindParam(':email', $email);
        $req->execute();

        // Récupérer le résultat
        $etudiant = $req->fetch(PDO::FETCH_ASSOC);

        // Vérifier si l'étudiant existe et vérifier le mot de passe
        if ($etudiant && password_verify($motDePasse, $etudiant['motDePasse'])) {
            global $secretKey;
            $jwt = generateJWT($etudiant["id"], $secretKey);
            header('Content-Type: application/json');
            echo json_encode(["code" => 1, "type" => "etudiant", "data" => $etudiant, "token" => $jwt]);
        } else {
            header('Content-Type: application/json');
            echo json_encode(["code" => 0, "type" => "etudiant", "message" => 'Invalid email or password']);
        }

        $pdo = null; // Fermer la connexion
    }

    public function totalEtudiant()
    {
        $pdo = connectToDB();

        // Préparer la requête pour récupérer l'étudiant par email
        $sql = 'SELECT * FROM etudiant';
        $req = $pdo->prepare($sql);
        $req->execute();

        // Récupérer le résultat
        $etudiant = $req->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode(["total" => count($etudiant), "type" => "etudiant (s) "]);
        $pdo = null; // Fermer la connexion
    }
}

class Admin extends Utilisateur
{
    public function __construct($firstName = null, $surName = null, $email = null, $motDePasse = null, $typeUtilisateur = null, $photoPath = null, $telephone = null)
    {
        parent::__construct($firstName, $surName, $email, $motDePasse, $typeUtilisateur, $photoPath, $telephone);
    }

    public function toutLesAdmins()
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM admin';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }

    public function unAdmin($id)
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM admin WHERE admin.id =' . $id . '';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }

    public function addAdmin()
    {
        $pdo = connectToDB();

        $adminQuery = "INSERT INTO Admin (firstName, surName, motDePasse, email, telephone) 
                   VALUES (:firstName, :surName, :motDePasse, :email, :telephone)";
        $stmt = $pdo->prepare($adminQuery);

        try {
            $stmt->execute([
                ':firstName' => $this->firstName,
                ':surName' => $this->surName,
                ':motDePasse' => password_hash($this->motDePasse, PASSWORD_DEFAULT),
                ':email' => $this->email,
                ':telephone' => $this->telephone
            ]);

            $response = array(
                "status" => "Sucess !",
                "message" => "Donnée enregistrées avec succès ! ",
                "code" => 1
            );
        } catch (PDOException $e) {
            $response = array(
                "status" => "Erreur !",
                "message" => "Echec d'enregistrement de données !",
                "code" => 0,
                "pdoMessage" => $e->getMessage(),
                "pdoCode" => $e->getCode()
            );
        }

        $pdo = null;
        echo json_encode($response);
    }

    public function logAdmin($email, $motDePasse)
    {
        $pdo = connectToDB();

        // Préparer la requête pour récupérer l'étudiant par email
        $sql = 'SELECT * FROM admin WHERE email = :email';
        $req = $pdo->prepare($sql);
        $req->bindParam(':email', $email);
        $req->execute();

        // Récupérer le résultat
        $admin = $req->fetch(PDO::FETCH_ASSOC);

        // Vérifier si l'étudiant existe et vérifier le mot de passe
        if ($admin && password_verify($motDePasse, $admin['motDePasse'])) {
            global $secretKey;
            $jwt = generateJWT($admin["id"], $secretKey);
            header('Content-Type: application/json');
            echo json_encode(["code" => 1, "type" => "admin", "data" => $admin, "token" => $jwt]);
        } else {
            header('Content-Type: application/json');
            echo json_encode(["code" => 0, "type" => "admin", "message" => 'Invalid email or password']);
        }

        $pdo = null; // Fermer la connexion
    }
}

class TravailPratique
{
    protected $title;
    protected $description;
    protected $datePublier;
    protected $dateSoumission;
    protected $filePath;

    public function __construct($title = null, $description = null, $datePublier = null, $dateSoumission = null, $filePath = null)
    {
        if ($title !== null) {
            $this->title = $title;
        }
        if ($description !== null) {
            $this->description = $description;
        }
        if ($datePublier !== null) {
            $this->datePublier = $datePublier;
        }
        if ($dateSoumission !== null) {
            $this->dateSoumission = $dateSoumission;
        }
        if ($filePath !== null) {
            $this->filePath = $filePath;
        }
    }

    public function toutLesTPs()
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM travailpratique';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }

    public function unTP($id)
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM travailpratique WHERE travailpratique.id =' . $id . '';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }

    public function addTP(int $id_enseignant = null, int $id_ecu = null, int $id_filiere = null)
    {
        $pdo = connectToDB();

        $travailpratiqueQuery = "INSERT INTO travailpratique (title, description, datePublier, dateSoumission, filePath, id_enseignant, id_ecu, id_filiere) 
                             VALUES (:title, :description, :datePublier, :dateSoumission, :filePath, :id_enseignant, :id_ecu, :id_filiere)";
        $stmt = $pdo->prepare($travailpratiqueQuery);

        try {
            $stmt->execute([
                ':title' => $this->title,
                ':description' => $this->description,
                ':datePublier' => $this->datePublier,
                ':dateSoumission' => $this->dateSoumission,
                ':filePath' => $this->filePath,
                ':id_enseignant' => $id_enseignant,
                ':id_ecu' => $id_ecu,
                ':id_filiere' => $id_filiere
            ]);

            $response = array(
                "status" => "Sucess !",
                "message" => "Donnée enregistrées avec succès ! ",
                "code" => 1
            );
        } catch (PDOException $e) {
            $response = array(
                "status" => "Erreur !",
                "message" => "Echec d'enregistrement de données !",
                "code" => 0,
                "pdoMessage" => $e->getMessage(),
                "pdoCode" => $e->getCode()
            );
        }

        $pdo = null;
        echo json_encode($response);
    }

    public function totalTP()
    {
        $pdo = connectToDB();

        // Préparer la requête pour récupérer l'étudiant par email
        $sql = 'SELECT * FROM travailpratique';
        $req = $pdo->prepare($sql);
        $req->execute();

        // Récupérer le résultat
        $tp = $req->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode(["total" => count($tp), "type" => " TP "]);
        $pdo = null; // Fermer la connexion
    }
}

class Travail
{
    protected $lien;
    protected $limiteNote;
    protected $note;
    protected $dateSoumission;
    protected $filePath;

    public function __construct()
    {
    }

    public function toutLesTravaux()
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM travail';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }

    public function unTravail($id)
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM travail WHERE travail.id =' . $id . '';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }

    public function addTravail(int $id_etudiant = null, int $id_travailpratique = null, int $id_enseignant = null)
    {
        $pdo = connectToDB();
        $travailQuery = "INSERT INTO travail (filePath, limiteNote, lien, id_etudiant, id_travailpratique, id_enseignant) 
                     VALueS (:filePath, :limiteNote, :lien, :id_etudiant, :id_travailpratique, :id_enseignant)";
        $stmt = $pdo->prepare($travailQuery);

        try {

            $stmt->execute([
                ':filePath' => $this->filePath,
                ':limiteNote' => 3,
                ':lien' => $this->lien,
                ':id_etudiant' => $id_etudiant,
                ':id_travailpratique' => $id_travailpratique,
                ':id_enseignant' => $id_enseignant
            ]);

            $response = array(
                "status" => "Sucess !",
                "message" => "Donnée enregistrées avec succès ! ",
                "code" => 1
            );
        } catch (PDOException $e) {
            $response = array(
                "status" => "Erreur !",
                "message" => "Echec d'enregistrement de données !",
                "code" => 0,
                "pdoMessage" => $e->getMessage(),
                "pdoCode" => $e->getCode()
            );
        }

        $pdo = null;
        echo json_encode($response);
    }

    public function totalSoumission()
    {
        $pdo = connectToDB();

        // Préparer la requête pour récupérer l'étudiant par email
        $sql = 'SELECT * FROM travail';
        $req = $pdo->prepare($sql);
        $req->execute();

        // Récupérer le résultat
        $travail = $req->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode(["total" => count($travail), "type" => "Soumission(s)"]);
        $pdo = null; // Fermer la connexion
    }
}

class Filiere
{
    protected $name;

    public function __construct($name = null)
    {
        if ($name != null) {
            $this->name = $name;
        }
    }
    public function toutLesFiliere()
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM filiere';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }
    public function uneFiliere($id)
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM filiere WHERE filiere.id =' . $id . '';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }
    public function addFiliere()
    {
        $pdo = connectToDB();
        $checkQuery = "SELECT COUNT(*) FROM Filiere WHERE name = :name";
        $insertQuery = "INSERT INTO Filiere (name) VALUES (:name)";

        try {
            // Préparer la requête de vérification
            $checkStmt = $pdo->prepare($checkQuery);
            $checkStmt->execute([':name' => $this->name]);
            $count = $checkStmt->fetchColumn();

            if ($count > 0) {
                // Si la filière existe déjà
                $response = array(
                    "status" => "Erreur !",
                    "message" => "Cette filière existe déjà.",
                    "code" => 0
                );
            } else {
                // Préparer la requête d'insertion
                $stmt = $pdo->prepare($insertQuery);
                $stmt->execute([':name' => $this->name]);

                $response = array(
                    "status" => "Sucess !",
                    "message" => "Donnée enregistrées avec succès !",
                    "code" => 1
                );
            }
        } catch (PDOException $e) {
            $response = array(
                "status" => "Erreur !",
                "message" => "Echec d'enregistrement de données !",
                "code" => 0,
                "pdoMessage" => $e->getMessage(),
                "pdoCode" => $e->getCode()
            );
        }

        $pdo = null;
        echo json_encode($response);
    }
    public function totalFiliere()
    {
        $pdo = connectToDB();

        // Préparer la requête pour récupérer l'étudiant par email
        $sql = 'SELECT * FROM filiere';
        $req = $pdo->prepare($sql);
        $req->execute();

        // Récupérer le résultat
        $filiere = $req->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode(["total" => count($filiere), "type" => "Filière (s)"]);
        $pdo = null; // Fermer la connexion
    }
    public function ecusFiliere(int $id)
    {
        $pdo = connectToDB();

        if ($pdo) {
            $sql = 'SELECT E.id, U.name AS ueName, E.name AS ecuName FROM ecu E 
                INNER JOIN ue U ON E.id_Ue = U.id 
                INNER JOIN filiere F ON F.id = U.id_filiere 
                WHERE F.id = :id_f';

            $req = $pdo->prepare($sql);
            $req->execute([':id_f' => $id]);

            // Récupérer le résultat
            $reqs = $req->fetchAll(PDO::FETCH_ASSOC);
            $req->closeCursor();

            $jsonData = json_encode($reqs);
            header('Content-Type: application/json');
            echo $jsonData;

            // Fermer la connexion à la base de données
            $pdo = null;
        } else {
            // Gérer l'erreur de connexion à la base de données
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['error' => 'Erreur de connexion à la base de données']);
        }
    }
    public function uesFiliere(int $id)
    {
        try {
            $pdo = connectToDB();
            if ($pdo) {
                $sql = 'SELECT U.id, U.name AS ueName 
                    FROM ue U 
                    INNER JOIN uefiliere UF ON UF.id_Ue = U.id 
                    WHERE UF.id_filiere = :id_f';

                $req = $pdo->prepare($sql);
                $req->execute([':id_f' => $id]);

                // Récupérer le résultat
                $reqs = $req->fetchAll(PDO::FETCH_ASSOC);
                $req->closeCursor();

                $jsonData = json_encode($reqs);
                header('Content-Type: application/json');
                echo $jsonData;

                // Fermer la connexion à la base de données
                $pdo = null;
            } else {
                // Gérer l'erreur de connexion à la base de données
                header('HTTP/1.1 500 Internal Server Error');
                echo json_encode(['error' => 'Erreur de connexion à la base de données']);
            }
        } catch (Exception $e) {
            // Gérer les exceptions
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    public function nuesFiliere(int $id)
    {
        try {
            $pdo = connectToDB();
            if ($pdo) {
                // SQL pour sélectionner les UE qui ne sont pas associées à la filière donnée
                $sql = 'SELECT U.id, U.name AS ueName 
                    FROM ue U 
                    WHERE U.id NOT IN (
                        SELECT UF.id_Ue 
                        FROM uefiliere UF 
                        WHERE UF.id_filiere = :id_f
                    )';

                $req = $pdo->prepare($sql);
                $req->execute([':id_f' => $id]);

                // Récupérer le résultat
                $reqs = $req->fetchAll(PDO::FETCH_ASSOC);
                $req->closeCursor();

                $jsonData = json_encode($reqs);
                header('Content-Type: application/json');
                echo $jsonData;

                // Fermer la connexion à la base de données
                $pdo = null;
            } else {
                // Gérer l'erreur de connexion à la base de données
                header('HTTP/1.1 500 Internal Server Error');
                echo json_encode(['error' => 'Erreur de connexion à la base de données']);
            }
        } catch (Exception $e) {
            // Gérer les exceptions
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['error' => 'Une erreur s\'est produite : ' . $e->getMessage()]);
        }
    }
}

class Ue
{
    protected $name;
    protected $credit;
    protected $filiere;

    public function __construct($name = null, $credit = null, $filiere = null)
    {
        if ($name != null) {
            $this->name = $name;
        }
        if ($credit != null) {
            $this->credit = $credit;
        }
        if ($filiere != null) {
            $this->filiere = $filiere;
        }
    }

    public function toutLesUes()
    {
        $pdo = connectToDB();

        $sql = 'SELECT U.id, U.name, U.credit, F.name AS fname FROM ue U, filiere F WHERE U.id_filiere = F.id';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }

    public function uneUE($id)
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM ue WHERE ue.id =' . $id . '';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }

    public function addUe()
    {
        $pdo = connectToDB();
        $checkQuery = "SELECT COUNT(*) FROM ue WHERE name = :name AND id_filiere = :filiere";
        $insertQuery = "INSERT INTO ue (name, credit, id_filiere) VALUES (:name, :credit, :filiere)";

        try {
            // Préparer la requête de vérification
            $checkStmt = $pdo->prepare($checkQuery);
            $checkStmt->execute([':name' => $this->name, ':filiere' => $this->filiere]);
            $count = $checkStmt->fetchColumn();

            if ($count > 0) {
                // Si l'UE existe déjà
                $response = array(
                    "status" => "Erreur !",
                    "message" => "Cette UE existe déjà.",
                    "code" => 0
                );
            } else {
                // Préparer la requête d'insertion
                $stmt = $pdo->prepare($insertQuery);
                $stmt->execute([
                    ':name' => $this->name,
                    ':credit' => $this->credit,
                    ':filiere' => $this->filiere,
                ]);

                $response = array(
                    "status" => "Sucess !",
                    "message" => "Donnée enregistrées avec succès !",
                    "code" => 1
                );
            }
        } catch (PDOException $e) {
            $response = array(
                "status" => "Erreur !",
                "message" => "Echec d'enregistrement de données !",
                "code" => 0,
                "pdoMessage" => $e->getMessage(),
                "pdoCode" => $e->getCode()
            );
        }

        $pdo = null;
        echo json_encode($response);
    }


    public function totalUe()
    {
        $pdo = connectToDB();

        // Préparer la requête pour récupérer l'étudiant par email
        $sql = 'SELECT * FROM ue';
        $req = $pdo->prepare($sql);
        $req->execute();

        // Récupérer le résultat
        $ue = $req->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode(["total" => count($ue), "type" => " UE "]);
        $pdo = null; // Fermer la connexion
    }
}

class Ecu
{
    protected $name;
    protected $credit;
    protected $ue;

    public function __construct($name = null, $credit = null, $ue = null)
    {
        if ($name != null) {
            $this->name = $name;
        }
        if ($credit != null) {
            $this->credit = $credit;
        }
        if ($ue != null) {
            $this->ue = $ue;
        }
    }
    public function toutLesEcu()
    {
        $pdo = connectToDB();

        $sql = 'SELECT E.id, E.credit, E.name AS ecuname, U.name AS uename, F.name AS fname FROM ecu E
                INNER JOIN ue U ON E.id_Ue = U.id 
                INNER JOIN filiere F ON F.id = U.id_filiere';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }
    public function unEcu($id)
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM ecu WHERE ecu.id =' . $id . '';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }
    public function addEcu()
    {
        $pdo = connectToDB();
        $checkQuery = "SELECT COUNT(*) FROM ecu WHERE name = :name AND id_Ue = :id_Ue";
        $insertQuery = "INSERT INTO ecu (name, credit, id_Ue) VALUES (:name, :credit, :id_Ue)";

        try {
            // Préparer la requête de vérification
            $checkStmt = $pdo->prepare($checkQuery);
            $checkStmt->execute([':name' => $this->name, ':id_Ue' => $this->ue]);
            $count = $checkStmt->fetchColumn();

            if ($count > 0) {
                // Si l'ECU existe déjà
                $response = array(
                    "status" => "Erreur !",
                    "message" => "Cette ECU existe déjà.",
                    "code" => 0
                );
            } else {
                // Préparer la requête d'insertion
                $stmt = $pdo->prepare($insertQuery);
                $stmt->execute([
                    ':name' => $this->name,
                    ':credit' => $this->credit,
                    ':id_Ue' => $this->ue,
                ]);

                $response = array(
                    "status" => "Sucess !",
                    "message" => "Donnée enregistrées avec succès !",
                    "code" => 1
                );
            }
        } catch (PDOException $e) {
            $response = array(
                "status" => "Erreur !",
                "message" => "Echec d'enregistrement de données !",
                "code" => 0,
                "pdoMessage" => $e->getMessage(),
                "pdoCode" => $e->getCode()
            );
        }

        $pdo = null;
        echo json_encode($response);
    }
    public function totalEcu()
    {
        $pdo = connectToDB();

        // Préparer la requête pour récupérer l'étudiant par email
        $sql = 'SELECT * FROM ecu';
        $req = $pdo->prepare($sql);
        $req->execute();

        // Récupérer le résultat
        $donnees = $req->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode(["total" => count($donnees), "type" => " Ecu "]);
        $pdo = null;
    }
}

class Departement
{
    protected $name;

    public function __construct($name = null)
    {
        if ($name != null) {
            $this->name = $name;
        }
    }

    public function toutLesDepartements()
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM departement';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }

    public function unDepartement($id)
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM departement WHERE departement.id =' . $id . '';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }

    public function addDepartement()
    {
        $pdo = connectToDB();
        $checkQuery = "SELECT COUNT(*) FROM departement WHERE name = :name";
        $insertQuery = "INSERT INTO departement (name) VALUES (:name)";

        try {
            // Préparer la requête de vérification
            $checkStmt = $pdo->prepare($checkQuery);
            $checkStmt->execute([':name' => $this->name]);
            $count = $checkStmt->fetchColumn();

            if ($count > 0) {
                // Si le département existe déjà
                $response = array(
                    "status" => "Erreur !",
                    "message" => "Ce département existe déjà.",
                    "code" => 0
                );
            } else {
                // Préparer la requête d'insertion
                $stmt = $pdo->prepare($insertQuery);
                $stmt->execute([':name' => $this->name]);

                $response = array(
                    "status" => "Sucess !",
                    "message" => "Données enregistrées avec succès !",
                    "code" => 1
                );
            }
        } catch (PDOException $e) {
            $response = array(
                "status" => "Erreur !",
                "message" => "Échec d'enregistrement des données !",
                "code" => 0,
                "pdoMessage" => $e->getMessage(),
                "pdoCode" => $e->getCode()
            );
        }

        $pdo = null;
        echo json_encode($response);
    }


    public function totalDepartement()
    {
        $pdo = connectToDB();

        // Préparer la requête pour récupérer l'étudiant par email
        $sql = 'SELECT * FROM departement';
        $req = $pdo->prepare($sql);
        $req->execute();

        // Récupérer le résultat
        $donnees = $req->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode(["total" => count($donnees), "type" => "département(s) "]);
        $pdo = null;
    }
}

class Messages
{
    protected $description;
    protected $filePath;

    public function __construct($description = null, $filePath = null)
    {
        if ($description != null) {
            $this->description = $description;
        }
        if ($filePath != null) {
            $this->filePath = $filePath;
        }
    }

    public function toutLesMessages()
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM messages';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }

    public function unMessage($id)
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM messages WHERE messages.id =' . $id . '';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
    }
}

class uefiliere
{
    protected $id_Ue;
    protected $id_filiere;

    public function __construct(int $id1 = null, int $id2 = null)
    {
        if ($id1 != null) {
            $this->id_Ue = $id1;
        }

        if ($id2 != null) {
            $this->id_filiere = $id2;
        }
    }

    public function addUeFiliere()
    {
        $pdo = connectToDB();
        $req = "INSERT INTO uefiliere (id_Ue,id_filiere) VALUES (:id_Ue, :id_filiere)";
        $stmt = $pdo->prepare($req);

        try {

            $stmt->execute([':id_Ue' => $this->id_Ue, ':id_filiere' => $this->id_filiere]);

            $response = array(
                "status" => "Sucess !",
                "message" => "Donnée enregistrées avec succès ! ",
                "code" => 1
            );
        } catch (PDOException $e) {
            $response = array(
                "status" => "Erreur !",
                "message" => "Echec d'enregistrement de données !",
                "code" => 0,
                "pdoMessage" => $e->getMessage(),
                "pdoCode" => $e->getCode()
            );
        }

        $pdo = null;
        echo json_encode($response);
    }

    public function deleteUeFiliere(int $id_Ue, int $id_filiere)
    {
        $pdo = connectToDB();
        $req = "DELETE FROM uefiliere WHERE id_Ue = :id_Ue AND id_filiere = :id_filiere";
        $stmt = $pdo->prepare($req);

        try {
            $stmt->execute([':id_Ue' => $id_Ue, ':id_filiere' => $id_filiere]);

            $response = array(
                "status" => "Success!",
                "message" => "Donnée supprimée avec succès!",
                "code" => 1
            );
        } catch (PDOException $e) {
            $response = array(
                "status" => "Erreur!",
                "message" => "Échec de la suppression des données!",
                "code" => 0,
                "pdoMessage" => $e->getMessage(),
                "pdoCode" => $e->getCode()
            );
        }

        $pdo = null;
        echo json_encode($response);
    }
}

class enseignantfiliere
{
    protected $id_Enseignant;
    protected $id_filiere;

    public function __construct(int $id1 = null, int $id2 = null)
    {
        if ($id1 != null) {
            $this->id_Enseignant = $id1;
        }

        if ($id2 != null) {
            $this->id_filiere = $id2;
        }
    }

    public function addEnseignantFiliere()
    {

        $pdo = connectToDB();
        $req = "INSERT INTO enseignantfiliere (id_Enseignant, id_filiere) VALUES (:id_Enseignant, :id_filiere)";
        $stmt = $pdo->prepare($req);

        try {

            $stmt->execute([':id_Enseignant' => $this->id_Enseignant, ':id_filiere' => $this->id_filiere]);

            $response = array(
                "status" => "Sucess !",
                "message" => "Donnée enregistrées avec succès ! ",
                "code" => 1
            );
        } catch (PDOException $e) {
            $response = array(
                "status" => "Erreur !",
                "message" => "Echec d'enregistrement de données !",
                "code" => 0,
                "pdoMessage" => $e->getMessage(),
                "pdoCode" => $e->getCode()
            );
        }

        $pdo = null;
        echo json_encode($response);
    }

    public function deleteEnseignantFiliere(int $id_Enseignant, int $id_filiere)
    {
        $pdo = connectToDB();
        $req = "DELETE FROM enseignantfiliere WHERE id_Enseignant = :id_Enseignant AND id_filiere = :id_filiere";
        $stmt = $pdo->prepare($req);

        try {
            $stmt->execute([':id_Enseignant' => $id_Enseignant, ':id_filiere' => $id_filiere]);

            $response = array(
                "status" => "Success!",
                "message" => "Donnée supprimée avec succès!",
                "code" => 1
            );
        } catch (PDOException $e) {
            $response = array(
                "status" => "Erreur!",
                "message" => "Échec de la suppression des données!",
                "code" => 0,
                "pdoMessage" => $e->getMessage(),
                "pdoCode" => $e->getCode()
            );
        }

        $pdo = null;
        echo json_encode($response);
    }
}
