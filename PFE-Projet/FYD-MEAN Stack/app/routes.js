/*****************************************
 * Created by BENJEYED Haitam on 19/05/14.
 ****************************************/

    // load the Destination model
    var Destination = require('./models/destination');

    module.exports = function(app, passport) {

        // API ROUTES ==================================================================================================


       /*************************************** DESTINATIONS ROUTE ****************************************************/

        // SEND All DESTINATIONS WHEN LAUDING THE PAGE
        app.post('/api/getDestinations',function(req,res) {
            Destination.find({username : req.body.username},function(err, destinations) {
                if (err)
                    res.send(err);
                res.json(destinations);
            });

        });


        // CREATE NEW DESTINATION AND SEND BACK THE DESTINATIONS LIST
        app.post('/api/newDestination', function(req, res) {

            // Create a new destination
            Destination.create({
                title : req.body.title,
                category : req.body.category,
                address : req.body.address,
                description : req.body.description,
                username : req.body.username
            }, function(err) {
                if (err)
                    res.send(err);

                // Get and return all the user's destinations list
                Destination.find({username : req.body.username},function(err, destinations) {
                    if (err)
                        res.send(err);
                    res.json(destinations);
                });

            });

        });


        // DELETE A DESTINATION
        app.delete('/api/deleteDestination/:dest_id/:username', function(req, res) {
            Destination.remove({
                _id : req.params.dest_id
            }, function(err) {
                if (err)
                    res.send(err);

                // get and return the new destinations list of the logged user
                Destination.find({username : req.params.username},function(err, destinations) {
                    if (err)
                        res.send(err);
                    res.json(destinations);
                });
            });
        });
        /**************************************************************************************************************/


        /*********************************************** SIGNUP *******************************************************/

        // PROCESS THE SIGNUP FORM
        app.post('/signup', function(req, res, next) {
            passport.authenticate('local-signup', function(err, newUser) {
                if (err) {
                    return next(err); // will generate a 500 error
                }

                if(!newUser) {
                    return res.json({ success : false, message : 'subscribe failed'});
                }

                if(newUser) {
                    return res.json({ success : true, message : 'subscribe success', user : newUser });
                }

            })(req, res, next);
        });
        /**************************************************************************************************************/


        /************************************************ SIGNIN ******************************************************/

        // PROCESS THE LOGIN FORM
        app.post('/signin', function(req, res, next) {
            passport.authenticate('local-login', function(err, user) {
                if (err) {
                    return next(err); // will generate a 500 error
                }
                // Generate a JSON response reflecting authentication status
                if (! user) {
                    return res.json({ success : false, message : 'authentication failed' });
                }
                if(user)
                return res.json({ success : true, message : 'authentication succeeded', user : user});
                res.redirect('/');

            })(req, res, next);
        });
        /**************************************************************************************************************/



        /********************************* ROUTES TO HANDLE ALL ANGULAR REQUEST ***************************************/
        app.get('*', function(req,res) {
           res.sendfile('./public/index.html');
        });

        // LOGOUT ==============================
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });

    };

    /******************************************************************************************************************/