## Angular Multi Repo Microfrontend Setup

### Using module federation

MFE1

- `ng new mfe1`
- install native federation `npm install @angular-architects/native-federation --save-dev`
- setup project as remote `ng g @angular-architects/native-federation:init --project=products-mfe --port=4201 --type=remote`
- expose component in federation.config.js
  ```json
  exposes: {
    './ProductListComponent': './src/app/product-list/product-list.component.ts.ts',
  },
  ```

SHELL

- `ng new shell`
- install native federation `npm install @angular-architects/native-federation --save-dev`
- setup project as shell `ng g @angular-architects/native-federation:init --project=shell --port=4200 --type=dynamic-host`
