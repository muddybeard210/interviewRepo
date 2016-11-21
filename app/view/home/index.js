'use strict';

require('./home.scss');

const angular = require('angular');

const demoApp = angular.module('demoApp');

demoApp.controller('HomeController', ['$log', '$location','getTransactionService',  HomeController]);

function HomeController($log, $location, getTransactionService){
  $log.log('homeCtrl hit');
  const vm = this;

  vm.fetchTransactionInfo = function(){
    getTransactionService.fetchTransactions()
    .then(transactions => {
      vm.transactions.allTransactions = transactions.transactions;
      vm.transactions.transactionsin2014 = vm.transactions.allTransactions.filter(function(item) {
        if(item['transaction-time'].includes('2014')) {
          return item;
        }
      }).map(function(item){
        return item;
      });
      vm.transactions.transactionsin2015 = vm.transactions.allTransactions.filter(function(item) {
        if(item['transaction-time'].includes('2015')) {
          return item;
        }
      }).map(function(item){
        return item;
      });
      vm.transactions.transactionsin2016 = vm.transactions.allTransactions.filter(function(item) {
        if(item['transaction-time'].includes('2016')) {
          return item;
        }
      }).map(function(item){
        return item;
      });
    });

  };

  vm.transactions = {
    allTransactions: null,
    transactionsin2014: null,
    transactionsin2015: null,
    transactionsin2016: null,


  };
  vm.tractions2014 = {
    January: null,
    February: null,
    March: null,
    April: null,
    May: null,
    June: null,
    July: null,
    August: null,
    September: null,
    October: null,
    November: null,
    December: null,

  };
  vm.tractions2015 = {
    January: null,
    February: null,
    March: null,
    April: null,
    May: null,
    June: null,
    July: null,
    August: null,
    September: null,
    October: null,
    November: null,
    December: null,

  };
  vm.tractions2016 = {
    January: null,
    February: null,
    March: null,
    April: null,
    May: null,
    June: null,
    July: null,
    August: null,
    September: null,
    October: null,
    November: null,
    December: null,

  };
}
