'use strict';

require('./home.scss');

const angular = require('angular');

const demoApp = angular.module('demoApp');

demoApp.controller('HomeController', ['$log','getTransactionService',  HomeController]);

function HomeController($log, getTransactionService){
  $log.log('homeCtrl hit');
  const vm = this;
  vm.transactions = {
    allTransactions: null,
  };

  vm.fetchTransactionInfo = function(){
    getTransactionService.fetchTransactions()
    .then(transactions => {
      vm.transactions.allTransactions = transactions.transactions;
      vm.sortTrasaction(vm.transactions.allTransactions);
      console.log(vm.transactions)
    })

  };

  vm.sortTrasaction = function(array, callback){
    array.forEach(function(obj){
      let year = obj['transaction-time'].split('-')[0];
      let month = obj['transaction-time'].split('-')[1];
      if(!vm.transactions[year]) vm.transactions[year] = [];
      if(!vm.transactions[year][month]) vm.transactions[year][month] = [];
      if(!vm.transactions[year][month].allTransactions) vm.transactions[year][month].allTransactions = [];
      if(!vm.transactions[year][month].income) vm.transactions[year][month].income = 0;
      if(!vm.transactions[year][month].spent) vm.transactions[year][month].spent = 0;
      if(obj.amount > 0) vm.transactions[year][month].income += obj.amount;
      if(obj.amount < 0) vm.transactions[year][month].spent += Math.abs(obj.amount);
      vm.transactions[year][month].allTransactions.push(obj);

      console.log(typeof obj.amount)
    })
  };

  vm.getTotalIncome = function(month){
    let tempIncome = 0;
    let tempSpent = 0;
    month.transactions.forEach((transaction) => {
      if(transaction.amount < 0){
        tempSpent += (transaction.amount * 0.0001);
      } else{
        tempIncome += (transaction.amount * 0.0001);

      }
    });
    month.income = Math.abs(tempIncome.toFixed(2));
    month.spent = Math.abs(tempSpent.toFixed(2));
  };
}
