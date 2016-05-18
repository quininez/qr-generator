'use strict';

angular.module('qrGenApp')
  .directive('generateqr',['$http', function ($http) {
    return {
      templateUrl: 'components/generateqr/generateqr.html',
      //use only as element <generateqr></generateqr>
      restrict: 'E',
      //create isolated scope
      scope: {},
      link: function (scope, element, attrs) {
      	//set default values for format and error correction level
      	scope.format = 'png';
      	scope.errorCorrectionLevel = 'M';
        scope.loading = false;

      	scope.getQr = function () {
          scope.qrCode = null;
          scope.loading = true;
      		//post form data to the server
      		$http.post('/api/qrcodes', {
            format: scope.format,
      		  errorCorrectionLevel: scope.errorCorrectionLevel,
            url: scope.url
          })
      		.success(function(data, status, headers, config) {
		        scope.qrCode = data.pathToFile;
		        console.log(data);
            scope.loading = false;
		      })
      		.error(function(data, status, headers, config) {
		        console.log('fail');
		      });
      	}
      }
    };
  }]);
