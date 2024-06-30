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

switch ($url[1]) {
    case 'enseignants':
        $enseignant->toutLesEnseignants();
        break;
    case 'enseignant':
        if (!empty($url[2])) {
            $enseignant->unEnseignant($url[2]);
        } else {
            throw new Exception("Identifiant de enseignant introuvable !");
        }
        break;
    case 'etudiants':
        $etudiant->toutLesEtudiants();
        break;
    case 'etudiant':
        if (!empty($url[2])) {
            $etudiant->unEtudiant($url[2]);
        } else {
            throw new Exception("Identifiant de etudiant introuvable !");
        }
        break;
    case 'messages':
        $message->toutLesMessages();
        break;
    case 'message':
        if (!empty($url[2])) {
            $message->unMessage($url[2]);
        } else {
            throw new Exception("Identifiant de Message Introuvable !");
        }
        break;
    case 'travaux':
        $travail->toutLesTravaux();
        break;
    case 'travail':
        if (!empty($url[2])) {
            $travail->unTravail($url[2]);
        } else {
            throw new Exception("Identifiant de Travail Introuvable !");
        }
        break;
    case 'ues':
        $ue->toutLesUes();
        break;
    case 'ue':
        if (!empty($url[2])) {
            $ue->uneUE($url[2]);
        } else {
            throw new Exception("Identifiant de UE Introuvable !");
        }
        break;
    case 'filieres':
        $filiere->toutLesFiliere();
        break;
    case 'filiere':
        if (!empty($url[2])) {
            $filiere->uneFiliere($url[2]);
        } else {
            throw new Exception("Identifiant de Filière Introuvable !");
        }
        break;
    case 'ecus':
        $ecu->toutLesEcu();
        break;
    case 'ecu':
        if (!empty($url[2])) {
            $ecu->unEcu($url[2]);
        } else {
            throw new Exception("Identifiant de ECU Introuvable !");
        }
        break;
    case 'tp':
        if (!empty($url[2])) {
            $tp->unTP($url[2]);
        } else {
            throw new Exception("Identifiant de TP Introuvable !");
        }
        break;
    case 'tps':
        $tp->toutLesTPs();
        break;
    case 'admins':
        $admin->toutLesAdmins();
        break;
    case 'admin':
        if (!empty($url[2])) {
            $admin->unAdmin($url[2]);
        } else {
            throw new Exception("Identifiant Admin Introuvable !");
        }
        break;
    case 'departements':
        $departement->toutLesDepartements();
        break;
    case 'departement':
        if (!empty($url[2])) {
            $departement->unDepartement($url[2]);
        } else {
            throw new Exception("Identifiant de Département Introuvable !");
        }
        break;
    default:
        throw new Exception("La demande n'est pas valide, vérifiez l'url");
        break;
}
