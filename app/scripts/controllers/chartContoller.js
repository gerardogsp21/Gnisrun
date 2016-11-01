/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('energyApp')
    .controller('ChartCtrl', ['$timeout', 'Restangular', function ($timeout, Restangular) {
        var recursoMedidas = Restangular.all('usuarios/' + 1 + '/casas/' + 1);
        var vm = this;
        vm.medidas = [];
        vm.medidas220 = [];
        vm.title_1 = "Consumo de la linea 110 voltios";
        vm.title_2= "Consumo de la linea 220 voltios";
        activate();
        vm.line = {
            onClick: function (points, evt) {
                console.log(points, evt);
            }
        };

        vm.line2 = {
            onClick: function (points, evt) {
                console.log(points, evt);
            }
        };


        function activate() {
            cargarMedidas();
        }

        function cargarMedidas() {
            recursoMedidas.customGET("medidas", {fecha: "2016-10-26", voltaje: "110"})
                .then(function (data) {
                    //Se ejecuta cuando est todo bien: cdigos 2xx (200, 201, etc)
                    vm.medidas = data.result;
                    vm.line.labels = getValoresDePropiedadEnArray(vm.medidas, 'hora');
                    var valores110 = getValoresDePropiedadEnArray(vm.medidas, 'total_medida');


                    vm.line.data = [valores110];
                    //console.log(valores220);

                })
                .catch(function () {
                    //Hay error: 4xx, 5xx (404, 500)..
                })
                .finally(function () {
                    //Sin importar si hubo error o no, esto se ejecuta.
                    //Sirve en caso de que coloques una barra "Cargando", y aqui la finalizas.
                });

            recursoMedidas.customGET("medidas", {fecha: "2016-10-26", voltaje: "220"})
                .then(function (data2) {
                    vm.medidas220 = data2.result;
                    var valores220 = getValoresDePropiedadEnArray(vm.medidas220, 'total_medida');
                    if (valores220.length > 0) {
                        vm.line2.labels = getValoresDePropiedadEnArray(vm.medidas220, 'hora');
                        vm.line2.data = [valores220];
                    } else {
                        vm.title_2 = "No hay datos del consumo de 220 voltios"
                    }

                })
                .catch(function () {
                    //Hay error: 4xx, 5xx (404, 500)..
                })
                .finally(function () {
                    //Sin importar si hubo error o no, esto se ejecuta.
                    //Sirve en caso de que coloques una barra "Cargando", y aqui la finalizas.
                });
        }
    }]);