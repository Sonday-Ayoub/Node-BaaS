/*****************************************
 * Created by BENEJEYED Haitam on 19/05/14.
 *****************************************/


    // load mongoose since we need it to define a model ================================================================
    var mongoose = require('mongoose');
    /******************************************************************************************************************/


    // create the model and expose it to our app =======================================================================
    module.exports = mongoose.model('Destination', {
        title : String,
        category : String,
        address : String,
        description : String,
        username : String
    });
    /******************************************************************************************************************/