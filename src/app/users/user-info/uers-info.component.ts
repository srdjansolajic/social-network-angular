import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../users.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  allUsers: Array<User> = [];
  userId: number;
  currentUser: User;
  friends: Array<User> = [];
  friendOfFriends: Array<User> = [];
  suggestedFriends: Array<User> = [];

  constructor(
    private route: ActivatedRoute,
    private usersService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];

      this.usersService.getAllUsers().subscribe((res) => {
        for (const data of res) {
          const user = new User();

          user.id = data.id;
          user.firstName = data.firstName;
          user.surname = data.surname;
          user.age = data.age;
          user.gender = data.gender;
          user.friends = data.friends;

          this.allUsers.push(user);
          this.currentUser = this.allUsers.find(
            (user) => user.id === this.userId
          );
        }
        this.getFriends();
        this.getFriendsOfFriends();
        this.getSuggestedFriends();
      });
    });
  }

  getFriends(): void {
    this.currentUser.friends.forEach((el) => {
      let friend = new User();

      friend = this.allUsers.find((user) => user.id === el);
      this.friends.push(friend);
    });
  }

  getFriendsOfFriends(): void {
    this.friends.forEach((el) => {
      el.friends.forEach((users) => {
        let friendOfFriend = new User();

        friendOfFriend = this.allUsers.find((user) => user.id === users);
        if (
          friendOfFriend.id !== this.currentUser.id &&
          !this.currentUser.friends.includes(friendOfFriend.id)
        ) {
          this.friendOfFriends.push(friendOfFriend);
        }
      });
    });
    this.friendOfFriends = [...new Set(this.friendOfFriends)];
  }

  getSuggestedFriends(): void {
    let suggested = [];

    this.friendOfFriends.forEach((el) => {
      for (const friend of el.friends) {
        for (const user of this.currentUser.friends) {
          if (friend === user) {
            suggested.push(el);
          }
        }
      }
    });
    this.suggestedFriends = suggested.filter(
      (item, index) => index !== suggested.indexOf(item)
    );
  }

  back(): void {
    this.router.navigate(['/users'], { relativeTo: this.route });
  }
}
