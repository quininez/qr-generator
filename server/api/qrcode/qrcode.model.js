'use strict';

import mongoose from 'mongoose';

var QrcodeSchema = new mongoose.Schema({
  userId: {
  	type: Schema.Types.ObjectId,
  	ref: 'User'
  },
  url: String,
  errorCorrectionLevel: { 
  	type: String,
  	enum: ['L','M','Q','H'],
  	default: 'M'
  },
  format: { 
  	type: String,
  	enum: ['png','svg','pdf','eps'],
  	default: 'png'
  },
  pathToFile: String,
  dateGenerated: { type: Date, default: Date.now },
  latestAccess: Date
});

export default mongoose.model('Qrcode', QrcodeSchema);
