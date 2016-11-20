'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
const ngRoute = require('angular-route');
const ngAnimate = require('angular-animate');


const demoApp = angular.module('demoApp', [ngRoute, ngAnimate]);

demoApp.config(['$routeProvider', '$logProvider', function($routeProvider, $logProvider){
  $routeProvider
  .when('/', {
    template: require('./view/home/home.html'),
    controller: 'HomeController',
    controllerAs: 'homeCtrl',
  })
  .otherwise({
    redirectTo: '/'
  });
}]);


require('./view/home');
