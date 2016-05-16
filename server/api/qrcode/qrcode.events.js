/**
 * Qrcode model events
 */

'use strict';

import {EventEmitter} from 'events';
import Qrcode from './qrcode.model';
var QrcodeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QrcodeEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Qrcode.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    QrcodeEvents.emit(event + ':' + doc._id, doc);
    QrcodeEvents.emit(event, doc);
  }
}

export default QrcodeEvents;
