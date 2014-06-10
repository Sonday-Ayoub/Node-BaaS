/*****************************************
 * Created by BENJEYED Haitam on 19/05/14.
 ****************************************/

    angular.module('signinCtrl',[]).controller('signinController', function($scope,$http,$location,user) {
       console.log('Signin Controller Charged !');


        // Form Validation ====================================================================================================


        $scope.SetPristine = function() {
            $scope.loginForm.$setPristine();
        };

        $scope.submitForm = function(isValid) {

            // check to make sure the form is completely valid
            if (isValid) {
                console.log('Valid form !');
                $scope.SetPristine();
            }
        };


        /*********************************************************************************************************************/


    });
