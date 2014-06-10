/****************************************
 * CREATED BY BENJEYED Haitam ON 19/05/14.
 ****************************************/

    // MODULES =========================================================================================================
    var express = require('express');
    var app = express();
    var mongoose = require('mongoose');
    var passport = require('passport');
    var flash 	 = require('connect-flash');
    /******************************************************************************************************************/

    // CONFIGURATION ===================================================================================================
    var db = require('./config/db');                         // LOAD OUR DATA BASE URL
    var port = process.env.PORT || 8080;                    // SET OUR PORT
    mongoose.connect(db.url);                              // CONNECT OUR MONGODB DATABASE
    require('./config/passport')(passport);               // PASS PASSPORT FOR CONFIGURATION

    app.configure(function() {
       app.use(express.static(__dirname + '/public'));   // SET THE STATIC FILE LOCATION
       app.use(express.logger('dev'));                  // LOG EVERY REQUEST TO THE CONSOLE
       app.use(express.bodyParser());                  // HAVE ABILITY TO PULL INFORMATION FROM HTML IN POST
       app.use(express.cookieParser());               // read cookies (needed for auth)
       app.use(express.methodOverride());            // HAVE THE ABILITY TO SIMULATE DELETE AND PUT

       // Required for passport
       app.use(express.session({ secret: 'ilovemycountrymycountryistangier' })); // SESSION SECRET
       app.use(passport.initialize());                                          //
       app.use(passport.session());                                            // PERSISTENT LOGIN SESSIONS
       app.use(flash());                                                      // FOR FLASH MESSAGES
    });

    /******************************************************************************************************************/

    // ROUTES ==========================================================================================================
    require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

    /******************************************************************************************************************/

    // START OUR APP ===================================================================================================
    app.listen(port);                                       // STARTUP OUR APP AT http://localhost/8080
    console.log('Application start on port ' + port);      // STARTUP MESSAGE
    exports = module.exports = app;                       // EXPOSE app
   /***************************************************END*************************************************************/