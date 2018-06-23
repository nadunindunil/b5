import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { JoinServiceService } from '../../services/join-service.service';
import { JoinedDetailServiceService } from '../../services/joined-detail-service.service';
import { User } from '../../models/user';

@Component({ selector: 'app-join', templateUrl: './join.component.html', styleUrls: ['./join.component.scss'] })
export class JoinComponent implements OnInit {
  model: any = {};
  loading = false;
  spinner:boolean=false;
  returnUrl: string;
  joined: boolean = false;
  playerName: string = null;
  filled: boolean = true;
  userList: User[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: Http,
    private joinService: JoinServiceService,
    private joinedDetailServiceService: JoinedDetailServiceService
  ) {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.userList = this.joinedDetailServiceService.getUsers();
  }

  ngOnInit() {}

  async login() {
    this.spinner=true;
    try {
      this.joinService.loggin(this.playerName).subscribe(res => {
        this.spinner=false;
        this.playerName = '';
        this.filled = false;
        this.userList = this.joinedDetailServiceService.getUsers();
      });
    } catch (error) {
      this.spinner=false;
      alert(error);
    }
  }
  async start() {
    this.spinner=true;
    try {
      await this.joinService.startGame();
    } catch (error) {
      this.spinner=false;
      alert(error);
    }
  }

  clear() {
    this.joinedDetailServiceService.clearUserData();
    this.userList = this.joinedDetailServiceService.getUsers();
  }
}
