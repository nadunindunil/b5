import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';

@Injectable()
export class TransactionsServiceService {
  constructor(private http: Http) {}

  public transaction(
    type: string,
    amount: string,
    accountNumber: string,
    shortDescription: string
  ): Observable<Response> {
    return this.http.post(
      'https://exithost.000webhostapp.com/bank/transaction/',
      {
        type: String(type),
        amount: String(amount),
        accountNumber: String(accountNumber),
        description: String(shortDescription)
      },
      {
        headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
      }
    );
  }

  public getBalance(userId: number): Observable<any> {
    return this.http
      .get('https://exithost.000webhostapp.com/bank/balance/' + userId, {
        headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
      })
      .map(res => {
        console.log(res);
        return res.json();
      });
  }
}
