import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../shared/api/auth-service/auth.service";
import {NotificationsService} from "../../shared/common-services/notifications.service";

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
})
export class TopNavigationComponent implements OnInit {
  public authenticatedUser;

  openRightPanel = false;

  constructor(
    private router: Router,
    private notificationService: NotificationsService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authenticatedUser = this.authService.isAuthorized();
    console.log('open', this.openRightPanel);
  }

  signOut() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth/login']);
    this.notificationService.info('You are logged out')
  }
}
