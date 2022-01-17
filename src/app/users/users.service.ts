import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  allUsers: Array<User> = [];

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get('../../assets/data.json');
  }
}
