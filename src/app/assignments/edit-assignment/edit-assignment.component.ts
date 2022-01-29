import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
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
  authorAssignment?:string;
  descriptionAssignment?:string;
  dateDeRendu?:Date;
  noteAssignment?:number;
  coefAssignment?:number; 

  //Sauv des données par default
  previousName?:string;
  previousDate?:Date;
  previousDescription?:string;
  previsousNote?:number;
  previousCoef?:number;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private assignmentService:AssignmentsService) { }

  ngOnInit(): void {
    // exemple de récupération de "query params" et "fragment"
    // exemple d'URL : /assignment/1/edit?nom=Buffa&prenom=Michel#edit
    console.log("QUERY PARAMS : ");
    console.log(this.route.snapshot.queryParams);
    console.log("FRAGMENT : ");
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

      // Sauvegardes les précedence données 
      this.previousName = assignment?.nom;
      this.previousDate = assignment?.dateDeRendu;
      //TODO A changer par description 
      this.previousDescription = assignment?.remarques;
      this.previsousNote = assignment?.note;
      //TODO A changer par coef 
      this.previousCoef = assignment?.note;

    


    })
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    if (this.nomAssignment) {
      this.assignment.nom = this.nomAssignment;
    }

    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
    this.assignmentService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });

  }

  resetForm(){
    this.nomAssignment = this.previousName; 
    this.descriptionAssignment = '';
    this.noteAssignment = 0;
    this.coefAssignment = 0;
  }

  getTeacher(): void {
    
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
 
