import { Component, OnInit, Input } from '@angular/core';
import { User, UserRole } from 'src/app/models';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  selectedRole = '';
  @Input() user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  getUserRole() : string {
    switch(this.user.role) {
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

  getUserRoleByString(role: string): UserRole {
    switch(role) {
      case 'Admin': {
        return UserRole.Admin;
      } 
      case 'Moderator': {
        return UserRole.Moderator;
      }
      case 'User': {
        return UserRole.User;
      }
    }
  }

  updateUser() {
    this.user.role = this.getUserRoleByString(this.selectedRole);
    this.userService.updateUser(this.user);
  }

  removeUser() {
    this.userService.removeUser(this.user);
  }
}
