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
import path from 'path';
import config from '../../config/environment'

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

  //check if user info is in request and add to data for qr code creation
  if(req.user) req.body.userId = req.user._id;

  //check if url starts with http:// and append it if not
  var re = /^http[s]?:\/\//i;
  if(!re.test(req.body.url.trim())) { 
    req.body.url = 'http://' + req.body.url; 
  }
  //TODO: function to verify schema against req.body

  //save info about qr code to db
  Qrcode.create(req.body, function(err,qrcode){
      if(err) return console.error(err);
      //use the mongodb _id to generate a filename
      qrcode.pathToFile = '/savedcodes/' + qrcode._id + '.' + qrcode.format;
      
      //take the url and format of the qrcode document, process it with qr-image
      var code = qr.image(qrcode.url, { type: qrcode.format} );

      //save qrcode to server
      code.pipe(require('fs').createWriteStream(path.join(config.root, qrcode.pathToFile)));

      //res.sendFile(path.join(config.root, qrcode.pathToFile));
  })
  .then(respondWithResult(res, 201))
  .catch(handleError(res));
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
