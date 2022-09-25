import directiveAuth from './auth';

export default function registerDirectives(app) {
  app.directive('auth', directiveAuth);
}
