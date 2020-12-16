## Content

-   [Installation](#installation)
-   [Structure](#structure)
-   [Script](#scripts)
-   [Development](#development)
-   [References](#references)

<br />

## Installation

1. Make sure you have dependencies installed on your machine
    - `Node.js` (v14.7.0 recommended)
    - `Cordova-lib` (v9.0.0)
2. Setup enviroment as per React-native's documentation (https://reactnative.dev/docs/environment-setup) for both Android & IOS
3. Clone the project
4. Run `yarn bootstrap` to install all the dependencies
5. Start the project
    - [IOS] `yarn ios`
    - [Android] `yarn android`

> **Note** : If you got this error `Failed to build iOS project. We ran "xcodebuild" command but it exited with error code 65.` when you run `yarn ios`, run `yarn pod` and try again

<br />

## Structure

This is a monorepo project using `yarn workspace`. Always run your script at the root project unless it's necessary. This is because `app` package is depend on another. E.g: `app` depends on `components` and `shared` packages, running `yarn ios` inside `packages/app` wouldn't work because `@metlife/components` and `@metlife/shared` dependencies are not in npm registry.

```
.
+-- src
    +-- assets
        + fonts
        + icons
        + images
    +-- i18n
    +-- store
    +-- styles
    +-- utils
        +-- hooks
    +-- view
        +-- components
        +-- pages
    +-- App.js
    +-- App.scss
    +-- index.js
+-- www
    +-- index.html
+-- .babelrc
+-- .eslintrc.js
+-- .gitignore
+-- .prettierrc
+-- config.xml
+-- package.json
+-- package-lock.lock
```

<br />

## Scripts

|  Command  | Description                                          |
| :-------: | ---------------------------------------------------- |
|   `ios`   | Runs ios version on emulator                         |
| `android` | Runs android version on emulator                     |
|   `web`   | Runs web version                                     |
| `format`  | Runs `prettify` to format code as per the specs.     |
|  `lint`   | Runs `eslint` to check code format as per the specs. |
|  `test`   | Runs the test suite with eslint                      |

<br />

## Development

#### Styling

-   Make sure to seperate all the styling from component into another file `(<pages/components>.scss)` for every custom component/pages.
-   Make sure to use scss variable in `src/styles/theme.scss` to enable support for dark-mode

```
.custom-component {
    color: var(--text-general);
    background-color: var(--background-general);
}
```

#### Translation

-   To define a new language in the app
    1. Go to `src/i18n/index.js` file and import a new language json. e.g: `import zh from './zh.json'` and add in `supportedLngs` & `whitelist` under `i18n.init` property
    2. Go to `src/i18n` directory, create a new file using new language naming. (e.g: `en.json`) and list down all the text that need to be translate.
-   To use translation in your app, make sure to use our own custom hooks `useTranslation` from package `react-i18next`.

```
const CustomComponent = () => {
    const { t } = useTranslation();

    return (
        <Text>{t('Test')}</Text>
    )
}
```

-   use `{{name}}` for dynamic content

```
// en.json

{
    "Test": "Test {{name}}"
}
```

```
// custom component

const CustomComponent = () => {
    const { t } = useTrasnlation();

    return (
        <Text>{t('Test'), {name: 'testing'}}</Text>
    )
}
```

## References

-   [React Cordova](https://cuneyt.aliustaoglu.biz/en/setting-up-a-cordova-react-application-from-stratch/)
-   [Eslint & Prettier](https://dev-yakuza.github.io/en/react-native/eslint-prettier-husky-lint-staged/)
-   [Translation](https://react.i18next.com/guides/quick-start)
