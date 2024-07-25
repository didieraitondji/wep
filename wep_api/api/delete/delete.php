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

// création des clases anonymes
$efiliere = new enseignantfiliere();
$en = new Enseignant();

switch (strtolower($url[0])) {
    case 'enseignantfiliere':
        $efiliere->deleteEnseignantFiliere($data['id_Enseignant'], $data['id_filiere']);
        break;
    case 'enseignantecu':
        $en->deleteEcueEnseignant($data['id_Enseignant'], $data['id_ecue']);
        break;
    default:
        echo json_encode(["status" => "Erreur", "message" => "La demande n'est pas valide, vérifiez l'url", "code" => 0]);
        break;
}
