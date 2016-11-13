'use strict';
angular.module('unicesarNNN')
    .controller('LoginCtrl', ['$timeout', 'Restangular', '$auth', '$location', 'notify',
        function ($timeout, Restangular, $auth, $location, notify) {
            var vm = this;

           vm.login= function () {
               $location.path("dashboard/inicio");
               notify({ message: "Bienvenido", classes:'alert alert-warning', position:"left"});
            }


            /*vm.login = function () {
                $auth.login({
                    email: vm.email,
                    password: vm.password
                })
                    .then(function (data) {
                        if(data.data.result){
                            notify({ message: data.data.mensaje, classes:'alert-danger', position:"left"} );
                            var user = JSON.stringify(data.data.result);
                            sessionStorage.setItem('user', user);
                            //sessionStorage.setItem('key', 'value');
                            $location.path("dashboard/inicio");
                        } else {
                            notify({ message: data.data.mensaje, classes:'alert alert-warning', position:"left"} );
                        }
                    })
                    .catch(function (response) {
                        // Si ha habido errores llegamos a esta parte
                        notify("Resultado inesperado comuniquese con el administrador del sistema.");
                    });
            }*/


        }]);
