'use strict';

angular.module('qrcode')
  .config(function ($stateProvider) {
    $stateProvider
      .state('qrcode', {
        url: '/qrcode',
        template: '<qrcode></qrcode>'
      });
  });
