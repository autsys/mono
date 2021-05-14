# Autsys Firebase

![Package on Release](https://github.com/autsys/firebase-functions/workflows/Package%20on%20Release/badge.svg)

These are commonly used tasks for interacting with Firebase from the Functions environment such as looking up user information.

## Initialization

This project expects that `firebase-admin` has been initialized before these functions are available. The initialization should be handled in the project that is implementing this code so you can use any initilization object.

- `Development` or custom server: you can initialize with a [service account](https://firebase.google.com/docs/admin/setup). The recommended approach is pointing the env variable to a json file.

```javascript
admin.initializeApp({
  credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
});
```

- `Production`: If you're running Firebase Functions, then you can run.

```javascript
firebase.initializeApp();
```

## Functions

Uses NodeJS to run Functions for performing various tasks.

- `getUserByEmail` - returns the user info based on an email
