import { Component, OnInit } from '@angular/core';
import {delay, distinctUntilChanged, map, switchMap, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {UserManagementService} from "../../../../shared/api/user-service/user-management.service";
import {User} from "../../../../shared/models/user/user.model";
import {Observable} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  // animations: [
  //   trigger('flyInOut', [
  //     state('in', style({ transform: 'translateX(0)' })),
  //     transition('void => *', [
  //       style({ transform: 'translateX(-100%)' }),
  //       animate(800)
  //     ]),
  //     transition('* => void', [
  //       animate(100, style({ transform: 'translateX(100%)' }))
  //     ])
  //   ])
  // ]
})
export class UserDetailsComponent implements OnInit {
  user$: Observable<User>;

  constructor(private route: ActivatedRoute, private userService: UserManagementService) { }

  ngOnInit() {
    this.user$ = this.route.params.pipe(
      distinctUntilChanged(),
      switchMap(params => {
        return this.userService.getUserDetails(params.id);
      })
    );
  }

}
