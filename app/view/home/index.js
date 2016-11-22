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
      vm.sortTrasaction(vm.transactions.allTransactions);
    })

  };

  vm.sortTrasaction = function(array){
    array.forEach(function(obj){
      let year = obj['transaction-time'].split('-')[0];
      let month = obj['transaction-time'].split('-')[1];
      if(!vm.transactions[year]) vm.transactions[year] = [];
      if(!vm.transactions[year][month]) vm.transactions[year][month] = []
      vm.transactions[year][month].push(obj);
      console.log(vm.transactions);

    })
  };




  vm.transactions = {
    allTransactions: null,
  };



  // vm.getTotalIncome = function(month){
  //   let tempIncome = 0;
  //   let tempSpent = 0;
  //   month.transactions.forEach((transaction) => {
  //     if(transaction.amount < 0){
  //       tempSpent += (transaction.amount * 0.0001);
  //     } else{
  //       tempIncome += (transaction.amount * 0.0001);
  //
  //     }
  //   });
  //   month.income = Math.abs(tempIncome.toFixed(2));
  //   month.spent = Math.abs(tempSpent.toFixed(2));
  // };
}
