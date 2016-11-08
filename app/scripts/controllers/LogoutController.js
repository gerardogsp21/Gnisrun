/**
 * Created by Gerardo on 31/10/2016.
 */

angular.module('energyApp')
    .controller('LogoutCtrl', ['$timeout', 'Restangular', '$auth', '$location',  'notify',
        function ($timeout, Restangular, $auth, $location, notify) {

        var vm = this;

        vm.salir = function () {
            $auth.logout()
                .then(function () {
                    var user = JSON.parse(sessionStorage.getItem("user"));
                    notify("Hasta pronto " + user.primer_nombre );
                    sessionStorage.removeItem("user");

                    $location.path("/")
                });
        }
    }]);
