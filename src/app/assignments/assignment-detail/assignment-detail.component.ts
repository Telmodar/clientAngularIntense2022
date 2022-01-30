import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?: Assignment;
  responsableMatiere?: String;
  titreResponsable?: String;
  photoResponsable?: String;
  imageMatiere?: String;
  rendu?: String;
  imageRendu?: String;
  dateNow?: Date;
  dateRendu?: Date;
  retard?: Boolean;

  constructor(private assignmentService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    // on récupère l'id dans l'URL
    // le + force la conversion de string à number
    const id: number = +this.route.snapshot.params['id'];

    this.assignmentService.getAssignment(id)
      .subscribe(assignment => {
        // on utilise this.assignmentTransmis puisque c'est la propriété
        // utilisée dans le template HTML
        this.assignmentTransmis = assignment;
        this.getRendu();
        this.getResponsable();
        this.dateNow = new Date();
        this.dateRendu = this.assignmentTransmis?.dateDeRendu
        this.retard = this.getRetard()

      })

  }
  onAssignmentRendu() {
    this.assignmentTransmis!.rendu = true;

    if (this.assignmentTransmis) {
      this.assignmentService.updateAssignment(this.assignmentTransmis)
        .subscribe(reponse => {
          console.log(reponse.message);
          this.router.navigate(["/home"]);
        })
      // PAS BON SI ICI car on n'a pas la garantie que les données ont été updatées
      // this.router.navigate(["/home"]);
    }
  }

  onDeleteAssignment() {
    if (this.assignmentTransmis) {
      this.assignmentService.deleteAssignment(this.assignmentTransmis)
        .subscribe(reponse => {
          console.log(reponse.message);

          // pour faire disparaitre la boite qui affiche le détail
          this.assignmentTransmis = undefined;

          // on affiche liste. Comme on est dans le subscribe, on est sur
          // que les données sont à jour et que l'assignment a été supprimé !
          this.router.navigate(["/home"]);
        })
    }
  }

  onClickEdit() {
    // correspond à /assignment/1/edit?nom=Buffa&prenom=Michel#edit
    //TODO, à récuperer le login
    this.router.navigate(['/assignment', this.assignmentTransmis?.id, 'edit'],
      {
        queryParams: {
          nom: 'Buffa',
          prenom: 'Michel'
        },
        fragment: 'edit'
      });
  }

  isAdmin() {
    return this.authService.loggedIn;
  }

  getResponsable() {


    switch (this.assignmentTransmis?.matiere) {
      case "BD pour le Big Data":
        this.responsableMatiere = "Gabriel MOPOLO";
        this.titreResponsable = "Professor at University of Nice";
        this.photoResponsable = "https://media-exp1.licdn.com/dms/image/C4E03AQHUszC0EvVQrQ/profile-displayphoto-shrink_800_800/0/1517725153393?e=1648684800&v=beta&t=MlYvRidOf0TqeczEZS3HIaEsCxeKwESyPKZXi7s1jkM";
        this.imageMatiere = "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1406&q=80";
        break;

      case "Dev Web":
        this.responsableMatiere = "Michel BUFFA";
        this.titreResponsable = "Teacher/researcher at CNRS/UNSA";
        this.photoResponsable = "https://i1.rgstatic.net/ii/profile.image/712495153029121-1546883490651_Q512/Michel-Buffa.jpg";
        this.imageMatiere = "https://www.net-concept.fr/wp-content/uploads/Developpement-web-Agence-Web-Net-Concept-1920x1055.png";
        break;

      case "Gestion de projet":
        this.responsableMatiere = "Michel WINTER";
        this.titreResponsable = "AI Master Program Coordinator";
        this.photoResponsable = "https://media-exp1.licdn.com/dms/image/C5603AQER1Fa_tvUuiA/profile-displayphoto-shrink_800_800/0/1516265634380?e=1648684800&v=beta&t=RmKwtBPyYmG0fAAdKN8n0w3TbWX60bI-V4FMVp4jARE";
        this.imageMatiere = "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1039&q=80";
        break;

      case "Création d'entreprise":
        this.responsableMatiere = "Nathalie SAUVAGE";
        this.titreResponsable = "Coordinatrice Master 2 SIRIS";
        this.photoResponsable = "http://pro-expertcomptable-nice.com/wp-content/uploads/2021/03/nathaliesauvage.jpg";
        this.imageMatiere = "https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1426&q=80";
        break;

      case "Management du numérique":
        this.responsableMatiere = "Stéphane TOUNSI";
        this.titreResponsable = "Responsable pédagogique Licence 3 MIAGE";
        this.photoResponsable = "https://media-exp1.licdn.com/dms/image/C5103AQHVmjKv_sAMNQ/profile-displayphoto-shrink_800_800/0/1516303286403?e=1648684800&v=beta&t=CUx_XgeQjmAXN8sv7QXImwGhYaXSq_js22ErjSq89Jg";
        this.imageMatiere = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
        break;


        ;
    }
  }

  getRendu() {
    this.rendu = String(this.assignmentTransmis?.rendu)

    switch (this.rendu) {
      case "true":
        this.imageRendu = "https://cdn-icons-png.flaticon.com/512/3443/3443392.png";

        break;

      case "false":
        this.imageRendu = "https://cdn-icons-png.flaticon.com/512/3443/3443382.png";

        break;

    }

  }

  getRetard() {
    var retard
    if (this.dateNow! < this.dateRendu!) {
      retard = true
    }
    else {
      retard = false
    }
    return retard
  }
};
