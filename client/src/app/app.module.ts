import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MissionChoiceComponent } from './components/missions/mission-choice.component';
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
import {MatRadioModule} from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';

import { MissionSingleComponent } from './components/mission-single/mission-single.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { UsersComponent } from './components/users/users.component';
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
import { VulnsComponent } from './components/vulns/vulns.component';
import { VulnsCreateComponent } from './components/vulns-create/vulns-create.component';
import { VulnsEditComponent } from './components/vulns-edit/vulns-edit.component';
import { AddVulnsToHostExternalComponent } from './components/add-vulns-to-host-external/add-vulns-to-host-external.component';
import { HostsComponent } from './components/hosts/hosts.component';
import { HostEditComponent } from './components/host-edit/host-edit.component';
import { ImpactComponent } from './components/impact/impact.component';
import { ImpactEditComponent } from './components/impact-edit/impact-edit.component';
import { ImpactCreateComponent } from './components/impact-create/impact-create.component';
import { ConclusionComponent } from './components/conclusion/conclusion.component';
import {ClientsService} from "./services/clients.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MissionChoiceComponent,
    ErrorsComponent,
    MissionSingleComponent,
    SideBarComponent,
    UsersComponent,
    UserSingleComponent,
    HomepageComponent,
    UserCreateComponent,
    MissionCreateComponent,
    MissionEditComponent,
    MissionMyComponent,
    UserEditComponent,
    VulnsComponent,
    VulnsCreateComponent,
    VulnsEditComponent,
    AddVulnsToHostExternalComponent,
    HostsComponent,
    HostEditComponent,
    ImpactComponent,
    ImpactEditComponent,
    ImpactCreateComponent,
    ConclusionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
