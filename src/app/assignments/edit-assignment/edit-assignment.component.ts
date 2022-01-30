import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';


@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment?:Assignment;
  // champs du formulaire
  nomAssignment?:string;
  matiereAssignment?:string; 
  dateDeRendu?:Date;
  authorAssignment?:string;
  noteAssignment?:string;
  remarquesAssignment?:string;
  coefAssignment?:number;
  rendu?:boolean;

  //Sauv des données par default
  previousName?:string;
  previousmatiereAssignment?:string;
  previousDate?:Date;
  previousNote?:number;
  previousRemarques?:string;
  previousCoef?:number;
  previousrenduAssignment?:boolean;

  firstValue = new FormControl(this.matiereAssignment);

  constructor(private route:ActivatedRoute,
              private router:Router,
              private assignmentService:AssignmentsService,
              public authService:AuthService) { }

  ngOnInit(): void {
    // exemple de récupération de "query params" et "fragment"
    // exemple d'URL : /assignment/1/edit?nom=Buffa&prenom=Michel#edit
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    this.getAssignment();
  }

  getAssignment() {
    // récupère l'id dans l'URL
    const id = +this.route.snapshot.params['id'];

    this.assignmentService.getAssignment(id)
    .subscribe(assignment => {
      // Pour que la "vue" affiche les informations
      // de l'assignment qu'on édite....
      this.assignment = assignment;
      // pré-remplit le formulaire dès l'affichage
      this.nomAssignment = assignment?.nom;
      this.dateDeRendu = assignment?.dateDeRendu;
      this.authorAssignment = assignment?.auteur; 
      this.matiereAssignment= assignment?.matiere;
      this.rendu = assignment?.rendu;

      // Sauvegardes les précedence données 
      this.previousName = assignment?.nom;
      this.previousDate = assignment?.dateDeRendu;
      this.previousRemarques = assignment?.remarques;
      this.previousNote = assignment?.note;
      this.previousCoef = assignment?.coefficient;
      this.previousmatiereAssignment = assignment?.matiere;
      this.previousrenduAssignment = assignment?.rendu;

      this.nomAssignment = this.previousName;
      this.remarquesAssignment = this.previousRemarques;
      if(this.previousNote==-1) {
        this.noteAssignment = "";
      } else {
        this.noteAssignment = this.previousNote!.toString();
      }
      this.matiereAssignment = this.previousmatiereAssignment;
      this.coefAssignment = this.previousCoef;
    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    if (this.nomAssignment) {
      this.assignment.nom = this.nomAssignment;
    }

    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }

    if (this.noteAssignment) {
      this.assignment.note = Math.round(parseFloat(this.noteAssignment)*100)/100;
    }

    if (this.matiereAssignment) {
      this.assignment.matiere = this.matiereAssignment;
    }

    if (this.coefAssignment) {
      this.assignment.coefficient = Math.round(this.coefAssignment*10)/10;
    }

    if (this.remarquesAssignment) {
      this.assignment.remarques = this.remarquesAssignment;
    }

    /*if (this.rendu) {
      this.assignment.rendu = this.rendu;
    }*/

    this.assignmentService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });

  }

  changeRendu(){
    this.assignment!.rendu = !this.rendu;
    console.log("rendu="+this.assignment!.rendu);
  }

  resetForm(){
    this.nomAssignment = this.previousName; 
    this.remarquesAssignment = this.previousRemarques;
    this.noteAssignment = this.previousNote!.toString();
    this.matiereAssignment = this.previousmatiereAssignment;
    this.coefAssignment = this.previousCoef;
    this.rendu=this.previousrenduAssignment;
    this.dateDeRendu=this.previousDate;

  }

  setMatiere(choix:Number): void {
    
    switch(choix) {
      case 0: {
        this.matiereAssignment="Dev Web";
        break;
      }
      case 1: {
        this.matiereAssignment="Gestion de projet";
        break;
      }
      case 2: {
        this.matiereAssignment="Création d'entreprise";
        break;
      }
      case 3: {
        this.matiereAssignment="Management du numérique";
        break;
      }
      default: {
        this.matiereAssignment="BD pour le Big Data";
        break;
      }
    }

    console.log('Matiere ' + this.matiereAssignment + ' séléctionée')

  }

  NumbersOnly(event: any)  {
    var number = (event.which) ? event.which : event.keyCode;
    
    if (number != 46 && number > 31
      && (number < 48 || number > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }


  
}
 
