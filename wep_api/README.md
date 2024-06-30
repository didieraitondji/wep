# Comment mettre l'Api en place sur votre PC ?

## Etape 1
Pour mettre l'api en place sur votre machine, vous devez avoir un serveur avec MySQL installé sur votre machine.

Une fois que vous avez ces logiciels, assurer vous de créer un lien vers le dossier "wep_api" sur votre machine (un virtuel host résoudra le problème chez WAMP Server )

## Etape 2

Mettez en place la base de donnée en créant la base de données de nom "wep_db"

Installer les tables avec le fichier install.php présent dans le dossier "install"

Mettez en place des données fictives avec le fichier "install_data.php" présent aussi dans le dossier "install"

Le fichier index.php présent dans le dossier "install" fait les deux tâches: installation des tables et création des données par défaut.

## Etape 3

Lancez maintenant le projet react sur votre PC et vous verez que tout fonctionne coe sur des roulette.

---

# NB: 
* Si votre server n'est pas lancé, l'api ne va pas répondre.
* Pour éviter les erreurs, veuillez utiliser wamp comme server web.
* Si vous utilisez WAMP server, prenez soin de donner le nom "wep-api.com" à votre virtual host.
* Si vous utilisez un autre serveur, vous allez devoir corriger l'appel à l'api dans votre projet. Ce qui peut prendre un temps suplémentaire de développement.