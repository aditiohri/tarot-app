const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const readingSchema = new Schema({
question: String,
description: String,
meaning: String,
diary: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {
    timestamps: true
})

module.exports = mongoose.model('Reading', readingSchema);