'use strict';

var app = require('../..');
import request from 'supertest';

var newQrcode;

describe('Qrcode API:', function() {

  describe('GET /api/qrcodes', function() {
    var qrcodes;

    beforeEach(function(done) {
      request(app)
        .get('/api/qrcodes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          qrcodes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      qrcodes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/qrcodes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/qrcodes')
        .send({
          name: 'New Qrcode',
          info: 'This is the brand new qrcode!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newQrcode = res.body;
          done();
        });
    });

    it('should respond with the newly created qrcode', function() {
      newQrcode.name.should.equal('New Qrcode');
      newQrcode.info.should.equal('This is the brand new qrcode!!!');
    });

  });

  describe('GET /api/qrcodes/:id', function() {
    var qrcode;

    beforeEach(function(done) {
      request(app)
        .get('/api/qrcodes/' + newQrcode._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          qrcode = res.body;
          done();
        });
    });

    afterEach(function() {
      qrcode = {};
    });

    it('should respond with the requested qrcode', function() {
      qrcode.name.should.equal('New Qrcode');
      qrcode.info.should.equal('This is the brand new qrcode!!!');
    });

  });

  describe('PUT /api/qrcodes/:id', function() {
    var updatedQrcode;

    beforeEach(function(done) {
      request(app)
        .put('/api/qrcodes/' + newQrcode._id)
        .send({
          name: 'Updated Qrcode',
          info: 'This is the updated qrcode!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedQrcode = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQrcode = {};
    });

    it('should respond with the updated qrcode', function() {
      updatedQrcode.name.should.equal('Updated Qrcode');
      updatedQrcode.info.should.equal('This is the updated qrcode!!!');
    });

  });

  describe('DELETE /api/qrcodes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/qrcodes/' + newQrcode._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when qrcode does not exist', function(done) {
      request(app)
        .delete('/api/qrcodes/' + newQrcode._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
