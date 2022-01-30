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
  
  loggedInUIState = false;

  ngOnInit(): void {
    this.loggedInUIState = this.authService.loggedIn;
  }

  slideDarkMode = false
  loginButtonColor = "primary";

  title = 'Application de gestion des assignments';
  constructor(
    public authService: AuthService,
    private router: Router,
    private assignmentsService: AssignmentsService
  ) {}

  toggleDarkMode(): void {
    document.body.classList.toggle('dark-mode');
  }

  oldLoginFunction() {
    if (!this.authService.loggedIn) {
      this.authService.oldLogInFunction();
      this.loginButtonColor = "warn";
      this.loggedInUIState = !this.loggedInUIState;
    } else {
      this.authService.logOut();
      this.loginButtonColor = "primary";
      //this.router.navigate(['/home']);
      this.loggedInUIState = !this.loggedInUIState;
    }
  }

  logout() {
    this.authService.logOut();
    this.loginButtonColor = "primary";
    this.loggedInUIState = !this.loggedInUIState;
    this.router.navigate(['/home']);
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
