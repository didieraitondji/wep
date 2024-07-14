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
            echo json_encode(["code" => 0, "type" => "none", "status" => "Erreur", "message" => "La demande n'est pas valide, vérifiez l'url", "code" => "se229"]);
            break;
    }
} else {

    switch (strtolower($url[0])) {
        case 'enseignant':

            break;
        case 'etudiant':

            break;
        case 'message':

            break;
        case 'travail':

            break;
        case 'ue':

            break;
        case 'filiere':

            break;
        case 'ecu':

            break;
        case 'tp':
            $tp = new TravailPratique();
            break;
        case 'admin':
            $admin = new Admin($data['firstName'], $data['surName'], $data['email'], $data['motDePasse'], null, null, $data['telephone']);
            $admin->addAdmin();
            break;
        case 'departement':
            $departement = new Departement($data["name"]);
            $departement->addDepartement();
            break;
        default:
            echo json_encode(["status" => "Erreur", "message" => "La demande n'est pas valide, vérifiez l'url", "code" => 0]);
            break;
    }
}
