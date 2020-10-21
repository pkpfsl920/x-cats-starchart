//   Import the express server and assign it to server
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');   // import middleware (logger)
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');


//   To access the env vars
dotenv.config();

//   Get the server to access the express methods
const server = express();

//   Connect to the DB
//
//   For use with local MongoDB
//var mongoDB = 'mongodb://127.0.0.1/XCats_database';
//
//   For use with remote MongoDB
// mongodb+srv://user101:<password>@cluster0.zae9n.mongodb.net/<dbname>?retryWrites=true&w=majority
var mongoDB = 'mongodb+srv://cluster0.zae9n.mongodb.net/XCats_database?retryWrites=true&w=majority';


mongoose
    //   For use with remote MongoDB
    .connect(mongoDB, { 
                        dbName: 'XCats_database',
                        user: 'user101',
                        pass: 'xcats2020',
                        useNewUrlParser: true, 
                        useUnifiedTopology: true })

    //   For use with local MongoDB
    //.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

    .then( () => { console.log("DB Connected..." + mongoDB) });

mongoose
    .connection.on('error', console.error.bind(console, 'MongoDB connection error:')
                    //(err) => 
                    //    { console.log('MongoDB connection error: ${err.message}'); }
                  );


//   Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
//   by default, you need to set it to false.
//   else you get the following warning
//       (node:33000) DeprecationWarning: 
//             Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` 
//             without the `useFindAndModify` option set to false
//
mongoose.set('useFindAndModify', false);


//   import/bring in the routes
//
//   since this is not a NodeJs third party module and our own
//   module, inorder to import it you need to prefix it with
//   a path name ( like ./.../... )
//
//const post = require('./routes/post');
//
//   or a simpler way if you have multiple functions to import
//       i.e. multiple route requests
const { router } = require("./routes/requests");


//   *** start middleware ***
//
//   can create your own middleware
//   need to pass next and call next within the function, else
//   the the api request will hang and will not continue
//
//const myOwnMiddlewaare = (req, res, next) => 
//                            {
//                                console.log("middleware applied");
//                                next();
//                            };
//server.use(myOwnMiddlewaare);
//
//          * OR *
//
//   Use the packaged version
//
//   The order of how server.use(...) are defined determines
//   which one gets called first 
server.use(cors());
server.use(morgan("dev"));
server.use(bodyParser.json());   // parser to the json format
server.use(expressValidator());  // to validate the info


//  The index.html file in the public folder will be served 
//  when the root domain URL (http://localhost:3000) is hit
//
//server.use(express.static(process.cwd()+"/web-client/dist/nflfootball/"));
server.use(express.static(path.join(__dirname, 'public')));

//   Handle the get request
//   for the home route (page)
//   get takes to args first: url second: a call back function
//   the call back fn take a two args; the request and  the response
//
///server.get("/", (req, res) =>
//                {
//                    res.send("hello NodeJS response for Get");
//                });
//
//   Using the import function to make it more modular
//server.get("/", post.getCallBack);
//
//   We are using "use" instead of "get" because routes/getCallBK.js
//   is now middleware; look in routes/getCallBK.js for using "get"

server.use("/", router);

/*
server.get('*', (req,res) => 
        {
           console.log("getting index.html");
           res.sendFile(path.join(__dirname, 'public/index.html'));
        });
*/

// *** end middleware ***


//   Start listening on port
port = process.env.PORT || 3000;     // can use 3000, 5000, 8000, 8080
//server.listen(port);
//
//   To use with callback
//server.listen(port, () => 
//                    {
//                        console.log("A Node JS API is listening on port " + port)
//                    });

server.listen(port, (err, res) => 
        {
            if (err)
            {
                console.log("Server Error")
            }
            else
            {
                console.log("A Node JS API is listening on port " + port)
            }
        });