# Gui's React Starter

**Webpack + hot-module-replacement + react-hot-loader + react-hotify + karma for tests**

## Webpack:

configs are on ./webpack folder as follows:

- development.js [NODE_ENV=development]
- hot.js [NODE_ENV=hot]
- hotify.js [NODE_ENV=hotify]
- production.js [NODE_ENV=production]

```
base.js is the base webpack config for all other configs,
others only add, delete or modify base.js
paths.js is only a path object helper that provide the paths to configs
alter this to your needs
```
just set your NODE_ENV accordingly and start server.js, defaults to port 4000 all but production, that lives on port 3000

## server.js 
its the point of entrance for this application, it has multiple responsibilities
it creates an express server it requires ./server/configurations.js (this place is where you would continue to write your backend!) the last line is
 `bundle(mode,port,dev_port)` this is where it gets interesting!

First it picks the right config based on the ENV, then it starts a webpack-dev-server and proxies to the express server,
it just compiles if you are in production.

if you are using react-hotify remember it only works only on ES6 classes and with the `module.hot.accept();` at the end of the module, see comp2.jsx,

## Tests
karma.conf is your kamra config it uses karma-webpack plugin (its fed with base.conf), the file karma.webpack.js 
is where you inform the karma-webpack plugin what files to run, alter the regex to meet your needs.