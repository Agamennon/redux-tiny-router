//require('source-map-support').install();
 require('babel/register')({
 stage: 0,
 sourceMap:true,
// sourceMap: "inline",
 optional:['runtime']
 //extensions: [".es6", ".es", ".jsx", ".js"]
 });

 global.__CLIENT__ = false;
 global.__SERVER__ = true;
 global.__DEBUG__ = true;
 global.__NODE_ENV__ = process.env.NODE_ENV;
 global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

 require('./src/server/server.js');


