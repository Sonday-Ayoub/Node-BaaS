/***********************************************
 *** Created by BENJEYED Haitam on 19/05/14. ***
 ***********************************************/

    var destApp = angular.module('destinationsCtrl',[]);

 /************************************************* CONTROLLER ***************************************************************/
    destApp.controller('destinationsController', function($scope,$http,$location,destination,$cookieStore) {
        console.log('Destinations Controller Charged !');          // Simple message to make sure the destinations controller is charged
        $scope.userInfo={};                                       // User's Information
        $scope.userInfo.username=$cookieStore.get('username');   // Get the Username so that we can find his own destinations
        $scope.destination = {};                                // Form Data that will be send to the node api to create a new destination
        $scope.newDestination = {};                            // Form Data that will be send to the node api to modify a destination
        $scope.destinations = {};                             // All destinations provided by get() service
        $scope.oldDest={};                                   // Old destination that will be updated
        $scope.option='';                                   // To chose an option : Show list, add, modify or delete a destination
        $scope.address='';                                 // Address of the destination to display on the map


        // Form Validation ====================================================================================================

        $scope.SetPristine = function() {
            $scope.destinationForm.$setPristine();
            $scope.modifyForm.$setPristine();
        };

        $scope.submitForm = function(isValid) {

            // Check to make sure the form is completely valid
            if (isValid) {
                console.log('Valid form !');
                $scope.SetPristine();
            }
        };

        // Save the old values before updating
        $scope.modify = function(oldDest) {
            $scope.option='newvalues';
            $scope.oldDest=oldDest;
        };

        // Display the chosen destination on the map
        $scope.displayDestination = function(destToDisplay) {
            $scope.destToDisplay=destToDisplay;
            $scope.address=$scope.destToDisplay.address;
            $scope.option='display';
        };

        /*********************************************************************************************************************/


        // GET ================================================================================================================
        // When landing on the page, get all the user's Destinations list
        // Use the get service to get all the Destinations
        destination.get($scope.userInfo)
            .success(function(data) {
                $scope.destinations = data; // assign the list of destinations
            });

        /*********************************************************************************************************************/


        // CREATE =============================================================================================================
        // When submitting the add form, send the new destination to the node API
        // Use the create service to add a new Destination
        $scope.createDestination  = function () {

            destination.create($scope.destination)
                .success(function(data) {
                    $scope.destination={};       // Clear the form so the user can reuse it again
                    $scope.destinations=data;   // Assign the new user's destinations list after adding a new one
                    $scope.option ='list';     // Go to the destinations list
                });

        };

        /*********************************************************************************************************************/


        // DELETE =============================================================================================================
        // Delete a destination after selecting it
        // Use the service to delete a Destination
        $scope.deleteDestination = function(id,username) {
            destination.delete(id,username)

                .success(function(data) {
                    $scope.destinations = data;  // Assign our new list of destinations
                });

        };

        /*********************************************************************************************************************/


        // MODIFY =============================================================================================================
        // Modify the selected destination
        // Use the services to modify the chosen destination
        $scope.modifyDestination = function(id) {
            destination.delete(id);

            destination.create($scope.newDestination)

                .success(function(data) {
                    $scope.newDestination={};       // Clear the form so the user can reuse it again
                    $scope.destinations=data;      // Assign the new list of destinations after the update
                    $scope.option ='modify';      // Redirect to modify option
                });

        };

    });
/*****************************************************************************************************************************/


/******************************************** LatLng validation **************************************************************/
    var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
    destApp.directive('smartFloat', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (FLOAT_REGEXP.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace(',', '.'));
                } else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                  }
             });
         }
        };
    });
/*****************************************************************************************************************************/


/****************************************** Google place autocomplete ********************************************************/
destApp.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());
                });
            });
        }
    };
});
/*****************************************************************************************************************************/


/********************************************* GoogleMaps *********************************************************************/
    destApp.directive('googleMaps', function () {
       return function (scope, elem, attrs) {
         var mapOptions,
            map,
            marker;

        mapOptions = {
            zoom: 7
        };
        map = new google.maps.Map(elem[0], mapOptions);

           // Try HTML5 geolocation
           if(navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(function(position) {
                   var pos = new google.maps.LatLng(position.coords.latitude,
                       position.coords.longitude);

                   marker = new google.maps.Marker({
                       position : pos,
                       map : map,
                       title : 'your postion'
                   });
                   marker.setMap(map);
                   map.setCenter(pos);
               }, function() {
                   handleNoGeolocation(true);
               });
           } else {
               // Browser doesn't support Geolocation
               handleNoGeolocation(false);
           }

           address = attrs.address;
           var geocoder = new google.maps.Geocoder();
           geocoder.geocode({ 'address' : address }, function (result, status) {
               if (status === google.maps.GeocoderStatus.OK) {
                   var latLng = {
                       lat: result[0].geometry.location.lat(),
                       lng: result[0].geometry.location.lng()
                   };
                   new google.maps.LatLng(latLng);
                   marker = new google.maps.Marker({
                       position : latLng,
                       map : map,
                       draggable:true,
                       title : 'your destination',
                       animation: google.maps.Animation.BOUNCE
                   });
                   marker.setMap(map);
                   map.setCenter(latLng);
               }
           });

       };

        function handleNoGeolocation(errorFlag) {
            if (errorFlag) {
                var content = 'Error: The Geolocation service failed.';
            } else {
                var content = 'Error: Your browser doesn\'t support geolocation.';
            }

        };
});
/******************************************************************************************************************************/
