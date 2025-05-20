import { KeycloakService } from 'keycloak-angular';

export function initKeycloak(): Promise<KeycloakService> {
  const keycloak = new KeycloakService();

  return keycloak.init({
    config: {
      url: 'http://keycloak:8080',
      realm: 'spring-boot-microservices-realm',
      clientId: 'angular-client',
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false
    }
  }).then(() => {
    console.log('✅ Keycloak initialized!');
    return keycloak.getToken().then(token => {
      console.log('🔑 Initial Keycloak Token:', token); // Log token ban đầu
      return keycloak;
    });
  }).catch((err) => {
    console.error('❌ Keycloak init failed', err);
    throw err;
  });
}
