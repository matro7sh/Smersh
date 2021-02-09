import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { MissionChoiceComponent } from './components/missions/mission-choice.component';
import { MissionSingleComponent } from './components/mission-single/mission-single.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UsersComponent } from './components/users/users.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { MissionCreateComponent } from './components/mission-create/mission-create.component';
import { MissionEditComponent } from './components/mission-edit/mission-edit.component';
import { MissionMyComponent } from './components/mission-my/mission-my.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { VulnsComponent } from './components/vulns/vulns.component';
import { VulnsCreateComponent } from './components/vulns-create/vulns-create.component';
import { VulnsEditComponent } from './components/vulns-edit/vulns-edit.component';
import { AddVulnsToHostExternalComponent } from './components/add-vulns-to-host-external/add-vulns-to-host-external.component';
import { EditVulnWithStateComponent } from './components/edit-vuln-with-state/edit-vuln-with-state.component';
import { HostsComponent } from './components/hosts/hosts.component';
import { HostEditComponent } from './components/host-edit/host-edit.component';
import { ImpactComponent } from './components/impact/impact.component';
import { ImpactEditComponent } from './components/impact-edit/impact-edit.component';
import { ImpactCreateComponent } from './components/impact-create/impact-create.component';
import { ConclusionComponent } from './components/conclusion/conclusion.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { ClientCreateComponent } from './components/client-create/client-create.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'missions',
    component: SideBarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', // by default angular add /
        component: MissionMyComponent,
      },
      {
        path: 'all',
        component: MissionChoiceComponent,
      },
      {
        path: 'my',
        component: MissionMyComponent,
      },
      {
        path: 'create',
        component: MissionCreateComponent,
      },
      { path: 'details/:id', component: MissionSingleComponent },
      {
        path: 'edit/:id',
        component: MissionEditComponent,
      },
      {
        path: ':id/add-vuln/:missionid',
        component: AddVulnsToHostExternalComponent,
      },
    ],
  },
  {
    path: 'users',
    component: SideBarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: 'create',
        component: UserCreateComponent,
      },
      {
        path: 'edit/:id',
        component: UserEditComponent,
      },
    ],
  },
  {
    path: 'vulnerabilities',
    component: SideBarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'all',
        component: VulnsComponent,
      },
      {
        path: 'create',
        component: VulnsCreateComponent,
      },
      {
        path: 'edit/:id',
        component: VulnsEditComponent,
      },
    ],
  },
  {
    path: 'hosts',
    component: SideBarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'all',
        component: HostsComponent,
      },
      {
        path: 'edit/:id',
        component: HostEditComponent,
      },
    ],
  },
  {
    path: 'impacts',
    component: SideBarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'all',
        component: ImpactComponent,
      },
      {
        path: 'edit/:id',
        component: ImpactEditComponent,
      },
      {
        path: 'create',
        component: ImpactCreateComponent,
      },
    ],
  },
  {
    path: 'conclusion',
    component: SideBarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'generate',
        component: ConclusionComponent,
      },
    ],
  },
  {
    path: 'host_vulns',
    component: SideBarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'edit/:id',
        component: EditVulnWithStateComponent,
      },
    ],
  },
  {
    path: 'clients',
    component: SideBarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'all',
        component: ClientsComponent,
      },
      {
        path: 'edit/:id',
        component: ClientEditComponent,
      },
      {
        path: 'create',
        component: ClientCreateComponent,
      },
    ],
  },

  // otherwise redirect to home
  { path: '404', component: ErrorsComponent },
  { path: '', component: HomepageComponent },
  { path: '**', component: ErrorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
