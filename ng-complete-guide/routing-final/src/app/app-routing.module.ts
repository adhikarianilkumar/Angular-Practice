import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";

import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRouts: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent },
  ] },
  {
    path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      { path: ':id', component: ServerComponent, resolve: { server: ServerResolver } }, // Passing dynamic data to route
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] },
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // Approach 1: Redirecting route
  // { path: '**', component: PageNotFoundComponent }, // Make this is last route
  // Approach 2: Redirecting route
  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page Not found'} }, // Passing static data to route
  { path: '**', redirectTo: 'not-found' }, // Make this is last route
];

@NgModule({
  imports: [
    // Passing second parameter to avoid 404 error in old browers but with '#' symbol (<websiteName>/#/home)
    // RouterModule.forRoot(appRouts, {useHash: true})
    RouterModule.forRoot(appRouts)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModulre {}
