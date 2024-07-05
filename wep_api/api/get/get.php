<?php

// création de quelques objets
$enseignant = new Enseignant();
$etudiant = new Etudiant();
$admin = new Admin();
$message = new Messages();
$travail = new Travail();
$ue = new Ue();
$filiere = new Filiere();
$departement = new Departement();
$ecu = new Ecu();
$tp = new TravailPratique();



// operations sur les routes

switch (strtolower($url[0])) {
    case 'enseignants':
        $enseignant->toutLesEnseignants();
        break;
    case 'enseignant':
        if (!empty($url[1])) {
            $enseignant->unEnseignant($url[1]);
        } else {
            $jsonData = json_encode(array(
                "status" => "Erreur",
                "message" => "Identifiant invalide",
                "code" => 1
            ));
            echo $jsonData;
        }
        break;
    case 'etudiants':
        $etudiant->toutLesEtudiants();
        break;
    case 'etudiant':
        if (!empty($url[1])) {
            $etudiant->unEtudiant($url[1]);
        } else {
            $jsonData = json_encode(array(
                "status" => "Erreur",
                "message" => "Identifiant invalide",
                "code" => 1
            ));
            echo $jsonData;
        }
        break;
    case 'messages':
        $message->toutLesMessages();
        break;
    case 'message':
        if (!empty($url[1])) {
            $message->unMessage($url[1]);
        } else {
            $jsonData = json_encode(array(
                "status" => "Erreur",
                "message" => "Identifiant invalide",
                "code" => 1
            ));
            echo $jsonData;
        }
        break;
    case 'travaux':
        $travail->toutLesTravaux();
        break;
    case 'travail':
        if (!empty($url[1])) {
            $travail->unTravail($url[1]);
        } else {
            $jsonData = json_encode(array(
                "status" => "Erreur",
                "message" => "Identifiant invalide",
                "code" => 1
            ));
            echo $jsonData;
        }
        break;
    case 'ues':
        $ue->toutLesUes();
        break;
    case 'ue':
        if (!empty($url[1])) {
            $ue->uneUE($url[1]);
        } else {
            $jsonData = json_encode(array(
                "status" => "Erreur",
                "message" => "Identifiant invalide",
                "code" => 1
            ));
            echo $jsonData;
        }
        break;
    case 'filieres':
        $filiere->toutLesFiliere();
        break;
    case 'filiere':
        if (!empty($url[1])) {
            $filiere->uneFiliere($url[1]);
        } else {
            $jsonData = json_encode(array(
                "status" => "Erreur",
                "message" => "Identifiant invalide",
                "code" => 1
            ));
            echo $jsonData;
        }
        break;
    case 'ecus':
        $ecu->toutLesEcu();
        break;
    case 'ecu':
        if (!empty($url[1])) {
            $ecu->unEcu($url[1]);
        } else {
            $jsonData = json_encode(array(
                "status" => "Erreur",
                "message" => "Identifiant invalide",
                "code" => 1
            ));
            echo $jsonData;
        }
        break;
    case 'tps':
        $tp->toutLesTPs();
        break;
    case 'tp':
        if (!empty($url[1])) {
            $tp->unTP($url[1]);
        } else {
            $jsonData = json_encode(array(
                "status" => "Erreur",
                "message" => "Identifiant invalide",
                "code" => 1
            ));
            echo $jsonData;
        }
        break;
    case 'admins':
        $admin->toutLesAdmins();
        break;
    case 'admin':
        if (!empty($url[1])) {
            $admin->unAdmin($url[1]);
        } else {
            $jsonData = json_encode(array(
                "status" => "Erreur",
                "message" => "Identifiant invalide",
                "code" => 1
            ));
            echo $jsonData;
        }
        break;
    case 'departements':
        $departement->toutLesDepartements();
        break;
    case 'departement':
        if (!empty($url[1])) {
            $departement->unDepartement($url[1]);
        } else {
            $jsonData = json_encode(array(
                "status" => "Erreur",
                "message" => "Identifiant invalide",
                "code" => 1
            ));
            echo $jsonData;
        }
        break;
    default:
        echo json_encode(["status" => "Erreur", "message" => "La demande n'est pas valide, vérifiez l'url", "code" => 0]);
        break;
}
