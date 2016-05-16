'use strict';

angular.module('qrGenApp', ['qrGenApp.auth', 'qrGenApp.admin', 'qrGenApp.constants', 'ngCookies',
    'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
