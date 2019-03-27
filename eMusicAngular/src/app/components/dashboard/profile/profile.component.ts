import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';
import { UserRole } from 'src/app/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  getUserRole() : string {
    switch(this.userService.currentUser.role) {
      case UserRole.Admin: {
        return 'Admin';
      } 
      case UserRole.Moderator: {
        return 'Moderator';
      }
      case UserRole.User: {
        return 'User';
      }
    }
  }

}
