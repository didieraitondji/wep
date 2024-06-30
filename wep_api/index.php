<?php

include_once("./api/model.php");

try {

    if (!empty($_GET['demande'])) {
        $url = explode("/", filter_var($_GET['demande'], FILTER_SANITIZE_URL));

        //switch sur les demandes
        switch ($url[0]) {
            case 'POST':
                include_once("./api/post/post.php");
                break;
            case 'GET':
                include_once("./api/get/get.php");
                break;
            case 'PUT':
                include_once("./api/put/put.php");
                break;
            case "DELETE":
                include_once("./api/delete/delete.php");
                break;
            default:
                throw new Exception("Operation Inconnue");
                break;
        }
    } else {
        throw new Exception("Problème de recupération de données");
    }
} catch (Exception $e) {
    $erreur = [
        "message" => $e->getMessage(),
        "code" => $e->getCode()
    ];

    print_r($erreur);
}
