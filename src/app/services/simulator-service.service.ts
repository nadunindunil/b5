import { Injectable } from '@angular/core';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { Http, Response } from '@angular/http';
import { Stock } from '../models/stock';
import { User } from '../models/user';

@Injectable()
export class SimulatorServiceService {
  userDetails: Observable<any>;

  private userDetailsSubject: BehaviorSubject<any>;

  constructor(public http: Http) {
    this.userDetailsSubject = new BehaviorSubject<any>(null);
    this.userDetails = this.userDetailsSubject.asObservable();
    this.userDetailsSubject.next(JSON.parse(localStorage.getItem('userData')) || null);
  }

  public getCurrentStockPrices(stock: string): any{
    let dataArray = JSON.parse(localStorage.getItem('userData')).round.stocks;
    return dataArray.find(x => x.company === stock).price;
  }

  public makeNextTurn(): Subscription {
    console.log(JSON.parse(localStorage.getItem('userData')).gameId);
    return this.http
      .get(
        'https://stock-market-simulator.herokuapp.com/api/v1/game/turn/' +
          JSON.parse(localStorage.getItem('userData')).gameId
      )
      .subscribe(res => {
        let userData = JSON.parse(localStorage.getItem('userData'));

        let newUserData = userData;

        newUserData.round.stocks = res.json().stocks;
        newUserData.currentRound = res.json().stocks[0].round;
        newUserData.round.roundNo = res.json().stocks[0].round;

        console.log(newUserData);
        this.userDetailsSubject.next(newUserData);
        localStorage.setItem('userData', JSON.stringify(newUserData));
      });
  }
}
