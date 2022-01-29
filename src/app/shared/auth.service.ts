import { Injectable } from '@angular/core';
import { UserDeLApp } from './userdelapp.model';
import { usersList } from './userList';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  users:UserDeLApp[] = usersList;
  currentUser="";
  godModeEnable=false;

  logIn(username: string, password: string) {
    this.loggedIn = false;
    this.users.forEach(user => {
      if (user.username==username && user.password==password) {
        this.loggedIn = true;
        this.router.navigate(['/home']);
        console.log("Je n'étais pas connecté, je suis maintenant loggé");
        this.currentUser=username;
        this.godModeEnable=user.admin;
      }
    });
    return this.loggedIn;
  }

  oldLogInFunction() {
    // typiquement, on devrait prendre en paramètres
    // login et password, vérifier qu'ils sont valides
    // en utilisant un web service en ligne (soit via une BD)
    // soit via oAuth, etc.

    // Nous pour le moment, on simule...
    this.currentUser = "GOD"
    this.loggedIn = true;
  }

  logOut() {
    // appelée typiquement par le bouton de deconnexion
    this.currentUser="";
    this.loggedIn = false;
    this.godModeEnable=false;
  }

  isAdmin() {
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    // renvoie une promesse !
    return isUserAdmin;
  }

  constructor(private router: Router) { }
}
