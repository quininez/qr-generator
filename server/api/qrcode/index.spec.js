'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var qrcodeCtrlStub = {
  index: 'qrcodeCtrl.index',
  show: 'qrcodeCtrl.show',
  create: 'qrcodeCtrl.create',
  update: 'qrcodeCtrl.update',
  destroy: 'qrcodeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var qrcodeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './qrcode.controller': qrcodeCtrlStub
});

describe('Qrcode API Router:', function() {

  it('should return an express router instance', function() {
    qrcodeIndex.should.equal(routerStub);
  });

  describe('GET /api/qrcodes', function() {

    it('should route to qrcode.controller.index', function() {
      routerStub.get
        .withArgs('/', 'qrcodeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/qrcodes/:id', function() {

    it('should route to qrcode.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'qrcodeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/qrcodes', function() {

    it('should route to qrcode.controller.create', function() {
      routerStub.post
        .withArgs('/', 'qrcodeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/qrcodes/:id', function() {

    it('should route to qrcode.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'qrcodeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/qrcodes/:id', function() {

    it('should route to qrcode.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'qrcodeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/qrcodes/:id', function() {

    it('should route to qrcode.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'qrcodeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
