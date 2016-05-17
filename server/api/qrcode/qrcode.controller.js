/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/qrcodes              ->  index
 * POST    /api/qrcodes              ->  create
 * GET     /api/qrcodes/:id          ->  show
 * PUT     /api/qrcodes/:id          ->  update
 * DELETE  /api/qrcodes/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Qrcode from './qrcode.model';
import * as qr from 'qr-image';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Qrcodes
export function index(req, res) {
  return Qrcode.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Qrcode from the DB
export function show(req, res) {
  return Qrcode.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Qrcode in the DB
export function create(req, res) {
  //Take the url passed in the request, process it with qr-image
  var code = qr.image(req.body.url, { type: req.body.format} );
  res.type(req.body.format);
  //stream the generated code to response
  code.pipe(res);
  return function createQrcode(){
    //save info about qr code to db
    Qrcode.create({
      url: req.body.url,
      format: req.body.format,
      errorCorrectionLevel: req.body.ecl}, function(err,qrcode){
        if(err) return console.error(err);
        //use the mongodb _id to generate a filename and save the qr code to the server
        qrcode.pathToFile = './savedcodes/'+qrcode._id+'.'+qrcode.format;
        code.pipe(require('fs').createWriteStream(qrcode.pathToFile));
      })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
  }
}

// Updates an existing Qrcode in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Qrcode.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Qrcode from the DB
export function destroy(req, res) {
  return Qrcode.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
