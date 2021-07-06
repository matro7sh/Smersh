import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import {
  MissionsCreateComponent,
  MissionsEditComponent,
  MissionsListComponent,
} from 'src/app/components/missions';
import { ErrorsComponent } from './components/errors/errors.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatBadgeModule } from '@angular/material/badge';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MissionSingleComponent } from './components/mission-single/mission-single.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {
  UsersCreateComponent,
  UsersEditComponent,
  UsersListComponent,
} from 'src/app/components/users';
import { HomepageComponent } from './components/homepage/homepage.component';

// Services
import { UsersService } from './services/users.service';
import { MissionsService } from './services/missions.service';
import { TypesService } from './services/types.service';
import { UploadsService } from './services/uploads.service';
import { HostsService } from './services/hosts.service';
import { MissionMyComponent } from './components/mission-my/mission-my.component';
import {
  VulnsCreateComponent,
  VulnsEditComponent,
  VulnsListComponent,
} from 'src/app/components/vulns';
import { AddVulnsToHostExternalComponent } from './components/add-vulns-to-host-external/add-vulns-to-host-external.component';
import {
  HostsEditComponent,
  HostsListComponent,
} from 'src/app/components/hosts';
import {
  ImpactsCreateComponent,
  ImpactsEditComponent,
  ImpactsListComponent,
} from 'src/app/components/impacts';
import { ConclusionComponent } from './components/conclusion/conclusion.component';
import { ClientsService } from './services/clients.service';
import {
  ClientsCreateComponent,
  ClientsEditComponent,
  ClientsListComponent,
} from 'src/app/components/clients';
import { VulnTypesService } from 'src/app/services/vulnTypes.service';
import { HostVulnsService } from 'src/app/services/hostVulns.service';
import { EditVulnWithStateComponent } from './components/edit-vuln-with-state/edit-vuln-with-state.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { StepsService } from './services/steps.service';
import {
  GenericFormComponent,
  GenericListComponent,
} from 'src/app/components/generic';
import { ThemeService } from './services/theme.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PopupComponent } from './components/popup/popup.component';
import { MediaObjectsService } from 'src/app/services/mediaObjects.service';
import { MediasService } from 'src/app/services/medias.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocaleService } from './services/locale.service';
import { QueryableInputComponent } from 'src/app/components/generic/form/queryable-input.component';
import { QueryableModule } from 'src/app/form';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AddVulnsToHostExternalComponent,
    AppComponent,
    ClientsListComponent,
    ClientsEditComponent,
    ClientsCreateComponent,
    ConclusionComponent,
    EditVulnWithStateComponent,
    ErrorsComponent,
    GenericFormComponent,
    GenericListComponent,
    HomepageComponent,
    HostsEditComponent,
    HostsListComponent,
    ImpactsCreateComponent,
    ImpactsEditComponent,
    ImpactsListComponent,
    LoginComponent,
    MissionMyComponent,
    MissionsCreateComponent,
    MissionsEditComponent,
    MissionSingleComponent,
    MissionsListComponent,
    PopupComponent,
    QueryableInputComponent,
    SideBarComponent,
    UsersCreateComponent,
    UsersEditComponent,
    UsersListComponent,
    VulnsCreateComponent,
    VulnsEditComponent,
    VulnsListComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en', // TODO find a correct place to put static constants
    }),
  ],
  providers: [
    ClientsService,
    HostsService,
    HostVulnsService,
    LocaleService,
    MatDatepickerModule,
    MediaObjectsService,
    MediasService,
    MissionsService,
    StepsService,
    ThemeService,
    TypesService,
    UploadsService,
    UsersService,
    VulnTypesService,
    Object.values(QueryableModule).map((m) => m),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
