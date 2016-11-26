'use strict';


const angular = require('angular');
const demoApp = angular.module('demoApp');


demoApp.factory('getTransactionService', ['$log', '$q', '$http', getTransactionService]);


function getTransactionService($log, $q, $http){
  let service = {};
  service.data = [];


  service.fetchTransactions = function(){

    let url = 'https://2016.api.levelmoney.com/api/v2/core/get-all-transactions';
    let data = {
      'args': {
        'uid': 1110590645,
        'token': '7862EB1A7EEC41617C31801BFEF94F75',
        'api-token': 'AppTokenForInterview',
        'json-strict-mode': false,
        'json-verbose-response': false,
      }
    };
    let config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
    return $http.post(url, data, config)
    .then(res => {
      $log.info('Success', res.data);
      return $q.resolve(res.data);
    })
    .catch(err => {
      $log.error('failed to return fetchTransactions', err);
      return $q.reject(err);
    });
  };
  return service;
}
