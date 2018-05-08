import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/service/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  logOut() {
    this.userService.clearStorage();
    this.router.navigate(['login']);
  }

}
