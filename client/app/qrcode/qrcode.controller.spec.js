'use strict';

describe('Component: QrcodeComponent', function () {

  // load the controller's module
  beforeEach(module('qrcode'));

  var QrcodeComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    QrcodeComponent = $componentController('QrcodeComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
