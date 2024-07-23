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
$uef = new uefiliere();

switch (strtolower($url[0])) {
    case 'uefiliere':
        $uef->deleteUeFiliere($data['id_Ue'], $data['id_filiere']);
        break;
    default:
        echo json_encode(["status" => "Erreur", "message" => "La demande n'est pas valide, vérifiez l'url", "code" => 0]);
        break;
}
