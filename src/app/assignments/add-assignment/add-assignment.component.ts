import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

 
  assignment?:Assignment;
  // champs du formulaire
  nomAssignment?:string;
  matiereAssignment?:string; 
  authorAssignment?:string;
  remarquesAssignment?:string;
  dateDeRendu!:Date;
  noteAssignment?:number;
  coefAssignment?:number; 

  constructor(private assignmentService:AssignmentsService,
    private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("NOM = " + this.nomAssignment);
    console.log("DATE = " + this.dateDeRendu);

    const newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random()*100000);
    newAssignment.nom = "(Non renseigné)";
    if(this.nomAssignment) {
      newAssignment.nom = this.nomAssignment!;
    }
    newAssignment.auteur = "Anonymous";
    if(this.authorAssignment) {
      newAssignment.auteur = this.authorAssignment!;
    }
    newAssignment.matiere = "Dev Web";
    if(this.matiereAssignment) {
      newAssignment.matiere = this.matiereAssignment!;
    }
    const todayDate = new Date();
    var jourDeRenduParDefaut = 1;
    var moisDuRenduParDefaut = 1;
    var fullYear = todayDate.getFullYear();
    const prepareDateParDefaut = () => {
      var nombreAAjouterPourQueMoisOK = 3;
      if(!(todayDate.getDate()>28)) {
        nombreAAjouterPourQueMoisOK--;
        jourDeRenduParDefaut=todayDate.getDay();
      }
      if(!(todayDate.getMonth()+nombreAAjouterPourQueMoisOK>12)) {
        nombreAAjouterPourQueMoisOK--;
        fullYear--;
        moisDuRenduParDefaut=todayDate.getMonth()+nombreAAjouterPourQueMoisOK;
      }
    }
    prepareDateParDefaut();
    newAssignment.dateDeRendu = new Date(moisDuRenduParDefaut+"/"+jourDeRenduParDefaut+"/"+fullYear);
    console.log("date de rendu : "+newAssignment.dateDeRendu);
    if(this.dateDeRendu) {
      try {
        newAssignment.dateDeRendu = new Date(this.dateDeRendu);
      } catch {
      }
    }
    newAssignment.matiere = "Dev Web";
    if(this.matiereAssignment) {
      newAssignment.matiere = this.matiereAssignment!;
    }
    if(this.remarquesAssignment) {
      newAssignment.remarques = this.remarquesAssignment!;
    }
    newAssignment.rendu = false;
    newAssignment.coefficient = 1;
    if(this.coefAssignment) {
      newAssignment.coefficient = this.coefAssignment!;
    }
    //seul le professeur peut attribuer une note et ce lors de l'édition de l'assignment
    newAssignment.note = -1;

    this.assignmentService.addAssignment(newAssignment)
    .subscribe(reponse => {
      console.log(reponse.message);
      // maintenant il faut qu'on affiche la liste !!!
      this.router.navigate(["/home"]);
    });
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
}
