import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import {AutoSizeInputModule} from 'ngx-autosize-input';
import {AutosizeModule} from 'ngx-autosize';

import {MatIconModule, MatIcon} from '@angular/material/icon';

import { ResizeObserverDirective } from './resize-observer.directive';









@NgModule({
  declarations: [
    AppComponent,	
    ResizeObserverDirective,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,


    ReactiveFormsModule,

    AutoSizeInputModule,
    AutosizeModule,

    MatIconModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
