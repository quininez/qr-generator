'use strict';
(function(){

class QrcodeComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('qrGenApp')
  .component('qrcode', {
    templateUrl: 'app/qrcode/qrcode.html',
    controller: QrcodeComponent
  });

})();
