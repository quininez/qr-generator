'use strict';
(function(){

class QrcodeComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('qrcode')
  .component('qrcode', {
    templateUrl: 'app/qrcode/qrcode.html',
    controller: QrcodeComponent
  });

})();
