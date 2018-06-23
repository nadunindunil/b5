import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { JoinedDetailServiceService } from './joined-detail-service.service';
import { TransactionsServiceService } from './transactions-service.service';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class GameServiceService {
  /*
    this will maintain the player scores and their details
  */

 winner: Observable<any>;

 private winnerSubject: BehaviorSubject<any>;

  constructor(
    public joinedDetailServiceService: JoinedDetailServiceService,
    public transactionsServiceService: TransactionsServiceService
  ) {
    this.winnerSubject = new BehaviorSubject<any>(null);
    this.winner = this.winnerSubject.asObservable();
    this.winnerSubject.next(null);
  }

  public async checkWinner() {
    let players = this.joinedDetailServiceService.getUsers();
    let gamePlayer: Player;
    let newPlayerList: Player[] = [];
    let cash: number;
    let observables: Observable<any>[] = [];

    for (let player of players) {
      observables.push(this.transactionsServiceService.getBalance(player.accountNumber));
    }

    Observable.forkJoin(observables).subscribe(dataArray => {
      // All observables in `observables` array have resolved and `dataArray` is an array of result of each observable
      console.log(dataArray, players);
      for (let data of dataArray) {
        gamePlayer = new Player(players.find(x => x.accountNumber === Number(data.accountNumber)).Name, data.accountNumber, null, Number(data.balace));
        newPlayerList.push(gamePlayer);
      }
      let max = 0;
      let gameWinner = null;
      newPlayerList.forEach(newPlayer => {
        if (newPlayer.cashValue >= max){
          gameWinner = newPlayer;
          max = newPlayer.cashValue;
        }
      });
      this.winnerSubject.next(gameWinner);
      console.log(newPlayerList);
    });
  }
}
