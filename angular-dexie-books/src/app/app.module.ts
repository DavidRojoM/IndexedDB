import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './core/domain/pages/home/home.component';
import { FormComponent } from './core/shared/components/form/form.component';
import { ListComponent } from './core/shared/components/list/list.component';
import { FinderComponent } from './core/shared/components/finder/finder.component';

@NgModule({
  declarations: [AppComponent, FormComponent, HomeComponent, ListComponent, FinderComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
