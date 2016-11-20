'use strict';

require('./home.scss');

const angular = require('angular');

const demoApp = angular.module('demoApp');

demoApp.controller('HomeController', ['$log', '$location',  HomeController]);

function HomeController($log, $location){
  console.log('homeCtrl hit');
}
