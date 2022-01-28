import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Application de gestion des assignments';
 



  constructor(
    private authService: AuthService,
    private router: Router,
    private assignmentsService: AssignmentsService
  ) {}

  login() {
    if (!this.authService.loggedIn) {
      console.log("Je n'étais pas connecté, je suis maintenant loggé");
      this.authService.logIn();
    } else {
      console.log("J'étais  connecté, je suis maintenant déloggé");
      this.authService.logOut();
      this.router.navigate(['/home']);
    }
  }

  remplirBD() {
    //this.assignmentsService.peuplerBD();

    this.assignmentsService.peuplerBDAvecForkJoin().subscribe(() => {
      console.log('LA BASE EST ENTIEREMENT REMPLIE AVEC LES DONNEES DE TEST');

      // replaceUrl = true = force le refresh, même si
      // on est déjà sur la page d’accueil
      this.router.navigate(['/home'], { replaceUrl: true });
    });
  }
}
