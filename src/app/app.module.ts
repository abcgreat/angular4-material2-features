import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ElementRef, ViewChild } from '@angular/core';
import { DataSource} from '@angular/cdk/collections';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { CdkTableModule } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AppComponent } from './app.component';
import { BasicTableComponent } from './tables/basic-table/basic-table.component';
import { SortTableComponent } from './tables/sort-table/sort-table.component';
import { SortPaginateTableComponent } from './tables/sort-paginate-table/sort-paginate-table.component';
import { FilterTableComponent } from './tables/filter-table/filter-table.component';

import { DataService } from './tables/data.service';
import { ListChipsPersonComponent } from './tables/list-chips-person/list-chips-person.component';

import { ListChipsListOptionComponent } from './tables/list-chips-list-option/list-chips-list-option.component';
import { TagComponent } from './tables/list-chips-person/list-chips-person-tag/list-chips-person-tag.component';

import { ListChipsListOptionTagComponent
      } from './tables/list-chips-list-option/list-chips-list-option-tag/list-chips-list-option-tag.component'; 

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  Sort,
  MatListOptionChange
} from '@angular/material';

// import {FlexLayoutModule} from '@angular/flex-layout';

import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {ObserversModule} from '@angular/cdk/observers';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';

/**
 * NgModule that includes all Material modules that are required to serve 
 * the Plunker.
 */
// @NgModule({
//   declarations: [ListChipsListOptionTagComponent],
//   exports: [
//     // CDK
//     A11yModule,
//     BidiModule,
//     ObserversModule,
//     OverlayModule,
//     PlatformModule,
//     PortalModule,
//     ScrollDispatchModule,
//     CdkStepperModule,
//     CdkTableModule,

//     // Material
//     MatAutocompleteModule,
//     MatButtonModule,
//     MatButtonToggleModule,
//     MatCardModule,
//     MatCheckboxModule,
//     MatChipsModule,
//     MatDatepickerModule,
//     MatDialogModule,
//     MatExpansionModule,
//     MatFormFieldModule,
//     MatGridListModule,
//     MatIconModule,
//     MatInputModule,
//     MatListModule,
//     MatMenuModule,
//     MatNativeDateModule,
//     MatProgressBarModule,
//     MatProgressSpinnerModule,
//     MatRadioModule,
//     MatRippleModule,
//     MatSelectModule,
//     MatSidenavModule,
//     MatSliderModule,
//     MatSlideToggleModule,
//     MatSnackBarModule,
//     MatTabsModule,
//     MatToolbarModule,
//     MatTooltipModule,
//   ]
// })
// export class MaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    BasicTableComponent,
    SortTableComponent,
    SortPaginateTableComponent,
    FilterTableComponent,
    ListChipsPersonComponent,
    TagComponent,
    ListChipsListOptionComponent,
    ListChipsListOptionTagComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,

    BrowserModule,
    CommonModule,
    // MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
    // FlexLayoutModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
