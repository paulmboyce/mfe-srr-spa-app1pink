# Microfrontend Endpoint

Here we are rendering a React App as an HTML endpoint, so the single-spa root-config can perform SSR for this app.
We also expose the bundled app at the same endpoint.

**/dist** contains the bundled app ( via `app.use(express.static("dist"));`)

**/server-build** contains our nodejs app, compiled with **Babel** to provide Server Side Rendering (SSR) with HTML + CSS

### Local Dev

To start SSR server and SingleSpa app:

```
npm run start:ssr:dev
```

Lets explain what `npm run start:ssr:dev` does:

1. `npx babel src -d server-build -w` to compile our node app for JSX.

Our nodejs server imports React components. So, we use Babel to
transpile our React ESM modules (`import`) to CommonJS (`require`).

Babel compiles our server (and src files) and outputs to /server-build
Babel also allows our SSR server to handle React's JSX (via `@babel/preset-react`).

NONE: we also `px wait-on ./server-build` before starting the SSR server.

2. `PORT=3000 npx nodemon server-build/server/react-server-ssr.js` to start our node app

3. `npx webpack --mode=production --watch` in **--mode=production** to deploy app bundle to **/dist**

   This serves both SSR and our SingleSpa app via nodejs on same port, using
   webpack in production mode to watch and rebundle.

   **Alternate Dev Startup:**

   Alternately, we could serve the SingleSpa app with webpack in dev mode,
   `"start:integrated": "webpack serve --port {{webpack port}}"`

   And start SSR server on a separate port
   `"ssr:server:start:dev": "PORT={{nodejs port}} nodemon ./server-build/server/react-server-ssr.js",`

   Then we'd update in the root-config imports file:

   ```
   importmap: {
   imports: {
     ...
     "@pmat-org/app1": "http://localhost:{{webpack port}}/pmat-org-app1.js",
     ...

   server-side-render": {
     ...
   "@pmat-org/app1": {
     url: "localhost:{{nodejs port}}/ssr",
   },
   ...
   ```

### Deployment

[HOLD

- run as Lambda nodejs app provides Serverless development.
- In time we are likely to prefer Fargate for (possibly) faster response.
  ]

## TODO

- tidy package scripts
- tidy old work folder
- try to deploy minimal code to server-build
- keep a local webpack react dev server? index.html, index.js etc

## Exposing MFE as HTTP Endpoint

We serve the SSR version (HTML + CSS) from an HTTP Endpoint.
This allows full decoupling of MFE from the container app.
Current exception to independence is that the **root-config** container app loads React + React-Dom.
