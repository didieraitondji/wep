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
            if (empty($url[2])) {
                $enseignant->unEnseignant($url[1]);
            } else {
                switch (strtolower($url[2])) {
                    case 'filieres':
                        $enseignant->filieresEnseignants($url[1]);
                        break;
                    case 'filiere':
                        if (!empty($url[3])) {
                            switch (strtolower($url[4])) {
                                case 'ecus':
                                    $enseignant->ecusEnseignants($url[1], $url[3]);
                                    break;
                                case 'necus':
                                    $enseignant->necusEnseignants($url[1], $url[3]);
                                    break;
                                case 'ecu':
                                    if (!empty($url[5])) {
                                        switch ($url[6]) {
                                            case 'tps':
                                                $enseignant->tpsEnseignant($url[1], $url[3], $url[5]);
                                                break;
                                            default:
                                                $jsonData = json_encode(array(
                                                    "status" => "Erreur",
                                                    "message" => "Identifiant invalide",
                                                    "code" => 0
                                                ));
                                                break;
                                        }
                                    } else {
                                        $jsonData = json_encode(array(
                                            "status" => "Erreur",
                                            "message" => "Identifiant invalide",
                                            "code" => 0
                                        ));
                                    }
                                    break;
                                default:
                                    $jsonData = json_encode(array(
                                        "status" => "Erreur",
                                        "message" => "Identifiant invalide",
                                        "code" => 0
                                    ));
                                    break;
                            }
                        } else {
                            $jsonData = json_encode(array(
                                "status" => "Erreur",
                                "message" => "Identifiant invalide",
                                "code" => 0
                            ));
                        }
                        break;
                    case 'nfilieres':
                        $enseignant->nfilieresEnseignants($url[1]);
                        break;
                    default:
                        $jsonData = json_encode(array(
                            "status" => "Erreur",
                            "message" => "Identifiant invalide",
                            "code" => 0
                        ));
                        echo $jsonData;
                }
            }
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
        if (empty($url[1])) {
            $etudiant->toutLesEtudiants();
        } else {
            switch (strtolower($url[1])) {
                case 'filiere':
                    $etudiant->toutLesEtudiantsFiliere($url[2]);
                    break;
                default:
                    $jsonData = json_encode(array(
                        "status" => "Erreur",
                        "message" => "Identifiant invalide",
                        "code" => 0
                    ));
                    echo $jsonData;
                    break;
            }
        }
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
            if (empty($url[2])) {
                $filiere->uneFiliere($url[1]);
            } else {
                switch (strtolower($url[2])) {
                    case 'ecus':
                        $filiere->ecusFiliere($url[1]);
                        break;
                    case 'ecu':
                        if (!empty($url[3])) {
                            switch (strtolower($url[4])) {
                                case 'tps':
                                    if (!empty($url[5])) {
                                        $filiere->nstpsEcus($url[1], $url[3], $url[5]);
                                    } else {
                                        $filiere->tpsEcus($url[1], $url[3]);
                                    }
                                    break;
                                default:
                                    $jsonData = json_encode(array(
                                        "status" => "Erreur",
                                        "message" => "Identifiant invalide",
                                        "code" => 1
                                    ));
                                    break;
                            }
                        } else {
                            $jsonData = json_encode(array(
                                "status" => "Erreur",
                                "message" => "Identifiant invalide",
                                "code" => 1
                            ));
                        }
                        break;
                    case 'ues':
                        $filiere->uesFiliere($url[1]);
                        break;
                    case 'nues':
                        $filiere->nuesFiliere($url[1]);
                        break;
                    default:
                        $jsonData = json_encode(array(
                            "status" => "Erreur",
                            "message" => "Identifiant invalide",
                            "code" => 1
                        ));
                        echo $jsonData;
                        break;
                }
            }
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
        if (empty($url[1])) {
            $tp->toutLesTPs();
        } else {
            switch (strtolower($url[2])) {
                case 'ecus':
                    break;
                case 'necus':
                    break;
                default:
                    $jsonData = json_encode(array(
                        "status" => "Erreur",
                        "message" => "Identifiant invalide",
                        "code" => 1
                    ));
                    echo $jsonData;
                    break;
            }
        }

        break;
    case 'tp':
        if (!empty($url[1])) {
            if (!empty($url[2])) {
                switch (strtolower($url[2])) {
                    case 'enseignant':
                        $tp->enseignant($url[1]);
                        break;
                    default:
                        $jsonData = json_encode(array(
                            "status" => "Erreur",
                            "message" => "Identifiant invalide",
                            "code" => 1
                        ));
                        echo $jsonData;
                        break;
                }
            } else {
                $tp->unTP($url[1]);
            }
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
    case 'total':
        if (!empty($url[1])) {
            switch (strtolower($url[1])) {
                case 'enseignants':
                    $enseignant->totalEnseignant();
                    break;
                case 'etudiants':
                    $etudiant->totalEtudiant();
                    break;
                case 'filieres':
                    $filiere->totalFiliere();
                    break;
                case 'ue':
                    $ue->totalUe();
                    break;
                case 'tp':
                    $tp->totalTP();
                    break;
                case 'soumissions':
                    $travail->totalSoumission();
                    break;
                case 'ecu':
                    $ecu->totalEcu();
                    break;
                case 'departement':
                    $departement->totalDepartement();
                    break;

                default:
                    echo json_encode(["status" => "Erreur", "message" => "La demande n'est pas valide, vérifiez l'url", "code" => 0]);
                    break;
            }
        } else {
            $jsonData = json_encode(array(
                "status" => "Erreur",
                "message" => "Identifiant invalide",
                "code" => 1
            ));
            echo $jsonData;
        }
        break;
    case 'ecuesenseignant':
        if (!empty($url[1])) {
            $enseignant->enseignantEcues($url[1]);
        } else {
            echo json_encode(["status" => "Erreur", "message" => "La demande n'est pas valide, vérifiez l'url", "code" => 0]);
        }
        break;
    case 'tpsenseignant':

        break;
    default:
        echo json_encode(["status" => "Erreur", "message" => "La demande n'est pas valide, vérifiez l'url", "code" => 0]);
        break;
}
