# Quasar Template (quasar-capacitor-firebase-pinia-template)

Quasar + Capacitor + Firebase + Pinia + Vite Templates

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev -m capacitor -T android
quasar dev -m capacitor -T ios
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build -m capacitor -T android --ide
quasar build -m capacitor -T ios --ide
```

### Things you need to do

1. Create a Firebase web application. This is required since we will not be relying on native authentication, and instead simply getting an authentication token from it.
2. Add your Firebase web client configuration to 'boot/firebase.js'.
3. [Register a Firebase iOS applications.](https://github.com/capawesome-team/capacitor-firebase/blob/main/docs/firebase-setup.md#ios)
4. [Register a Firebase Android applications.](https://github.com/capawesome-team/capacitor-firebase/blob/main/docs/firebase-setup.md#android)
5. [Configure your social authentication providers.](https://github.com/capawesome-team/capacitor-firebase/tree/b8232674f885350e324f866fda43796c968585a6/packages/authentication)
6. By default, I've added Facebook and Google, although they require additional configuration from: [Facebook](https://github.com/capawesome-team/capacitor-firebase/blob/b8232674f885350e324f866fda43796c968585a6/packages/authentication/docs/setup-facebook.md), [Google](https://github.com/capawesome-team/capacitor-firebase/blob/b8232674f885350e324f866fda43796c968585a6/packages/authentication/docs/setup-google.md).

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
