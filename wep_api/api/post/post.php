<?php

// données post
$input = file_get_contents("php://input");

$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    $response = [
        "status" => "Error",
        "message" => "Invalid JSON received"
    ];
}


// operations sur les routes
// gestion de la connexion
if (empty($url[0])) {
    switch ($data['type']) {
        case 'enseignant':
            $ens = new Enseignant();
            $ens->logEnseignant($data['email'], $data['motDePasse']);
            break;
        case 'etudiant':
            $etu = new Etudiant();
            $etu->logEtudiant($data['email'], $data['motDePasse']);
            break;
        case 'admin':
            $admin = new Admin();
            $admin->logAdmin($data['email'], $data['motDePasse']);
            break;
        default:
            echo json_encode(["code" => 0, "type" => "none", "status" => "Erreur", "message" => "La demande n'est pas valide, vérifiez l'url"]);
            break;
    }
} else {

    switch (strtolower($url[0])) {
        case 'enseignant':
            $en = new Enseignant($data['departement'], $data['firstName'], $data['surName'], $data['email'], $data['motDePasse'], null, null, $data['telephone']);
            $en->addEnseignant();
            break;
        case 'etudiant':
            $en = new Etudiant($data['matricule'], $data['firstName'], $data['surName'], $data['email'], $data['motDePasse'], null, null, $data['telephone'], $data['filiere']);
            $en->addEtudiant();
            break;
        case 'message':

            break;
        case 'travail':
            $datax = array(
                'lien' => $_POST['lien'],
                'id_Etudiant' => $_POST['id_Etudiant'],
                'id_Tp' => $_POST['id_Tp'],
                'filePath' => $_POST['filePath'],
                'dateSoumission' => $_POST['dateSoumission'],
                'id_Enseignant' => $_POST['id_Enseignant'],
            );
            $travail = new Travail($datax['lien'], $datax['id_Etudiant'], $datax['id_Tp'], $datax['dateSoumission'], $datax['id_Enseignant'], $datax['filePath']);
            $travail->addTravail();
            break;
        case 'ue':
            $ue = new Ue($data['name'], $data['credit'], $data['filiere']);
            $ue->addUe();
            break;
        case 'filiere':
            $filiere = new Filiere($data['name']);
            $filiere->addFiliere();
            break;
        case 'uefiliere':
            $uef = new uefiliere($data['id_Ue'], $data['id_filiere']);
            $uef->addUeFiliere();
            break;
        case 'enseignantfiliere':
            $efiliere = new enseignantfiliere($data['id_Enseignant'], $data['id_filiere']);
            $efiliere->addEnseignantFiliere();
            break;
        case 'ecu':
            $ecu = new Ecu($data['name'], $data['credit'], $data['id_Ue']);
            $ecu->addEcu();
            break;
        case 'tp':
            $datax = array(
                "title" => $_POST["title"],
                "datePublication" => $_POST["datePublication"],
                "dateSoumission" => $_POST["dateSoumission"],
                "id_filiere" => $_POST["id_filiere"],
                "id_ecue" => $_POST["id_ecue"],
                "description" => $_POST["description"],
                "id_Enseignant" => $_POST["id_Enseignant"],
                "filePath" => $_POST['filePath'],
            );
            $tp = new TravailPratique($datax['title'], $datax['description'], $datax['datePublication'], $datax['dateSoumission'], $datax['filePath']);
            $tp->addTP($datax["id_Enseignant"], $datax['id_ecue'], $datax["id_filiere"]);
            break;
        case 'admin':
            $admin = new Admin($data['firstName'], $data['surName'], $data['email'], $data['motDePasse'], null, null, $data['telephone']);
            $admin->addAdmin();
            break;
        case 'departement':
            $departement = new Departement($data["name"]);
            $departement->addDepartement();
            break;
        case 'enseignantecu':
            $en = new Enseignant();
            $en->addEcueEnseignant($data['id_Enseignant'], $data['id_ecue']);
            break;
        default:
            echo json_encode(["status" => "Erreur", "message" => "La demande n'est pas valide, vérifiez l'url", "code" => 0]);
            break;
    }
}
