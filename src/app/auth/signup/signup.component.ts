import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(
    private authService: AuthService,
    // private router: Router,
  ) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      (authStatus) => {
        this.isLoading = false;
      }
    );
  }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password, form.value.username);
    // this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
