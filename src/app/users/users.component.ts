import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { UserService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  allUsers: Array<User> = [];
  userId: number;

  constructor(
    private usersService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe((res) => {
      for (const data of res) {
        this.userId = data.id;
        const user = new User();

        user.id = data.id;
        user.firstName = data.firstName;
        user.surname = data.surname;
        user.age = data.age;
        user.gender = data.gender;
        user.friends = data.friends;

        this.allUsers.push(user);
      }
    });
  }

  showMore(id: number): void {
    this.router.navigate([`/users/${id}`], { relativeTo: this.route });
  }
}
