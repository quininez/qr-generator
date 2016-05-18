'use strict';

describe('Directive: generateqr', function () {

  // load the directive's module and view
  beforeEach(module('qrGenApp.generateqr'));
  beforeEach(module('components/generateqr/generateqr.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<generateqr></generateqr>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the generateqr directive');
  }));
});
