'use strict';

require('./home.scss');

const angular = require('angular');

const demoApp = angular.module('demoApp');

demoApp.controller('HomeController', ['$log', '$location', 'scorecardService', 'authService', HomeController]);

function HomeController($log, $location){
  $log.debug('homeCtrl hit');
}
