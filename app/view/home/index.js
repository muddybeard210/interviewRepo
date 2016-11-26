'use strict';

require('./home.scss');

const angular = require('angular');

const demoApp = angular.module('demoApp');

demoApp.controller('HomeController', ['$log', '$window','getTransactionService',  HomeController]);

function HomeController($log, $window, getTransactionService){
  const vm = this;
  vm.noDonutChecked = false;
  vm.noCreditCardPayment = false;
  vm.creditCardDetection = null;
  vm.allTransactions = {};
  vm.transactions = {};
  vm.averageMonth = {
    spent: 0,
    income: 0,
  };

  vm.fetchTransactionInfo = function(){
    getTransactionService.fetchTransactions()
    .then(response => {
      vm.allTransactions = response.transactions;
      if(vm.noDonutChecked) vm.allTransactions = vm.filterDonuts(vm.allTransactions);
      if(vm.noCreditCardPayment) vm.allTransactions = vm.filterCreditCard(vm.allTransactions);
      vm.sortTrasaction(vm.allTransactions);
      for( var year in vm.transactions){
        vm.convertCents(vm.transactions[year]);
      }
      vm.convertAverageMonth(vm.averageMonth);
    });
  };

  vm.sortTrasaction = function(array){
    array.forEach(function(obj){
      let year = obj['transaction-time'].split('-')[0];
      let month = (obj['transaction-time'].split('-')[0] + '-' + obj['transaction-time'].split('-')[1]);
      if(!vm.transactions[year]) vm.transactions[year] = [];
      if(!vm.transactions[year][month]) vm.transactions[year][month] = [];
      if(!vm.transactions[year][month].allTransactions) vm.transactions[year][month].allTransactions = [];
      if(!vm.transactions[year][month].income) vm.transactions[year][month].income = 0;
      if(!vm.transactions[year][month].spent) vm.transactions[year][month].spent = 0;
      if(obj.amount > 0) {
        vm.transactions[year][month].income += obj.amount * 0.0001;
        vm.averageMonth.income += obj.amount * 0.0001;
      }
      if(obj.amount < 0) {
        vm.transactions[year][month].spent += Math.abs(obj.amount * 0.0001);
        vm.averageMonth.spent += Math.abs(obj.amount * 0.0001);
      }
      vm.transactions[year][month].allTransactions.push(obj);
    });
  };
  vm.convertCents = function(year){
    for (var month in year){
      year[month].spent = vm.round(year[month].spent, 2);
      year[month].income = vm.round(year[month].income, 2);
    }


  };
  vm.convertAverageMonth = function(object){
    let totalMonths = 0;
    for (var year in vm.transactions){
      totalMonths += Object.keys(vm.transactions[year]).length;
    }
    object.spent = vm.round((vm.averageMonth.spent / totalMonths), 2);
    object.income = vm.round((vm.averageMonth.income / totalMonths), 2);

  };

  vm.filterDonuts = function(array) {
    return array.filter(function(obj){
      if(obj.merchant !== 'Krispy Kreme Donuts' || obj.merchant.includes('Dunkin')) return obj;
    });
  };
  vm.filterCreditCard = function(array) {
    return array.filter(function(obj){
      if(obj.categorization === 'Credit Card Payment'){
        vm.creditCardDetection ++;

      }
      if(obj.categorization !== 'Credit Card Payment'){
        return obj;
      }
    });
  };
  vm.resetNumbers = function(){
    $window.location.reload();
  };
  //vm.round was taken from MDN for rounding numbers to the second decimal value
  vm.round = function(value, exp) {
    if (typeof exp === 'undefined' || +exp === 0)
      return Math.round(value);

    value = +value;
    exp = +exp;

    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
      return NaN;

    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
  };
}
