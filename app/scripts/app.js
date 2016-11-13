'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
    .module('unicesarNNN', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'restangular',
        'satellizer',
        'cgNotify'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'api',
        'RestangularProvider', '$authProvider',
        function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, api, RestangularProvider, $authProvider) {
            RestangularProvider.setBaseUrl(api);
            $authProvider.loginUrl = api + "iniciar-sesion";
            $authProvider.tokenName = "token";
            $authProvider.tokenPrefix = "unicesarNNN";

            $ocLazyLoadProvider.config({
                debug: false,
                events: true,
            });

            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'views/dashboard/main.html',
                    controller: 'LogoutCtrl as vm',
                    resolve: {
                        loadMyDirectives: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                {
                                    name: 'unicesarNNN',
                                    files: [
                                        'scripts/directives/header/header.js',
                                        'scripts/directives/header/header-notification/header-notification.js',
                                        'scripts/directives/sidebar/sidebar.js',
                                        'scripts/directives/sidebar/sidebar-search/sidebar-search.js',
                                        'scripts/controllers/LogoutController.js'
                                    ]
                                }),
                                $ocLazyLoad.load(
                                    {
                                        name: 'toggle-switch',
                                        files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                                            "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                                        ]
                                    }),
                                $ocLazyLoad.load(
                                    {
                                        name: 'ngAnimate',
                                        files: ['bower_components/angular-animate/angular-animate.js']
                                    }),
                                $ocLazyLoad.load(
                                    {
                                        name: 'ngCookies',
                                        files: ['bower_components/angular-cookies/angular-cookies.js']
                                    }),
                                $ocLazyLoad.load(
                                    {
                                        name: 'ngResource',
                                        files: ['bower_components/angular-resource/angular-resource.js']
                                    }),
                                $ocLazyLoad.load(
                                    {
                                        name: 'ngSanitize',
                                        files: ['bower_components/angular-sanitize/angular-sanitize.js']
                                    }),
                                $ocLazyLoad.load(
                                    {
                                        name: 'ngTouch',
                                        files: ['bower_components/angular-touch/angular-touch.js']
                                    })
                        }
                    }
                })
                .state('login', {
                    templateUrl: 'views/login.html',
                    url: '/login',
                    controller: 'LoginCtrl as vm',
                    resolve: {
                        loadMyFile: function ($ocLazyLoad) {
                            $ocLazyLoad.load({
                                name: 'unicesarNNN',
                                files: ['scripts/controllers/LoginController.js']
                            })
                        }
                    }
                })
                .state('dashboard.chart', {
                    templateUrl: 'views/chart.html',
                    url: '/chart',
                    controller: 'ChartCtrl as vm',
                    resolve: {
                        loadMyFile: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'chart.js',
                                files: [
                                    'bower_components/angular-chart.js/dist/angular-chart.min.js',
                                    'bower_components/angular-chart.js/dist/angular-chart.css',
                                    'js/utilities.js'
                                ]
                            }),
                                $ocLazyLoad.load({
                                    name: 'unicesarNNN',
                                    files: ['scripts/controllers/chartContoller.js']
                                })
                        }
                    }
                })
                .state('dashboard.inicio', {
                    templateUrl: 'views/inicio.html',
                    url: '/inicio',
                    resolve: {
                        loadMyFile: function ($ocLazyLoad) {
                            $ocLazyLoad.load({
                                name: 'unicesarNNN'
                            })
                        }
                    }
                })
                .state('dashboard.perfil', {
                    templateUrl: 'views/perfil.html',
                    url: '/perfil',
                    resolve: {
                        loadMyFile: function ($ocLazyLoad) {
                            $ocLazyLoad.load({
                                name: 'unicesarNNN'
                            })
                        }
                    }
                })
        }]);

    
