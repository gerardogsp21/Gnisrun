/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 *
 */


angular.module('unicesarNNN')
    .controller('ChartCtrl', ['$timeout', 'Restangular', 'notify', '$q',
        function ($timeout, Restangular, notify, $q) {


            var vm = this;
            vm.medidas = [];
            vm.casas = [];
            vm.fecha;
            vm.precio = 0;
            vm.valores = [];
            vm.consumo_vatios = 0;
            vm.total = 0;
            vm.consumo_vatios_actual = 0;
            vm.total_actual = 0;
            vm.casa_unica = 0;
            var hoy = new Date();


            vm.title_1 = "Consumo de voltios";

            vm.years = years();
            vm.dias = dias();
            vm.meses = meses();

            vm.id_dia = {
                id: hoy.getDate()
            };

            vm.id_mes = {
                id: (hoy.getMonth() + 1),
            };

            vm.id_year = {
                id: hoy.getFullYear()
            };


            var user = JSON.parse(sessionStorage.getItem("user"));

            var recursoCasas = Restangular.all('usuarios/' + user.id + '/casas');

            cargarCasas();


            vm.line = {
                onClick: function (points, evt) {
                    console.log(points, evt);
                }
            };


            vm.activate = function () {
                cargarMedidas();
                vm.precio = getOneValue(vm.casas, 'precio', 'id', vm.id_casa.id);
                vm.casa_unica = vm.id_casa.id;
                var pusher = new Pusher('468a4624ff0c789089d6');
                var channel = pusher.subscribe('new-medidas' + vm.id_casa.id);
                channel.bind('medidas', function (data) {
                    cargarMedidas();
                });
            }

            function cargarCasas() {
                // var defered = $q.defer();
                //var promise = defered.promise;
                recursoCasas.customGET()
                    .then(function (data) {
                        vm.casas = data.result;
                        var primero = getValoresDePropiedadEnArray(vm.casas, 'id');
                        vm.id_casa = {
                            id: primero[0]
                        };
                        // defered.resolve(data);
                        vm.activate();
                    })
                    .catch(function () {
                        //Hay error: 4xx, 5xx (404, 500)..
                    })
                    .finally(function () {
                        //Sin importar si hubo error o no, esto se ejecuta.
                        //Sirve en caso de que coloques una barra "Cargando", y aqui la finalizas.
                    });


            }


            function cargarMedidas() {
                vm.fecha = vm.id_year.id + "-" + vm.id_mes.id + "-" + vm.id_dia.id;
                var recursoMedidas = Restangular.all('usuarios/' + user.id + '/casas/' + vm.id_casa.id);
                recursoMedidas.customGET("medidas", {fecha: vm.fecha})
                    .then(function (data) {
                        vm.medidas = data.result;
                        if (vm.medidas.length > 0) {
                            vm.mostrar = true;
                            vm.title_1 = "Consumo de voltios";
                            vm.line.labels = getValoresDePropiedadEnArray(vm.medidas, 'hora');
                            vm.valores = getValoresDePropiedadEnArray(vm.medidas, 'total_medida');
                            vm.line.data = [vm.valores];
                            vm.consumo_vatios = getSumaMedidas(vm.valores);
                            vm.total = vm.consumo_vatios * vm.precio;
                            vm.consumo_vatios_actual = vm.valores[vm.valores.length - 1];
                            vm.total_actual = vm.consumo_vatios_actual * vm.precio;
                        } else {
                            vm.title_1 = "No hay consumo para la fecha seleccionada";
                            vm.mostrar = false;
                            vm.consumo_vatios = 0;
                            vm.total = 0;
                            vm.consumo_vatios_actual = 0;
                            vm.total_actual = 0;

                            vm.line = {
                                labels: ['No hay consumo'],
                                data: [[0]]
                            };
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

