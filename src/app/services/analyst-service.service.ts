import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Subscription, Observable} from 'rxjs';
import {User} from '../models/user';
import {Trend} from '../models/trend';
import 'rxjs/add/operator/map';

@Injectable()
export class AnalystServiceService {
  // https://stock-market-analyst.herokuapp.com/webapi/trends

  constructor(private http : Http) {}

  public getAnalystData(user : User, turn : number, gameId : string) : Observable < Trend[] > {
    console.log('success', user.Name, turn, gameId);
    return this
      .http
      .post('https://stock-market-analyst.herokuapp.com/webapi/trends', {
        user: user.Name,
        turn: String(turn),
        gameId: String(gameId)
      })
      .map(res => {
        console.log('t2');
        return res
          .json()
          .map(item => {
            return new Trend(item.action, item.duration, item.name, item.rectime, item.type);
          });
      });
  }

}
