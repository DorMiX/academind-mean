import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authStatusListenerSubs: Subscription;
  private isAuthenticated = false;
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.authStatusListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(
        (isAuth) => {
          this.isAuthenticated = isAuth;
        }
      );
  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy() {

  }

}
