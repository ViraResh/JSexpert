import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/home/home.component';
import { FilmsComponent } from 'src/app/main/films/films.component';
import { ActorsComponent } from 'src/app/main/actors/actors.component';
import { MainComponent } from 'src/app/main/main.component';



const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "main" }, 
  { path: "home", component: HomeComponent },
  { path: "films", component: MainComponent },
  { path: "actors", component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
