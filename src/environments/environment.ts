// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyADQticAEsSiw7rn1IMzuzz2Q00tUhbK04',
    authDomain: 'ingreso-app-d58ff.firebaseapp.com',
    databaseURL: 'https://ingreso-app-d58ff.firebaseio.com',
    projectId: 'ingreso-app-d58ff',
    storageBucket: 'ingreso-app-d58ff.appspot.com',
    messagingSenderId: '824982405751'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
