'use strict';

angular.module('qrGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('qrcode', {
        url: '/qrcode',
        template: '<qrcode></qrcode>'
      });
  });
