<?php

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
        $sql = 'SELECT * FROM enseignant';
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

        $enseignantQuery = "INSERT INTO enseignant (firstName, surName, email, motDePasse, telephone, id_departement, photoPath, id_Admin) 
                        VALUES (:firstName, :surName, :email, :motDePasse, :telephone, :id_departement, :photoPath, :id_Admin)";
        $stmt = $pdo->prepare($enseignantQuery);

        try {

            $stmt->execute([
                ':firstName' => $this->firstName,
                ':surName' => $this->surName,
                ':email' => $this->email,
                ':motDePasse' => password_hash($this->motDePasse, PASSWORD_DEFAULT),
                ':telephone' => $this->telephone,
                ':id_departement' => $this->departement,
                ':photoPath' => $this->photoPath,
                ':id_Admin' => $id
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

        $sql = 'SELECT * FROM etudiant';
        $req = $pdo->prepare($sql);
        $req->execute();
        $reqs = $req->fetchAll(PDO::FETCH_ASSOC);

        $jsonData = json_encode($reqs);
        header('Content-Type: application/json');

        echo $jsonData;
        $pdo = null;
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
        $etudiantQuery = "INSERT INTO etudiant (firstName, surName, email, motDePasse, telephone, id_filiere, photoPath, id_Admin) 
                      VALUES (:firstName, :surName, :email, :motDePasse, :telephone, :id_filiere, :photoPath, :id_Admin)";
        $stmt = $pdo->prepare($etudiantQuery);

        try {

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
}

/*
try {

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
 */

class TravailPratique
{
    protected $title;
    protected $description;
    protected $datePublier;
    protected $dateSoumission;
    protected $filePath;

    public function __construct()
    {
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
        $filiereQuery = "INSERT INTO Filiere (name) VALUES (:name)";
        $stmt = $pdo->prepare($filiereQuery);

        try {

            $stmt->execute([':name' => $this->name]);

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
}

class Ue
{
    protected $name;
    protected $credit;

    public function __construct($name = null, $credit = null)
    {
        if ($name != null) {
            $this->name = $name;
        }
        if ($credit != null) {
            $this->credit = $credit;
        }
    }

    public function toutLesUes()
    {
        $pdo = connectToDB();

        $sql = 'SELECT * FROM ue';
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
        $ueQuery = "INSERT INTO ue (name, credit) VALUES (:name, :credit)";
        $stmt = $pdo->prepare($ueQuery);

        try {

            $stmt->execute([
                ':name' => $this->name,
                ':credit' => $this->credit
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

        $sql = 'SELECT * FROM ecu';
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

    public function addEcu(int $id_enseignant = null, int $id_ue = null)
    {
        $pdo = connectToDB();
        $ecuQuery = "INSERT INTO ecu (name, credit, id_enseignant, id_ue) VALUES (:name, :credit, :id_enseignant, :id_ue)";
        $stmt = $pdo->prepare($ecuQuery);

        try {

            $stmt->execute([
                ':name' => $this->name,
                ':credit' => $this->credit,
                ':id_enseignant' => $id_enseignant,
                ':id_ue' => $id_ue
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

        $departementQuery = "INSERT INTO departement (name) VALUES (:name)";
        $stmt = $pdo->prepare($departementQuery);

        try {
            $stmt->execute([':name' => $this->name]);
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
