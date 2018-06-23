import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {NavbarModule} from './views/shared/navbar/navbar.module';
import {FooterModule} from './views/shared/footer/footer.module';
import {SidebarModule} from './views/sidebar/sidebar.module';
import {LbdModule} from './lbd/lbd.module';

import {AppComponent} from './app.component';

import {HomeComponent} from './views/home/home.component';
import {UserComponent} from './views/user/user.component';
import {TablesComponent} from './views/tables/tables.component';
import {TypographyComponent} from './views/typography/typography.component';
import {IconsComponent} from './icons/icons.component';
import {NotificationsComponent} from './views/notifications/notifications.component';
import {UpgradeComponent} from './views/upgrade/upgrade.component';
import {JoinComponent} from './views/join/join.component';
import {SharepriceComponent} from './views/shareprice/shareprice.component';
import {JoinServiceService} from './services/join-service.service';
import {JoinedDetailServiceService} from './services/joined-detail-service.service';
import {AnalystServiceService} from './services/analyst-service.service';
import {TransactionsServiceService} from './services/transactions-service.service';
import {BrokerServiceService} from './services/broker-service.service';
import {SimulatorServiceService} from './services/simulator-service.service'
import {GameServiceService} from './services/game-service.service'
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { SpinnerComponent } from './views/spinner/spinner.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    UpgradeComponent,
    JoinComponent,
    SharepriceComponent,
    SpinnerComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    RouterModule,
    AppRoutingModule,
    LbdModule
  ],
  providers: [
    JoinServiceService, 
    JoinedDetailServiceService,
    AnalystServiceService,
    TransactionsServiceService,
    BrokerServiceService,
    SimulatorServiceService,
    GameServiceService,
    {provide:LocationStrategy,useClass:HashLocationStrategy}
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}