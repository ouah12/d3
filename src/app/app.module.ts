import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartPieProtocolComponent } from './dashboard/chart-protocol/chart-pie-protocol.component';
import { ElasticSearchService } from './dashboard/elasticSearch/elastic-search.service';
import { ChartRemiseComponent } from './dashboard/chart-remise/chart-remise.component';


const routes: Routes = [
   { path: '', component: DashboardComponent },
   {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartPieProtocolComponent,
    ChartRemiseComponent

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule  ],
  exports: [RouterModule, ReactiveFormsModule],
  providers: [ElasticSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
