var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var path = require('path')
var glob = require('glob');
var logger = require('morgan')
var app = express();
app.use(logger('dev'))

// parse requests of content-type - application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './')));

app.use(cors());
 app.options('*', cors());


let initRoutes = () => {
    // including all route
    console.log("path", path.join(__dirname));
    
    glob("./src/Routes/*.js", { cwd: path.resolve(path.join(__dirname)) }, (err, routes) => {
        if (err) {
            console.log("Error occured including routes");
            return;
        }
        routes.forEach((routePath) => {
            require(routePath).getRouter(app);// eslint-disable-line
        });
        console.log("included " + routes.length + " route files");
    });
}

initRoutes();

app.listen(4000, function (a) {
    console.log("Listening to port 4000");
});
























// // // Bring in our dependencies
// // var express = require('express');
// // // var bodyParser = require('body-parser');
// // var app = express();// const routes = require('./routes');

// // //  Connect all our routes to our application
// // // app.use('/', routes);

// // // Turn on that server!
// // app.listen(3000, () => {
// //   console.log('App listening on port 3000');
// // });



// var express = require('express');
// var bodyParser = require('body-parser');
// var app = express();
// var path = require('path')
// var http = require('http');
// var morgan = require('morgan')
// var glob = require("glob");
// var httpServer = http.createServer(app);
// httpServer.listen(3000, function(a){
// 	console.log("listing on port 3000") 
// });

// app.use(express.static(path.join(__dirname, './src')));
// var cors = require('cors');
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended:true }));
// ///app.use(express.static(path.join(__dirname, './src')))
// //  app.use(express.static(path.join(__dirname, './src/Upload')));
// //app.use(express.static(path.join(__dirname, './src')));
// app.use(bodyParser.json());
// app.use(cors())
// app.use(morgan('dev'));


  
//   //Routes

// //   require('./src/Routes/userRoutes')(app);
// //   require('./src/Routes/adminRoutes')(app);

// //   app.use('/', adminRoutes);



// let initRoutes = () => {
//     // including all route
//     glob("./src/Routes/*.js", { cwd: path.resolve(path.join(__dirname)) }, (err, routes) => {
//         if (err) {
//             console.log("Error occured including routes");
//             return;
//         }
//         routes.forEach((routePath) => {
//             require(routePath).getRouter(app);// eslint-disable-line
//         });
//         console.log("included " + routes.length + " route files");

       
//     });
// }


// initRoutes()