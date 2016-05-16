'use strict';

angular.module('qrGenApp.auth', ['qrGenApp.constants', 'qrGenApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
