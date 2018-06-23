import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {JoinServiceService} from '../../services/join-service.service';
import {JoinedDetailServiceService} from '../../services/joined-detail-service.service'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private currentUser: User;
  private userList : User[];

  constructor(private joinService : JoinServiceService,private joinedDetailServiceService : JoinedDetailServiceService) 
  {
          this.userList = this.joinedDetailServiceService.getUsers();
          this.currentUser = this.joinedDetailServiceService.getCurrentUser();
          console.log(this.currentUser);
  }
   
  ngOnInit() {
  }

}
