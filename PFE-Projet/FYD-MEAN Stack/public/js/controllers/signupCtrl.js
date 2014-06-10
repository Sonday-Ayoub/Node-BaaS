/*****************************************
 * Created by BENJEYED Haitam on 19/05/14.
 ****************************************/

    angular.module('signupCtrl',[]).controller('signupController', function($scope,$http,$location,user) {
       console.log('Signup Controller Charged !');


        // Form Validation ====================================================================================================


        $scope.SetPristine = function() {
            $scope.signupForm.$setPristine();
        };

        $scope.submitForm = function(isValid) {

            // check to make sure the form is completely valid
            if (isValid) {
                $scope.SetPristine();
            }
        };


        /*********************************************************************************************************************/

    });
