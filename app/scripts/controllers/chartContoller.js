/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('energyApp')
    .controller('ChartCtrl', ['$scope', '$timeout', 'Restangular', function ($scope, $timeout, Restangular) {
        var recursoMedidas = Restangular.all('usuarios/' + 1 + '/casas/' + 1);
        $scope.medidas = [];
        $scope.medidas220 = [];
        $scope.title_1 = "Consumo de la linea 110 voltios";
        $scope.title_2= "Consumo de la linea 220 voltios";
        activate();
        $scope.line = {
            onClick: function (points, evt) {
                console.log(points, evt);
            }
        };

        $scope.line2 = {
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
                    $scope.medidas = data.result;
                    console.log(data.result);
                    $scope.line.labels = getValoresDePropiedadEnArray($scope.medidas, 'hora');
                    var valores110 = getValoresDePropiedadEnArray($scope.medidas, 'total_medida');
                    console.log($scope.medidas);

                    $scope.line.data = [valores110];
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
                    $scope.medidas220 = data2.result;
                    console.log($scope.medidas220);
                    var valores220 = getValoresDePropiedadEnArray($scope.medidas220, 'total_medida');
                    if (valores220.length > 0) {
                        $scope.line2.labels = getValoresDePropiedadEnArray($scope.medidas220, 'hora');
                        $scope.line2.data = [valores220];
                    } else {
                        $scope.title_2 = "No hay datos del consumo de 220 voltios"
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