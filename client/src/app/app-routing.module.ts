import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { VulnsListComponent } from 'src/app/components/vulns/vulnsList.component';
import { VulnsCreateComponent } from './components/vulns-create/vulns-create.component';
import { VulnsEditComponent } from './components/vulns-edit/vulns-edit.component';
import { EditVulnWithStateComponent } from './components/edit-vuln-with-state/edit-vuln-with-state.component';
import { HostsComponent } from './components/hosts/hosts.component';
import { HostEditComponent } from './components/host-edit/host-edit.component';
import { ImpactsListComponent } from 'src/app/components/impact/impactsList.component';
import { ImpactEditComponent } from './components/impact-edit/impact-edit.component';
import { ImpactCreateComponent } from './components/impact-create/impact-create.component';
import { ConclusionComponent } from './components/conclusion/conclusion.component';
import { ClientsListComponent } from './components/clients/clientsList.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { ClientCreateComponent } from './components/client-create/client-create.component';
import { MissionResource } from 'src/app/resources/MissionResource';
import { UserResource } from 'src/app/resources/UserResource';
import { VulnResource } from 'src/app/resources/VulnResource';
import { HostResource } from 'src/app/resources/HostResource';
import { ImpactResource } from 'src/app/resources/ImpactResource';
import { ClientResource } from 'src/app/resources/ClientResource';
import { HostVulnResource } from 'src/app/resources/HostVulnResource';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  new MissionResource().generateResource(),
  new UserResource().generateResource(),
  new VulnResource().generateResource(),
  new HostResource().generateResource(),
  new ImpactResource().generateResource(),
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
  new ClientResource().generateResource(),
  new HostVulnResource().generateResource(),

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
