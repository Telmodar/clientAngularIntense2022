# Projet "Angula signement"
## Partie client

## Comment s’en servir ? 

### En mode normal
--> allez à l’url suivante : https://client-projetangular-sant-guib.herokuapp.com/

### En mode test (compiler chez soi)
--> il faut lancer les commandes `npm install` puis `ng serve` puis aller sur http://localhost:4200/home.
Mais pour avoir des données, il faut aussi démarrer notre api, pour cela il faut aller dans l'autre repos git et suivre les instructions du README.md : https://github.com/Telmodar/ApiAngularIntense2022


## Contribution 

### Ajout du login avec user
Nous avons ajouté une liste écrite en dure d’objet de type user. On a mis comme attribut l’username, le password et enfin un booléen indiquant si c’est un admin.

### Modification de du model assignment
Nous avons changé le model assignment en y ajoutant de nouveaux attributs : auteur, matiere, note et remarques. L’auteur est égal à l’username de l’utilisateur qui l’a ajouté. On a modifié cela dans les deux parties de l'application : partie client et partie API.

### Amélioration de l’affichage d’assignments
- Affichage dans une table angular material : avec liste triable par page avec ligne des headers fixe (qui ne scrolle pas) et avec pagination
- Amélioration de la page de détail d’un assignment : affichage de la matière, image de la matière, photo du professeur, assignment non rendu en retard, …
Info : pour l’indication du rendu en retard on a fait cela avec des comparaisons de date (date du jour / date de rendu de l’assignment).

### Blocage de fonctionnalité si l’user n’est pas un admin
Certaines fonctionnalités sont bloquées pour les utilisateurs qui ne le sont pas :
- La suppression d’un assignment
- L’édition de note
- Indiquer que le projet et rendu

### Ajout d’un dark mode

### Valeur par défaut lors de la création d’un assignment
- Matière par défaut
- Date par défaut
