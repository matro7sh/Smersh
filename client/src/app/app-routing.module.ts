import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard';
import { LoginComponent } from './components/login/login.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ConclusionComponent } from './components/conclusion/conclusion.component';
import { MissionResource } from 'src/app/resources/MissionResource';
import { UserResource } from 'src/app/resources/UserResource';
import { VulnResource } from 'src/app/resources/VulnResource';
import { HostResource } from 'src/app/resources/HostResource';
import { ImpactResource } from 'src/app/resources/ImpactResource';
import { ClientResource } from 'src/app/resources/ClientResource';
import { HostVulnResource } from 'src/app/resources/HostVulnResource';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
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
  {
    path: '404',
    component: ErrorsComponent,
  },
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: '**',
    component: ErrorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
