/*****************************************
 * Created by BENJEYED Haitam on 19/05/14.
 ****************************************/

    angular.module('destinationsService',[]).factory('destination', function($http) {

        return {
            // CALL TO GET ALL DESTINATIONS
            get : function(destinationData) {
                return $http.post('/api/getDestinations',destinationData);
            },

            // CALL TO POST AND CREATE A NEW DESTINATION
            create : function(destinationData) {
                return $http.post('/api/newDestination', destinationData);
            },

            // CALL TO DELETE A DESTINATION
            delete : function(id,username) {
                return $http.delete('/api/deleteDestination/' + id + '/' + username);
            }
            
        }

    });
