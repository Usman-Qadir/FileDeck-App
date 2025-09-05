// project import

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  // public method
  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google',
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter',
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook',
    },
  ];
}
