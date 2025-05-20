import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/auth.interceptor';
import { KeycloakService } from 'keycloak-angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initKeycloak } from './app/keycloak-init';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';

initKeycloak().then((keycloakService) => {
  bootstrapApplication(AppComponent, {
    providers: [
      { provide: KeycloakService, useValue: keycloakService },
      provideHttpClient(withInterceptors([authInterceptor])),
      importProvidersFrom(BrowserAnimationsModule),
      importProvidersFrom(FormsModule, HttpClientModule),
      importProvidersFrom(RouterModule.forRoot(routes))
    ]
  });
});
