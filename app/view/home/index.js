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
      }).forEach(function(obj) {
	      //  let year = obj['transaction-time'].split('-').slice(0,1);
        let month = obj['transaction-time'].split('-').slice(1,2);
        vm.transactions2014[month].transactions.push(obj);
      });
      vm.transactions.transactionsin2015 = vm.transactions.allTransactions.filter(function(item) {
        if(item['transaction-time'].includes('2015')) {
          return item;
        }
      }).forEach(function(obj) {
	      //let year = obj['transaction-time'].split('-').slice(0,1);
        let month = obj['transaction-time'].split('-').slice(1,2);
        vm.transactions2015[month].transactions.push(obj);
      });
      vm.transactions.transactionsin2016 = vm.transactions.allTransactions.filter(function(item) {
        if(item['transaction-time'].includes('2016')) {
          return item;
        }
      }).forEach(function(obj) {
	      //let year = obj['transaction-time'].split('-').slice(0,1);
        let month = obj['transaction-time'].split('-').slice(1,2);
        vm.transactions2016[month].transactions.push(obj);
      });
      for (var month in vm.transactions2014) {
        vm.getTotalIncome(vm.transactions2014[month]);
        console.log(vm.transactions2014[month]);
      }
      for (var month in vm.transactions2015) {
        vm.getTotalIncome(vm.transactions2015[month]);
        console.log(vm.transactions2015[month]);
      }
      for (var month in vm.transactions2016) {
        vm.getTotalIncome(vm.transactions2016[month]);
        console.log(vm.transactions2016[month]);
      }
    });
  };

  vm.transactions = {
    allTransactions: null,
    transactionsin2014: null,
    transactionsin2015: null,
    transactionsin2016: null,


  };


  vm.transactions2014 = {
    '01': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '02': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '03': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '04': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '05': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '06': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '07': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '08': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '09': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '10': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '11': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '12': {
      transactions: [],
      spent: 0,
      income: 0,
    },

  };
  vm.transactions2015 = {
    '01': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '02': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '03': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '04': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '05': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '06': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '07': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '08': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '09': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '10': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '11': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '12': {
      transactions: [],
      spent: 0,
      income: 0,
    },


  };
  vm.transactions2016 = {
    '01': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '02': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '03': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '04': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '05': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '06': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '07': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '08': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '09': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '10': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '11': {
      transactions: [],
      spent: 0,
      income: 0,
    },
    '12': {
      transactions: [],
      spent: 0,
      income: 0,
    },

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
