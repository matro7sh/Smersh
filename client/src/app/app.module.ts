import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MissionsListComponent } from 'src/app/components/missions/missionsList.component';
import { ErrorsComponent } from './components/errors/errors.component';
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
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';

import { MissionSingleComponent } from './components/mission-single/mission-single.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { UsersListComponent } from 'src/app/components/users/usersList.component';
import { UserSingleComponent } from './components/user-single/user-single.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MissionCreateComponent } from './components/mission-create/mission-create.component';
import { UserCreateComponent } from './components/user-create/user-create.component';

// Services
import { UsersService } from './services/users.service';
import { MissionsService } from './services/missions.service';
import { TypesService } from './services/types.service';
import { UploadsService } from './services/uploads.service';
import { HostsService } from './services/hosts.service';
import { MissionEditComponent } from './components/mission-edit/mission-edit.component';
import { MissionMyComponent } from './components/mission-my/mission-my.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { VulnsListComponent } from 'src/app/components/vulns/vulnsList.component';
import { VulnsCreateComponent } from './components/vulns-create/vulns-create.component';
import { VulnsEditComponent } from './components/vulns-edit/vulns-edit.component';
import { AddVulnsToHostExternalComponent } from './components/add-vulns-to-host-external/add-vulns-to-host-external.component';
import { HostsListComponent } from 'src/app/components/hosts/hostsList.component';
import { HostEditComponent } from './components/host-edit/host-edit.component';
import { ImpactsListComponent } from 'src/app/components/impact/impactsList.component';
import { ImpactEditComponent } from './components/impact-edit/impact-edit.component';
import { ImpactCreateComponent } from './components/impact-create/impact-create.component';
import { ConclusionComponent } from './components/conclusion/conclusion.component';
import { ClientsService } from './services/clients.service';
import { ClientsListComponent } from 'src/app/components/clients/clientsList.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { ClientCreateComponent } from './components/client-create/client-create.component';
import { VulnTypesService } from './services/vuln-types.service';
import { HostsVulnsService } from './services/hosts-vulns.service';
import { EditVulnWithStateComponent } from './components/edit-vuln-with-state/edit-vuln-with-state.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { StepsService } from './services/steps.service';
import { GenericListComponent } from 'src/app/components/generic/list/generic-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GenericListComponent,
    LoginComponent,
    MissionsListComponent,
    ErrorsComponent,
    MissionSingleComponent,
    SideBarComponent,
    UsersListComponent,
    UserSingleComponent,
    HomepageComponent,
    UserCreateComponent,
    MissionCreateComponent,
    MissionEditComponent,
    MissionMyComponent,
    UserEditComponent,
    VulnsListComponent,
    VulnsCreateComponent,
    VulnsEditComponent,
    AddVulnsToHostExternalComponent,
    HostsListComponent,
    HostEditComponent,
    ImpactsListComponent,
    ImpactEditComponent,
    ImpactCreateComponent,
    ConclusionComponent,
    ClientsListComponent,
    ClientEditComponent,
    ClientCreateComponent,
    EditVulnWithStateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule,
    HttpClientModule,
    MatChipsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    MatListModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    BrowserModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatTableModule,
  ],
  providers: [
    MissionsService,
    HostsVulnsService,
    VulnTypesService,
    StepsService,
    UsersService,
    UploadsService,
    HostsService,
    ClientsService,
    MatDatepickerModule,
    TypesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
