import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgxButtonModule, IgxCardModule, IgxDialogModule, IgxIconModule, IgxInputGroupModule, IgxLayoutModule, IgxListModule, IgxProgressBarModule } from '@infragistics/igniteui-angular';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FilterPipe } from './filter.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ NavMenuComponent, HomeComponent, FilterPipe],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
     /*Ig Modules */
     IgxButtonModule,
     IgxProgressBarModule,
     IgxCardModule,
     IgxLayoutModule,
     IgxInputGroupModule,
     IgxDialogModule,
     IgxIconModule,
     IgxListModule,
     IgxInputGroupModule,
     /*Material design modules */
     MatToolbarModule,
     MatIconModule,
     MatSidenavModule,
     MatTabsModule,
     MatButtonModule,
     MatBadgeModule,
     MatSelectModule,
     MatButtonModule,
     MatCardModule,
     MatGridListModule,
     MatInputModule,
     MatFormFieldModule,
     MatSelectModule,
  ],
  exports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    /*Ig Modules */
    IgxButtonModule,
    IgxProgressBarModule,
    IgxCardModule,
    IgxLayoutModule,
    IgxInputGroupModule,
    IgxDialogModule,
    IgxIconModule,
    IgxListModule,
    IgxInputGroupModule,
    /*Material design modules */
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatButtonModule,
    MatBadgeModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NavMenuComponent, HomeComponent, FilterPipe
  ],
})
export class SharedModule {}
