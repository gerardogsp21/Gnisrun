'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('energyApp')
	.directive('notifications',function(){
		return {
        templateUrl:'scripts/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});


