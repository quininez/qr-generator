'use strict';

(function() {

  class MainController {
  	constructor(Auth) {
	  this.isLoggedIn = Auth.isLoggedIn;
  	}
  }

  angular.module('qrGenApp')
  	.controller('MainController', MainController)
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'main'
    });
})();
