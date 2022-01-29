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
  descriptionAssignment?:string;
  dateDeRendu?:Date;
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
    //newAssignment.nomAssignment = this.nomAssignment;
    //newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

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

  getTeacher(): void {
    
    console.log('Matiere ' + this.matiereAssignment + ' séléctionée')

  }
}
