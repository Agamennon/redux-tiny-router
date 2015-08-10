
var app = require.context('./app', true, /-test\.js$/); //make sure you have your directory and regex test set correctly!
var server = require.context('./server', true, /-test\.js$/); //make sure you have your directory and regex test set correctly!

server.keys().forEach(server);
app.keys().forEach(app);



/*

//http://kentor.me/posts/testing-react-and-flux-applications-with-karma-and-webpack/
// Create a Webpack require context so we can dynamically require our
// project's modules. Exclude test files in this context.
var projectContext = require.context('./src/js', true, /^((?!__tests__).)*.jsx?$/);
// Extract the module ids that Webpack uses to track modules.
var projectModuleIds = projectContext.keys().map(module =>
    String(projectContext.resolve(module)));

beforeEach(() => {
    // Remove our modules from the require cache before each test case.
    projectModuleIds.forEach(id => delete require.cache[id]);
});*/
