import {Component, OnInit} from '@angular/core';
import {LocationStrategy, PlatformLocation, Location} from '@angular/common';
import {LegendItem, ChartType} from '../../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import {JoinedDetailServiceService} from '../../services/joined-detail-service.service';
import {AnalystServiceService} from '../../services/analyst-service.service';
import {TransactionsServiceService} from '../../services/transactions-service.service';
import {User} from '../../models/user';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Trend} from '../../models/trend';
import 'rxjs/add/operator/mergeMap';
import {BrokerServiceService} from '../../services/broker-service.service';
import {BrokerTransaction} from '../../models/brokerTransaction';
import {SimulatorServiceService} from '../../services/simulator-service.service';
import {GameServiceService} from '../../services/game-service.service';
import swal from 'sweetalert2'

declare interface TableData {
  headerRow : string[];
  dataRows : string[][];
}

@Component({selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.css']})
export class HomeComponent implements OnInit {
  public tableData1 : TableData;
  public tableData2 : TableData;
  public tableData3 : TableData;
  spinnerbuy : boolean = false;
  spinnersell : boolean = false;
  private currentUser : User = null;
  private rowData : Observable < Trend[] >;
  private userBalance : Observable < any >;
  private rowData2 : any;
  private currentRound : number;
  private portfolio : Observable < BrokerTransaction[] >;

  constructor(private joinedDetailServiceService : JoinedDetailServiceService, private analystServiceService : AnalystServiceService, private transactionsServiceService : TransactionsServiceService, private brokerServiceService : BrokerServiceService, private simulatorServiceService : SimulatorServiceService, private gameServiceService : GameServiceService) {
    console.log(this.joinedDetailServiceService.getUsers());

    // listen to user change
    this
      .joinedDetailServiceService
      .currentUser
      .subscribe(value => {
        this.currentUser = value;
        console.log(value);
        this.uiChange();
      });

    // when next turn clicked
    this
      .simulatorServiceService
      .userDetails
      .subscribe(value => {
        console.log(value);
        this.rowData2 = value.round.stocks;
        this.currentRound = value.currentRound;

        this.rowData = this
          .analystServiceService
          .getAnalystData(this.currentUser, value.currentRound, JSON.parse(localStorage.getItem('userData')).gameId);
      });

    this.tableData1 = {
      headerRow: [
        'Action', 'Duration', 'Sector', 'Type'
      ],
      dataRows: null
    };

    this.tableData2 = {
      headerRow: [
        'Company', 'Sector', 'Price', 'Action'
      ],
      dataRows: null
    };

    this.tableData3 = {
      headerRow: [
        'Company', 'Quantity', 'Action'
      ],
      dataRows: null
    };
  }

  toggleShowBuy(price : any, stock : string) {
    swal({
      title: 'Insert number of Stocks you want to buy',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Buy',
      showLoaderOnConfirm: true,

      inputValidator: (value) => {

        return new Promise((resolve) => {
          let userBalance = null;
          this
            .userBalance
            .subscribe(res => {
              userBalance = res;

              if (userBalance.balace >= Number(value) * price) {
                resolve()
              } else {
                resolve(`Balance must be equal or larger than ${Number(value) * price} !`)
              }
            })
        })
      },

      preConfirm: (quantity) => {
        this.buyShare(price, stock, quantity);
      },
      allowOutsideClick: () => !swal.isLoading()
    })
  }

  toggleShowSell(price : any, stock : string, currentQuantity : number) {
    swal({
      title: 'Insert number of Stocks you want to Sell',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Sell',
      showLoaderOnConfirm: true,

      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (currentQuantity >= Number(value)) {
            resolve()
          } else {
            resolve(`Qunatity should be less than or equal ${currentQuantity} !`)
          }
        })
      },
      preConfirm: (quantity) => {
        this.sellShare(price, stock, quantity);
      }
    })
  }

  public async uiChange() {
    const {accountNumber, Name} = this.currentUser;
    this.portfolio = this
      .brokerServiceService
      .portfolio(this.currentUser.Name);
    this.userBalance = this
      .transactionsServiceService
      .getBalance(accountNumber);
    await this
      .gameServiceService
      .checkWinner();
  }

  public nextTurn() {
    this
      .simulatorServiceService
      .makeNextTurn();
  }

  ngOnInit() {}

  public buyShare(price : any, stock : string, quantity : number) {
    console.log(price, stock, quantity);

    this.spinnerbuy = true;
    const {accountNumber, Name} = this.currentUser;

    const stockPrice = this
      .simulatorServiceService
      .getCurrentStockPrices(stock); // using price is also equal
    console.log(stockPrice);
    this
      .transactionsServiceService
      .transaction('debit', String(stockPrice * quantity), String(accountNumber), 'buying')
      .flatMap(response => {
        this.spinnerbuy = true;
        return this
          .brokerServiceService
          .bTransaction(Name, stock, quantity, 'buy', stockPrice, this.currentRound);
      })
      .subscribe(data => {
        console.log(data);
        this.spinnerbuy = false;
        swal('Success!', 'you have succefully bought!', 'success')
        this.uiChange();
      });
  }

  public sellShare(price : any, company : string, quantity : number) {
    console.log(price, company, quantity);
    this.spinnersell = true;
    const {accountNumber, Name} = this.currentUser;
    const stockPrice = this
      .simulatorServiceService
      .getCurrentStockPrices(company);
    console.log(stockPrice);
    this
      .brokerServiceService
      .bTransaction(Name, company, quantity, 'sell', stockPrice, this.currentRound)
      .flatMap(response => {
        this.spinnersell = false;
        return this
          .transactionsServiceService
          .transaction('credit', String(stockPrice * quantity), String(accountNumber), 'selling');

      })
      .subscribe(data => {
        console.log(data);
        this.spinnersell = false;
        swal('Success!', 'you have succefully sold a stock!', 'success')
        this.uiChange();
      });
  }
}
